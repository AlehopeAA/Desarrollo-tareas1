'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords } = require('../../utils/queryPromises')
// @desc    Create specific task
// @route   POST /api/tareasespecificas
// @access  Private/Admin
const registerSpecificTask = asyncHandler(async (req, res) => {
  const {
    id_puesto,
    descripcion_tarea,
    id_tipo_tarea,
    codigo_trazabilidad,
    cuantificable,
    indicador,
    entrada,
    compartida,
    dificultad,
    acumulativa,
    fecha_alta,
  } = req.body

  const isExistTaskDescriptionQuery = `
    SELECT * FROM tareas
    INNER JOIN tipos_tarea 
    ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
    WHERE (
      tareas.descripcion_tarea ='${descripcion_tarea}'
      AND tipos_tarea.tipo_tarea = "ESPECIFICA"
    )
  `
  const isExistTaskDescription = await getAllRecords(isExistTaskDescriptionQuery)

  if (isExistTaskDescription.length > 0) {
    return res.status(400).json({ message: 'Ya existe una tarea con esa descripción' })
  }

  const idTipoTarea = 3

  db.query(
    ` INSERT INTO tareas (
       descripcion_tarea,
       codigo_trazabilidad,
       id_tipo_tarea,
       cuantificable,
       activo,
       fecha_alta,
       indicador,
       entrada,
       compartida,
       dificultad,
       acumulativa,
       id_puesto
         )
         VALUES (
        '${descripcion_tarea}',
        '${codigo_trazabilidad}',
        '${id_tipo_tarea}',
        '${cuantificable}',
        '${'SI'}',
        '${fecha_alta}',
        '${indicador}',
        '${entrada}',
        '${compartida}',
        '${dificultad}',
        '${acumulativa}',
        '${id_puesto}'
      )`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result)
        res.status(201).json({
          message: 'Tarea específica creada',
        })
    }
  )
})

module.exports = registerSpecificTask
