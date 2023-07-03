'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords, registerRecord } = require('../../utils/queryPromises')
const { recalcularNivelGlobal } = require('../../utils/evaluacionUtilidades')

// @desc    Delete correccion
// @route   delete /api/evaluaciones/correcciones/:id
// @access  Private/Admin
const deleteEvaluacionCorreccion = asyncHandler(async (req, res) => {
    const id = req.params.id
  
    const keysValuesQuery = ['nivel_unidades_corregido = null', 'nivel_tiempo_corregido = null', 'nivel_porcentaje_entrada_corregido = null', 'nivel_porcentaje_jornada_corregido = null', 'observaciones = null' ]
  
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
        if ( detalleEvaluacion[0].evaluacion == 'CORREGIDO') {
            keysValuesQuery.push(`evaluacion = 'NO'`)
            detalleEvaluacion[0].evaluacion = 'NO'
        }
        if ( detalleEvaluacion[0].supervision == 'CORREGIDO') {
            keysValuesQuery.push(`supervision = 'NO'`)
            detalleEvaluacion[0].supervision = 'NO'
        }

        await registerRecord(`UPDATE detalle_evaluaciones SET ${keysValuesQuery.toString()} WHERE id_detalle_evaluacion = '${id}'`)
        
        //Tenemos que recalcular el nivel global de la evaluacion ya que han cambiado los valores.
        //Primero chequeamos si hay alguno corregido.
        let nivel_global_corregido = null
        const existenAunCorreccionesQuery = `
                                SELECT *
                                FROM detalle_evaluaciones
                                WHERE 
                                  id_evaluacion = ${detalleEvaluacion[0].id_evaluacion} AND
                                  (supervision = 'CORREGIDO' OR
                                  evaluacion = 'CORREGIDO')
                              `
        const existenCorrecciones = await getAllRecords(existenAunCorreccionesQuery)

        if(existenCorrecciones.length > 0) {
            //Tenemos que calcularlo.
            nivel_global_corregido = await recalcularNivelGlobal(detalleEvaluacion[0].id_evaluacion)
        }

        const actualizarNivelGlobalCorregidoQuery = `
                                UPDATE evaluaciones
                                SET nivel_global_corregido = ${nivel_global_corregido == null ? nivel_global_corregido : `'${nivel_global_corregido}'`}
                                WHERE 
                                  id_evaluacion = ${detalleEvaluacion[0].id_evaluacion}
                              `
        await registerRecord(actualizarNivelGlobalCorregidoQuery)
        
        res.status(200).json({ detalle: detalleEvaluacion[0], nivel_global_corregido: nivel_global_corregido})
    }
})

module.exports = deleteEvaluacionCorreccion
