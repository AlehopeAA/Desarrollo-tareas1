'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get data of historical job positions
// @route   GET /api/puestotrabajo/historicos
// @access  Private/Admin
const getHistoricalJobPosition = asyncHandler(async (req, res) => {
  const { id } = req.params
  const tasksWithoutRepeating = []

  const jobPositionQuery = `
    SELECT historico_puestos.*, puestos_trabajo.nombre as nombreModificador, puestos_trabajo.apellido1 as apellido1Modificador, puestos_trabajo.apellido2 as apellido2Modificador
    FROM historico_puestos 
    LEFT JOIN puestos_trabajo ON historico_puestos.id_puesto_modificador = puestos_trabajo.id_puesto
    WHERE historico_puestos.id_puesto = ${id}     
    ORDER BY historico_puestos.fecha_modificacion desc
  `

  db.query(jobPositionQuery, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    
    res.status(200).json(result)
  })
})

module.exports = getHistoricalJobPosition
