'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerServiceProfile,
  updateServiceProfile,
  getServiceProfiles,
  getServiceProfileById,
  deleteServiceProfile,
  getServiceProfilesRelated,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerServiceProfile).get(getServiceProfiles)
router.route('/:id').put(updateServiceProfile).get(getServiceProfileById).delete(deleteServiceProfile)
router.route('/relacionados').post(protect, getServiceProfilesRelated)

module.exports = router
