'use strict'

const asyncHandler = require('express-async-handler')
const jornadaUtilidades = require('../../utils/jornadaUtilidades')
const entradaUtilidades = require('../../utils/entradaUtilidades')
const responsabilidadUtilidades = require('../../utils/responsabilidadUtilidades')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Obtiene el detalle del calculo del nivel.
// @route   POST /api/evaluaciones/calculo
// @access  Private/Admin
const getEvaluacionCalculo = asyncHandler(async (req, res) => {
  const {
    id_detalle,
    tipo
  } = req.body;

  const query_detalle_tarea = `
                SELECT detalle_evaluaciones.id_tarea,
                    tareas.indicador,
                    tareas.cuantificable,
                    tareas.entrada,
                    tareas.compartida,
                    detalle_evaluaciones.horas,
                    detalle_evaluaciones.unidades, 
                    detalle_evaluaciones.dificultad,
                    evaluaciones.id_puesto_trabajo,
                    evaluaciones.mes,
                    evaluaciones.anio
                FROM detalle_evaluaciones 
                INNER JOIN tareas ON detalle_evaluaciones.id_tarea = tareas.id_tarea
                INNER JOIN evaluaciones ON detalle_evaluaciones.id_evaluacion = evaluaciones.id_evaluacion
                WHERE 
                    detalle_evaluaciones.id_detalle_evaluacion = ${id_detalle}
                `;
  const detalle_tarea = await getAllRecords(query_detalle_tarea)

  var respuesta = {'tipo': tipo}
  if (detalle_tarea.length > 0) {
    respuesta['tiene_indicador'] = detalle_tarea[0].indicador == 'SI'
    respuesta['unidades_tarea'] = detalle_tarea[0].unidades
    respuesta['horas_tarea'] = detalle_tarea[0].horas
    respuesta['compartida'] = detalle_tarea[0].compartida

    const query_objetivo = `
                SELECT objetivos.* 
                FROM objetivos 
                WHERE 
                    objetivos.id_tarea = ${detalle_tarea[0].id_tarea} AND
                    objetivos.dificultad = '${detalle_tarea[0].dificultad}'
                `;
    const objetivo = await getAllRecords(query_objetivo)


    if (tipo == 'unidades') {
      respuesta['cuantificable'] = detalle_tarea[0].cuantificable == 'SI'
      
      respuesta['tiene_unidad_minima'] = objetivo.length == 1 && objetivo[0].unidades_minimo >= 0
      if (objetivo.length == 1) {
        respuesta['magnitud'] = objetivo[0].magnitud_temporal
      }
      const dias_laborables_mes = await jornadaUtilidades.diasLaborablesMes(detalle_tarea[0].id_puesto_trabajo,  detalle_tarea[0].mes,  detalle_tarea[0].anio)
      respuesta['dias_laborables'] = Number(dias_laborables_mes.toFixed(2))

      respuesta['dias_mes'] = await jornadaUtilidades.diasMes(detalle_tarea[0].id_puesto_trabajo,  detalle_tarea[0].mes,  detalle_tarea[0].anio)
      const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(detalle_tarea[0].id_puesto_trabajo, detalle_tarea[0].id_tarea, detalle_tarea[0].mes,  detalle_tarea[0].anio)
      if (responsabilidad) {
         respuesta['responsabilidad'] = responsabilidad.resultado
      }
      
      if (objetivo.length == 1) {
        respuesta['unidades_minimo'] = objetivo[0].unidades_minimo
      }
      if (objetivo.length == 1) {
        respuesta['unidades_medio'] = objetivo[0].unidades_medio
      }
      if (objetivo.length == 1) {
        respuesta['unidades_maximo'] = objetivo[0].unidades_maximo
      }
    }
    if (tipo == 'tiempo') {
      respuesta['tiene_tiempo_minimo'] = objetivo.length == 1 && objetivo[0].tiempo_minimo >= 0
      if (objetivo.length == 1) {
        respuesta['tiempo_minimo'] = objetivo[0].tiempo_minimo
      }
      if (objetivo.length == 1) {
        respuesta['tiempo_medio'] = objetivo[0].tiempo_medio
      }
      if (objetivo.length == 1) {
        respuesta['tiempo_maximo'] = objetivo[0].tiempo_maximo
      }
    }
    if (tipo == 'entrada') {
      respuesta['entrada'] = detalle_tarea[0].entrada == 'SI'
      respuesta['tiene_entrada_minimo'] = objetivo.length == 1 && objetivo[0].porcentaje_entrada_minimo >= 0
      
      const queryEntrada = `
                            SELECT *
                            FROM entradas 
                            WHERE 
                                id_tarea = ${detalle_tarea[0].id_tarea} AND
                                mes = ${detalle_tarea[0].mes} AND
                                anio = ${detalle_tarea[0].anio}
                        `
      const entrada = await getAllRecords(queryEntrada)
      respuesta['registro_entrada'] = entrada.length > 0

      const queryEntradaNoCompartida = `
                            SELECT *
                            FROM entradas_no_compartidas
                            WHERE 
                            id_tarea = ${detalle_tarea[0].id_tarea} AND
                                id_puesto_trabajo = ${detalle_tarea[0].id_puesto_trabajo} AND
                                mes = ${detalle_tarea[0].mes} AND
                                anio = ${detalle_tarea[0].anio}
                            `
      const entradaNoCompartida = await getAllRecords(queryEntradaNoCompartida)
      respuesta['registro_entrada_no_compartida'] = entradaNoCompartida.length > 0
      
      if(entrada.length > 0) {
        const dias_Mes = await jornadaUtilidades.diasMes(detalle_tarea[0].id_puesto_trabajo, detalle_tarea[0].mes, detalle_tarea[0].anio)
        const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(detalle_tarea[0].id_puesto_trabajo, detalle_tarea[0].id_tarea, detalle_tarea[0].mes, detalle_tarea[0].anio)
        const porcentaje_entrada = (100 * detalle_tarea[0].unidades) / (entrada[0].entrada * responsabilidad.resultado * dias_Mes)
        respuesta['valor_entrada'] = entrada[0].entrada
        respuesta['porcentaje_entrada'] = porcentaje_entrada
      }      
      if(entradaNoCompartida.length > 0) {
        const dias_Mes = await jornadaUtilidades.diasMes(detalle_tarea[0].id_puesto_trabajo, detalle_tarea[0].mes, detalle_tarea[0].anio)
        const porcentaje_entrada = (100 * detalle_tarea[0].unidades) / (entradaNoCompartida[0].entrada * dias_Mes)
        respuesta['valor_entrada'] = entradaNoCompartida[0].entrada
        respuesta['porcentaje_entrada'] = porcentaje_entrada
      }
      
      if (objetivo.length == 1) {
        respuesta['entrada_minimo'] = objetivo[0].porcentaje_entrada_minimo
      }
      if (objetivo.length == 1) {
        respuesta['entrada_medio'] = objetivo[0].porcentaje_entrada_medio
      }
      if (objetivo.length == 1) {
        respuesta['entrada_maximo'] = objetivo[0].porcentaje_entrada_maximo
      }
    }
    if (tipo == 'jornada') {
      respuesta['tiene_jornada_minimo'] = objetivo.length == 1 && objetivo[0].porcentaje_jornada_minimo >= 0
      
      const jornada_laboral_mensual = await jornadaUtilidades.jornadaLaboralMensual(detalle_tarea[0].id_puesto_trabajo,  detalle_tarea[0].mes,  detalle_tarea[0].anio)
      respuesta['jornada_mensual_neta'] = jornada_laboral_mensual['jornada_laboral_mes_neta_entrada']
      
      if (objetivo.length == 1) {
        respuesta['jornada_minimo'] = objetivo[0].porcentaje_jornada_minimo
      }
      if (objetivo.length == 1) {
        respuesta['jornada_medio'] = objetivo[0].porcentaje_jornada_medio
      }
      if (objetivo.length == 1) {
        respuesta['jornada_maximo'] = objetivo[0].porcentaje_jornada_maximo
      }
    }
  }

  res.status(200).json(respuesta);
  
});

module.exports = getEvaluacionCalculo
