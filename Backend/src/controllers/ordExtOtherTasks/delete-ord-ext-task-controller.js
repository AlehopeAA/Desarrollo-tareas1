'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    Delete OrdExts task
// @route   DELETE /api/tareasordextotras/:id
// @access  Private/Admin

const deleteOrdExtTask = asyncHandler(async (req, res) => {
  const { id } = req.params

  const findOrdExtTask = `SELECT * FROM tareas WHERE id_tarea = ${id}`
  const taskHasAnActivity = `SELECT actividades.id_tarea FROM actividades WHERE actividades.id_tarea = ${id}`
  const deleteTaskFromProfiles = `DELETE FROM tareas_perfil WHERE tareas_perfil.id_tarea = ${id}`
  const deleteTaskFromFavorites = `DELETE FROM tareas_favoritas WHERE tareas_favoritas.id_tarea = ${id}`
  const deleteObjectivesFromTask = `DELETE FROM objetivos WHERE objetivos.id_tarea = ${id}`
  const deleteTask = `DELETE FROM tareas WHERE id_tarea = ${id}`

  try {
    const isExistTask = await queryPromise(findOrdExtTask)
    
    if (!isExistTask.length > 0) {
      return res.status(400).json({ message: 'No existe tarea con ese id' })
    }
  
    const isExistActivities = await queryPromise(taskHasAnActivity)
  
    if (isExistActivities.length > 0) {
      return res.status(400).json({ message: 'La tarea tiene actividades asociadas' })
    }

    queryPromise(deleteTaskFromProfiles)
    queryPromise(deleteTaskFromFavorites)
    queryPromise(deleteObjectivesFromTask)

    const deleteFromTask = await queryPromise(deleteTask)

    if (deleteFromTask) res.status(200).json({ message: 'Tarea borrada correctamente' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = deleteOrdExtTask
