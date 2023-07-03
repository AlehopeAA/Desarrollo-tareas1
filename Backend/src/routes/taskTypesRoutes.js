'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerTaskTypes,
  updateTaskTypes,
  getTaskTypes,
  getTaskTypesById,
  deleteTaskTypes,
} = require('../controllers')

router.route('/').post(registerTaskTypes).get(getTaskTypes)
router.route('/:id').put(updateTaskTypes).get(getTaskTypesById).delete(deleteTaskTypes)

module.exports = router
