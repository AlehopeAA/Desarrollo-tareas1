'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    Delete service profile
// @route   DELETE /api/perfilservicios/:id
// @access  Private/Admin
const deleteServiceProfile = asyncHandler(async (req, res) => {
  const id = req.params.id

  const isExistProfileQuery = `
    SELECT * FROM perfiles WHERE id_perfil ='${id}'
  `
  try {
    const isExistProfile = await queryPromise(isExistProfileQuery)

    if (!isExistProfile.length > 0) {
      return res.status(400).json({ message: 'No existe un perfil con esa identificación' })
    }

    const deleteManagerProfilesQuery = `
      DELETE FROM tareas_perfil 
      WHERE tareas_perfil.id_perfil = ${id}
    `
    const deleteManagerProfile = await queryPromise(deleteManagerProfilesQuery)

    const deleteProfileQuery = `
      DELETE FROM perfiles 
      WHERE perfiles.id_perfil =${id}
    `
    const deleteProfile = await queryPromise(deleteProfileQuery)

    if (deleteProfile) res.status(200).json({ message: 'Perfil borrado correctamente' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = deleteServiceProfile
