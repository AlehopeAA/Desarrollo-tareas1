'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerJobProfile,
  updateJobProfile,
  getJobProfiles,
  getJobProfileById,
  deleteJobProfile,
} = require('../controllers')

router.route('/').post(registerJobProfile).get(getJobProfiles)
router.route('/:id').put(updateJobProfile).get(getJobProfileById).delete(deleteJobProfile)

module.exports = router
