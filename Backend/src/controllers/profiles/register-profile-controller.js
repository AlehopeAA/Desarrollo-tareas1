'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create Profile
// @route   POST /api/perfiles
// @access  Private/Admin
const registerProfile = asyncHandler(async (req, res) => {
  const { departament, role, service, subdirection, unit, codProfile, description, registerDate } = req.body

  const variableValues = [departament, role, service, subdirection, unit]

  const keysQuery = ['codigo_perfil', 'activo', 'fecha_alta', 'descripcion_perfil']
  const valuesQuery = [`'${codProfile}'`, `'SI'`, `'${registerDate}'`, `'${description}'`]

  for (let i = 0; i < variableValues.length; i++) {
    if (variableValues[i] && variableValues[i].id_departamento) {
      keysQuery.push('id_departamento')
      valuesQuery.push(`'${variableValues[i].id_departamento}'`)
    }
    if (variableValues[i] && variableValues[i].id_subdireccion) {
      keysQuery.push('id_subdireccion')
      valuesQuery.push(`'${variableValues[i].id_subdireccion}'`)
    }
    if (variableValues[i] && variableValues[i].id_servicio) {
      keysQuery.push('id_servicio')
      valuesQuery.push(`'${variableValues[i].id_servicio}'`)
    }
    if (variableValues[i] && variableValues[i].id_rol) {
      keysQuery.push('id_rol')
      valuesQuery.push(`'${variableValues[i].id_rol}'`)
    }
    if (variableValues[i] && variableValues[i].id_unidad) {
      keysQuery.push('id_unidad')
      valuesQuery.push(`'${variableValues[i].id_unidad}'`)
    }
  }

  let query = `
     INSERT INTO perfiles
     (
      ${keysQuery.toString()}
     ) VALUES
     (
      ${valuesQuery.toString()}
    )`

  db.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (result) {
      res.status(201).json({
        message: 'Perfil Creado',
      })
    }
  })
})

module.exports = registerProfile
