const registerPositionPermission = require('./register-position-permission-controller')
const updatePositionPermission = require('./update-position-permission-controller')
const getpositionPermissions = require('./get-position-permissions-controller')
const getPositionPermissionById = require('./get-position-permission-by-id-controller')
const deletePositionPermission = require('./delete-position-permission-controller')
const assignPermissionsToPositions = require('./assign-bulk-permissions-to-job-positions-controller')

module.exports = {
  registerPositionPermission,
  updatePositionPermission,
  getpositionPermissions,
  getPositionPermissionById,
  deletePositionPermission,
  assignPermissionsToPositions,
}
