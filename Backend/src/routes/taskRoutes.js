'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerTaskByProfile,
  updateTask,
  getTasks,
  getTasksById,
  deleteTask,
  getTaskByProfileId,
  getAllTasks,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, registerTaskByProfile).get(protect, getTasks)
router.route('/all').get(protect, getAllTasks)
router.route('/perfiles/:id').get(protect, getTaskByProfileId)
router.route('/:id').put(updateTask).get(getTasksById).delete(deleteTask)

module.exports = router
