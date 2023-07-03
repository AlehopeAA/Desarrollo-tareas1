'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')
const {
    ADMIN_ROLE,
    SUPER_ROLE,
    GESTOR_DE_PERFILES_ROLE,
  } = require('../../config/users/roles/roles')

// @desc    get acumulatives tasks by manager id
// @route   GET /api/acumulativas/lista-tareas/:id
// @access  Profile manager/Admin
const getAcumulativesTasksByManager = asyncHandler(async (req, res) => {
  const { id_puesto, permiso } = req.user

  const isAdminOrSuper = permiso.includes(ADMIN_ROLE) || permiso.includes(SUPER_ROLE)
  const isManager = permiso.includes(GESTOR_DE_PERFILES_ROLE)
  const tasksWithoutRepeating = []

  if (isAdminOrSuper) {
    const adminAcumulativesTasksQuery = `
    SELECT tareas.id_tarea, tareas.descripcion_tarea, perfiles.codigo_perfil
    FROM tareas
    LEFT JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
    LEFT JOIN perfiles ON tareas_perfil.id_perfil = perfiles.id_perfil
    WHERE tareas.activo = "SI"
    AND tareas.acumulativa = "SI"
    ORDER BY tareas.descripcion_tarea 
    `

    try {
      const tasks = await queryPromise(adminAcumulativesTasksQuery)

      tasks.map((task) => {
        const existInArray = tasksWithoutRepeating.map((task) => task.id_tarea).indexOf(task.id_tarea) === -1

        if (existInArray) {
          const repeatTasks = tasks.filter((taskRepeat) => taskRepeat.id_tarea === task.id_tarea)

          tasksWithoutRepeating.push({
            ...task,
            codigo_perfil: repeatTasks.map((taskCod) => taskCod.codigo_perfil),
          })
        }
      })

      res.status(200).json(tasksWithoutRepeating)
    } catch (error) {
      res.status(400).json({ message: 'Error al obtener las tareas acumulativas' })
    }
  } else if (isManager) {
    const queryAcumulativesTasksByManager = `
      SELECT tareas.id_tarea, tareas.descripcion_tarea, perfiles.codigo_perfil
      FROM tareas
      INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
      INNER JOIN perfiles ON tareas_perfil.id_perfil = perfiles.id_perfil
      WHERE tareas.activo = "SI" 
      AND tareas.acumulativa = "SI" 
      AND perfiles.id_perfil 
      IN (
        SELECT gestor_perfiles.id_perfil
        FROM gestor_perfiles
        WHERE gestor_perfiles.id_puesto = '${id_puesto}'
      )
    `
    try {
      const tasks = await queryPromise(queryAcumulativesTasksByManager)
  
      tasks.map((task) => {
        const existInArray = tasksWithoutRepeating.map((task) => task.id_tarea).indexOf(task.id_tarea) === -1
  
        if (existInArray) {
          const repeatTasks = tasks.filter((taskRepeat) => taskRepeat.id_tarea === task.id_tarea)
  
          tasksWithoutRepeating.push({
            ...task,
            codigo_perfil: repeatTasks.map((taskCod) => taskCod.codigo_perfil),
          })
        }
      })
  
      res.status(200).json(tasksWithoutRepeating)
    } catch (error) {
      res.status(400).json({ message: 'Error al obtener las tareas acumulativas' })
    }
  }
})

module.exports = getAcumulativesTasksByManager
