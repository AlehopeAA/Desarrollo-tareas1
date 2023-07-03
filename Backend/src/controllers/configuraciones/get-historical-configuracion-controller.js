'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get data of historical job positions
// @route   GET /api/puestotrabajo/historicos
// @access  Private/Admin
const getHistoricalConfiguracion = asyncHandler(async (req, res) => {
  const { id } = req.params

  const configuracionQuery = `
    SELECT historico_configuraciones.*, puestos_trabajo.nombre as nombreModificador, puestos_trabajo.apellido1 as apellido1Modificador, puestos_trabajo.apellido2 as apellido2Modificador
    FROM historico_configuraciones 
    LEFT JOIN puestos_trabajo ON historico_configuraciones.id_puesto = puestos_trabajo.id_puesto
    WHERE historico_configuraciones.id_configuracion = ${id}     
    ORDER BY historico_configuraciones.fecha_modificacion desc
  `

  db.query(configuracionQuery, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    
    res.status(200).json(result)
  })
})

module.exports = getHistoricalConfiguracion
