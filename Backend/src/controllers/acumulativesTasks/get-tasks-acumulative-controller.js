'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')
const {
  ADMIN_ROLE,
  SUPER_ROLE,
  GESTOR_DE_PERFILES_ROLE,
} = require('../../config/users/roles/roles')


// @desc    get all tasks acumulatives
// @route   GET /api/tareasacumulativas
// @access  Admin/DataManager
const getAcumulativesTasks = asyncHandler(async (req, res) => {
  const { id_puesto, permiso } = req.user

  const isAdminOrSuper = permiso.includes(ADMIN_ROLE) || permiso.includes(SUPER_ROLE)
  const isManager = permiso.includes(GESTOR_DE_PERFILES_ROLE)

  if (isAdminOrSuper) {
    const adminAcumulativesTasksQuery = `
      SELECT acumulativas.*, tareas_padre.id_tarea as id_tarea_padre, tareas_hija.id_tarea as id_tarea_hija, 
         tareas_padre.descripcion_tarea as desc_padre, tareas_hija.descripcion_tarea as desc_hija
      FROM acumulativas
      INNER JOIN tareas as tareas_padre ON tareas_padre.id_tarea = acumulativas.id_tarea_padre
      INNER JOIN tareas as tareas_hija ON tareas_hija.id_tarea = acumulativas.id_tarea_hija
      ORDER BY tareas_padre.descripcion_tarea, tareas_hija.descripcion_tarea
    `

    const tasksProfiles = `
     SELECT tareas_perfil.*, group_concat(distinct perfiles.codigo_perfil order by perfiles.codigo_perfil separator ', ') as codigo_perfil 
     FROM tareas_perfil
     LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
     GROUP BY id_tarea`

    const concatProfilesCodes = (taskArray, profileArray) =>
      taskArray.map((task) =>
        profileArray.some((p) => p.id_tarea === task.id_tarea_padre)
          ? {
              ...task,
              codigo_perfil_padre: profileArray
                .filter((profile) => profile.id_tarea === task.id_tarea_padre)
                .map((p) => p.codigo_perfil),
              codigo_perfil_hija: profileArray
                .filter((profile) => profile.id_tarea === task.id_tarea_hija)
                .map((p) => p.codigo_perfil),
            }
          : task
      )

    try {
      const tasks = await queryPromise(adminAcumulativesTasksQuery)
      const profiles = await queryPromise(tasksProfiles)
  
      const acumulatives = {
        acumulativas: concatProfilesCodes(tasks, profiles),
      }
  
      return res.status(200).json(acumulatives)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error al obtener las tareas acumulativas' })
    }

  } else if (isManager) {
      const managerAcumulativesTasksQuery = `
      SELECT acumulativas.*, tareas_padre.id_tarea as id_tarea_padre, tareas_hija.id_tarea as id_tarea_hija,
         tareas_padre.descripcion_tarea as desc_padre, tareas_hija.descripcion_tarea as desc_hija
      FROM acumulativas
      INNER JOIN tareas as tareas_padre ON tareas_padre.id_tarea = acumulativas.id_tarea_padre
      INNER JOIN tareas as tareas_hija ON tareas_hija.id_tarea = acumulativas.id_tarea_hija
      INNER JOIN tareas_perfil ON tareas_padre.id_tarea = tareas_perfil.id_tarea
      WHERE tareas_perfil.id_perfil 
        IN ( 
          SELECT gestor_perfiles.id_perfil 
          FROM gestor_perfiles 
          WHERE gestor_perfiles.id_puesto = ${id_puesto}
        ) 
      ORDER BY tareas_padre.descripcion_tarea, tareas_hija.descripcion_tarea
    `
    
    const tasksProfiles = `
     SELECT tareas_perfil.*, group_concat(distinct perfiles.codigo_perfil order by perfiles.codigo_perfil separator ', ') as codigo_perfil 
     FROM tareas_perfil
     LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
     GROUP BY id_tarea`

    const concatProfilesCodes = (taskArray, profileArray) =>
      taskArray.map((task) =>
        profileArray.some((p) => p.id_tarea === task.id_tarea_padre)
          ? {
              ...task,
              codigo_perfil: profileArray
                .filter((profile) => profile.id_tarea === task.id_tarea_padre)
                .map((p) => p.codigo_perfil),
              codigo_perfil_hija: profileArray
                .filter((profile) => profile.id_tarea === task.id_tarea_hija)
                .map((p) => p.codigo_perfil),
            }
          : task
      )

    try {
      const tasks = await queryPromise(managerAcumulativesTasksQuery)
      const profiles = await queryPromise(tasksProfiles)
  
      const acumulatives = {
        acumulativas: concatProfilesCodes(tasks, profiles),
      }
  
      return res.status(200).json(acumulatives)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error al obtener las tareas acumulativas' })
    }
  }
})

module.exports = getAcumulativesTasks
