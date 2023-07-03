'use strict'

const asyncHandler = require('express-async-handler')
const entradaUtilidades = require('../../utils/entradaUtilidades')


// @desc    Calculate the entry percentage
// @route   POST /api/calculos/entrada
// @access  Private/Admin
const entryCalculus = asyncHandler(async (req, res) => {
  const { id_puesto } = req.user
  const {
    id_tarea,
    mes,
    anyo,
    entrada_puesto
  } = req.body
  
  res.status(200).json({resultado: entradaUtilidades.calcularPorcentajeEntrada(id_puesto, id_tarea, mes, anyo, entrada_puesto)});
})

module.exports = entryCalculus
