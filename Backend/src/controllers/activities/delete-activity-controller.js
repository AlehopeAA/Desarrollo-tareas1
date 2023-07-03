'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete activity
// @route   DELETE /api/actividades/:id
// @access  Private/Admin
const deleteActivity = asyncHandler(async (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM actividades WHERE id_actividad = ? ', id, (err, results) => {
    if (err) throw new Error(`Error: ${err}`)
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe una actividad con ese id' })
    } else {
      db.query('DELETE FROM codigos_trazabilidad_actividad WHERE id_actividad = ?', [id], (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        else
        {
          db.query('DELETE FROM actividades WHERE id_actividad = ?', [id], (err, result) => {
            if (err) {
              res.status(400).json({ message: err.sqlMessage })
            }        
            if (result) {
              res.status(200).json({
                message: 'Actividad borrada correctamente',
              })
            }
          })
        }
      })
    }
  })
})

module.exports = deleteActivity
