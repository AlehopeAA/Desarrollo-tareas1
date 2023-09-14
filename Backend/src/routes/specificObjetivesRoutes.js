'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerSpecificObjetive,
  getSpecificObjetives,
  updateSpecificObjetives,
  deleteSpecificObjetive,
  objetivos,
} = require('../controllers')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, registerSpecificObjetive)
router.route('/').get(protect, getSpecificObjetives)
router.route('/:id').put(protect, updateSpecificObjetives).delete(protect, deleteSpecificObjetive)
router.route('/nuevo/:tarea').get(protect, objetivos)
module.exports = router
