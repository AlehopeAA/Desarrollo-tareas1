'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    Delete job position
// @route   DELETE /api/puestostrabajo/:id
// @access  Private/Admin
const deleteJobPosition = asyncHandler(async (req, res) => {
  const id = req.params.id

  const findJobPosition = `SELECT * FROM puestos_trabajo WHERE id_puesto = ${id}`
  const activities = `SELECT actividades.id_puesto FROM actividades WHERE actividades.id_puesto = ${id}`
  const deleteProfiles = `DELETE FROM perfiles_puesto WHERE perfiles_puesto.id_puesto = ${id}`
  const deleteProfilesManagments = `DELETE FROM gestor_perfiles WHERE gestor_perfiles.id_puesto = ${id} `
  const deleteSpecificTasks = `DELETE FROM tareas WHERE tareas.id_puesto = ${id} AND id_tipo_tarea = 3`
  const deleteResposibles = `DELETE FROM responsables WHERE responsables.id_puesto = ${id} OR responsables.id_puesto_responsable = ${id} `
  const deleteValidators = `DELETE FROM validadores WHERE validadores.id_puesto = ${id} OR validadores.id_puesto_validador = ${id} `
  const deletePermissions = `DELETE FROM permisos_puesto WHERE permisos_puesto.id_puesto = ${id} `
  const deleteHistoricosJobPosition = `DELETE FROM historico_puestos WHERE historico_puestos.id_puesto = ${id} `
  const deleteJobPosition = `DELETE FROM puestos_trabajo WHERE id_puesto = ${id}`

  try {
  const isExistJobPosition = await queryPromise(findJobPosition)
  
  if (!isExistJobPosition.length > 0) {
    return res.status(400).json({ message: 'No existe puesto con ese id' })
  }

  const isExistActivities = await queryPromise(activities)

  if (isExistActivities.length > 0) {
    return res.status(400).json({ message: 'Tiene actividades asociadas' })
  }

    queryPromise(deleteProfiles)
    queryPromise(deleteProfilesManagments)
    queryPromise(deleteSpecificTasks)
    queryPromise(deleteResposibles)
    queryPromise(deleteValidators)
    queryPromise(deletePermissions)
    queryPromise(deleteHistoricosJobPosition)

    const deleteJob = await queryPromise(deleteJobPosition)

    if (deleteJob) res.status(200).json({ message: 'Puesto borrado correctamente' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = deleteJobPosition
