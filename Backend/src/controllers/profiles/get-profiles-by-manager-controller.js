'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    get profile by id
// @route   GET /api/perfiles/gestores/:id
// @access  Private/Admin
const getProfilesByManager = asyncHandler(async (req, res) => {
  const { id } = req.params

  const queryProfileByManagerAssigned = `
    SELECT * FROM perfiles 
    WHERE (
      perfiles.activo = "SI" 
      AND perfiles.id_perfil 
      IN (
        SELECT gestor_perfiles.id_perfil 
        FROM gestor_perfiles 
        WHERE gestor_perfiles.id_puesto = '${id}'
      )
    )
    ORDER BY perfiles.codigo_perfil
  `
  const queryProfileByManagerPending = `
    SELECT * FROM perfiles 
    WHERE (
      perfiles.activo = "SI" 
      AND perfiles.id_perfil 
      NOT IN (
        SELECT gestor_perfiles.id_perfil 
        FROM gestor_perfiles 
        WHERE gestor_perfiles.id_puesto = '${id}'
      )
    ) 
    ORDER BY perfiles.codigo_perfil
  `
  try {
    const getAssigned = await getAllRecords(queryProfileByManagerAssigned)
    const getPending = await getAllRecords(queryProfileByManagerPending)

    const profiles = {
      pendings: getPending,
      assigned: getAssigned,
    }

    return res.status(200).json(profiles)
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los perfiles' })
  }
})

module.exports = getProfilesByManager
