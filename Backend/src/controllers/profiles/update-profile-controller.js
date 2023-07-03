'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Update profile
// @route   put /api/perfiles/:id
// @access  Private/Admin
const updateProfile = asyncHandler(async (req, res) => {
  const id = req.params.id
  const {
    id_subdireccion,
    id_servicio,
    id_departamento,
    id_unidad,
    id_rol,
    codigo_perfil,
    descripcion_perfil,
    activo,
    fecha_baja,
  } = req.body

  const variableValues = [
    { active: activo },
    { description: descripcion_perfil },
    { subdirection: id_subdireccion },
    { service: id_servicio },
    { departament: id_departamento },
    { unit: id_unidad },
    { role: id_rol },
    { fecha_baja },
  ]

  const keysQuery = ['codigo_perfil = ?']
  const valuesQuery = [`${codigo_perfil}`]

  variableValues.map((data) => {
    if (data.active) {
      keysQuery.push('activo = ?')
      valuesQuery.push(`${data.active}`)
      if (data.active === 'NO' && fecha_baja) {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(`${fecha_baja}`)
      } else {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(null)
      }
    }
    if (data.departament) {
      keysQuery.push('id_departamento = ?')
      valuesQuery.push(`${data.departament}`)
    }
    if (data.subdirection) {
      keysQuery.push('id_subdireccion = ?')
      valuesQuery.push(`${data.subdirection}`)
    }
    if (data.service) {
      keysQuery.push('id_servicio = ?')
      valuesQuery.push(`${data.service}`)
    }
    if (data.role) {
      keysQuery.push('id_rol = ?')
      valuesQuery.push(`${data.role}`)
    }
    if (data.unit) {
      keysQuery.push('id_unidad = ?')
      valuesQuery.push(`${data.unit}`)
    }
    if (data.description) {
      keysQuery.push('descripcion_perfil = ?')
      valuesQuery.push(`${data.description}`)
    }
  })

  const existProfileQuery = `
    SELECT * 
    FROM perfiles 
    WHERE id_perfil = ?
  `

  db.query(existProfileQuery, id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe perfil servicio con ese id' })
    } else {
      db.query(`UPDATE perfiles SET ${keysQuery.toString()} WHERE id_perfil = '${id}'`, valuesQuery, (err, result) => {
        if (err) {
          return res.status(400).json({ message: err.sqlMessage })
        }
        res.status(201).json({
          message: 'Perfil servicio editado correctamente',
        })
      })
    }
  })
})

module.exports = updateProfile
