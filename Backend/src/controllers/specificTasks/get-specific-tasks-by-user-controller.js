'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get specific tasks by user
// @route   GET /api/tareasespecificas/puestostrabajo/id
// @access  Private/Admin
const getSpecificTasksByUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  const query = `
  SELECT * FROM tareas 
  INNER JOIN tipos_tarea 
  ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
  WHERE (tipos_tarea.tipo_tarea = "ESPECIFICA" 
  AND tareas.id_puesto = ${id}
  AND tareas.activo = 'SI'
  )
  ORDER BY tareas.descripcion_tarea
  `
  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }

    res.status(200).json(result)
  })
})

module.exports = getSpecificTasksByUser
