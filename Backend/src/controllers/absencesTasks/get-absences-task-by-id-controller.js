'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Get absense task by id
// @route   GET /api/tareasausencias/:id
// @access  Private/Admin
const getAbsencesTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM tareas WHERE id_tarea = ? ', id, (err, result) => {
    if (err) throw new Error(`Error: ${err}`)
    if (!result.length) {
      res.status(400).json({ message: 'No existe una tarea ausencia con el id recibido' })
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = getAbsencesTaskById
