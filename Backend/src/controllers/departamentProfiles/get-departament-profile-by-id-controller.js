'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get  departament profile by id
// @route   GET /api/perfildepartamentos/:id
// @access  Private/Admin
const getDepartamentProfileById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM perfil_departamento WHERE id_departamento = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No existe un perfil departamento con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getDepartamentProfileById
