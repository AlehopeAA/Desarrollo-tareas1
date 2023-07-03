'use strict'

const { Router } = require('express')
const router = Router()

const {
  getMisObjetivos,
} = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getMisObjetivos)

module.exports = router
