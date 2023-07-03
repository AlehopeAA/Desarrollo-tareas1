'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    get all task
// @route   GET /api/tareas/all
// @access  Private/Admin
const getAllTasks = asyncHandler(async (req, res) => {
  const allTasksQuery = `
      SELECT tareas.id_tarea , CONCAT(tareas.descripcion_tarea, ' PERFIL: ',group_concat(distinct perfiles.codigo_perfil order by perfiles.codigo_perfil separator ', ')) as descripcion_tarea, tareas.cuantificable
      FROM tareas 
      LEFT JOIN tareas_perfil ON tareas_perfil.id_tarea = tareas.id_tarea
      LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
      WHERE tareas.activo = 'SI' 
      GROUP BY tareas_perfil.id_tarea
      ORDER BY tareas.descripcion_tarea ASC
  `

  try {
    const tasks = await getAllRecords(allTasksQuery)

    res
      .status(200)
      .json([...tasks])
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = getAllTasks
