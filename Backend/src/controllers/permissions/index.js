const registerPermission = require('./register-permission-controller')
const updatePermission = require('./update-permission-controller')
const getPermissions = require('./get-permissions-controller')
const getPermissionsById = require('./get-permission-by-id-controller')
const deletePermission = require('./delete-permission-controller')

module.exports = {
  registerPermission,
  updatePermission,
  getPermissions,
  getPermissionsById,
  deletePermission,
}
