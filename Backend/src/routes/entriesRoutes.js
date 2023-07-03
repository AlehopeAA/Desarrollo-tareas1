'use strict'

const { Router } = require('express')
const router = Router()

const {
  getTasksEntriesByManager,
  getEntriesByManagerId,
  getEntriesByTaskId,
  assignEntriesToManager,
  getEntries,
  deleteEntry,
  registerEntry,
  updateEntry,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/gestores-datos').post(protect, assignEntriesToManager).get(protect, getEntries)
router.route('/lista-gestor/:id').get(protect, getEntriesByManagerId)
router.route('/lista-tarea/:id').get(protect, getEntriesByTaskId).post(protect, registerEntry).put(protect, updateEntry)
router.route('/gestores-datos/:id').get(protect, getTasksEntriesByManager).delete(protect, deleteEntry)

module.exports = router
