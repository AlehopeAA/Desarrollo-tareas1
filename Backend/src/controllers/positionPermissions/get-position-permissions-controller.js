'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all position permissions
// @route   GET /api/permisospuesto
// @access  Private/Admin
const getpositionPermissions = asyncHandler(async (req, res) => {
  const permissionsAndUserQuery = `
    SELECT permisos_puesto.*, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
    FROM permisos_puesto 
    INNER JOIN puestos_trabajo ON puestos_trabajo.id_puesto = permisos_puesto.id_puesto
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
  `
  db.query(permissionsAndUserQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getpositionPermissions
