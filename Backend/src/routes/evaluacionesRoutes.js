'use strict'

const { Router } = require('express')
const router = Router()

const { 
    getEvaluacionInfo, 
    getEvaluacionCurrent, 
    getEvaluacionAgregado, 
    getEvaluacionResumen, 
    getEvaluacionCalculo, 
    updateEvaluacionCorreccion, 
    deleteEvaluacionCorreccion,
    updateEvaluacionCorreccionGlobal, 
    deleteEvaluacionCorreccionGlobal, 
    updateEvaluacionValidacion, 
    updateEvaluacionSupervision,
    supervisionMasiva,
    validacionMasiva,
    finalizarSupervision,
    finalizarValidacion,
    getEvaluacionInfoInforme,
    getEvaluacionResumenInforme,
 } = require('../controllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/current').post( protect, getEvaluacionCurrent)
router.route('/info').post( protect, getEvaluacionInfo)
router.route('/agregado').post( protect, getEvaluacionAgregado)
router.route('/resumen').post( protect, getEvaluacionResumen)
router.route('/calculo').post( protect, getEvaluacionCalculo)
router.route('/correccion/:id').put(protect, updateEvaluacionCorreccion).delete(protect, deleteEvaluacionCorreccion)
router.route('/correccionglobal/:id').put(protect, updateEvaluacionCorreccionGlobal).delete(protect, deleteEvaluacionCorreccionGlobal)
router.route('/validacion/:id').put(protect, updateEvaluacionValidacion)
router.route('/supervision/:id').put(protect, updateEvaluacionSupervision)
router.route('/supervisionmasiva/:id').put(protect, supervisionMasiva)
router.route('/validacionmasiva/:id').put(protect, validacionMasiva)
router.route('/finalizarsupervision/:id').put(protect, finalizarSupervision)
router.route('/finalizarvalidacion/:id').put(protect, finalizarValidacion)
router.route('/infoinforme').post( protect, getEvaluacionInfoInforme)
router.route('/resumeninforme').post( protect, getEvaluacionResumenInforme)

module.exports = router
