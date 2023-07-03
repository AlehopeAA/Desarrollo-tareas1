'use strict'

const { Router } = require('express')
const router = Router()
const { protect } = require('../middleware/authMiddleware')

const {
  registerConfiguracion,
  updateConfiguracion,
  getConfiguracions,
  getConfiguracionById,
  deleteConfiguracion,
  getHistoricalConfiguracion,
} = require('../controllers')

router.route('/').post(registerConfiguracion).get(getConfiguracions)
router.route('/historicos/:id').get(protect, getHistoricalConfiguracion) 
router.route('/:id').put(protect, updateConfiguracion).get(getConfiguracionById).delete(deleteConfiguracion)

module.exports = router
