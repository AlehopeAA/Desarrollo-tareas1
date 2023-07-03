const registerUnitProfile = require('./register-unit-profile-controller')
const updateUnitProfile = require('./update-unit-profile-controller')
const getUnitProfiles = require('./get-unit-profiles-controller')
const getUnitProfileById = require('./get-unit-profile-by-id-controller')
const deleteUnitProfile = require('./delete-unit-profile-controller')
const getUnitProfilesRelated = require('./get-unit-profiles-related-controller')

module.exports = {
  registerUnitProfile,
  updateUnitProfile,
  getUnitProfiles,
  getUnitProfileById,
  deleteUnitProfile,
  getUnitProfilesRelated,
}
