'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get all entries by entry manager
// @route   GET /entradas/lista-gestor/:id
// @access  Private/data manager

const getEntriesByManagerId = asyncHandler(async (req, res) => {
  const { id } = req.params

  const allEntriesByManagerIdQuery = `
  SELECT entradas.id_entrada, entradas.id_tarea, entradas.anio, entradas.mes, entradas.entrada, entradas.fecha_ultima_modificacion, tareas.descripcion_tarea, 
  "" as nombre, "" as apellido1, "" as apellido2, "COMPARTIDA" tipo 
  FROM entradas
  INNER JOIN tareas ON entradas.id_tarea = tareas.id_tarea
  WHERE tareas.activo = "SI"
  AND entradas.id_tarea IN
  (SELECT id_tarea FROM gestor_entradas WHERE id_puesto = '${id}')
  UNION
  SELECT entradas_no_compartidas.id_entrada, entradas_no_compartidas.id_tarea, entradas_no_compartidas.anio, entradas_no_compartidas.mes, entradas_no_compartidas.entrada, 
  entradas_no_compartidas.fecha_ultima_modificacion, tareas.descripcion_tarea, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2, "NOCOMPARTIDA" tipo
  FROM entradas_no_compartidas
  INNER JOIN tareas ON entradas_no_compartidas.id_tarea = tareas.id_tarea
  INNER JOIN puestos_trabajo ON puestos_trabajo.id_puesto = entradas_no_compartidas.id_puesto_trabajo
  WHERE puestos_trabajo.activo = "SI"
  AND tareas.activo = "SI"
  AND entradas_no_compartidas.id_tarea IN
  (SELECT id_tarea FROM gestor_entradas WHERE id_puesto = '${id}')
  ORDER BY anio desc, mes desc, descripcion_tarea
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
      const assigned = await queryPromise(allEntriesByManagerIdQuery)
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

module.exports = getEntriesByManagerId
