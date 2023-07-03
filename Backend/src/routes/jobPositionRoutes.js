'use strict'

const { Router } = require('express')
const router = Router()
const { protect } = require('../middleware/authMiddleware')
const {
  registerJobPosition,
  updateJobPosition,
  getJobPositions,
  getJobPositionById,
  deleteJobPosition,
  getJobPositionsByRole,
  getJobPositionsByProfileId,
  getJobPositionsInforme,
  getJobPositionsValidacion,
  getJobPositionsSupervision,
  getJobPositionByRoleId,
  getHistoricalJobPositions,
} = require('../controllers')

router.route('/permisos/:id').get(protect, getJobPositionByRoleId)
router.route('/historicos/:id').get(protect, getHistoricalJobPositions) 
router.route('/').post(registerJobPosition).get(protect, getJobPositions)
router.route('/roles/:roleName').get(protect, getJobPositionsByRole)
router.route('/perfiles/:id').get(protect, getJobPositionsByProfileId)
router.route('/informe').get(protect, getJobPositionsInforme)
router.route('/validacion').post(protect, getJobPositionsValidacion)
router.route('/supervision').post(protect, getJobPositionsSupervision)
router.route('/:id').put(protect, updateJobPosition).get(getJobPositionById).delete(deleteJobPosition)

module.exports = router
