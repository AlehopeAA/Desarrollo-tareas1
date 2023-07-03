'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    delete all managers Difficulty
// @route   DELETE /dificultades/gestores-dificultades/:id
// @access  Private/Admin

const deleteDifficulty = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deleteDifficultyQuery = `
  DELETE FROM gestor_dificultad
  WHERE gestor_dificultad.id_gestor_dificultad = ${id}
  `

  db.query(deleteDifficultyQuery, (err) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json({ message: 'dificultad eliminada correctamente' })
  })
})

module.exports = deleteDifficulty
