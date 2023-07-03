'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get general task by id
// @route   GET /api/tareasgenerales/:id
// @access  Private/Admin
const getGeneralTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM tareas WHERE id_tarea = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No existe una tarea general con el id recibido' })
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = getGeneralTaskById
