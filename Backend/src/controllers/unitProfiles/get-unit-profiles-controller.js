'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all unit roles
// @route   GET /api/perfilunidades
// @access  Private/Admin
const getUnitProfiles = asyncHandler(async (req, res) => {
  const unitProfileQuery = `
    SELECT * FROM  perfil_unidad
    ORDER BY descripcion_unidad
  `
  db.query(unitProfileQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getUnitProfiles
