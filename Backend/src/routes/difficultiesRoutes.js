'use strict'

const { Router } = require('express')
const router = Router()

const {
  getDifficultiesByManager,
  assignDifficultiesToManager,
  getDifficulties,
  getDificultiesByManagerId,
  getTasksDificultiesByManager,
  deleteDifficulty,
  getDificultiesByTaskId,
  registerDificulty,
  updateDificulty,
  deleteDificulty, 
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/gestores-datos').post(protect, assignDifficultiesToManager).get(protect, getDifficulties)
router.route('/lista-gestor/:id').get(protect, getDificultiesByManagerId)
router.route('/lista-tareas/:id').get(protect, getTasksDificultiesByManager)
router.route('/lista-tarea/:id').get(protect, getDificultiesByTaskId).post(protect, registerDificulty).put(protect, updateDificulty).delete(protect, deleteDificulty)
router.route('/gestores-datos/:id').get(protect, getDifficultiesByManager).delete(protect, deleteDifficulty)

module.exports = router
