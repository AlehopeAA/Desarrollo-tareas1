'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all subdirectorates profiles
// @route   GET /api/perfilsubdirecciones
// @access  Private/Admin
const getSubdirectorateProfiles = asyncHandler(async (req, res) => {
  const subdirectorateProfileQuery = `
    SELECT *
    FROM perfil_subdireccion 
    ORDER BY descripcion_subdireccion
  `
  db.query(subdirectorateProfileQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }

    res.status(200).json(result)
  })
})

module.exports = getSubdirectorateProfiles
