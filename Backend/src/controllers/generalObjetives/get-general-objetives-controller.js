'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all general task
// @route   GET /api/objetivosgenerales
// @access  Private/Admin
const getGeneralObjetives = asyncHandler(async (req, res) => {
  const objetivesQuery = `
    SELECT objetivos.*, tareas.descripcion_tarea, tareas.dificultad as tardif
    FROM objetivos
    INNER JOIN tareas ON objetivos.id_tarea = tareas.id_tarea 
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
    WHERE tipos_tarea.tipo_tarea = "GENERAL" 
  `

  db.query(objetivesQuery, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getGeneralObjetives
