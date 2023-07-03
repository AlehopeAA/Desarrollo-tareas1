'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create position permission
// @route   POST /api/permisospuesto
// @access  Private/Admin
const registerPositionPermission = asyncHandler(async (req, res) => {
  const { id_permiso, id_puesto } = req.body
  db.query(
    `INSERT INTO permisos_puesto (id_permiso, id_puesto) VALUES ('${id_permiso}','${id_puesto}')`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result)
        res.status(201).json({
          message: 'Permiso puesto creado creado',
        })
    }
  )
})

module.exports = registerPositionPermission
