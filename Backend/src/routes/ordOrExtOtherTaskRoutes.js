'use strict'

const { Router } = require('express')
const router = Router()

const { registeOrdExtOtherTask, getOrdExtOtherTasks, getOrdExtOtherTasksObjetives, updateOrdExtTask, deleteOrdExtTask, getHistoricalTasks, getTaskProfiles } = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, registeOrdExtOtherTask).get(protect, getOrdExtOtherTasks)
router.route('/objetivos').get(protect, getOrdExtOtherTasksObjetives)
router.route('/:id').put(protect, updateOrdExtTask).delete(protect, deleteOrdExtTask).get(protect, getHistoricalTasks)
router.route('/perfiles/:id').get(protect, getTaskProfiles)

module.exports = router
