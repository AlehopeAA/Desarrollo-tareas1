'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerGeneralTask,
  updateGeneralTask,
  getGeneralTasks,
  getGeneralTaskById,
  deleteGeneralTask,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerGeneralTask).get(getGeneralTasks)
router.route('/:id').put(protect, updateGeneralTask).get(getGeneralTaskById).delete(deleteGeneralTask)

module.exports = router
