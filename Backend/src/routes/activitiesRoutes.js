'use strict'

const { Router } = require('express')
const router = Router()

const {getActivityInfo, getActivities, getActivitiesRoles, registerActivity, updateActivity, deleteActivity, getActivitiesByJobPositionId } = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/puestostrabajo/:id').get(protect, getActivitiesByJobPositionId)
router.route('/').post(protect, registerActivity).get(protect, getActivities)
router.route('/roles').get(protect, getActivitiesRoles)
router.route('/:id').put(protect, updateActivity).delete(protect, deleteActivity).get(protect, getActivityInfo)

module.exports = router
