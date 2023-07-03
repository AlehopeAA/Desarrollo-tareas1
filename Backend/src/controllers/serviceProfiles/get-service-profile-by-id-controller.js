'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get service profile by id
// @route   GET /api/perfilservicios/:id
// @access  Private/Admin
const getServiceProfileById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM perfil_servicio WHERE id_servicio = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No existe perfil servicio con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getServiceProfileById
