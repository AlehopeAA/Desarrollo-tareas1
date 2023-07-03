const registerServiceProfile = require('./register-service-profile-controller')
const updateServiceProfile = require('./update-service-profile-controller')
const getServiceProfiles = require('./get-service-profiles-controller')
const getServiceProfileById = require('./get-service-profile-by-id-controller')
const deleteServiceProfile = require('./delete-service-profile-controller')
const getServiceProfilesRelated = require('./get-service-profiles-related-controller')

module.exports = {
  registerServiceProfile,
  updateServiceProfile,
  getServiceProfiles,
  getServiceProfileById,
  deleteServiceProfile,
  getServiceProfilesRelated,
}
