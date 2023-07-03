'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords, getOneRecord } = require('../../utils/queryPromises')

// @desc    get  profiles by task
// @route   GET /api/tareasordextotras/perfiles/:id
// @access  Private/Admin/Manager
const getTaskProfiles = asyncHandler(async (req, res) => {
  const { id } = req.params

  const profilesByTaskQuery = `
    SELECT perfiles.codigo_perfil , perfiles.id_perfil 
    FROM tareas_perfil
    INNER JOIN perfiles ON tareas_perfil.id_perfil = perfiles.id_perfil 
    WHERE tareas_perfil.id_tarea = ${id}
    ORDER BY perfiles.codigo_perfil
  `

  try {
    const allProfiles = await getAllRecords(profilesByTaskQuery)

    const profilesDataResponse = {
      perfiles: allProfiles,
    }

    return res.json(profilesDataResponse)
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage })
  }
})

module.exports = getTaskProfiles
