'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get data of historical objetive
// @route   GET /api/objetivosOrdExtOther
// @access  Private/Admin
const getHistoricalObjetives = asyncHandler(async (req, res) => {
  const { id } = req.params

  const objetivesQuery = `
    SELECT historico_objetivos.*, tareas.id_tarea, tareas.descripcion_tarea, tareas.compartida, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2, perfiles.codigo_perfil,
           P2.nombre as nombreModificador, P2.apellido1 as apellido1Modificador, P2.apellido2 as apellido2Modificador
    FROM historico_objetivos 
    INNER JOIN objetivos ON objetivos.id_objetivo = historico_objetivos.id_objetivo
    INNER JOIN tareas ON objetivos.id_tarea = tareas.id_tarea 
    LEFT JOIN puestos_trabajo ON tareas.id_puesto = puestos_trabajo.id_puesto 
    LEFT JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
    LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
    LEFT JOIN puestos_trabajo P2 ON historico_objetivos.id_puesto = P2.id_puesto
    WHERE historico_objetivos.id_objetivo = ${id}     
    ORDER BY historico_objetivos.fecha_modificacion desc
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
      const tasks = await queryPromise(objetivesQuery)
      const profiles = await queryPromise(tasksProfiles)
  
      const objetives = {
        objetives: concatProfilesCodes(tasks, profiles),
      }
  
      return res.status(200).json(objetives)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error al obtener el histórico de objetivos' })
    }

})

module.exports = getHistoricalObjetives
