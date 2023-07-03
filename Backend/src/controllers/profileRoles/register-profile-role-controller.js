'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Create profile role
// @route   POST /api/perfilroles
// @access  Private/Admin
const registerProfileRole = asyncHandler(async (req, res) => {
  const { codigo_rol, descripcion_rol } = req.body

  const isUniqueRoleCodeQuery = `
    SELECT * FROM perfil_rol WHERE perfil_rol.codigo_rol = '${codigo_rol}'
  `

  const isUniqueRoleCode = await getAllRecords(isUniqueRoleCodeQuery)

  if (isUniqueRoleCode.length > 0) {
    return res.status(400).json({ message: 'Ya existe un rol con ese codigo' })
  }

  db.query(
    `INSERT INTO perfil_rol (codigo_rol, descripcion_rol) VALUES ('${codigo_rol}','${descripcion_rol}')`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result) {
        res.status(201).json({
          message: 'Perfil rol creado',
        })
      }
    }
  )
})

module.exports = registerProfileRole
