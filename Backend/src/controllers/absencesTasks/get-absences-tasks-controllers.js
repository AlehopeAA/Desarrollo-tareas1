'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Get all absences task
// @route   GET /api/tareasausentes
// @access  Private/Admin
const getAbsencesTasks = asyncHandler(async (req, res) => {
  const query = `
    SELECT * 
    FROM tareas 
    INNER JOIN tipos_tarea 
    ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
    WHERE tipos_tarea.tipo_tarea = "AUSENCIA"
    ORDER BY tareas.descripcion_tarea`

  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }

    res.status(200).json(result)
  })
})

module.exports = getAbsencesTasks
