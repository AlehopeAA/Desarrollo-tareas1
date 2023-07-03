'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords, registerRecord } = require('../../utils/queryPromises')
const { recalcularNivelGlobal } = require('../../utils/evaluacionUtilidades')

// @desc    Update correccion
// @route   put /api/evaluaciones/correcciones/:id
// @access  Private/Admin
const updateEvaluacionCorreccion = asyncHandler(async (req, res) => {
    const id = req.params.id
    const {
      nivel_unidades_corregido,
      nivel_tiempo_corregido,
      nivel_porcentaje_jornada_corregido,
      nivel_porcentaje_entrada_corregido,
      observaciones,
      es_supervision, 
    } = req.body



    let keysValuesQuery = [`evaluacion = 'CORREGIDO'`]
    if (es_supervision) {
        keysValuesQuery = [`supervision = 'CORREGIDO'`]
    }
    
    keysValuesQuery.push(`nivel_unidades_corregido = ${nivel_unidades_corregido == null ? nivel_unidades_corregido : `'${nivel_unidades_corregido}'` }`)
    keysValuesQuery.push(`nivel_tiempo_corregido = ${nivel_tiempo_corregido == null ? nivel_tiempo_corregido : `'${nivel_tiempo_corregido}'` }`)
    keysValuesQuery.push(`nivel_porcentaje_jornada_corregido = ${nivel_porcentaje_jornada_corregido == null ? nivel_porcentaje_jornada_corregido : `'${nivel_porcentaje_jornada_corregido}'` }`)
    keysValuesQuery.push(`nivel_porcentaje_entrada_corregido = ${nivel_porcentaje_entrada_corregido == null ? nivel_porcentaje_entrada_corregido : `'${nivel_porcentaje_entrada_corregido}'` }`)
    keysValuesQuery.push(`observaciones = ${observaciones == null ? observaciones : `'${observaciones}'` }`)

    
    const existCorreccionQuery = `
                                SELECT * 
                                FROM detalle_evaluaciones 
                                WHERE id_detalle_evaluacion = ${id}
                              `
    const detalleEvaluacion = await getAllRecords(existCorreccionQuery)
    if (!detalleEvaluacion.length) {
        res.status(400).json({ message: 'No existe la corrección con ese id' })
    }
    else {
      
      await registerRecord(`UPDATE detalle_evaluaciones SET ${keysValuesQuery.toString()} WHERE id_detalle_evaluacion = '${id}'`)
      //Tenemos que recalcular el nivel global de la evaluacion.
      const nivel_global_corregido = await recalcularNivelGlobal(detalleEvaluacion[0].id_evaluacion)
      
      const actualizarNivelGlobalCorregidoQuery = `
                                UPDATE evaluaciones
                                SET nivel_global_corregido = ${nivel_global_corregido == null ? nivel_global_corregido : `'${nivel_global_corregido}'`}
                                WHERE 
                                  id_evaluacion = ${detalleEvaluacion[0].id_evaluacion}
                              `
      await registerRecord(actualizarNivelGlobalCorregidoQuery)
      
      res.status(200).json({ nivel_global_corregido: nivel_global_corregido })
  }

})

module.exports = updateEvaluacionCorreccion
