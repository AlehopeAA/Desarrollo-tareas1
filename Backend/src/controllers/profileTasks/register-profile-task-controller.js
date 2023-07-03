'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create profile task
// @route   POST /api/tareasperfil
// @access  Private/Admin
const registerProfileTask = asyncHandler(async (req, res) => {
  const { id_tarea, id_perfil } = req.body

  db.query(`INSERT INTO tareas_perfil (id_tarea , id_perfil) VALUES ('${id_tarea}', '${id_perfil}')`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(201).json({
      message: 'Tarea perfil Creada',
    })
  })
})

module.exports = registerProfileTask
