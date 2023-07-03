'use strict'

const { Router } = require('express')
const router = Router()

const { entryCalculus, workingDayCalculus, daysCalculus, responsabilityCalculus } = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/entrada').post(protect, entryCalculus)
router.route('/jornada').post(protect, workingDayCalculus )
router.route('/dias').post(protect, daysCalculus )
router.route('/responsabilidad').post(protect, responsabilityCalculus )


module.exports = router
