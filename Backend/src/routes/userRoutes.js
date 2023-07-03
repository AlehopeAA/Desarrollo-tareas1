'use strict'

const { Router } = require('express')
const router = Router()
const { authUser, getAvisos, verifyToken, getInfoProfile, getFavoritesTasks, registerFavoritesTasks } = require('../controllers/users')
const { protect } = require('../middleware/authMiddleware')

router.post('/login', authUser)
router.post('/verifyToken', verifyToken)
router.route('/avisos').post(protect, getAvisos)
router.route('/tareasfavoritas').post(registerFavoritesTasks)
router.route('/tareasfavoritas/:idPuesto').get(protect, getFavoritesTasks)
router.route('/info-profile/:id').get(getInfoProfile)

module.exports = router
