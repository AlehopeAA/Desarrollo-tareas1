'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete subdirectorate profile
// @route   DELETE /api/perfilsubdirecciones/:id
// @access  Private/Admin
const deleteSubdirectorateProfile = asyncHandler(async (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM perfil_subdireccion WHERE id_subdireccion = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un tipo de tarea cone se id' })
    } else {
      db.query('DELETE FROM perfil_subdireccion WHERE id_subdireccion = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) res.status(200).json({ message: 'Tipo de tarea borrada correctamente' })
      })
    }
  })
})

module.exports = deleteSubdirectorateProfile
