'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get all managers entries
// @route   GET /entradas/gestores-entradas
// @access  Private/Admin

const getEntries = asyncHandler(async (req, res) => {
  const getAllEntries = `
  SELECT gestor_entradas.*, tareas.id_tarea, tareas.descripcion_tarea, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
  FROM gestor_entradas
  INNER JOIN tareas ON gestor_entradas.id_tarea = tareas.id_tarea
  INNER JOIN puestos_trabajo ON puestos_trabajo.id_puesto = gestor_entradas.id_puesto
  WHERE puestos_trabajo.activo = "SI"
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
      const assigned = await queryPromise(getAllEntries)
      const profiles = await queryPromise(tasksProfiles)
  
      const entry = {
        entries: concatProfilesCodes(assigned, profiles),
      }
  
      return res.status(200).json(entry)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error al obtener los perfiles' })
    }
})

module.exports = getEntries
