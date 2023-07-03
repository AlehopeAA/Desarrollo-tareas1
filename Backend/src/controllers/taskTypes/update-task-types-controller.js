'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Update task-types
// @route   put /api/tipostareas/:id
// @access  Private/Admin
const updateTaskTypes = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { tipo_tarea } = req.body

  db.query('SELECT * FROM tipos_tarea WHERE id_tipo_tarea = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un tipo de tarea cone se id' })
    } else {
      db.query(`UPDATE tipos_tarea SET tipo_tarea = ? WHERE id_tipo_tarea = '${id}'`, [tipo_tarea], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result)
          res.status(201).json({
            message: 'Tipo de tarea editado correctamente',
          })
      })
    }
  })
})

module.exports = updateTaskTypes
