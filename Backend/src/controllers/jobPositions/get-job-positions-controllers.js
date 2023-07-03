'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all job positions
// @route   GET /api/puestostrabajo
// @access  Private/Admin
const getJobPositions = asyncHandler(async (req, res) => {
  db.query(`SELECT * FROM puestos_trabajo ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getJobPositions
