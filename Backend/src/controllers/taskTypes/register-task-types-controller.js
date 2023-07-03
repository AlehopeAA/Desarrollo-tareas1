'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create task types
// @route   POST /api/tipostareas
// @access  Private/Admin
const registerTaskTypes = asyncHandler(async (req, res) => {
  const { tipo_tarea } = req.body

  db.query(`INSERT INTO tipos_tarea (tipo_tarea) VALUES ('${tipo_tarea}')`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (result)
      res.status(201).json({
        message: 'Tipo de tarea Creado',
      })
  })
})

module.exports = registerTaskTypes
