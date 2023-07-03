'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete service profile
// @route   DELETE /api/perfilservicios/:id
// @access  Private/Admin
const deleteServiceProfile = asyncHandler(async (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM perfil_servicio WHERE id_servicio = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un perfil de servicio cone se id' })
    } else {
      db.query('DELETE FROM perfil_servicio WHERE id_servicio = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        res.status(200).json({ message: 'Perfil de servicio borrado correctamente' })
      })
    }
  })
})

module.exports = deleteServiceProfile
