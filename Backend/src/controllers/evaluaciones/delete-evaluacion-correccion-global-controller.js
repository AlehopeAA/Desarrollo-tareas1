'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords, registerRecord } = require('../../utils/queryPromises')
const { recalcularNivelGlobal } = require('../../utils/evaluacionUtilidades')

// @desc    Delete correccion global
// @route   delete /api/evaluaciones/correccionglobal/:id
// @access  Private/Admin
const deleteEvaluacionCorreccionGlobal = asyncHandler(async (req, res) => {
    const id = req.params.id
  
    const existCorreccionQuery = `
                                SELECT * 
                                FROM evaluaciones 
                                WHERE id_evaluacion = ${id}
                              `
    const detalleEvaluacion = await getAllRecords(existCorreccionQuery)
    if (!detalleEvaluacion.length) {
        res.status(400).json({ message: 'No existe evaluación con ese id' })
    }
    else {
        await registerRecord(`UPDATE evaluaciones SET nivel_global_corregido = null WHERE id_evaluacion = '${id}'`)
        
        res.status(200).json({ detalle: detalleEvaluacion[0], nivel_global_corregido: null})
    }
})

module.exports = deleteEvaluacionCorreccionGlobal
