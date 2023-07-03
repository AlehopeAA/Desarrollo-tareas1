'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerProfile,
  updateProfile,
  getProfiles,
  getProfileById,
  deleteProfile,
  getProfileByManager,
  registerProfileToManager,
  getProfilesByPosition
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerProfile).get(protect, getProfiles)
router.route('/gestores/:id').get(protect, getProfileByManager)
router.route('/gestores').post(protect, registerProfileToManager)
router.route('/:id').put(updateProfile).get(getProfileById).delete(deleteProfile)
router.route('/puesto').post(protect, getProfilesByPosition)

module.exports = router
