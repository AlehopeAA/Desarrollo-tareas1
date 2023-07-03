'use strict'

const users = require('./users')
const { registerTaskTypes, updateTaskTypes, getTaskTypes, getTaskTypesById, deleteTaskTypes } = require('./taskTypes')
const { registerTask, registerTaskByProfile, updateTask, getAllTasks, getTasks, getTasksById, deleteTask, getTaskByProfileId } = require('./tasks')
const { entryCalculus, workingDayCalculus, daysCalculus, responsabilityCalculus} = require('./calculus')
const { 
  getEvaluacionInfo, 
  getEvaluacionCurrent, 
  getEvaluacionAgregado, 
  getEvaluacionResumen, 
  getEvaluacionCalculo, 
  updateEvaluacionCorreccion, 
  deleteEvaluacionCorreccion,
  updateEvaluacionCorreccionGlobal, 
  deleteEvaluacionCorreccionGlobal, 
  updateEvaluacionValidacion, 
  updateEvaluacionSupervision,
  supervisionMasiva,
  validacionMasiva,
  finalizarSupervision,
  finalizarValidacion,
  getEvaluacionInfoInforme,
  getEvaluacionResumenInforme,
} = require('./evaluaciones')
const {
  registerGeneralTask,
  updateGeneralTask,
  getGeneralTasks,
  getGeneralTaskById,
  deleteGeneralTask,
} = require('./generalTasks')
const {
  registerSpecificTask,
  getSpecificTasks,
  updateSpecificTask,
  getSpecificTaskById,
  deleteSpecificTask,
  getSpecificTasksByUser,
} = require('./specificTasks')
const {
  registerAbsencesTask,
  updateAbsencesTask,
  getAbsencesTasks,
  getAbsencesTaskById,
  deleteAbsencesTask,
} = require('./absencesTasks')
const {
  registerProfileRole,
  updateProfileRole,
  getProfileRoles,
  getProfileRolesById,
  deleteProfileRoles,
  getProfileRolesRelated,
} = require('./profileRoles')
const {
  registerUnitProfile,
  updateUnitProfile,
  getUnitProfiles,
  getUnitProfileById,
  deleteUnitProfile,
  getUnitProfilesRelated,
} = require('./unitProfiles')
const {
  registerConfiguracion,
  updateConfiguracion,
  getConfiguracions,
  getConfiguracionById,
  deleteConfiguracion,
  getHistoricalConfiguracion,
} = require('./configuraciones')
const {
  registerFestivo,
  updateFestivo,
  getFestivos,
  getFestivoById,
  deleteFestivo,
} = require('./festivos')

const {
  registerDepartamentProfile,
  updateDepartamentProfile,
  getDepartamentProfiles,
  getDepartamentProfileById,
  deleteDepartamentProfile,
  getDepartamentProfilesRelated,
} = require('./departamentProfiles')

const {
  registerServiceProfile,
  updateServiceProfile,
  getServiceProfiles,
  getServiceProfileById,
  deleteServiceProfile,
  getServiceProfilesRelated,
} = require('./serviceProfiles')

const {
  registerSubdirectorateProfile,
  updateSubdirectorateProfile,
  getSubdirectorateProfiles,
  getSubdirectorateProfileById,
  deleteSubdirectorateProfile,
  getSubdirectorateProfilesRelated
} = require('./subdirectorateProfiles')

const {
  registerProfile,
  updateProfile,
  getProfiles,
  getProfileById,
  deleteProfile,
  getProfileByManager,
  registerProfileToManager,
  getProfilesByPosition,
} = require('./profiles')
const {
  registerPermission,
  updatePermission,
  getPermissions,
  getPermissionsById,
  deletePermission,
} = require('./permissions')

const {
  registerJobPosition,
  updateJobPosition,
  getJobPositions,
  getJobPositionById,
  deleteJobPosition,
  getJobPositionsByRole,
  getJobPositionsByProfileId,
  getJobPositionsInforme,
  getJobPositionsValidacion,
  getJobPositionsSupervision,
  getJobPositionByRoleId,
  getJobPositionsBySharedTaskId,
  getHistoricalJobPositions,
} = require('./jobPositions')

const {
  registerPositionPermission,
  updatePositionPermission,
  getpositionPermissions,
  getPositionPermissionById,
  deletePositionPermission,
  assignPermissionsToPositions,
} = require('./positionPermissions')

const {
  registerJobProfile,
  updateJobProfile,
  getJobProfiles,
  getJobProfileById,
  deleteJobProfile,
} = require('./jobProfiles')

