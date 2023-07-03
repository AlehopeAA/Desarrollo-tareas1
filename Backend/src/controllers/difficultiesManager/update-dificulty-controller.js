'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Update dificulty
// @route   PUT /api/dificultades/lista-tarea/:id
// @access  Private/Admin
const updateDificulty = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { id_tarea, codigo_trazabilidad, dificultad } = req.body

  const existTrazabilidadDificultadQuery = `
    SELECT * 
    FROM dificultades
    WHERE dificultades.id_tarea = ${id_tarea}
    AND dificultades.codigo_trazabilidad = '${codigo_trazabilidad}'
    AND dificultades.dificultad = '${dificultad}'
  `

  db.query('SELECT * FROM dificultades WHERE dificultades.id_dificultad = ? ', id, (err, results) => {
    if (err) {
      return res.status(400).json({ message: err })
    } else if (!results.length) {
      return res.status(400).json({ message: 'No existe una dificultad con ese id' })
    } else {      
      db.query(existTrazabilidadDificultadQuery, (err, resultExist) => {
      if (err) {
        return res.status(400).json({ message: err.sqlMessage })
      }

      if (resultExist.length) {
        return res.status(400).json({ message: 'Esa tarea ya tiene una dificultad con ese código de trazabilidad y dificultad' })
      }

      db.query(
        `UPDATE dificultades SET codigo_trazabilidad = '${codigo_trazabilidad}', 
        dificultad = '${dificultad}'
         WHERE id_dificultad = ${id}`,
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          } else if (result) {
            res.status(201).json({
              message: 'Dificultad editada correctamente',
            })
          }
        }
      )
      })
    }
  })
})

module.exports = updateDificulty
