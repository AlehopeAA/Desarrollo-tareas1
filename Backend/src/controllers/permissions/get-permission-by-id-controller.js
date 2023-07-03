'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get  permission by id
// @route   GET /api/permisos/:id
// @access  Private/Admin
const getPermissionsById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM permisos WHERE id_permiso = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No existe un permiso con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getPermissionsById