const {
  registerProfileTask,
  updateProfileTask,
  getProfileTasks,
  getProfileTaskById,
  deleteProfiletask,
} = require('./profileTasks')

const {
  getTeamsWorkByResponsible,
  getTeamsWorkList,
  getTeamsWorkByValidator,
  registerOrUpdateTeamWorkByResponsable,
  registerOrUpdateTeamWorkByValidator,
} = require('./teamsWork')

const { getActivityInfo, getActivities, getActivitiesRoles, registerActivity, updateActivity, deleteActivity, getActivitiesByJobPositionId, } = require('./activities')

const {
  registeOrdExtOtherTask,
  getOrdExtOtherTasks,
  getOrdExtOtherTasksObjetives,
  updateOrdExtTask,
  deleteOrdExtTask,
  getHistoricalTasks,
  getTaskProfiles,
} = require('./ordExtOtherTasks')

const {
  registerAbsenceObjetive,
  getAbsencesObjetives,
  updateAbsencesObjetives,
  deleteAbsencesObjetive,
} = require('./absencesObjetives')

const {
  registerGeneralObjetive,
  getGeneralObjetives,
  updateGeneralObjetives,
  deleteGeneralObjetive,
} = require('./generalObjetives')

const {
  registerSpecificObjetive,
  getSpecificObjetives,
  updateSpecificObjetives,
  deleteSpecificObjetive,
} = require('./specificObjetives')

const {
  registerOrdExtOther,  
  getOrdExtOtherObjetives,
  updateOrdExtObjetives,
  deleteOrdExtObjetive,
  getHistoricalObjetives,
} = require('./ordExtOtherObjetives')

const {
  getMisObjetivos,
} = require('./misObjetivos')

const {
  getTasksEntriesByManager,
  getEntriesByManagerId,
  getEntriesByTaskId,
  assignEntriesToManager,
  getEntries,
  deleteEntry,
  registerEntry,
  updateEntry,
} = require('./entryManager')

const {
  getDifficultiesByManager,
  assignDifficultiesToManager,
  getDifficulties,
  getDificultiesByManagerId,
  getTasksDificultiesByManager,
  deleteDifficulty,
  getDificultiesByTaskId,
  registerDificulty,
  updateDificulty,
  deleteDificulty,
} = require('./difficultiesManager')

const { 
  getTasksShared, 
  deleteShared, 
  updateShared,
  getTasksSharedByManager,
  getSharedByTaskId,
  registerSharedTask,
} = require('./tasksShared')

const { 
  getAcumulativesTasks,
  deleteAcumulatives,
  getAcumulativesTasksByManager,
  getAcumulativesTasksHijaByManager,
  getAcumulativesByTaskId,
  registerAcumulativesTasks,
} = require('./acumulativesTasks')

const { 
  getDashboard,   
} = require('./dashboard')

