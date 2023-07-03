'use strict'

const asyncHandler = require('express-async-handler')
const jornadaUtilidades = require('../../utils/jornadaUtilidades')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Obtiene la evaluacion actual para el solicitante.
// @route   POST /api/evaluaciones/current
// @access  Private/Admin
const getEvaluacionCurrent = asyncHandler(async (req, res) => {
  const { id_puesto } = req.user
  let fecha_seleccionada = new Date();
  
  const queryConfiguracion = `
      SELECT *
      FROM configuraciones 
      WHERE parametro = 'registro_actividad'`
  var configuracion = await getAllRecords(queryConfiguracion)

  if (fecha_seleccionada.getDate() < configuracion[0].valor) {
    //Es el del mes anterior
    fecha_seleccionada = new Date(fecha_seleccionada.getFullYear(), fecha_seleccionada.getMonth()-1, 1);
  }      
  
  var mes = ''
     mes = fecha_seleccionada.getMonth();
  const anyo = fecha_seleccionada.getFullYear();
  
  const queryEvaluaciones = `
      SELECT *
      FROM evaluaciones 
      WHERE id_puesto_trabajo = ${id_puesto}
      AND mes = ${mes}
      AND anio = ${anyo}`
  var evaluaciones = await getAllRecords(queryEvaluaciones)
  
  if (req.body.check) {
    //Solo hay que chequearlo.
    res.status(200).json({tiene_actual: evaluaciones.length == 1});
  }
  else {
    if ( evaluaciones.length == 1) {
      const jornada_mensual = await jornadaUtilidades.jornadaLaboralMensual(id_puesto, mes, anyo);
      evaluaciones[0].jornada_laboral_mensual = jornada_mensual.jornada_laboral_mes

      const queryHorasRegistradas = `
        SELECT IFNULL(SUM(detalle_evaluaciones.horas), 0) as horas
        FROM detalle_evaluaciones 
        INNER JOIN tareas
        ON tareas.id_tarea = detalle_evaluaciones.id_tarea 
        INNER JOIN evaluaciones
        ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
        WHERE 
        evaluaciones.id_puesto_trabajo = ${id_puesto} 
        AND evaluaciones.mes = ${mes} 
        AND evaluaciones.anio = ${anyo}`
      const horasRegistradas = await getAllRecords(queryHorasRegistradas)

      evaluaciones[0].horas_registradas = horasRegistradas[0].horas

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
  }
  
});

module.exports = getEvaluacionCurrent
