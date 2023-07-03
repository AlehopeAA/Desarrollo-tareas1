'use strict'

const { Router } = require('express')
const router = Router()

const {
   registerUnitProfile,
   updateUnitProfile,
   getUnitProfiles,
   getUnitProfileById,
   deleteUnitProfile,
   getUnitProfilesRelated,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerUnitProfile).get(getUnitProfiles)
router.route('/:id').put(updateUnitProfile).get(getUnitProfileById).delete(deleteUnitProfile)
router.route('/relacionados').post(protect, getUnitProfilesRelated)

module.exports = router
