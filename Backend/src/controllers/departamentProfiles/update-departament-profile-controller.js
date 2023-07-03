'use strict'

const asyncHandler = require('express-async-handler')
const { NULL } = require('mysql/lib/protocol/constants/types')
const db = require('../../config/mysql/db')

// @desc    Update  departament profile
// @route   PUT /api/perfildepartamentos/:id
// @access  Private/Admin
const updateDepartamentProfile = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { codigo_departamento, descripcion_departamento, activo, fecha_baja } = req.body

  const variableValues = [
    { active: activo },
    { departamentCode: codigo_departamento },
    { departamentDescription: descripcion_departamento },
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
    if (data.departamentDescription) {
      keysQuery.push('descripcion_departamento = ?')
      valuesQuery.push(`${data.departamentDescription}`)
    }
    if (data.departamentCode) {
      keysQuery.push('codigo_departamento = ?')
      valuesQuery.push(`${data.departamentCode}`)
    }
  })

  db.query('SELECT * FROM perfil_departamento WHERE id_departamento = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err })
    } else if (!results.length) {
      res.status(400).json({ message: 'No existe un Perfil departamento con ese id' })
    } else {
      db.query(
        `UPDATE perfil_departamento SET ${keysQuery.toString()} WHERE id_departamento = '${id}'`,
        valuesQuery,
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          } else if (result) {
            res.status(201).json({
              message: 'Perfil departamento editado correctamente',
            })
          }
        }
      )
    }
  })
})

module.exports = updateDepartamentProfile
