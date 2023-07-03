const getEvaluacionInfo = require('./get-evaluacion-info-controller')
const getEvaluacionCurrent = require('./get-evaluacion-current-controller')
const getEvaluacionAgregado = require('./get-evaluacion-agregado-controller')
const getEvaluacionResumen = require('./get-evaluacion-resumen-controller')
const getEvaluacionCalculo = require('./get-evaluacion-calculo-controller')
const updateEvaluacionCorreccion = require('./update-evaluacion-correccion-controller')
const deleteEvaluacionCorreccion = require('./delete-evaluacion-correccion-controller')
const updateEvaluacionCorreccionGlobal = require('./update-evaluacion-correccion-global-controller')
const deleteEvaluacionCorreccionGlobal = require('./delete-evaluacion-correccion-global-controller')
const updateEvaluacionValidacion = require('./update-evaluacion-validacion-controller')
const updateEvaluacionSupervision = require('./update-evaluacion-supervision-controller')
const supervisionMasiva = require('./update-supervision-masiva-controller')
const validacionMasiva = require('./update-validacion-masiva-controller')
const finalizarSupervision = require('./update-finalizar-supervision-controller')
const finalizarValidacion = require('./update-finalizar-validacion-controller')
const getEvaluacionInfoInforme = require('./get-evaluacion-infoinforme-controller')
const getEvaluacionResumenInforme = require('./get-evaluacion-resumen-informe-controller')

module.exports = {
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
}
