'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all task types
// @route   GET /api/tipostareas
// @access  Private/Admin
const getTaskTypes = asyncHandler(async (req, res) => {
  db.query(`SELECT * FROM tipos_tarea`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getTaskTypes
