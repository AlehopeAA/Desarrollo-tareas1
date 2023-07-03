'use strict'

const asyncHandler = require('express-async-handler')
const { NULL } = require('mysql/lib/protocol/constants/types')
const db = require('../../config/mysql/db')

// @desc    Update festivo
// @route   put /api/festivos/:id
// @access  Private/Admin
const updateFestivo = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { dia, mes, anio } = req.body

  const variableValues = [
    { dia: dia },
    { mes: mes },
    { anio: anio },
  ]

  const keysQuery = []
  const valuesQuery = []

  variableValues.map((data, i) => {
    if (data.dia) {
      keysQuery.push('dia = ?')
      valuesQuery.push(`${data.dia}`)
    }
    if (data.mes) {
      keysQuery.push('mes = ?')
      valuesQuery.push(`${data.mes}`)
    }
    if (data.anio) {
      keysQuery.push('anio = ?')
      valuesQuery.push(`${data.anio}`)
    }
  })

  db.query('SELECT * FROM calendario_festivos WHERE id_calendario = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (results.length < 1) {
      res.status(404).json({ message: 'No existe un festivo con ese id' })
    } else {
      db.query(
        `UPDATE calendario_festivos SET ${keysQuery.toString()} WHERE id_calendario = '${id}'`,
        valuesQuery,
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }
          if (result) {
            res.status(201).json({
              message: 'Festivo editado correctamente',
            })
          }
        }
      )
    }
  })
})

module.exports = updateFestivo
