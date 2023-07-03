'use strict'

const { Router } = require('express')
const router = Router()

const { getAcumulativesTasks } = require('../controllers')
const { deleteAcumulatives } = require('../controllers')
const { getAcumulativesTasksByManager } = require('../controllers')
const { getAcumulativesTasksHijaByManager } = require('../controllers')
const { getAcumulativesByTaskId } = require('../controllers')
const { registerAcumulativesTasks } = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, registerAcumulativesTasks).get(protect, getAcumulativesTasks)
router.route('/lista-tareas/:id').get(protect, getAcumulativesTasksByManager)
router.route('/lista-tareas-hija/:id').get(protect, getAcumulativesTasksHijaByManager)
router.route('/lista-tarea/:id').get(protect, getAcumulativesByTaskId)
router.route('/:id').delete(protect, deleteAcumulatives)

module.exports = router
