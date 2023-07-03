'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerOrdExtOther,
  getOrdExtOtherObjetives,
  updateOrdExtObjetives,
  deleteOrdExtObjetive,
  getHistoricalObjetives,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, registerOrdExtOther)
router.route('/').get(protect, getOrdExtOtherObjetives)
router.route('/:id').put(protect, updateOrdExtObjetives).delete(protect, deleteOrdExtObjetive).get(protect, getHistoricalObjetives)

module.exports = router
