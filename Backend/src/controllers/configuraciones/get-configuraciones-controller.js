'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all configuraciones
// @route   GET /api/configuraciones
// @access  Private/Admin
const getConfiguracions = asyncHandler(async (req, res) => {
  const configuracionQuery = `
    SELECT * FROM  configuraciones
    ORDER BY parametro
  `
  db.query(configuracionQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getConfiguracions
