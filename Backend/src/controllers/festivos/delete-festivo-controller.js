'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete festivo
// @route   DELETE /api/festivos/:id
// @access  Private/Admin
const deleteFestivo = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM calendario_festivos WHERE id_calendario = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un festivo con ese id' })
    } else {
      db.query('DELETE FROM calendario_festivos WHERE id_calendario = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) res.status(200).json({ message: 'Festivo borrado correctamente' })
      })
    }
  })
})

module.exports = deleteFestivo
