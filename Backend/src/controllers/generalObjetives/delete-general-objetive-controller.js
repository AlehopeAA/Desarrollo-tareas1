'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete absences task
// @route   DELETE /api/objetivosausencias/:id
// @access  Private/Admin
const deleteGeneralObjetive = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM objetivos WHERE id_objetivo = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un objetivo ausencia con ese id' })
    } else {
      db.query('DELETE FROM objetivos WHERE id_objetivo = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) {
          res.status(200).json({
            message: 'Objetivo ausencia borrado correctamente',
          })
        }
      })
    }
  })
})

module.exports = deleteGeneralObjetive
