'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete jof profile
// @route   DELETE /api/perfilespuesto/:id
// @access  Private/Admin
const deleteJobProfile = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM perfiles_puesto WHERE id_perfil_puesto = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un perfil con ese id' })
    } else {
      db.query('DELETE FROM perfiles_puesto WHERE id_perfil_puesto = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) {
          res.status(200).json({ message: 'Perfil borrado correctamente' })
        }
      })
    }
  })
})

module.exports = deleteJobProfile
