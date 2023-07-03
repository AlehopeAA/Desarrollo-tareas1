'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete position permission
// @route   DELETE /api/permisospuesto/:id
// @access  Private/Admin
const deletePositionPermission = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM permisos_puesto WHERE id_permiso_puesto = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un permiso puesto con ese id' })
    } else {
      db.query('DELETE FROM permisos_puesto WHERE id_permiso_puesto = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) res.status(200).json({ message: 'Permiso puesto borrado correctamente' })
      })
    }
  })
})

module.exports = deletePositionPermission
