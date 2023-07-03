'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get dificulties by id
// @route   GET /api/dificultades/gestores/:id
// @access  Private/Admin
const getTasksDificultiesByManager = asyncHandler(async (req, res) => {
  const { id } = req.params

  const tasksWithoutRepeating = []

  const queryTasksDificultiesByManager = `
    SELECT tareas.*, perfiles.codigo_perfil
    FROM tareas 
    LEFT JOIN tareas_perfil ON tareas_perfil.id_tarea = tareas.id_tarea
    LEFT JOIN perfiles on tareas_perfil.id_perfil = perfiles.id_perfil
    WHERE tareas.activo = "SI" 
    AND tareas.codigo_trazabilidad <> "NO" 
    AND tareas.dificultad = "SI"
    AND tareas.id_tarea 
    IN (
        SELECT gestor_dificultad.id_tarea 
        FROM gestor_dificultad 
        WHERE gestor_dificultad.id_puesto = '${id}'
    )
  `
  db.query(queryTasksDificultiesByManager, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }

    result.map((task) => {
      const existInArray = tasksWithoutRepeating.map((task) => task.id_tarea).indexOf(task.id_tarea) === -1

      if (existInArray) {
        const repeatTasks = result.filter((taskRepeat) => taskRepeat.id_tarea === task.id_tarea)

        tasksWithoutRepeating.push({
          ...task,
          codigo_perfil: repeatTasks.map((taskCod) => taskCod.codigo_perfil),
        })
      }
    })

    res.status(200).json(tasksWithoutRepeating)
  })
})

module.exports = getTasksDificultiesByManager
