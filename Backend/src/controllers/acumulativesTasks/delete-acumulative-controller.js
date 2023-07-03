'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete shared
// @route   DELETE /api/acumulatives/:id
// @access  Private/Admin/DataManager
const deleteAcumulatives = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM acumulativas WHERE id_acumulativa = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe una asociación de tareas acumulativas  con ese id' })
    } else {
      db.query('DELETE FROM acumulativas WHERE id_acumulativa = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        res.status(200).json({ message: 'Asociación de tareas acumulativas borrada correctamente' })
      })
    }
  })
})

module.exports = deleteAcumulatives
