'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerAbsenceObjetive,
  getAbsencesObjetives,
  updateAbsencesObjetives,
  deleteAbsencesObjetive,
} = require('../controllers')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, registerAbsenceObjetive).get(protect, getAbsencesObjetives)
router.route('/:id').put(protect, updateAbsencesObjetives).delete(protect, deleteAbsencesObjetive)

module.exports = router
