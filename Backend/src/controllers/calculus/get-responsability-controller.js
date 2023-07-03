'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const responsabilidadUtilidades = require('../../utils/responsabilidadUtilidades')




// @desc    Calculate the percentage of responsibility adjusted according to your working day
// @route   POST /api/calculos/responsabilidad
// @access  Private/Admin
const responsabilityCalculus = asyncHandler(async (req, res) => {
  const { id_puesto } = req.user
  const {
    id_tarea,
    mes,
    anyo
  } = req.body
  
  const resultado = await responsabilidadUtilidades.calcularResponsabilidad(id_puesto, id_tarea, mes, anyo);
  res.status(200).json(resultado);
})

module.exports = responsabilityCalculus