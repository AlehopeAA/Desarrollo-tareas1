'use strict'

const asyncHandler = require('express-async-handler')
const { NULL } = require('mysql/lib/protocol/constants/types')
const db = require('../../config/mysql/db')

// @desc    Update subdirectorate profile
// @route   put /api/perfilsubdirecciones/:id
// @access  Private/Admin
const updateSubdirectorateProfile = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { codigo_subdireccion, descripcion_subdireccion, activo, fecha_baja } = req.body

  const variableValues = [
    { active: activo },
    { subdirectorateCode: codigo_subdireccion },
    { subdirectorateDescription: descripcion_subdireccion },
    { fecha_baja },
  ]

  const keysQuery = []
  const valuesQuery = []

  variableValues.map((data) => {
    if (data.active) {
      keysQuery.push('activo = ?')
      valuesQuery.push(`${data.active}`)
      if (data.active === 'NO') {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(`${fecha_baja}`)
      } else {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(`${NULL}`)
      }
    }
    if (data.subdirectorateDescription) {
      keysQuery.push('descripcion_subdireccion = ?')
      valuesQuery.push(`${data.subdirectorateDescription}`)
    }
    if (data.subdirectorateCode) {
      keysQuery.push('codigo_subdireccion = ?')
      valuesQuery.push(`${data.subdirectorateCode}`)
    }
  })

  db.query('SELECT * FROM perfil_subdireccion WHERE id_subdireccion = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe una perfil unidad con ese id' })
    } else {
      db.query(
        `UPDATE perfil_subdireccion SET ${keysQuery.toString()} WHERE id_subdireccion = '${id}'`,
        valuesQuery,
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }
          res.status(201).json({
            message: 'Perfil unidad editado correctamente',
          })
        }
      )
    }
  })
})

module.exports = updateSubdirectorateProfile
