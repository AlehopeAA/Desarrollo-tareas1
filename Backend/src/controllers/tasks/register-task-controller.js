'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create task
// @route   POST /api/tareas
// @access  Private/Admin
const registerTask = asyncHandler(async (req, res) => {
  const {
    descripcion_tarea,
    id_tipo_tarea,
    activo,
    fecha_alta,
    fecha_baja,
    cuantificable,
    indicador,
    entrada,
    compartida,
    dificultad,
    acumulativa,
  } = req.body

  db.query(
    `INSERT INTO tareas (
        descripcion_tarea,
        id_tipo_tarea,
        activo,
        fecha_alta,
        fecha_baja,
        cuantificable,
        indicador,
        entrada,
        compartida,
        dificultad,
        acumulativa) VALUES ('${descripcion_tarea}' , '${id_tipo_tarea}', '${activo}',  '${fecha_baja}', '${fecha_alta}', '${cuantificable}','${indicador}', '${entrada}', '${compartida}', '${dificultad}', '${acumulativa}')`,

    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result) {
        res.status(201).json({
          message: 'Tipo de tarea Creado',
        })
      }
    }
  )
})

module.exports = registerTask
