'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get task by profileId
// @route   GET /api/tareas/perfiles/:id
// @access  Private/Admin
const getTaskByProfileId = asyncHandler(async (req, res) => {
  const { id } = req.params

  const getTasksQuery = `
    SELECT tareas.*, tipos_tarea.tipo_tarea
    FROM tareas 
    INNER JOIN tipos_tarea 
    ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
    INNER JOIN tareas_perfil 
    ON tareas.id_tarea = tareas_perfil.id_tarea  
    WHERE tipos_tarea.tipo_tarea 
    IN ('EXTRAORDINARIA','ORDINARIA','OTRA') 
    AND tareas_perfil.id_perfil= '${id}'
    ORDER BY tareas.descripcion_tarea;
  `
  db.query(getTasksQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getTaskByProfileId
