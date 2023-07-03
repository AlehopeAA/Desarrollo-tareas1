'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete configuracion
// @route   DELETE /api/configuraciones/:id
// @access  Private/Admin
const deleteConfiguracion = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM configuraciones WHERE id_configuracion = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe una configuración con ese id' })
    } else {
      db.query('DELETE FROM configuraciones WHERE id_configuracion = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) res.status(200).json({ message: 'Configuración borrada correctamente' })
      })
    }
  })
})

module.exports = deleteConfiguracion
