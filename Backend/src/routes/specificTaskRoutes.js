'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerSpecificTask,
  getSpecificTasks,
  updateSpecificTask,
  getSpecificTaskById,
  deleteSpecificTask,
  getSpecificTasksByUser,
} = require('../controllers')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerSpecificTask).get(protect, getSpecificTasks)
router.route('/puestostrabajo/:id').get(protect, getSpecificTasksByUser)
router.route('/:id').put(protect, updateSpecificTask).get(getSpecificTaskById).delete(deleteSpecificTask)

module.exports = router
