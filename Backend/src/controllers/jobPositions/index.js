const registerJobPosition = require('./register-job-position-controller')
const updateJobPosition = require('./update-job-position-controller')
const getJobPositions = require('./get-job-positions-controllers')
const getJobPositionById = require('./get-job-position-by-id-controller')
const getJobPositionsByRole = require('./get-job-positions-by-role-controller')
const getJobPositionsInforme = require('./get-job-positions-informe-controller')
const getJobPositionsValidacion = require('./get-job-positions-validacion-controller')
const getJobPositionsSupervision = require('./get-job-positions-supervision-controller')
const deleteJobPosition = require('./delete-job-position-controller')
const getJobPositionsByProfileId = require('./get-job-position-by-profileId-controller')
const getJobPositionByRoleId = require('./get-job-position-by-role-id')
const getJobPositionsBySharedTaskId = require('./get-job-position-by-shared-task-id-controller')
const getHistoricalJobPositions = require('./get-historical-job-positions-controller')

module.exports = {
  registerJobPosition,
  updateJobPosition,
  getJobPositions,
  getJobPositionById,
  getJobPositionsByRole,
  deleteJobPosition,
  getJobPositionsByProfileId,
  getJobPositionsInforme,
  getJobPositionsValidacion,
  getJobPositionsSupervision,
  getJobPositionByRoleId,
  getJobPositionsBySharedTaskId,
  getHistoricalJobPositions,
}
