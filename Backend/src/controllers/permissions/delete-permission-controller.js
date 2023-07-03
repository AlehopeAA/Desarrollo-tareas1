'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete permission
// @route   DELETE /api/permisos/:id
// @access  Private/Admin
const deletePermission = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM permisos WHERE id_permiso = ? ', id, (err, results) => {
    if (err) throw new Error(`Error: ${err}`)
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un permiso con ese id' })
    } else {
      db.query('DELETE FROM permisos WHERE id_permiso = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) {
          res.status(200).json({ message: 'Permiso rol borrado correctamente' })
        }
      })
    }
  })
})

module.exports = deletePermission
