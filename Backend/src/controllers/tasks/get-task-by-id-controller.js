'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get task by id
// @route   GET /api/tareas/:id
// @access  Private/Admin
const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM tareas WHERE id_tarea = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (result) {
      res.status(200).json(result)
    }
  })
})

module.exports = getTaskById
