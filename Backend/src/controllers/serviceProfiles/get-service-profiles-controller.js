'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all service profiles
// @route   GET /api/perfilservicios
// @access  Private/Admin
const getServiceProfiles = asyncHandler(async (req, res) => {
  const profileServiceQuery = `
    SELECT *  
    FROM perfil_servicio
    ORDER BY descripcion_servicio
  `

  db.query(profileServiceQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getServiceProfiles
