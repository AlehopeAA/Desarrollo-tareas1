'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all permissions
// @route   GET /api/permisos
// @access  Private/Admin
const getPermissions = asyncHandler(async (req, res) => {
  db.query(`SELECT * FROM permisos ORDER BY id_permiso ASC`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err })
    }
    if (result) {
      res.status(200).json(result)
    }
  })
})

module.exports = getPermissions
