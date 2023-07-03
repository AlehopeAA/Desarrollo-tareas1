'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get profile by id
// @route   GET /api/perfiles/:id
// @access  Private/Admin
const getProfileById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM perfiles WHERE id_perfil = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No existe perfil con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getProfileById
