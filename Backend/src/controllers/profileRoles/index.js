const registerProfileRole = require('./register-profile-role-controller')
const updateProfileRole = require('./update-profile-role.controller')
const getProfileRoles = require('./get-profile-roles-controller')
const getProfileRolesById = require('./get-profile-role-by-id-controllers')
const deleteProfileRoles = require('./delete-profile-role-controller')
const getProfileRolesRelated = require('./get-profile-roles-related-controller')

module.exports = {
  registerProfileRole,
  updateProfileRole,
  getProfileRoles,
  getProfileRolesById,
  deleteProfileRoles,
  getProfileRolesRelated,
}
