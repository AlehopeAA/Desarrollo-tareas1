'use strict'

const asyncHandler = require('express-async-handler')
const { NULL } = require('mysql/lib/protocol/constants/types')
const db = require('../../config/mysql/db')

// @desc    Update profile role
// @route   PUT /api/perfilroles/:id
// @access  Private/Admin
const updateRoleProfile = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { codigo_rol, descripcion_rol, activo, fecha_baja } = req.body

  const variableValues = [
    { active: activo },
    { roleCode: codigo_rol },
    { roleDescription: descripcion_rol },
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
    if (data.roleDescription) {
      keysQuery.push('descripcion_rol = ?')
      valuesQuery.push(`${data.roleDescription}`)
    }
    if (data.roleCode) {
      keysQuery.push('codigo_rol = ?')
      valuesQuery.push(`${data.roleCode}`)
    }
  })

  db.query('SELECT * FROM perfil_rol WHERE id_rol = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un Perfil rol con ese id' })
    } else {
      db.query(`UPDATE perfil_rol SET ${keysQuery.toString()} WHERE id_rol = '${id}'`, valuesQuery, (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        res.status(201).json({
          message: 'Perfil rol editado correctamente',
        })
      })
    }
  })
})

module.exports = updateRoleProfile
