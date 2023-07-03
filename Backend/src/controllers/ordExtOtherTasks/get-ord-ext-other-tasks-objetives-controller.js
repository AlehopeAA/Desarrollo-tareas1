'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const {
  ADMIN_ROLE,
  SUPER_ROLE,
  GESTOR_DE_PERFILES_ROLE,
} = require('../../config/users/roles/roles')

// @desc    Create taskordextothers task
// @route   POST /api/tareasordextotras/tareas
// @access  Private/Admin

const getOrdExtOtherTasksObjetives = asyncHandler(async (req, res) => {
  const { id_puesto, permiso } = req.user

  const isAdminOrSuper = permiso.includes(ADMIN_ROLE) || permiso.includes(SUPER_ROLE)
  const isManager = permiso.includes(GESTOR_DE_PERFILES_ROLE)

  const tasksWithoutRepeating = []

  if (isAdminOrSuper) {
  
    const existOrdExtOtherTaskQuery = `
    SELECT tareas.*, tipos_tarea.tipo_tarea, perfiles.codigo_perfil 
    FROM tareas
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
    INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
    INNER JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
    WHERE tipos_tarea.tipo_tarea IN ('ORDINARIA', 'EXTRAORDINARIA')      
    AND tareas.activo = 'SI'
    ORDER BY tareas.descripcion_tarea`

    db.query(existOrdExtOtherTaskQuery, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }

      result.map((task) => {
        const existInArray = tasksWithoutRepeating.map((task) => task.id_tarea).indexOf(task.id_tarea) === -1

        if (existInArray) {
          const repeatTasks = result.filter((taskRepeat) => taskRepeat.id_tarea === task.id_tarea)

          tasksWithoutRepeating.push({
            ...task,
            codigo_perfil: repeatTasks.map((taskCod) => taskCod.codigo_perfil),
          })
        }
      })

      res.status(200).json(tasksWithoutRepeating)
    })
  } else if (isManager) {
    
    const managerTasks = `
    SELECT tareas.*, tipos_tarea.tipo_tarea, perfiles.codigo_perfil 
    FROM tareas 
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
    INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
    INNER JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
    WHERE tipos_tarea.tipo_tarea IN ('ORDINARIA', 'EXTRAORDINARIA')
    AND tareas.activo = 'SI'
    AND tareas.id_tarea 
      IN (
        SELECT DISTINCT tareas_perfil.id_tarea 
        FROM tareas_perfil 
        WHERE tareas_perfil.id_perfil 
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
      )
    ORDER BY tareas.descripcion_tarea`

    db.query(managerTasks, (err, result) => {
      if (err) {
        return res.status(400).json({ message: err.sqlMessage })
      }

      result.map((task) => {
        const existInArray = tasksWithoutRepeating.map((task) => task.id_tarea).indexOf(task.id_tarea) === -1

        if (existInArray) {
          const repeatTasks = result.filter((taskRepeat) => taskRepeat.id_tarea === task.id_tarea)

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

module.exports = getOrdExtOtherTasksObjetives
