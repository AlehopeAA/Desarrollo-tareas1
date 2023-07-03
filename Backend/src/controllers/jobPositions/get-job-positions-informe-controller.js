'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all job positions
// @route   GET /api/puestostrabajo/informe
// @access  responsible/validator/manager
const getJobPositionsInforme = asyncHandler(async (req, res) => {

  const { id_puesto } = req.user

  const getTrabajadoresInformeQuery = `
    SELECT puestos_trabajo.* 
    FROM responsables 
    INNER JOIN puestos_trabajo
    ON puestos_trabajo.id_puesto = responsables.id_puesto 
    WHERE responsables.id_puesto_responsable = ${id_puesto}
    AND puestos_trabajo.activo = 'SI'
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2 `

  db.query(getTrabajadoresInformeQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = getJobPositionsInforme
