'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerAbsencesTask,
  updateAbsencesTask,
  getAbsencesTasks,
  getAbsencesTaskById,
  deleteAbsencesTask,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerAbsencesTask).get(getAbsencesTasks)
router.route('/:id').put(protect, updateAbsencesTask).get(getAbsencesTaskById).delete(deleteAbsencesTask)

module.exports = router
