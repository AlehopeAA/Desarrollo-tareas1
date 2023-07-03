'use strict'

const asyncHandler = require('express-async-handler')
const jornadaUtilidades = require('../../utils/jornadaUtilidades')

// @desc    Calculate the effective working days per month
// @route   POST /api/calculos/dias
// @access  Private/Admin
const daysCalculus = asyncHandler(async (req, res) => {
  const { id_puesto } = req.user
  const {
    mes,
    anyo
  } = req.body;

  const respuesta = await jornadaUtilidades.diasLaborablesMes(id_puesto,mes, anyo);
  res.status(200).json({resultado: respuesta});
});

module.exports = daysCalculus
