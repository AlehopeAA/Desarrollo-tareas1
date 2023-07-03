'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete unit profile
// @route   DELETE /api/perfilunidades/:id
// @access  Private/Admin
const deleteUnitProfile = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM perfil_unidad WHERE id_unidad = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un perfil unidad con ese id' })
    } else {
      db.query('DELETE FROM perfil_unidad WHERE id_unidad = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) res.status(200).json({ message: 'Perfil unidad borrada correctamente' })
      })
    }
  })
})

module.exports = deleteUnitProfile
