'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    Assign Entrys
// @route   POST /api/dificultad/gestores
// @access  Private

const assignDifficultiesToManager = asyncHandler(async (req, res) => {
  const { assigned, id_puesto } = req.body

  const allValuesToInsert = assigned.map((task) => `('${id_puesto}', '${task.id}')`)

  const deletedOldAssignedDifficulties = `
  DELETE FROM gestor_dificultad 
  WHERE gestor_dificultad.id_puesto = '${id_puesto}'
  `
  const registerNewAssigned = `
    INSERT INTO gestor_dificultad
    ( id_puesto , id_tarea ) VALUES
    ${allValuesToInsert.toString()}
    `
  try {
    await queryPromise(deletedOldAssignedDifficulties)

    if (!!assigned.length) {
      await queryPromise(registerNewAssigned)
    }

    res.status(201).json('dificultad añadidas con exito')
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
})

module.exports = assignDifficultiesToManager
