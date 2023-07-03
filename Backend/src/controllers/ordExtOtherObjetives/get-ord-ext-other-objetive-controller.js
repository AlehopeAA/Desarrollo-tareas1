'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const {
  ADMIN_ROLE,
  SUPER_ROLE,
  GESTOR_DE_PERFILES_ROLE,
} = require('../../config/users/roles/roles')

// @desc    get all general task
// @route   GET /api/objetivosordextotras
// @access  Private/Admin
const getOrdExtOtherObjetives = asyncHandler(async (req, res) => {
  const { id_puesto, permiso } = req.user
  const isAdminOrSuper = permiso.includes(ADMIN_ROLE) || permiso.includes(SUPER_ROLE)
  const isManager = permiso.includes(GESTOR_DE_PERFILES_ROLE)
  const tasksWithoutRepeating = []

  if (isAdminOrSuper) {
     const totalObjetivesQuery = `
       SELECT objetivos.*, tareas.descripcion_tarea, tareas.compartida, tareas.dificultad as tardif, concat(perfiles.codigo_perfil, ', ') as codigo_perfil
       FROM objetivos 
       INNER JOIN tareas ON objetivos.id_tarea = tareas.id_tarea 
       INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea     
       INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
       INNER JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
       WHERE tipos_tarea.tipo_tarea IN ('ORDINARIA', 'EXTRAORDINARIA')
       AND tareas.activo = "SI"      
       ORDER BY tareas.descripcion_tarea
     `

     db.query(totalObjetivesQuery, (err, result) => {
       if (err) {
         return res.status(400).json({ message: err.sqlMessage })
       }
       result.map((task) => {
         const existInArray = tasksWithoutRepeating.map((task) => task.id_tarea).indexOf(task.id_tarea) === -1

         if (existInArray) {
           const repeatTasks = result.filter((taskRepeat) => taskRepeat.id_tarea === task.id_tarea && taskRepeat.dificultad === task.dificultad && taskRepeat.magnitud_temporal === task.magnitud_temporal)

           tasksWithoutRepeating.push({
             ...task,
             codigo_perfil: repeatTasks.map((taskCod) => taskCod.codigo_perfil),
           })
         }
       })

       res.status(200).json(tasksWithoutRepeating)
     })

  } else if (isManager) {
     const objetivesQuery = `
       SELECT objetivos.*, tareas.descripcion_tarea, tareas.compartida, tareas.dificultad as tardif, perfiles.codigo_perfil
       FROM objetivos 
       INNER JOIN tareas ON objetivos.id_tarea = tareas.id_tarea 
       INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea     
       INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
       INNER JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
       WHERE tipos_tarea.tipo_tarea IN ('ORDINARIA', 'EXTRAORDINARIA')
       AND tareas.activo = "SI"
       AND tareas_perfil.id_perfil 
          IN (
            SELECT gestor_perfiles.id_perfil 
            FROM gestor_perfiles 
            INNER JOIN perfiles 
            ON gestor_perfiles.id_perfil = perfiles.id_perfil
            WHERE (
              gestor_perfiles.id_puesto = ${id_puesto}
              AND perfiles.activo = 'SI'
            )
          )
       
       ORDER BY tareas.descripcion_tarea
     `

     db.query(objetivesQuery, (err, result) => {
       if (err) {
         return res.status(400).json({ message: err.sqlMessage })
       }
       result.map((task) => {
         const existInArray = tasksWithoutRepeating.map((task) => task.id_tarea).indexOf(task.id_tarea) === -1

         if (existInArray) {
           const repeatTasks = result.filter((taskRepeat) => taskRepeat.id_tarea === task.id_tarea && taskRepeat.dificultad === task.dificultad && taskRepeat.magnitud_temporal === task.magnitud_temporal)

           tasksWithoutRepeating.push({
             ...task,
             codigo_perfil: repeatTasks.map((taskCod) => taskCod.codigo_perfil),
           })
         }
       })

       res.status(200).json(tasksWithoutRepeating)
     })
  }
})

module.exports = getOrdExtOtherObjetives
