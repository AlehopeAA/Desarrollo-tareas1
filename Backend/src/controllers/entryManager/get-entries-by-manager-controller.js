'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords, queryPromise } = require('../../utils/queryPromises')

// @desc    get entries by id
// @route   GET /api/entradas/gestores/:id
// @access  Private/Admin
const getEntriesByManager = asyncHandler(async (req, res) => {
  const { id } = req.params

  const queryEntriesByManagerAssigned = `
    SELECT * 
    FROM tareas 
    WHERE tareas.activo ="SI" 
    AND tareas.entrada ="SI" 
    AND tareas.id_tarea 
    IN (
        SELECT gestor_entradas.id_tarea 
        FROM gestor_entradas 
        WHERE gestor_entradas.id_puesto = '${id}'
    )
    ORDER BY tareas.descripcion_tarea
  `
  const queryEntriesByManagerPending = `
    SELECT * 
    FROM tareas 
    WHERE tareas.activo ="SI" 
    AND tareas.entrada ="SI" 
    AND tareas.id_tarea 
    NOT IN (
        SELECT gestor_entradas.id_tarea 
        FROM gestor_entradas 
        WHERE gestor_entradas.id_puesto = '${id}'
    )
    ORDER BY tareas.descripcion_tarea
  `
  try {
    const getAssigned = await queryPromise(queryEntriesByManagerAssigned)
    const getPending = await queryPromise(queryEntriesByManagerPending)

    const entries = {
      pendings: getPending,
      assigned: getAssigned,
    }

    return res.status(200).json(entries)
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los perfiles' })
  }
})

module.exports = getEntriesByManager
