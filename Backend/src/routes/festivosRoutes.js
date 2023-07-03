'use strict'

const { Router } = require('express')
const router = Router()

const {
  registerFestivo,
  updateFestivo,
  getFestivos,
  getFestivoById,
  deleteFestivo,
} = require('../controllers')

router.route('/').post(registerFestivo).get(getFestivos)
router.route('/:id').put(updateFestivo).get(getFestivoById).delete(deleteFestivo)

module.exports = router
