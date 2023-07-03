'use strict'

const { Router } = require('express')
const router = Router()

const {
   registerSubdirectorateProfile,
   updateSubdirectorateProfile,
   getSubdirectorateProfiles,
   getSubdirectorateProfileById,
   deleteSubdirectorateProfile,
   getSubdirectorateProfilesRelated,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerSubdirectorateProfile).get(getSubdirectorateProfiles)
router.route('/relacionados').post(protect, getSubdirectorateProfilesRelated)
router
   .route('/:id')
   .put(updateSubdirectorateProfile)
   .get(getSubdirectorateProfileById)
   .delete(deleteSubdirectorateProfile)

module.exports = router
