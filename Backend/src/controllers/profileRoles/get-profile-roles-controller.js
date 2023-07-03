'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all profile roles
// @route   GET /api/perfilroles
// @access  Private/Admin
const getProfileRoles = asyncHandler(async (req, res) => {
  const roleProfileQuery = `
    SELECT * 
    FROM perfil_rol
    ORDER BY descripcion_rol
  `
  db.query(roleProfileQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getProfileRoles
