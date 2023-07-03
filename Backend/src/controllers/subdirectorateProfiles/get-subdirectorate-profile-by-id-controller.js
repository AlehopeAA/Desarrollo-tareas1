'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get subdirectorate profile by id
// @route   GET /api/perfilsubdirecciones/:id
// @access  Private/Admin
const getSubdirectorateProfileById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM perfil_subdireccion WHERE id_subdireccion = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No perfil  subdireccion con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getSubdirectorateProfileById
