'use strict'

const { Router } = require('express')
const router = Router()

const { getDashboard } = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post( protect, getDashboard)

module.exports = router
