'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create absences task
// @route   POST /api/tareasausencias
// @access  Private/Admin
const registerAbsencesTask = asyncHandler(async (req, res) => {
  const {
    descripcion_tarea,
    id_tipo_tarea,
    fecha_alta,
    codigo_trazabilidad,
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
    WHERE (tipos_tarea.tipo_tarea = 'AUSENCIA' 
    AND tareas.descripcion_tarea = '${descripcion_tarea}')
  `

  db.query(existDescriptionQuery, (err, resultExistDescription) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }

    if (resultExistDescription.length) {
      return res.status(400).json({ message: 'Ya existe una tarea Ausencia con esa descripción' })
    }

    const insertAbsencesTaskQuery = `
    INSERT INTO tareas (
      descripcion_tarea,
      id_tipo_tarea,
      cuantificable,
      activo,
      codigo_trazabilidad,
      fecha_alta,
      indicador,
      entrada, 
      compartida, 
      dificultad,
      acumulativa
    ) 
      VALUES (
        '${descripcion_tarea}',
        '${id_tipo_tarea}',
        '${cuantificable}',
        '${active}',
        '${codigo_trazabilidad}',
        '${fecha_alta}',
        '${indicador}',
        '${entrada}',
        '${compartida}',
        '${dificultad}',
        '${acumulativa}' 
      )`
    db.query(insertAbsencesTaskQuery, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result)
        res.status(201).json({
          message: 'Tarea Ausencia creada',
        })
    })
  })
})

module.exports = registerAbsencesTask
