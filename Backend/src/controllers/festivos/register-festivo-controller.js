'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Create festivo
// @route   POST /api/festivos
// @access  Private/Admin
const registerFestivo = asyncHandler(async (req, res) => {
  const { dia, mes, anio } = req.body

  const isUniqueFestivoQuery = `
    SELECT * FROM calendario_festivos WHERE calendario_festivos.dia = ${dia} AND  calendario_festivos.mes = ${mes} AND calendario_festivos.anio = ${anio}
  `

  const isUniqueFestivo = await getAllRecords(isUniqueFestivoQuery)

  if (isUniqueFestivo.length > 0) {
    return res.status(400).json({ message: 'Ya existe un festivo de ese día' })
  }

  db.query(
    `INSERT INTO calendario_festivos (dia, mes, anio) VALUES (${dia}, ${mes}, ${anio})`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result) {
        res.status(201).json({
          message: 'Festivo Creado',
        })
      }
    }
  )
})
module.exports = registerFestivo
