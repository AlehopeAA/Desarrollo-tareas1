'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete shared
// @route   DELETE /api/compartidas/:id
// @access  Private/Admin
const deleteShared = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM compartidas WHERE id_compartida = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un porcentaje compartido con ese id' })
    } else {
      db.query('DELETE FROM compartidas WHERE id_compartida = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        res.status(200).json({ message: 'Porcentaje compartido borrado correctamente' })
      })
    }
  })
})

module.exports = deleteShared
