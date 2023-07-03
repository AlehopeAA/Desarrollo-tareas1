'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all job profiles
// @route   GET /api/perfilespuesto
// @access  Private/Admin
const getJobProfile = asyncHandler(async (req, res) => {
  db.query(`SELECT * FROM perfiles_puesto`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getJobProfile
