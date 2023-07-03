'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create Permission
// @route   POST /api/permisos
// @access  Private/Admin
const registerPermission = asyncHandler(async (req, res) => {
  const { permiso } = req.body

  db.query(`INSERT INTO permisos (permiso ) VALUES ('${permiso}')`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (result) {
      res.status(201).json({
        message: 'Permiso creado',
      })
    }
  })
})

module.exports = registerPermission
