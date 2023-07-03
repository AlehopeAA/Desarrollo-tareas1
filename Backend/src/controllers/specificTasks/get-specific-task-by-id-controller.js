'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get specific task by id
// @route   GET /api/tareasespecificas/:id
// @access  Private/Admin
const getSpecificTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM tareas WHERE id_tarea = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No existe una tarea especifica con ese id' })
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = getSpecificTaskById
