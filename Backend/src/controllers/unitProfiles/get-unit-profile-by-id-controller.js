'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get unit profile by id
// @route   GET /api/perfilunidades/:id
// @access  Private/Admin
const getUnitProfileById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM perfil_unidad WHERE id_unidad = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No perfil unidad con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getUnitProfileById
