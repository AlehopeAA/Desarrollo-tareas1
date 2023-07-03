'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords } = require('../../utils/queryPromises')
const { registrarEvaluacion } = require('../../utils/evaluacionUtilidades')
const { registrarTareasEvaluacion } = require('../../utils/evaluacionUtilidades')

// @desc    Obtiene la evaluacion para una persona, un mes y un año.
// @route   POST /api/evaluaciones/info
// @access  Private/Admin
const getEvaluacionInfo = asyncHandler(async (req, res) => {
  const {
    mes,
    anyo,
    trabajador_id,
    es_para_validar,
  } = req.body;

  const queryEvaluaciones = `
      SELECT *
      FROM evaluaciones 
      WHERE id_puesto_trabajo = ${trabajador_id}
      AND mes = ${mes}
      AND anio = ${anyo}`
  var evaluaciones = await getAllRecords(queryEvaluaciones)

  if(es_para_validar) {
    if(evaluaciones.length == 0) {
      //Hay que crearla.
      await registrarEvaluacion(mes, anyo, trabajador_id)
      evaluaciones = await getAllRecords(queryEvaluaciones)
    } else if(evaluaciones.length == 1 && evaluaciones[0].supervisada !== 'SI' && evaluaciones[0].validada !== 'SI') {
      //Hay que añadir las nuevas tareas y las recalcular las tareas no supervisadas ni validadas
      await registrarTareasEvaluacion(mes, anyo, trabajador_id)
    }
  }
  
  
  if ( evaluaciones.length == 1) {
    const queryDetalles = `
          SELECT detalle_evaluaciones.id_detalle_evaluacion, 
          tipos_tarea.tipo_tarea, 
          tareas.descripcion_tarea, 
          detalle_evaluaciones.horas,
          detalle_evaluaciones.unidades,
          detalle_evaluaciones.nivel_unidades,
          detalle_evaluaciones.nivel_unidades_corregido,
          detalle_evaluaciones.nivel_tiempo,
          detalle_evaluaciones.nivel_tiempo_corregido,
          detalle_evaluaciones.nivel_porcentaje_entrada,
          detalle_evaluaciones.nivel_porcentaje_entrada_corregido,
          detalle_evaluaciones.nivel_porcentaje_jornada,
          detalle_evaluaciones.nivel_porcentaje_jornada_corregido,
          detalle_evaluaciones.observaciones, 
          detalle_evaluaciones.supervision, 
          detalle_evaluaciones.evaluacion,
          tareas.dificultad, 
          detalle_evaluaciones.dificultad as nivel_dificultad
          FROM detalle_evaluaciones 
          INNER JOIN tareas
          ON tareas.id_tarea = detalle_evaluaciones.id_tarea 
          INNER JOIN tipos_tarea
          ON tipos_tarea.id_tipo_tarea = tareas.id_tipo_tarea
          WHERE detalle_evaluaciones.id_evaluacion = ${evaluaciones[0].id_evaluacion}`
    const detalles = await getAllRecords(queryDetalles)
    evaluaciones[0]['detalles'] = detalles;
    res.status(200).json(evaluaciones[0]);
  }
  else {
    res.status(500).json({'message':'No existe evaluación para los datos indicados.'});
  }
});

module.exports = getEvaluacionInfo
