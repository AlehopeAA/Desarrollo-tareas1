'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerPositionPermission,
  updatePositionPermission,
  getpositionPermissions,
  getPositionPermissionById,
  deletePositionPermission,
  assignPermissionsToPositions,
} = require('../controllers')

router.route('/').post(registerPositionPermission).get(getpositionPermissions)
router.route('/:id').put(updatePositionPermission).get(getPositionPermissionById).delete(deletePositionPermission)
router.route('/asignar/permisos').post(assignPermissionsToPositions)

module.exports = router
