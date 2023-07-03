const registerProfile = require('./register-profile-controller')
const updateProfile = require('./update-profile-controller')
const getProfiles = require('./get-profiles-controller')
const getProfileById = require('./get-profile-by-id-controller')
const deleteProfile = require('./delete-profile-controller')
const getProfileByManager = require('./get-profiles-by-manager-controller')
const registerProfileToManager = require('./register-profiles-to-manager-controller')
const getProfilesByPosition = require('./get-profiles-by-position-controller')

module.exports = {
   registerProfile,
   updateProfile,
   getProfiles,
   getProfileById,
   deleteProfile,
   getProfileByManager,
   registerProfileToManager,
   getProfilesByPosition,
}
