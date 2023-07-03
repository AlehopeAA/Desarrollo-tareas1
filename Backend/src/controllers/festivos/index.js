const registerFestivo = require('./register-festivo-controller')
const updateFestivo = require('./update-festivo-controller')
const getFestivos = require('./get-festivos-controller')
const getFestivoById = require('./get-festivo-by-id-controller')
const deleteFestivo = require('./delete-festivo-controller')

module.exports = {
  registerFestivo,
  updateFestivo,
  getFestivos,
  getFestivoById,
  deleteFestivo,
}
