const registerConfiguracion = require('./register-configuracion-controller')
const updateConfiguracion = require('./update-configuracion-controller')
const getConfiguracions = require('./get-configuraciones-controller')
const getConfiguracionById = require('./get-configuracion-by-id-controller')
const deleteConfiguracion = require('./delete-configuracion-controller')
const getHistoricalConfiguracion = require('./get-historical-configuracion-controller')

module.exports = {
  registerConfiguracion,
  updateConfiguracion,
  getConfiguracions,
  getConfiguracionById,
  deleteConfiguracion,
  getHistoricalConfiguracion,
}
