'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerPermission,
  updatePermission,
  getPermissions,
  getPermissionsById,
  deletePermission,
} = require('../controllers')

router.route('/').post(registerPermission).get(getPermissions)
router.route('/:id').put(updatePermission).get(getPermissionsById).delete(deletePermission)

module.exports = router
