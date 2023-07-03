'use strict'

const { Router } = require('express')
const router = Router()

const { getTasksShared } = require('../controllers')
const { deleteShared } = require('../controllers')
const { updateShared } = require('../controllers')
const { getTasksSharedByManager } = require('../controllers')
const { getSharedByTaskId } = require('../controllers')
const { registerSharedTask } = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, registerSharedTask).get(protect, getTasksShared)
router.route('/lista-tareas/:id').get(protect, getTasksSharedByManager)
router.route('/lista-tarea/:id').get(protect, getSharedByTaskId)
router.route('/:id').put(protect, updateShared).delete(protect, deleteShared)

module.exports = router
