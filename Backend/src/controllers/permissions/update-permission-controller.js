'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Update permission
// @route   PUT /api/permisos/:id
// @access  Private/Admin
const updatePermission = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { permiso } = req.body

  db.query('SELECT * FROM permisos WHERE id_permiso = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un permiso  con ese id' })
    } else {
      db.query(`UPDATE permisos SET permiso = ? WHERE id_permiso = '${id}'`, [permiso], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) {
          res.status(201).json({
            message: 'permiso  editado correctamente',
          })
        }
      })
    }
  })
})

module.exports = updatePermission
