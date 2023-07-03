'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get  position permission by id
// @route   GET /api/permisospuesto/:id
// @access  Private/Admin
const getPositionPermissionById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM permisos_puesto WHERE id_permiso_puesto = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No existe un permiso asociado con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getPositionPermissionById
