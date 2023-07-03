'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get all dificulties by entry manager
// @route   GET /dificultades/lista-gestor/:id
// @access  Private/data manager

const getDificultiesByManagerId = asyncHandler(async (req, res) => {
  const { id } = req.params

  const allDificultiesByManagerIdQuery = `
  SELECT dificultades.id_dificultad, dificultades.id_tarea, dificultades.codigo_trazabilidad, 
  dificultades.dificultad, perfiles.codigo_perfil, tareas.descripcion_tarea 
  FROM dificultades
  INNER JOIN tareas ON dificultades.id_tarea = tareas.id_tarea
  LEFT JOIN tareas_perfil ON tareas_perfil.id_tarea = tareas.id_tarea
  LEFT JOIN perfiles ON tareas_perfil.id_perfil = perfiles.id_perfil AND perfiles.activo = "SI"
  WHERE tareas.activo = "SI"  
  AND dificultades.id_tarea IN
  (SELECT id_tarea FROM gestor_dificultad WHERE id_puesto = '${id}')
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
      const assigned = await queryPromise(allDificultiesByManagerIdQuery)
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

module.exports = getDificultiesByManagerId
