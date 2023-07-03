'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get all entries by task id
// @route   GET /entradas/lista-tarea/:id
// @access  Private/data manager

const getDificultiesByTaskId = asyncHandler(async (req, res) => {
  const { id } = req.params

  const dificultiesByTaskIdQuery = `
  select codigo_trazabilidad, dificultad
  from dificultades
  where id_tarea = ${id}
  `

  try {
    const dificultades = await queryPromise(dificultiesByTaskIdQuery)

    return res.status(200).json(dificultades)
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener las dificultades' })
  }
})

module.exports = getDificultiesByTaskId
