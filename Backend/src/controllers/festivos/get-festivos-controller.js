'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all festivos
// @route   GET /api/festivos
// @access  Private/Admin
const getFestivos = asyncHandler(async (req, res) => {
  const festivoQuery = `
    SELECT * FROM  calendario_festivos
    ORDER BY anio
  `
  db.query(festivoQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getFestivos
