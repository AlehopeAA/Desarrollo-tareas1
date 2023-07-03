'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete task
// @route   DELETE /api/tareas/:id
// @access  Private/Admin
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM tareas WHERE id_tarea = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe una tarea con ese id' })
    } else {
      db.query('DELETE FROM tareas WHERE id_tarea = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) res.status(200).json({ message: 'Tarea borrada correctamente' })
      })
    }
  })
})

module.exports = deleteTask
