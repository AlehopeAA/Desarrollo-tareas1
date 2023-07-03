'use strict'

const asyncHandler = require('express-async-handler')
const { NULL } = require('mysql/lib/protocol/constants/types')
const db = require('../../config/mysql/db')

// @desc    Update unit profile
// @route   put /api/perfilservicios/:id
// @access  Private/Admin
const updateServiceProfile = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { codigo_servicio, descripcion_servicio, activo, fecha_baja } = req.body

  const variableValues = [
    { active: activo },
    { serviceCode: codigo_servicio },
    { serviceDescription: descripcion_servicio },
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
    if (data.serviceDescription) {
      keysQuery.push('descripcion_servicio = ?')
      valuesQuery.push(`${data.serviceDescription}`)
    }
    if (data.serviceCode) {
      keysQuery.push('codigo_servicio = ?')
      valuesQuery.push(`${data.serviceCode}`)
    }
  })

  db.query('SELECT * FROM perfil_servicio WHERE id_servicio = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe perfil servicio con ese id' })
    } else {
      db.query(
        `UPDATE perfil_servicio SET ${keysQuery.toString()} WHERE id_servicio = '${id}'`,
        valuesQuery,
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }
          if (result)
            res.status(201).json({
              message: 'Perfil servicio editado correctamente',
            })
        }
      )
    }
  })
})

module.exports = updateServiceProfile
