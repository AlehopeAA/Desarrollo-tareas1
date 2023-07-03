'use strict'

const { Router } = require('express')
const router = Router()

const {
   registerProfileRole,
   updateProfileRole,
   getProfileRoles,
   getProfileRolesById,
   deleteProfileRoles,
   getProfileRolesRelated,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerProfileRole).get(getProfileRoles)
router.route('/:id').put(updateProfileRole).get(getProfileRolesById).delete(deleteProfileRoles)
router.route('/relacionados').post(protect, getProfileRolesRelated)

module.exports = router
