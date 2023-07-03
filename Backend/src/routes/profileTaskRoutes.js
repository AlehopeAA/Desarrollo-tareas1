'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerProfileTask,
  updateProfileTask,
  getProfileTasks,
  getProfileTaskById,
  deleteProfiletask,
} = require('../controllers')


router.route('/').post(registerProfileTask).get(getProfileTasks)
router.route('/:id').put(updateProfileTask).get(getProfileTaskById).delete(deleteProfiletask)

module.exports = router
