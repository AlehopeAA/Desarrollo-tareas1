'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete profile role
// @route   DELETE /api/perfilroles/:id
// @access  Private/Admin
const deleteProfileRoles = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM perfil_rol WHERE id_rol = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un perfil rol con ese id' })
    } else {
      db.query('DELETE FROM perfil_rol WHERE id_rol = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) res.status(200).json({ message: 'PErfil rol borrado correctamente' })
      })
    }
  })
})

module.exports = deleteProfileRoles
