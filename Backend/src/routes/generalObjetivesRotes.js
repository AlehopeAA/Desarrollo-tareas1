'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerGeneralObjetive,
  getGeneralObjetives,
  updateGeneralObjetives,
  deleteGeneralObjetive,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, registerGeneralObjetive).get(protect, getGeneralObjetives)
router.route('/:id').put(protect, updateGeneralObjetives).delete(protect, deleteGeneralObjetive)
module.exports = router
