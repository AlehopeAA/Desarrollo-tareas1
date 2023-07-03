'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    Create Profile
// @route   POST /api/perfiles
// @access  Private
const assignPermissionsToPositions = asyncHandler(async (req, res) => {
  const { assigned, id_permiso } = req.body

  const allValuesToInsert = assigned.map((profile) => `('${id_permiso}', '${profile.id}')`)

  const deletedOldAssignedPermissions = `
  DELETE FROM permisos_puesto 
  WHERE permisos_puesto.id_permiso = '${id_permiso}'
  `
  const registerNewAssigned = `
    INSERT INTO permisos_puesto
    ( id_permiso , id_puesto ) VALUES
    ${allValuesToInsert.toString()}
    `
  try {
    await queryPromise(deletedOldAssignedPermissions)

    if (assigned.length > 0) {
      await queryPromise(registerNewAssigned)
    }

    res.status(201).json('Permisos añadidos con exito')
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
})

module.exports = assignPermissionsToPositions
