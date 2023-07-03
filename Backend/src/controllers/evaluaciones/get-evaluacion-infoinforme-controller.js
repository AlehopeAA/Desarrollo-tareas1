'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords } = require('../../utils/queryPromises')
const { registrarEvaluacion } = require('../../utils/evaluacionUtilidades')
const { registrarTareasEvaluacion } = require('../../utils/evaluacionUtilidades')

// @desc    Obtiene la evaluacion para una persona, un mes y un año.
// @route   POST /api/evaluaciones/info
// @access  Private/Admin
const getEvaluacionInfoInforme = asyncHandler(async (req, res) => {
  const {
    mes_inicio,
    anyo_inicio,
    mes_fin,
    anyo_fin,
    trabajador_id,
    es_para_validar,
  } = req.body;

  if(anyo_fin < anyo_inicio) {
    res.status(500).json({'message':'El mes/año de inicio debe ser inferior al de fin'});
  } else if(anyo_fin == anyo_inicio && mes_fin < mes_inicio) { 
    res.status(500).json({'message':'El mes/año de inicio debe ser inferior al de fin'});
  }

  if(anyo_fin == anyo_inicio) {
     const queryEvaluaciones = `
        SELECT evaluaciones.mes, evaluaciones.anio, tareas.descripcion_tarea, detalle_evaluaciones.horas, detalle_evaluaciones.nivel_unidades, detalle_evaluaciones.nivel_unidades_corregido,
           detalle_evaluaciones.nivel_tiempo, detalle_evaluaciones.nivel_tiempo_corregido, detalle_evaluaciones.nivel_porcentaje_entrada, detalle_evaluaciones.nivel_porcentaje_entrada_corregido,
           detalle_evaluaciones.nivel_porcentaje_jornada, detalle_evaluaciones.nivel_porcentaje_jornada_corregido
        FROM evaluaciones 
        INNER JOIN detalle_evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion 
        INNER JOIN tareas ON tareas.id_tarea = detalle_evaluaciones.id_tarea 
        WHERE evaluaciones.id_puesto_trabajo = ${trabajador_id}
        AND mes >= ${mes_inicio}
        AND mes <= ${mes_fin}
        AND anio = ${anyo_inicio}
        ORDER BY descripcion_tarea, anio, mes`
     var evaluaciones = await getAllRecords(queryEvaluaciones)
  } else {
    const queryEvaluaciones = `
       SELECT evaluaciones.mes, evaluaciones.anio, tareas.descripcion_tarea, detalle_evaluaciones.horas, detalle_evaluaciones.nivel_unidades, detalle_evaluaciones.nivel_unidades_corregido,
          detalle_evaluaciones.nivel_tiempo, detalle_evaluaciones.nivel_tiempo_corregido, detalle_evaluaciones.nivel_porcentaje_entrada, detalle_evaluaciones.nivel_porcentaje_entrada_corregido,
          detalle_evaluaciones.nivel_porcentaje_jornada, detalle_evaluaciones.nivel_porcentaje_jornada_corregido
       FROM evaluaciones 
       INNER JOIN detalle_evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion 
       INNER JOIN tareas ON tareas.id_tarea = detalle_evaluaciones.id_tarea 
       WHERE evaluaciones.id_puesto_trabajo = ${trabajador_id}
       AND ((mes <= ${mes_fin} AND anio = ${anyo_fin}) OR (mes >= ${mes_inicio} AND anio = ${anyo_inicio}) OR (anio > ${anyo_inicio} AND anio <${anyo_fin}))
       order by descripcion_tarea, anio, mes`
    var evaluaciones = await getAllRecords(queryEvaluaciones)
  }

  if ( evaluaciones.length > 0) {
    res.status(200).json(evaluaciones);
  } else {
    res.status(500).json({'message':'No existe evaluación para los datos indicados.'});
  }
});

module.exports = getEvaluacionInfoInforme
