'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get Difficulties by id
// @route   GET /api/dificultad/gestores/:id
// @access  Private/Admin
const getDifficultiesByManager = asyncHandler(async (req, res) => {
  const { id } = req.params

  const queryDifficultiesByManagerAssigned = `
    SELECT tareas.*, tipos_tarea.tipo_tarea
    FROM tareas 
    INNER JOIN tipos_tarea
    ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
    WHERE tareas.activo ="SI" 
    AND tareas.dificultad ="SI" 
    AND tareas.id_tarea 
    IN (
        SELECT gestor_dificultad.id_tarea 
        FROM gestor_dificultad 
        WHERE gestor_dificultad.id_puesto = '${id}'
    )
  `
  const queryDifficultiesByManagerPending = `
    SELECT tareas.*, tipos_tarea.tipo_tarea
    FROM tareas 
    INNER JOIN tipos_tarea
    ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
    WHERE tareas.activo ="SI" 
    AND tareas.dificultad ="SI" 
    AND tareas.id_tarea 
    NOT IN (
        SELECT gestor_dificultad.id_tarea 
        FROM gestor_dificultad 
        WHERE gestor_dificultad.id_puesto = '${id}'
    )
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
    const assigned = await queryPromise(queryDifficultiesByManagerAssigned)
    const pending = await queryPromise(queryDifficultiesByManagerPending)
    const profiles = await queryPromise(tasksProfiles)

    const Difficulties = {
      pendings: concatProfilesCodes(pending, profiles),
      assigned: concatProfilesCodes(assigned, profiles),
    }

    return res.status(200).json(Difficulties)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error al obtener los perfiles' })
  }
})

module.exports = getDifficultiesByManager
