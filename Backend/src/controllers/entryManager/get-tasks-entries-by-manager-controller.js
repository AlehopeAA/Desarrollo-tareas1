'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get entries by id
// @route   GET /api/entradas/gestores/:id
// @access  Private/Admin
const getTasksEntriesByManager = asyncHandler(async (req, res) => {
  const { id } = req.params

  const queryEntriesByManagerAssigned = `
    SELECT tareas.*, tipos_tarea.tipo_tarea, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
    FROM tareas 
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
    LEFT JOIN puestos_trabajo ON tareas.id_puesto=puestos_trabajo.id_puesto
    WHERE tareas.activo ="SI" 
    AND tareas.entrada ="SI" 
    AND tareas.id_tarea 
    IN (
        SELECT gestor_entradas.id_tarea 
        FROM gestor_entradas 
        WHERE gestor_entradas.id_puesto = '${id}'
    )
    order by tareas.descripcion_tarea
  `
  const queryEntriesByManagerPending = `
    SELECT tareas.*, tipos_tarea.tipo_tarea, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
    FROM tareas 
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
    LEFT JOIN puestos_trabajo ON tareas.id_puesto=puestos_trabajo.id_puesto
    WHERE tareas.activo ="SI" 
    AND tareas.entrada ="SI" 
    AND tareas.id_tarea 
    NOT IN (
        SELECT gestor_entradas.id_tarea 
        FROM gestor_entradas 
        WHERE gestor_entradas.id_puesto = '${id}'
    )
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
    const assigned = await queryPromise(queryEntriesByManagerAssigned)
    const pending = await queryPromise(queryEntriesByManagerPending)
    const profiles = await queryPromise(tasksProfiles)

    const entries = {
      pendings: concatProfilesCodes(pending, profiles),
      assigned: concatProfilesCodes(assigned, profiles),
    }

    return res.status(200).json(entries)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error al obtener los perfiles' })
  }
})

module.exports = getTasksEntriesByManager
