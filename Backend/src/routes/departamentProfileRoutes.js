'use strict'

const { Router } = require('express')
const router = Router()

const {
   registerDepartamentProfile,
   updateDepartamentProfile,
   getDepartamentProfiles,
   getDepartamentProfileById,
   deleteDepartamentProfile,
   getDepartamentProfilesRelated,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerDepartamentProfile).get(getDepartamentProfiles)
router.route('/:id').put(updateDepartamentProfile).get(getDepartamentProfileById).delete(deleteDepartamentProfile)
router.route('/relacionados').post(protect, getDepartamentProfilesRelated)

module.exports = router
