'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Update job profile
// @route   PUT /api/perfilespuesto/:id
// @access  Private/Admin
const updateJobProfile = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { id_perfil, id_puesto } = req.body

  db.query('SELECT * FROM perfiles_puesto WHERE id_perfil_puesto = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un perfil con ese id' })
    } else {
      db.query(
        `UPDATE perfiles_puesto SET id_perfil = ? , id_puesto=? WHERE id_perfil_puesto = '${id}'`,
        [id_perfil, id_puesto],
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }
          if (result) {
            res.status(201).json({
              message: 'Perfil  editado correctamente',
            })
          }
        }
      )
    }
  })
})

module.exports = updateJobProfile
