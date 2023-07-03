'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get all managers Difficulties
// @route   GET /dificultades/gestores-dificultades
// @access  Private/Admin

const getDifficulties = asyncHandler(async (req, res) => {
  const getAllDifficulties = `
  SELECT gestor_dificultad.*, tareas.descripcion_tarea, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2 
  FROM gestor_dificultad
  INNER JOIN tareas ON gestor_dificultad.id_tarea = tareas.id_tarea
  INNER JOIN puestos_trabajo ON puestos_trabajo.id_puesto = gestor_dificultad.id_puesto
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
      const assigned = await queryPromise(getAllDifficulties)
      const profiles = await queryPromise(tasksProfiles)
  
      const dificulty = {
        dificulties: concatProfilesCodes(assigned, profiles),
      }
  
      return res.status(200).json(dificulty)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error al obtener los perfiles' })
    }
})

module.exports = getDifficulties
