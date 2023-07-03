'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete task types
// @route   DELETE /api/tipostareas/:id
// @access  Private/Admin
const deleteTaskTypes = asyncHandler(async (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM tipos_tarea WHERE id_tipo_tarea = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    } else {
      db.query('DELETE FROM tipos_tarea WHERE id_tipo_tarea = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) res.status(200).json({ message: 'Tipo de tarea borrada correctamente' })
      })
    }
  })
})

module.exports = deleteTaskTypes
