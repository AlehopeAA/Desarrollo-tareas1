const registerSubdirectorateProfile = require('./register-subdirectorate-profile-controller')
const updateSubdirectorateProfile = require('./update-subdirectorate-profile-controller')
const getSubdirectorateProfiles = require('./get-subdirectorate-profiles-controller')
const getSubdirectorateProfileById = require('./get-subdirectorate-profile-by-id-controller')
const deleteSubdirectorateProfile = require('./delete-subdirectorate-profile-controller')
const getSubdirectorateProfilesRelated = require('./get-subdirectorate-profiles-related-controller')

module.exports = {
  registerSubdirectorateProfile,
  updateSubdirectorateProfile,
  getSubdirectorateProfiles,
  getSubdirectorateProfileById,
  deleteSubdirectorateProfile,
  getSubdirectorateProfilesRelated,
}
