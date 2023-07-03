const registerDepartamentProfile = require('./register-departament-profile-controller')
const updateDepartamentProfile = require('./update-departament-profile-controller')
const getDepartamentProfiles = require('./get-departament-profiles-controllers')
const getDepartamentProfileById = require('./get-departament-profile-by-id-controller')
const deleteDepartamentProfile = require('./delete-departament-controller')
const getDepartamentProfilesRelated = require('./get-departament-profiles-related-controller')

module.exports = {
  registerDepartamentProfile,
  updateDepartamentProfile,
  getDepartamentProfiles,
  getDepartamentProfileById,
  deleteDepartamentProfile,
  getDepartamentProfilesRelated,
}
