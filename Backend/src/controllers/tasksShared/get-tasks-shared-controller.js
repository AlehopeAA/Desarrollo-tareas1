'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')
const {
  ADMIN_ROLE,
  SUPER_ROLE,
  GESTOR_DE_PERFILES_ROLE,
} = require('../../config/users/roles/roles')


// @desc    get all tasks shared
// @route   GET /api/tareascompartidas
// @access  Private/Admin/DataManager
const getTasksShared = asyncHandler(async (req, res) => {
  const { id_puesto, permiso } = req.user

  const isAdminOrSuper = permiso.includes(ADMIN_ROLE) || permiso.includes(SUPER_ROLE)
  const isManager = permiso.includes(GESTOR_DE_PERFILES_ROLE)

  if (isAdminOrSuper) {
    const adminTaskSharedQuery = `
    SELECT sum(compartidas.porcentaje_responsabilidad) as porcentaje_responsabilidad, tareas.id_tarea, tareas.descripcion_tarea
    FROM compartidas
    INNER JOIN tareas ON tareas.id_tarea = compartidas.id_tarea 
    WHERE tareas.activo = "SI" 
    GROUP BY compartidas.id_tarea
    ORDER BY tareas.descripcion_tarea
  `
  const tasksProfiles = `
     SELECT tareas_perfil.*, group_concat(distinct perfiles.codigo_perfil order by perfiles.codigo_perfil separator ', ') as codigo_perfil 
     FROM tareas_perfil
     LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
     GROUP BY id_tarea`

  const concatProfilesCodes = (taskArray, profileArray) =>
    taskArray.map((task) =>
      profileArray.some((p) => p.id_tarea === task.id_tarea)
        ? {
            ...task,
            codigo_perfil: profileArray
              .filter((profile) => profile.id_tarea === task.id_tarea)
              .map((p) => p.codigo_perfil),
          }
        : task
    )

    try {
      const tasks = await queryPromise(adminTaskSharedQuery)
      const profiles = await queryPromise(tasksProfiles)
  
      const shared = {
        compartidas: concatProfilesCodes(tasks, profiles),
      }
  
      return res.status(200).json(shared)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error al obtener las tareas compartidas' })
    }
  } else if (isManager) {
      const managerTasksSharedQuery = `
      SELECT sum(compartidas.porcentaje_responsabilidad) as porcentaje_responsabilidad, tareas.id_tarea, tareas.descripcion_tarea
      FROM compartidas
      INNER JOIN tareas ON tareas.id_tarea = compartidas.id_tarea 
      INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
      WHERE tareas.activo = "SI" 
      AND tareas_perfil.id_perfil 
        IN ( 
          SELECT gestor_perfiles.id_perfil 
          FROM gestor_perfiles 
          WHERE gestor_perfiles.id_puesto = ${id_puesto}
        ) 
      GROUP BY compartidas.id_tarea
      ORDER BY tareas.descripcion_tarea
    `
    const tasksProfiles = `
     SELECT tareas_perfil.*, group_concat(distinct perfiles.codigo_perfil order by perfiles.codigo_perfil separator ', ') as codigo_perfil 
     FROM tareas_perfil
     LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
     GROUP BY id_tarea`

  const concatProfilesCodes = (taskArray, profileArray) =>
    taskArray.map((task) =>
      profileArray.some((p) => p.id_tarea === task.id_tarea)
        ? {
            ...task,
            codigo_perfil: profileArray
              .filter((profile) => profile.id_tarea === task.id_tarea)
              .map((p) => p.codigo_perfil),
          }
        : task
    )

    try {
      const tasks = await queryPromise(managerTasksSharedQuery)
      const profiles = await queryPromise(tasksProfiles)
  
      const shared = {
        compartidas: concatProfilesCodes(tasks, profiles),
      }
  
      return res.status(200).json(shared)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error al obtener las tareas compartidas' })
    }
  }
})

module.exports = getTasksShared
