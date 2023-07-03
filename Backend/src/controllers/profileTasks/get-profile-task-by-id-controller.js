'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get profile task by id
// @route   GET /api/tareasperfil/:id
// @access  Private/Admin
const getProfileTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM tareas_perfil WHERE id_tarea_perfil = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No existe tarea con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getProfileTaskById
