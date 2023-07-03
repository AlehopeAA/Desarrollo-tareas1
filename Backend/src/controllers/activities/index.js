const getActivities = require('./get-activities-controller')
const getActivitiesRoles = require('./get-activities-roles-controller')
const registerActivity = require('./register-activity-controller')
const updateActivity = require('./update-activity-controller')
const deleteActivity = require('./delete-activity-controller')
const getActivitiesByJobPositionId = require('./get-activities-by-jobpositionId-controller')
const getActivityInfo = require('./get-activity-info-controller')
module.exports = {
  getActivityInfo,
  getActivities,
  getActivitiesRoles,
  registerActivity,
  updateActivity,
  deleteActivity,
  getActivitiesByJobPositionId,
}
