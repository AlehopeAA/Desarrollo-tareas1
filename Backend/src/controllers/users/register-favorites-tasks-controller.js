'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    Assign favorites tasks
// @route   POST /api/users/tareasfavoritas
// @access  User

const registerFavoritesTasks = asyncHandler(async (req, res) => {
  const { assigned, jobPositionId } = req.body

  const deletedFavoritesTasksQuery = `
    DELETE FROM tareas_favoritas 
    WHERE id_puesto = ${jobPositionId};
  `

  db.query(deletedFavoritesTasksQuery, (err, result) => {
    if (err) {
      console.log(err)
      res.status(400).json({ message: err.sqlMessage })
    }
    if (result) {
      if (err) {
        console.log(err)
        res.status(400).json({ message: err.sqlMessage })
      }
      if (assigned.length > 0) {
        let valuesToSave = []

        assigned.map((task) => {
          valuesToSave.push(`('${task.id}','${jobPositionId}')`)
        })

        const multipleInserQuery = `
        INSERT INTO tareas_favoritas (id_tarea, id_puesto)
        VALUES ${valuesToSave.toString()}`

        db.query(multipleInserQuery, (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          } else {
            return res.status(201).json({ message: 'Tareas favoritas asignadas' })
          }
        })
      } else {
        res.status(200).json({ message: 'Tareas favoritas desasignadas' })
      }
    }
  })
})

module.exports = registerFavoritesTasks
