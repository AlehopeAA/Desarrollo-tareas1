'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get  job profile by id
// @route   GET /api/perfilespuesto/:id
// @access  Private/Admin
const getJobProfileById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM perfiles_puesto WHERE id_perfil_puesto = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No existe un perfil con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getJobProfileById
