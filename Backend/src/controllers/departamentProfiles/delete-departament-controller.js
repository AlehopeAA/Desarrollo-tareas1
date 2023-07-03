'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete profile departament
// @route   DELETE /api/perfildepartamento/:id
// @access  Private/Admin
const deleteDepartamentProfile = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM perfil_departamento WHERE id_departamento = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un perfil departamento con ese id' })
    } else {
      db.query('DELETE FROM perfil_departamento WHERE id_departamento = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        res.status(200).json({ message: 'Perfil departamento borrado correctamente' })
      })
    }
  })
})

module.exports = deleteDepartamentProfile
