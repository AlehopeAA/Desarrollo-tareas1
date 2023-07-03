'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    delete all managers Dificulty
// @route   DELETE /dificultades/lista-tarea/:id
// @access  Private/Admin

const deleteDificulty = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deleteDificultyQuery = `
  DELETE FROM dificultades
  WHERE dificultades.id_dificultad = ${id}
  `

  db.query(deleteDificultyQuery, (err) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json({ message: 'Dificultad eliminada correctamente' })
  })
})

module.exports = deleteDificulty
