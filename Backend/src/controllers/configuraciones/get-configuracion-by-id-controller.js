'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get configuracion by id
// @route   GET /api/configuraciones/:id
// @access  Private/Admin
const getConfiguracionById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM configuraciones WHERE id_configuracion = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No configuración con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getConfiguracionById
