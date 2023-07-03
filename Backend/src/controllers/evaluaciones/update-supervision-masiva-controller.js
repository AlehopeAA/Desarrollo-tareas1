'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Update validation
// @route   put /api/evaluaciones/supervisionmasiva/:id
// @access  Private/Admin
const supervisionMasiva = asyncHandler(async (req, res) => {
  const id = req.params.id
  
  const existEvaluacionQuery = `
    SELECT * 
    FROM evaluaciones 
    WHERE id_evaluacion = ?
  `
  db.query(existEvaluacionQuery, id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe la evaluación con ese id' })
    } else {
      db.query(`UPDATE detalle_evaluaciones SET supervision='SI' WHERE id_evaluacion = '${id}' 
      AND IFNULL(nivel_unidades,'N/A') <> 'INSATISFACTORIO' AND IFNULL(nivel_unidades_corregido,'N/A') <> 'INSATISFACTORIO'
      AND IFNULL(nivel_tiempo,'N/A')  <> 'INSATISFACTORIO' AND IFNULL(nivel_tiempo_corregido,'N/A') <> 'INSATISFACTORIO'
      AND IFNULL(nivel_porcentaje_entrada,'N/A') <> 'INSATISFACTORIO' AND IFNULL(nivel_porcentaje_entrada_corregido,'N/A') <> 'INSATISFACTORIO'
      AND IFNULL(nivel_porcentaje_jornada,'N/A') <> 'INSATISFACTORIO' AND IFNULL(nivel_porcentaje_jornada_corregido,'N/A') <> 'INSATISFACTORIO'`, (err, result) => {
        if (err) {
          return res.status(400).json({ message: err.sqlMessage })
        }
        res.status(200).json({ message: 'Supervisión actualizada correctamente' })
      })
    }
  })
})

module.exports = supervisionMasiva
