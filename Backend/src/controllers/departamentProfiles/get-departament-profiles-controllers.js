'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all  departaments profile
// @route   GET /api/perfildepartamentos
// @access  Private/Admin
const getDepartamentProfiles = asyncHandler(async (req, res) => {
  const departamentsProfileQuery = `
      SELECT *
      FROM perfil_departamento
      ORDER BY descripcion_departamento
    `
  db.query(departamentsProfileQuery, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getDepartamentProfiles