module.exports = {
  users,
  registerTaskTypes,
  updateTaskTypes,
  getTaskTypes,
  getTaskTypesById,
  deleteTaskTypes,

  getEvaluacionInfo,
  getEvaluacionCurrent,
  getEvaluacionAgregado,
  getEvaluacionResumen,
  getEvaluacionCalculo,
  updateEvaluacionCorreccion,
  deleteEvaluacionCorreccion,
  updateEvaluacionCorreccionGlobal,
  deleteEvaluacionCorreccionGlobal,
  updateEvaluacionValidacion,
  updateEvaluacionSupervision,
  supervisionMasiva,
  validacionMasiva,
  finalizarSupervision,
  finalizarValidacion,
  getEvaluacionInfoInforme,
  getEvaluacionResumenInforme,

  entryCalculus,
  workingDayCalculus,
  responsabilityCalculus,
  daysCalculus,

  registerTask,
  registerTaskByProfile,
  updateTask,
  getAllTasks,
  getTasks,
  getTasksById,
  deleteTask,
  getTaskByProfileId,

  registerGeneralTask,
  updateGeneralTask,
  getGeneralTasks,
  getGeneralTaskById,
  deleteGeneralTask,

  registerSpecificTask,
  getSpecificTasks,
  updateSpecificTask,
  getSpecificTaskById,
  deleteSpecificTask,
  getSpecificTasksByUser,

  registerAbsencesTask,
  updateAbsencesTask,
  getAbsencesTasks,
  getAbsencesTaskById,
  deleteAbsencesTask,

  registerProfileRole,
  updateProfileRole,
  getProfileRoles,
  getProfileRolesById,
  deleteProfileRoles,
  getProfileRolesRelated,

  registerUnitProfile,
  updateUnitProfile,
  getUnitProfiles,
  getUnitProfileById,
  deleteUnitProfile,
  getUnitProfilesRelated,

  registerConfiguracion,
  updateConfiguracion,
  getConfiguracions,
  getConfiguracionById,
  deleteConfiguracion,
  getHistoricalConfiguracion,

  registerFestivo,
  updateFestivo,
  getFestivos,
  getFestivoById,
  deleteFestivo,

  registerDepartamentProfile,
  updateDepartamentProfile,
  getDepartamentProfiles,
  getDepartamentProfileById,
  deleteDepartamentProfile,
  getDepartamentProfilesRelated,

  registerServiceProfile,
  updateServiceProfile,
  getServiceProfiles,
  getServiceProfileById,
  deleteServiceProfile,
  getServiceProfilesRelated,

  registerSubdirectorateProfile,
  updateSubdirectorateProfile,
  getSubdirectorateProfiles,
  getSubdirectorateProfileById,
  deleteSubdirectorateProfile,
  getSubdirectorateProfilesRelated,

  registerProfile,
  updateProfile,
  getProfiles,
  getProfileById,
  getProfileByManager,
  registerProfileToManager,
  deleteProfile,
  getProfilesByPosition,

  registerPermission,
  updatePermission,
  getPermissions,
  getPermissionsById,
  deletePermission,

  registerJobPosition,
  updateJobPosition,
  getJobPositions,
  getJobPositionById,
  getJobPositionsByRole,
  getJobPositionsByProfileId,
  getJobPositionsInforme,
  getJobPositionsValidacion,
  getJobPositionsSupervision,
  getJobPositionByRoleId,
  getJobPositionsBySharedTaskId,
  deleteJobPosition,
  getHistoricalJobPositions,

  registerPositionPermission,
  updatePositionPermission,
  getpositionPermissions,
  getPositionPermissionById,
  deletePositionPermission,
  assignPermissionsToPositions,

  registerJobProfile,
  updateJobProfile,
  getJobProfiles,
  getJobProfileById,
  deleteJobProfile,

  registerProfileTask,
  updateProfileTask,
  getProfileTasks,
  getProfileTaskById,
  deleteProfiletask,

  getTeamsWorkByResponsible,
  getTeamsWorkList,
  getTeamsWorkByValidator,
  registerOrUpdateTeamWorkByResponsable,
  registerOrUpdateTeamWorkByValidator,

  getActivityInfo,
  getActivities,
  getActivitiesRoles,
  registerActivity,
  updateActivity,
  deleteActivity,
  getActivitiesByJobPositionId,

  registeOrdExtOtherTask,
  getOrdExtOtherTasks,
  getOrdExtOtherTasksObjetives,
  updateOrdExtTask,
  deleteOrdExtTask,
  getHistoricalTasks,
  getTaskProfiles,

  registerAbsenceObjetive,
  getAbsencesObjetives,
  updateAbsencesObjetives,
  deleteAbsencesObjetive,

  registerGeneralObjetive,
  getGeneralObjetives,
  updateGeneralObjetives,
  deleteGeneralObjetive,

  registerSpecificObjetive,
  getSpecificObjetives,
  updateSpecificObjetives,
  deleteSpecificObjetive,

  registerOrdExtOther,  
  getOrdExtOtherObjetives,
  updateOrdExtObjetives,
  deleteOrdExtObjetive,
  getHistoricalObjetives,

  getMisObjetivos,

  getTasksEntriesByManager,
  getEntriesByManagerId,
  getEntriesByTaskId,
  assignEntriesToManager,
  getEntries,
  deleteEntry,
  registerEntry,
  updateEntry,

  getDifficultiesByManager,
  assignDifficultiesToManager,
  getDifficulties,
  getDificultiesByManagerId,
  getTasksDificultiesByManager,
  deleteDifficulty,
  getDificultiesByTaskId,
  registerDificulty,
  updateDificulty,
  deleteDificulty,

  getTasksShared,
  deleteShared,
  updateShared,
  getTasksSharedByManager,
  getSharedByTaskId,
  registerSharedTask,

  getAcumulativesTasks,
  deleteAcumulatives,
  getAcumulativesTasksByManager,
  getAcumulativesTasksHijaByManager,
  getAcumulativesByTaskId,
  registerAcumulativesTasks,

  getDashboard,
}
