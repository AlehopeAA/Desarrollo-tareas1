'use strict'

const { Router } = require('express')
const router = Router()

const { protect } = require('../middleware/authMiddleware')
const {
  getTeamsWorkByResponsible,
  getTeamsWorkList,
  getTeamsWorkByValidator,
  registerOrUpdateTeamWorkByResponsable,
  registerOrUpdateTeamWorkByValidator,
} = require('../controllers')

router.route('/').get(protect, getTeamsWorkList)

router.route('/responsables').post(protect, registerOrUpdateTeamWorkByResponsable)
router.route('/responsables/:idPuesto').get(protect, getTeamsWorkByResponsible)

router.route('/validadores').post(protect, registerOrUpdateTeamWorkByValidator)
router.route('/validadores/:idPuesto').get(protect, getTeamsWorkByValidator)

module.exports = router
