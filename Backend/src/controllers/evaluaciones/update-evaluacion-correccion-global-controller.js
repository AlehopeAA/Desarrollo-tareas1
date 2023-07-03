'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords, registerRecord } = require('../../utils/queryPromises')
const { recalcularNivelGlobal } = require('../../utils/evaluacionUtilidades')

// @desc    Update correccion global
// @route   put /api/evaluaciones/correccionglobal/:id
// @access  Private/Admin
const updateEvaluacionCorreccionGlobal = asyncHandler(async (req, res) => {
    const id = req.params.id
    const {
      nivel_global_corregido,
    } = req.body

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
      
      await registerRecord(`UPDATE evaluaciones SET nivel_global_corregido='${nivel_global_corregido}' WHERE id_evaluacion = '${id}'`)
      
      res.status(200).json({ nivel_global_corregido: nivel_global_corregido })
  }

})

module.exports = updateEvaluacionCorreccionGlobal
