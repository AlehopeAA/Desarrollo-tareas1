'use strict'

const asyncHandler = require('express-async-handler')
const jornadaUtilidades = require('../../utils/jornadaUtilidades')


// @desc    Calculate the number of hours of your monthly workday and the number of hours of your net actual monthly workday (no absences)
// @route   POST /api/calculos/jornada
// @access  Private/Admin
const workingDayCalculus = asyncHandler(async (req, res) => {
  const { id_puesto } = req.user
  const {
    mes,
    anyo
  } = req.body
  const respuesta = await jornadaUtilidades.jornadaLaboralMensual(id_puesto,mes, anyo);
  res.status(200).json(respuesta);
})

module.exports = workingDayCalculus