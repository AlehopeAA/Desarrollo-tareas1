'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    post register dificulty
// @route   POST /api/entradas/lista-tarea/:id
// @access  Private
const registerDificulty = asyncHandler(async (req, res) => {
  const { id_tarea, codigo_trazabilidad, dificultad } = req.body

  const existTrazabilidadDificultadQuery = `
    SELECT * 
    FROM dificultades
    WHERE dificultades.id_tarea = ${id_tarea}
    AND dificultades.codigo_trazabilidad = '${codigo_trazabilidad}'
    AND dificultades.dificultad = '${dificultad}'
  `

  db.query(existTrazabilidadDificultadQuery, (err, resultExist) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }

    if (resultExist.length) {
      return res.status(400).json({ message: 'Esa tarea ya tiene una dificultad con ese código de trazabilidad y dificultad' })
    }

    const insertDificultadQuery = `
    INSERT INTO dificultades (
      id_tarea,
      codigo_trazabilidad,
      dificultad
    ) VALUES (
       ${id_tarea},
       '${codigo_trazabilidad}',
       '${dificultad}'
     )`
   db.query(insertDificultadQuery, (err, result) => {
     if (err) {
       res.status(400).json({ message: err.sqlMessage })
     }
     if (result)
       res.status(201).json({
         message: 'Dificultad creada',
       })
   })
 })
})

module.exports = registerDificulty
