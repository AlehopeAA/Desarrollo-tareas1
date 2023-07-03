'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get all acumulatives by task id
// @route   GET /acumulativas/lista-tarea/:id
// @access  Admin/data manager

const getAcumulativesByTaskId = asyncHandler(async (req, res) => {
  const { id } = req.params

  const acumulativesByTaskIdQuery = `
    select tareas.descripcion_tarea, perfiles.codigo_perfil
    from acumulativas
    inner join tareas on acumulativas.id_tarea_hija = tareas.id_tarea
    left join tareas_perfil on tareas.id_tarea = tareas_perfil.id_tarea
    left join perfiles on tareas_perfil.id_perfil = perfiles.id_perfil
    where acumulativas.id_tarea_padre = ${id}
    order by tareas.descripcion_tarea
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
      const tasks = await queryPromise(acumulativesByTaskIdQuery)
      const profiles = await queryPromise(tasksProfiles)
  
      const acumulatives = {
        acumulativas: concatProfilesCodes(tasks, profiles),
      }
  
      return res.status(200).json(acumulatives)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error al obtener las tareas acumulativas' })
    }
})

module.exports = getAcumulativesByTaskId
