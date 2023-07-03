'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Update validation
// @route   put /api/evaluaciones/supervision/:id
// @access  Private/Admin
const updateEvaluacionSupervision = asyncHandler(async (req, res) => {
  const id = req.params.id
  const {
    supervision,
  } = req.body


  const keysQuery = ['supervision = ?' ]
  const valuesQuery = [`${supervision}`]

  
  const existCorreccionQuery = `
    SELECT * 
    FROM detalle_evaluaciones 
    WHERE id_detalle_evaluacion = ?
  `
  db.query(existCorreccionQuery, id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe la evaluación con ese id' })
    } else {
      db.query(`UPDATE detalle_evaluaciones SET ${keysQuery.toString()} WHERE id_detalle_evaluacion = '${id}'`, valuesQuery, (err, result) => {
        if (err) {
          return res.status(400).json({ message: err.sqlMessage })
        }
        db.query(`UPDATE actividades SET validada = '${supervision}' 
                  WHERE id_puesto = (SELECT id_puesto_trabajo FROM evaluaciones WHERE id_evaluacion=(SELECT id_evaluacion FROM detalle_evaluaciones where id_detalle_evaluacion='${id}'))
                  AND id_tarea = (SELECT id_tarea FROM detalle_evaluaciones where id_detalle_evaluacion='${id}')
                  AND MONTH(fecha_actividad) = (SELECT mes FROM evaluaciones WHERE id_evaluacion=(SELECT id_evaluacion FROM detalle_evaluaciones where id_detalle_evaluacion='${id}'))
                  AND YEAR(fecha_actividad) = (SELECT anio FROM evaluaciones WHERE id_evaluacion=(SELECT id_evaluacion FROM detalle_evaluaciones where id_detalle_evaluacion='${id}'))`, 
                  (err, result) => {
          if (err) {
            return res.status(400).json({ message: err.sqlMessage })
          }
          res.status(200).json({
            message: 'Supervisión actualizada correctamente',
          })
        })
      })
    }
  })
})

module.exports = updateEvaluacionSupervision
