'use strict'

const asyncHandler = require('express-async-handler')
const jornadaUtilidades = require('../../utils/jornadaUtilidades')
const { getOneRecord, getAllRecords } = require('../../utils/queryPromises')

// @desc    Obtiene el resumen de la evaluacion para una persona, un mes y un año.
// @route   POST /api/evaluaciones/resumen
// @access  Private/Admin
const getEvaluacionResumen = asyncHandler(async (req, res) => {
  const {
    mes,
    anyo,
    trabajador_id
  } = req.body;

  const queryHorasTrabajadas = `
        SELECT IFNULL(SUM(detalle_evaluaciones.horas), 0) as horas
        FROM detalle_evaluaciones 
        INNER JOIN tareas
        ON tareas.id_tarea = detalle_evaluaciones.id_tarea 
        INNER JOIN evaluaciones
        ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
        WHERE 
        evaluaciones.id_puesto_trabajo = ${trabajador_id} 
        AND evaluaciones.mes = ${mes} 
        AND evaluaciones.anio = ${anyo}
        AND tareas.id_tipo_tarea IN (1,2,3,4)`
  const horasTrabajadas = await getAllRecords(queryHorasTrabajadas)

  const queryHorasAusencias = `
        SELECT IFNULL(SUM(detalle_evaluaciones.horas), 0) as horas
        FROM detalle_evaluaciones 
        INNER JOIN tareas
        ON tareas.id_tarea = detalle_evaluaciones.id_tarea 
        INNER JOIN evaluaciones
        ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
        WHERE 
        evaluaciones.id_puesto_trabajo = ${trabajador_id} 
        AND evaluaciones.mes = ${mes} 
        AND evaluaciones.anio = ${anyo}
        AND tareas.id_tipo_tarea IN (5)`
  const horasAusencias = await getAllRecords(queryHorasAusencias)
  
  const jornada_semanal = await getOneRecord(`SELECT jornada_laboral FROM puestos_trabajo WHERE id_puesto = ${trabajador_id}`)

  const jornada_mensual = await jornadaUtilidades.jornadaLaboralMensual(trabajador_id, mes, anyo);

  const dias_laborables_mes = await jornadaUtilidades.diasLaborablesMes(trabajador_id, mes, anyo);

  res.status(200).json({'horas_trabajadas': horasTrabajadas[0].horas, 
                        'horas_ausencias': horasAusencias[0].horas, 
                        'horas_total': horasTrabajadas[0].horas + horasAusencias[0].horas, 
                        'jornada_semanal': jornada_semanal[0].jornada_laboral,
                        'jornada_mensual': jornada_mensual.jornada_laboral_mes_inicial,
                        'jornada_mensual_neta': Number(jornada_mensual.jornada_mes_tipo.toFixed(2)),
                        'dias_laborables': Number(dias_laborables_mes.toFixed(2)),
                        'horas_teoricas': Number((jornada_mensual.jornada_mes_tipo - horasAusencias[0].horas).toFixed(2)),
                        'porcentaje_jornada': Number(((jornada_mensual.jornada_mes_tipo - horasAusencias[0].horas) * 100.0 / jornada_mensual.jornada_mes_tipo).toFixed(2)),
                        'porcentaje_carga': Number(((horasTrabajadas[0].horas + horasAusencias[0].horas) * 100.0 / (jornada_mensual.jornada_mes_tipo)).toFixed(2))
                      });
  
});

module.exports = getEvaluacionResumen
