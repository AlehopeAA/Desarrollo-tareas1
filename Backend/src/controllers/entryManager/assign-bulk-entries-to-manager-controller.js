'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    Assign Entrys
// @route   POST /api/entradas/gestores
// @access  Private

const assignEntriesToManager = asyncHandler(async (req, res) => {
  const { assigned, id_puesto } = req.body

  const allValuesToInsert = assigned.map((task) => `('${id_puesto}', '${task.id}')`)

  const deletedOldAssignedEntries = `
  DELETE FROM gestor_entradas 
  WHERE gestor_entradas.id_puesto = '${id_puesto}'
  `
  const registerNewAssigned = `
    INSERT INTO gestor_entradas
    ( id_puesto , id_tarea ) VALUES
    ${allValuesToInsert.toString()}
    `
  try {
    await queryPromise(deletedOldAssignedEntries)

    if (!!assigned.length) {
      await queryPromise(registerNewAssigned)
    }

    res.status(201).json('Entradas asignadas con exito')
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
})

module.exports = assignEntriesToManager
