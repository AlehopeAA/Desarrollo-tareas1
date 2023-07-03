'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Update profile task
// @route   put /api/tareasperfil/:id
// @access  Private/Admin
const updateProfileTask = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { id_tarea, id_perfil } = req.body

  db.query('SELECT * FROM tareas_perfil WHERE id_tarea_perfil = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe tarea con ese id' })
    } else {
      db.query(
        `UPDATE tareas_perfil SET id_tarea = ? , id_perfil = ?  WHERE id_tarea_perfil = '${id}'`,
        [id_tarea, id_perfil],
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }
          res.status(201).json({
            message: 'Tarea editada correctamente',
          })
        }
      )
    }
  })
})

module.exports = updateProfileTask
