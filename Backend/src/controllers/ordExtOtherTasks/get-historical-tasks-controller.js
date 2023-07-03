'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get data of historical tasks
// @route   GET /api/tareas
// @access  Private/Admin
const getHistoricalTasks = asyncHandler(async (req, res) => {
  const { id } = req.params

  const tasksQuery = `
    SELECT historico_tareas.*, TT1.tipo_tarea as tipo_tarea_anterior, TT2.tipo_tarea as tipo_tarea_nueva, puestos_trabajo.nombre, puestos_trabajo.apellido1, 
           puestos_trabajo.apellido2, perfiles.codigo_perfil, P2.nombre as nombreModificador, P2.apellido1 as apellido1Modificador, P2.apellido2 as apellido2Modificador
    FROM historico_tareas 
    INNER JOIN tipos_tarea TT1 ON historico_tareas.id_tipo_tarea_anterior = TT1.id_tipo_tarea
    INNER JOIN tipos_tarea TT2 ON historico_tareas.id_tipo_tarea_nueva = TT2.id_tipo_tarea
    INNER JOIN tareas ON historico_tareas.id_tarea = tareas.id_tarea
    LEFT JOIN puestos_trabajo ON tareas.id_puesto = puestos_trabajo.id_puesto 
    LEFT JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
    LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
    LEFT JOIN puestos_trabajo P2 ON historico_tareas.id_puesto = P2.id_puesto
    WHERE historico_tareas.id_tarea = ${id}     
    ORDER BY historico_tareas.fecha_modificacion desc
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
      const tasks = await queryPromise(tasksQuery)
      const profiles = await queryPromise(tasksProfiles)
  
      const tareas = {
        tareas: concatProfilesCodes(tasks, profiles),
      }
  
      return res.status(200).json(tareas)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error al obtener el histórico de tareas' })
    }

})

module.exports = getHistoricalTasks
