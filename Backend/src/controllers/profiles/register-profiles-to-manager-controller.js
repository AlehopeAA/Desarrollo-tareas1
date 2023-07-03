'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    Create Profile
// @route   POST /api/perfiles
// @access  Private/Admin
const registerProfileToManager = asyncHandler(async (req, res) => {
  const { assigned, managerId } = req.body
  const allValuesToInsert = assigned.map((profile) => `('${profile.id}' , '${managerId}')`)

  const deletedOldAssignedProfiles = `
    DELETE FROM gestor_perfiles 
    WHERE gestor_perfiles.id_puesto = '${managerId}'
  `
  const registerNewAssigned = `
    INSERT INTO gestor_perfiles
    ( id_perfil , id_puesto ) VALUES
    ${allValuesToInsert.toString()}
    `
  try {
    await queryPromise(deletedOldAssignedProfiles)

    if (assigned.length > 0) {
      await queryPromise(registerNewAssigned)
    }

    res.status(201).json('Perfiles añadidos con exito')
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
})

module.exports = registerProfileToManager
