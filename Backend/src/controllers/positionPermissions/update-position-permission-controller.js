'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Update position permission
// @route   PUT /api/permisospuesto/:id
// @access  Private/Admin
const updatePositionPermission = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { id_permiso, id_puesto } = req.body

  db.query('SELECT * FROM permisos_puesto WHERE id_permiso_puesto = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un permisos puesto con ese id' })
    } else {
      db.query(
        `UPDATE permisos_puesto SET id_permiso = ? , id_puesto = ? WHERE id_permiso_puesto = '${id}'`,
        [id_permiso, id_puesto],
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }
          if (result)
            res.status(201).json({
              message: 'Permiso puesto editado correctamente',
            })
        }
      )
    }
  })
})

module.exports = updatePositionPermission
