'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete profile task
// @route   DELETE /api/tareasperfil/:id
// @access  Private/Admin
const deleteProfiletask = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM tareas_perfil WHERE id_tarea_perfil = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un perfil con ese id' })
    } else {
      db.query('DELETE FROM tareas_perfil WHERE id_tarea_perfil = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) res.status(200).json({ message: 'Perfil borrado correctamente' })
      })
    }
  })
})

module.exports = deleteProfiletask
