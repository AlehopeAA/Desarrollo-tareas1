'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Finalizar supervision
// @route   put /api/evaluaciones/finalizarsupervision/:id
// @access  Private/Admin
const finalizarSupervision = asyncHandler(async (req, res) => {
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
      db.query(`UPDATE evaluaciones SET supervisada='SI' WHERE id_evaluacion = '${id}'`, (err, result) => {
        if (err) {
          return res.status(400).json({ message: err.sqlMessage })
        }
        res.status(200).json({ message: 'Supervisión finalizada correctamente' })
      })
    }
  })
})

module.exports = finalizarSupervision
