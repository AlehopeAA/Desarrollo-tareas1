'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create general task
// @route   POST /api/tareasgenerales
// @access  Private/Admin
const registerGeneralTask = asyncHandler(async (req, res) => {
  const {
    descripcion_tarea,
    id_tipo_tarea,
    codigo_trazabilidad,
    fecha_alta,
    cuantificable,
    indicador,
    entrada,
    compartida,
    dificultad,
    acumulativa,
  } = req.body

  const active = 'SI'

  const existDescriptionQuery = `
    SELECT * 
    FROM tareas 
    INNER JOIN tipos_tarea 
    ON tareas.id_tipo_tarea =  tipos_tarea.id_tipo_tarea 
    WHERE (tipos_tarea.tipo_tarea = 'GENERAL' 
    AND tareas.descripcion_tarea = '${descripcion_tarea}')
  `

  db.query(existDescriptionQuery, (err, resultExistDescription) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }

    if (resultExistDescription.length) {
      return res.status(400).json({ message: 'Ya existe una tarea General con esa descripción' })
    }

    const insertGeneralTaskQuery = `
     INSERT INTO tareas (
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
       acumulativa) VALUES (
        '${descripcion_tarea}',
        '${codigo_trazabilidad}',
        '${id_tipo_tarea}',
        '${cuantificable}',
        '${active}',
        '${fecha_alta}',
        '${indicador}',
        '${entrada}',
        '${compartida}',
        '${dificultad}',
        '${acumulativa}' 
      )`
    db.query(insertGeneralTaskQuery, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result)
        res.status(201).json({
          message: 'Tarea general creada',
        })
    })
  })
})

module.exports = registerGeneralTask
