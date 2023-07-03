'use strict'

const { getAllRecords, registerRecord, queryPromise } = require('./queryPromises')
const jornadaUtilidades = require('./jornadaUtilidades')
const entradaUtilidades = require('./entradaUtilidades')
const responsabilidadUtilidades = require('./responsabilidadUtilidades')


const recalcularNivelGlobal = async (id_evaluacion) => {
    const detallesQuery = `
                                SELECT *
                                FROM detalle_evaluaciones
                                WHERE 
                                  id_evaluacion = ${id_evaluacion}
                              `
    const detalles = await getAllRecords(detallesQuery)

    let horas_totales = 0
    let horas_totales_evaluadas = 0
    let sumatorio_tareas = 0
    for (let i = 0; i < detalles.length; i++) {
        if(detalles[i].horas > 0) {
            horas_totales = horas_totales + detalles[i].horas
        }
    }

    //Calculamos para cada detalle su nivel global.
    //Calculamos el desempeño global de los detalles.
    for (let i = 0; i < detalles.length; i++) {
        detalles[i]['nivel_global'] = 'N/A' 
        const niveles_evaluacion = ['nivel_unidades', 'nivel_tiempo', 'nivel_porcentaje_entrada', 'nivel_porcentaje_jornada']
        const niveles_evaluacion_corregidos = ['nivel_unidades_corregido', 'nivel_tiempo_corregido', 'nivel_porcentaje_entrada_corregido', 'nivel_porcentaje_jornada_corregido']
        let suma_indicadores = 0
        let numero_indicadores = 0
        for (const index in niveles_evaluacion) {
            if ((detalles[i][niveles_evaluacion_corregidos[index]] == 'INSATISFACTORIO') || 
                (detalles[i][niveles_evaluacion_corregidos[index]] == null && 
                    detalles[i][niveles_evaluacion[index]] == 'INSATISFACTORIO')) {
                suma_indicadores = suma_indicadores + 0
                numero_indicadores = numero_indicadores + 1.0
            }
            if ((detalles[i][niveles_evaluacion_corregidos[index]] == 'SATISFACTORIO') || 
                (detalles[i][niveles_evaluacion_corregidos[index]] == null && 
                    detalles[i][niveles_evaluacion[index]] == 'SATISFACTORIO')) {
                suma_indicadores = suma_indicadores + 1
                numero_indicadores = numero_indicadores + 1.0
            }
            if ((detalles[i][niveles_evaluacion_corregidos[index]] == 'ALTO') || 
                (detalles[i][niveles_evaluacion_corregidos[index]] == null && 
                    detalles[i][niveles_evaluacion[index]] == 'ALTO')) {
                suma_indicadores = suma_indicadores + 2
                numero_indicadores = numero_indicadores + 1.0
            }
            if ((detalles[i][niveles_evaluacion_corregidos[index]] == 'EXCELENTE') || 
                (detalles[i][niveles_evaluacion_corregidos[index]] == null && 
                    detalles[i][niveles_evaluacion[index]] == 'EXCELENTE')) {
                suma_indicadores = suma_indicadores + 3
                numero_indicadores = numero_indicadores + 1.0
            }
        }

        let valor_nivel_global_tarea = 0
        if (numero_indicadores > 0) {
            valor_nivel_global_tarea = detalles[i].horas * (suma_indicadores / numero_indicadores)
            sumatorio_tareas = sumatorio_tareas + valor_nivel_global_tarea
            horas_totales_evaluadas = horas_totales_evaluadas + detalles[i].horas
        }
    }

    //Calculo del nivel global.
    let nivel_global_evaluacion = 'N/A'

    if( sumatorio_tareas/horas_totales_evaluadas < 0.5 ) {
        nivel_global_evaluacion = 'INSATISFACTORIO'    
    }
    if( 0.5 <= sumatorio_tareas/horas_totales_evaluadas && sumatorio_tareas/horas_totales_evaluadas < 1.5 ) {
        nivel_global_evaluacion = 'SATISFACTORIO'    
    }
    if( 1.5 <= sumatorio_tareas/horas_totales_evaluadas && sumatorio_tareas/horas_totales_evaluadas < 2.5  ) {
        nivel_global_evaluacion = 'ALTO'    
    }
    if( sumatorio_tareas/horas_totales_evaluadas >= 2.5 ) {
        nivel_global_evaluacion = 'EXCELENTE'    
    }
    
    return nivel_global_evaluacion
}


const registrarEvaluacion = async(mes, anyo, id_puesto) => {
    //Una tarea puede tener diferentes dificultades..
    //Se pretende sacar la duracion de las tareas, para cada dificultad.

    //Obtenemos las de dificultad media.
    const query_tareas_media = `
                SELECT actividades.id_tarea,
                    tareas.indicador,
                    tareas.cuantificable,
                    tareas.entrada,
                    tareas.compartida,
                    tareas.dificultad,
                    tareas.acumulativa,
                    'MEDIA' as nivel_dificultad,
                    IFNULL(SUM(actividades.horas), 0) as horas_sumadas, 
                    IFNULL(SUM(actividades.unidades), 0) as unidades_sumadas 
                FROM actividades 
                INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
                INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
                WHERE 
                    tareas.dificultad = 'NO' AND
                    actividades.id_puesto = ${id_puesto} AND
                    MONTH(actividades.fecha_actividad) = ${mes} AND 
                    YEAR(actividades.fecha_actividad) = ${anyo} 
                GROUP BY actividades.id_tarea`;
    const tareas_media = await getAllRecords(query_tareas_media)

    //Obtenemos las de dificultad media.
    const query_tareas_media2 = `
                SELECT actividades.id_tarea,
                    tareas.indicador,
                    tareas.cuantificable,
                    tareas.entrada,
                    tareas.compartida,
                    tareas.dificultad,
                    tareas.acumulativa,
                    'MEDIA' as nivel_dificultad,
                    IFNULL(SUM(actividades.horas), 0) as horas_sumadas, 
                    IFNULL(SUM(actividades.unidades), 0) as unidades_sumadas 
                FROM actividades 
                INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
                INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
                WHERE 
                    tareas.dificultad = 'SI' AND
                    NOT EXISTS(SELECT * FROM codigos_trazabilidad_actividad WHERE codigos_trazabilidad_actividad.id_actividad = actividades.id_actividad) AND
                    actividades.id_puesto = ${id_puesto} AND
                    MONTH(actividades.fecha_actividad) = ${mes} AND 
                    YEAR(actividades.fecha_actividad) = ${anyo} 
                GROUP BY actividades.id_tarea`;
    const tareas_media2 = await getAllRecords(query_tareas_media2)

    //Obtenemos las de dificultad baja.
    const query_tareas_baja = `
                SELECT actividades.id_tarea,
                    tareas.indicador,
                    tareas.cuantificable,
                    tareas.entrada,
                    tareas.compartida,
                    tareas.dificultad,
                    tareas.acumulativa,
                    dificultades.dificultad as nivel_dificultad,
                    IFNULL(SUM(actividades.horas), 0) as horas_sumadas, 
                    IFNULL(SUM(actividades.unidades), 0) as unidades_sumadas 
                FROM actividades 
                INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
                INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
                INNER JOIN codigos_trazabilidad_actividad ON actividades.id_actividad = codigos_trazabilidad_actividad.id_actividad 
                INNER JOIN dificultades ON tareas.id_tarea = dificultades.id_tarea and codigos_trazabilidad_actividad.codigo_trazabilidad = dificultades.codigo_trazabilidad
                WHERE 
                    tareas.dificultad = 'SI' AND
                    actividades.id_puesto = ${id_puesto} AND
                    MONTH(actividades.fecha_actividad) = ${mes} AND 
                    YEAR(actividades.fecha_actividad) = ${anyo} AND
                    dificultades.dificultad = 'BAJA' 
                GROUP BY actividades.id_tarea`;
    const tareas_baja = await getAllRecords(query_tareas_baja)

    //Obtenemos las de dificultad alta.
    const query_tareas_alta = `
                SELECT actividades.id_tarea,
                    tareas.indicador,
                    tareas.cuantificable,
                    tareas.entrada,
                    tareas.compartida,
                    tareas.dificultad,
                    tareas.acumulativa,
                    dificultades.dificultad as nivel_dificultad,
                    IFNULL(SUM(actividades.horas), 0) as horas_sumadas, 
                    IFNULL(SUM(actividades.unidades), 0) as unidades_sumadas 
                FROM actividades 
                INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
                INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
                INNER JOIN codigos_trazabilidad_actividad ON actividades.id_actividad = codigos_trazabilidad_actividad.id_actividad 
                INNER JOIN dificultades ON tareas.id_tarea = dificultades.id_tarea and codigos_trazabilidad_actividad.codigo_trazabilidad = dificultades.codigo_trazabilidad
                WHERE 
                    tareas.dificultad = 'SI' AND
                    actividades.id_puesto = ${id_puesto} AND
                    MONTH(actividades.fecha_actividad) = ${mes} AND 
                    YEAR(actividades.fecha_actividad) = ${anyo} AND
                    dificultades.dificultad = 'ALTA' 
                GROUP BY actividades.id_tarea`;
    const tareas_alta = await getAllRecords(query_tareas_alta)

    
    const tareas_all = tareas_media.concat(tareas_media2, tareas_baja, tareas_alta).sort( (a,b) => a.id_tarea - b.id_tarea );
    
    let horas_totales = 0
    let horas_totales_evaluadas = 0
    let sumatorio_tareas = 0
    for (let i = 0; i < tareas_all.length; i++) {
        if(tareas_all[i].horas_sumadas > 0) {
            horas_totales = horas_totales + tareas_all[i].horas_sumadas
        }
    }
   
//Calculamos los detalles de la evaluacion    
    let detalles_evaluacion = []
    for (let i = 0; i < tareas_all.length; i++) {
        let niveles_evaluacion = {nivel_global: 'N/A', nivel_unidades: 'N/A', nivel_tiempo: 'N/A', nivel_porcentaje_entrada: 'N/A', nivel_porcentaje_jornada: 'N/A' }
        if (tareas_all[i].indicador == 'SI') {
            const query_objetivo = `
                SELECT objetivos.* 
                FROM objetivos 
                WHERE 
                    objetivos.id_tarea = ${tareas_all[i].id_tarea} AND
                    objetivos.dificultad = '${tareas_all[i].nivel_dificultad}'
                `;
            const objetivo = await getAllRecords(query_objetivo)

            if (objetivo.length == 1) {
                //Hay objetivo, calculamos sus niveles.

                //Calculamos el nivel de unidad.
                if (tareas_all[i].cuantificable == 'SI') {
                    if (tareas_all[i].compartida == 'NO') {
                      if (objetivo[0].unidades_minimo && objetivo[0].unidades_minimo >= 0) {
                          if (objetivo[0].magnitud_temporal == 'Dia' ) {
                              const dias_laborables = await jornadaUtilidades.diasLaborablesMes(id_puesto, mes, anyo)
                              if( tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                          if (objetivo[0].magnitud_temporal == 'Semana' ) {
                              const dias_laborables = await jornadaUtilidades.diasLaborablesMes(id_puesto, mes, anyo) / 5.0
                              if( tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                          if (objetivo[0].magnitud_temporal == 'Mes' ) {
                              const dias_laborables_mes = await jornadaUtilidades.diasMes(id_puesto, mes, anyo)
                              if( tareas_all[i].unidades_sumadas < dias_laborables_mes * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables_mes * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables_mes * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables_mes * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables_mes * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables_mes * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                      } 
                    }
                    if (tareas_all[i].compartida == 'SI') {
                      if (objetivo[0].unidades_minimo && objetivo[0].unidades_minimo >= 0) {
                          if (objetivo[0].magnitud_temporal == 'Dia' ) {
                              const dias_laborables = await jornadaUtilidades.diasLaborablesMes(id_puesto, mes, anyo)
                              const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(id_puesto, tareas_all[i].id_tarea, mes, anyo)
                              if( tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables * responsabilidad[0].resultado * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables * responsabilidad.resultado * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables * responsabilidad.resultado * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                          if (objetivo[0].magnitud_temporal == 'Semana' ) {
                              const dias_laborables = await jornadaUtilidades.diasLaborablesMes(id_puesto, mes, anyo) / 5.0
                              const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(id_puesto, tareas_all[i].id_tarea, mes, anyo)
                              if( tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables * responsabilidad.resultado * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables * responsabilidad.resultado * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables * responsabilidad.resultado * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                          if (objetivo[0].magnitud_temporal == 'Mes' ) {
                              const dias_laborables_mes = await jornadaUtilidades.diasMes(id_puesto, mes, anyo)
                              const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(id_puesto, tareas_all[i].id_tarea, mes, anyo)
                              if( tareas_all[i].unidades_sumadas < dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                      } 
                    }
                }
                

                //Calculamos el nivel de tiempo.
                if (objetivo[0].tiempo_minimo && objetivo[0].tiempo_minimo >= 0) {
                    if(tareas_all[i].unidades_sumadas >= 0) {
                        const tiempo = tareas_all[i].horas_sumadas * 60 / tareas_all[i].unidades_sumadas
                        if( tiempo <= objetivo[0].tiempo_minimo ) {
                            niveles_evaluacion['nivel_tiempo'] = 'EXCELENTE'    
                        }
                        if( objetivo[0].tiempo_minimo < tiempo && 
                            tiempo <= objetivo[0].tiempo_medio ) {
                            niveles_evaluacion['nivel_tiempo'] = 'ALTO'    
                        }
                        if( objetivo[0].tiempo_medio < tiempo && 
                            tiempo <= objetivo[0].tiempo_maximo  ) {
                            niveles_evaluacion['nivel_tiempo'] = 'SATISFACTORIO'    
                        }
                        if( tiempo > objetivo[0].tiempo_maximo ) {
                            niveles_evaluacion['nivel_tiempo'] = 'INSATISFACTORIO'    
                        }
                    }
                    else {
                        if( tareas_all[i].horas_sumadas * 60 > objetivo[0].tiempo_maximo ) {
                            niveles_evaluacion['nivel_tiempo'] = 'INSATISFACTORIO'
                        }
                        else {
                            niveles_evaluacion['nivel_tiempo'] = 'SIN DATOS'
                        }
                    }
                }
                

                //Calculamos el nivel de entrada.
                if (tareas_all[i].entrada == 'SI') {
                    if(objetivo[0].porcentaje_entrada_minimo && objetivo[0].porcentaje_entrada_minimo >= 0) {
                      if (tareas_all[i].compartida == 'NO') {
                        const queryEntradaNoCompartida = `
                            SELECT *
                            FROM entradas_no_compartidas
                            WHERE 
                                id_tarea = ${tareas_all[i].id_tarea} AND
                                id_puesto_trabajo = ${id_puesto} AND
                                mes = ${mes} AND
                                anio = ${anyo}
                            `
                        const entradaNoCompartida = await getAllRecords(queryEntradaNoCompartida)
                        if( entradaNoCompartida && entradaNoCompartida.length > 0 ) {
                            const dias_laborables_mes = await jornadaUtilidades.diasMes(id_puesto, mes, anyo)
                            const porcentaje_entrada = (100 * tareas_all[i].unidades_sumadas) / (entradaNoCompartida[0].entrada * dias_laborables_mes)
                            if( porcentaje_entrada < objetivo[0].porcentaje_entrada_minimo ) {
                                niveles_evaluacion['nivel_porcentaje_entrada'] = 'INSATISFACTORIO'    
                            }
                            if( objetivo[0].porcentaje_entrada_minimo <= porcentaje_entrada && 
                                porcentaje_entrada < objetivo[0].porcentaje_entrada_medio ) {
                                niveles_evaluacion['nivel_porcentaje_entrada'] = 'SATISFACTORIO'    
                            }
                            if( objetivo[0].porcentaje_entrada_medio <= porcentaje_entrada && 
                                porcentaje_entrada < objetivo[0].porcentaje_entrada_maximo  ) {
                                niveles_evaluacion['nivel_porcentaje_entrada'] = 'ALTO'    
                            }
                            if( porcentaje_entrada >= objetivo[0].porcentaje_entrada_maximo ) {
                                niveles_evaluacion['nivel_porcentaje_entrada'] = 'EXCELENTE'    
                            }
                        }
                        else {
                            niveles_evaluacion['nivel_porcentaje_entrada'] = 'SIN DATOS'
                        }
                      }
                      if (tareas_all[i].compartida == 'SI') {
                        const queryEntrada = `
                        SELECT *
                        FROM entradas
                        WHERE 
                            id_tarea = ${tareas_all[i].id_tarea} AND
                            mes = ${mes} AND
                            anio = ${anyo}
                        ` 
                        const entrada = await getAllRecords(queryEntrada)
                        if( entrada && entrada.length > 0 ) {
                           const dias_laborables_mes = await jornadaUtilidades.diasMes(id_puesto, mes, anyo)
                           const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(id_puesto, tareas_all[i].id_tarea, mes, anyo)
                           const porcentaje_entrada = (100 * tareas_all[i].unidades_sumadas) / (entrada[0].entrada * responsabilidad.resultado * dias_laborables_mes)
                           if( porcentaje_entrada < objetivo[0].porcentaje_entrada_minimo ) {
                              niveles_evaluacion['nivel_porcentaje_entrada'] = 'INSATISFACTORIO'    
                           }
                           if( objetivo[0].porcentaje_entrada_minimo <= porcentaje_entrada && 
                              porcentaje_entrada < objetivo[0].porcentaje_entrada_medio ) {
                              niveles_evaluacion['nivel_porcentaje_entrada'] = 'SATISFACTORIO'    
                           }
                           if( objetivo[0].porcentaje_entrada_medio <= porcentaje_entrada && 
                              porcentaje_entrada < objetivo[0].porcentaje_entrada_maximo  ) {
                              niveles_evaluacion['nivel_porcentaje_entrada'] = 'ALTO'    
                           }
                           if( porcentaje_entrada >= objetivo[0].porcentaje_entrada_maximo ) {
                              niveles_evaluacion['nivel_porcentaje_entrada'] = 'EXCELENTE'    
                           }
                        } else {
                           niveles_evaluacion['nivel_porcentaje_entrada'] = 'SIN DATOS'
                        }
                      }
                    }
                }
                

                //Calculamos el nivel de jornada.
                if(objetivo[0].porcentaje_jornada_minimo && objetivo[0].porcentaje_jornada_minimo >= 0) {
                   //Hacer el punto 6.
                   const jornada_laboral_mensual = await jornadaUtilidades.jornadaLaboralMensual(id_puesto, mes, anyo);
                   const porcentaje_jornada = (tareas_all[i].horas_sumadas * 100.0) / jornada_laboral_mensual['jornada_laboral_mes_neta_entrada']
                    if( porcentaje_jornada <= objetivo[0].porcentaje_jornada_minimo ) {
                        niveles_evaluacion['nivel_porcentaje_jornada'] = 'EXCELENTE'    
                    }
                    if( objetivo[0].porcentaje_jornada_minimo < porcentaje_jornada && 
                        porcentaje_jornada <= objetivo[0].porcentaje_jornada_medio ) {
                        niveles_evaluacion['nivel_porcentaje_jornada'] = 'ALTO'    
                    }
                    if( objetivo[0].porcentaje_jornada_medio < porcentaje_jornada && 
                        porcentaje_jornada <= objetivo[0].porcentaje_jornada_maximo  ) {
                        niveles_evaluacion['nivel_porcentaje_jornada'] = 'SATISFACTORIO'    
                    }
                    if( porcentaje_jornada > objetivo[0].porcentaje_jornada_maximo ) {
                        niveles_evaluacion['nivel_porcentaje_jornada'] = 'INSATISFACTORIO'    
                    }
                }
            }
        }

        //Calculo del desempeño global de la tarea.
        let suma_indicadores = 0
        let numero_indicadores = 0
        for (const nivel in niveles_evaluacion) {
            if (niveles_evaluacion[nivel] == 'INSATISFACTORIO') {
                suma_indicadores = suma_indicadores + 0
                numero_indicadores = numero_indicadores + 1.0
            }
            if (niveles_evaluacion[nivel] == 'SATISFACTORIO') {
                suma_indicadores = suma_indicadores + 1
                numero_indicadores = numero_indicadores + 1.0
            }
            if (niveles_evaluacion[nivel] == 'ALTO') {
                suma_indicadores = suma_indicadores + 2
                numero_indicadores = numero_indicadores + 1.0
            }
            if (niveles_evaluacion[nivel] == 'EXCELENTE') {
                suma_indicadores = suma_indicadores + 3
                numero_indicadores = numero_indicadores + 1.0
            }
        }

        let valor_nivel_global_tarea = 0
        if (numero_indicadores > 0) {
            valor_nivel_global_tarea = tareas_all[i].horas_sumadas * (suma_indicadores / numero_indicadores)
            sumatorio_tareas = sumatorio_tareas + valor_nivel_global_tarea
            horas_totales_evaluadas = horas_totales_evaluadas + tareas_all[i].horas_sumadas
        }

        detalles_evaluacion.push({id_tarea: tareas_all[i].id_tarea, 
                                    horas: tareas_all[i].horas_sumadas, 
                                    unidades: tareas_all[i].unidades_sumadas, 
                                    nivel_unidades: niveles_evaluacion['nivel_unidades'],
                                    nivel_tiempo: niveles_evaluacion['nivel_tiempo'],
                                    nivel_porcentaje_entrada: niveles_evaluacion['nivel_porcentaje_entrada'],
                                    nivel_porcentaje_jornada: niveles_evaluacion['nivel_porcentaje_jornada'],
                                    nivel_global: valor_nivel_global_tarea,
                                    supervision: 'NO',
                                    evaluacion: 'NO',
                                    dificultad: tareas_all[i].nivel_dificultad,
                                    })
    }

//Calculamos la evaluacion
    //Calculo del nivel global.
    let nivel_global_evaluacion = 'N/A'

    if( sumatorio_tareas/horas_totales_evaluadas < 0.5 ) {
        nivel_global_evaluacion = 'INSATISFACTORIO'    
    }
    if( 0.5 <= sumatorio_tareas/horas_totales_evaluadas && sumatorio_tareas/horas_totales_evaluadas < 1.5 ) {
        nivel_global_evaluacion = 'SATISFACTORIO'    
    }
    if( 1.5 <= sumatorio_tareas/horas_totales_evaluadas && sumatorio_tareas/horas_totales_evaluadas < 2.5  ) {
        nivel_global_evaluacion = 'ALTO'    
    }
    if( sumatorio_tareas/horas_totales_evaluadas >= 2.5 ) {
        nivel_global_evaluacion = 'EXCELENTE'    
    }

    //Calculo del porcentaje de carga.
    const jornada_laboral_mensual = await jornadaUtilidades.jornadaLaboralMensual(id_puesto, mes, anyo);
    const porcentaje_carga = ((horas_totales * 100) / jornada_laboral_mensual['jornada_mes_tipo']).toFixed(2)

    //Calculo del nivel de carga.
    let nivel_carga = 'INSATISFACTORIO'
    const queryConfiguracion = `
                SELECT *
                FROM configuraciones 
                WHERE parametro = 'objetivo_carga_trabajo'`
    let objetivo_carga_trabajo = await getAllRecords(queryConfiguracion)
    objetivo_carga_trabajo = objetivo_carga_trabajo[0].valor
    
    const queryPersonalizado = `
                SELECT *
                FROM objetivos_personalizados_carga_trabajo 
                WHERE id_puesto = ${id_puesto}`
    const objetivo_personalizado = await getAllRecords(queryPersonalizado)
    if ( objetivo_personalizado.length > 0) {
        objetivo_carga_trabajo = objetivo_personalizado[0].porcentaje_carga
    }
    else {
        const queryCarga = `
                SELECT AVG(objetivos_carga_trabajo.porcentaje_carga) as porcentaje_medio
                FROM objetivos_carga_trabajo
                INNER JOIN perfiles_puesto ON perfiles_puesto.id_perfil = objetivos_carga_trabajo.id_perfil 
                WHERE perfiles_puesto.id_puesto = ${id_puesto}`
        const objetivo_carga = await getAllRecords(queryCarga)

        if(objetivo_carga.length > 0) {
            objetivo_carga_trabajo = objetivo_carga[0].porcentaje_medio
        }
    }

    if( porcentaje_carga >= objetivo_carga_trabajo) {
        nivel_carga = 'SATISFACTORIO'
    }


//Damos persistencia a la evaluación.
const insertEvaluacionQuery = `INSERT INTO evaluaciones 
                                (id_puesto_trabajo, mes, anio, nivel_global, 
                                 porcentaje_carga, nivel_carga ) 
                                VALUES (${id_puesto}, ${mes}, ${anyo}, 
                                        '${nivel_global_evaluacion}', ${porcentaje_carga}, '${nivel_carga}'  )`
const evaluacion = await registerRecord(insertEvaluacionQuery)

//Damos persistencia a cada detalle.    
    for (let i = 0; i < detalles_evaluacion.length; i++) {
        const insertDetalleEvaluacionQuery = `INSERT INTO detalle_evaluaciones 
                                              (
                                                id_evaluacion, id_tarea, horas, unidades, 
                                                nivel_unidades, nivel_tiempo, nivel_porcentaje_entrada,
                                                nivel_porcentaje_jornada, supervision, evaluacion, dificultad
                                              ) 
                                              VALUES (
                                                ${evaluacion.insertId}, 
                                                ${detalles_evaluacion[i]['id_tarea']},
                                                ${detalles_evaluacion[i]['horas']}, 
                                                ${detalles_evaluacion[i]['unidades']},  
                                                '${detalles_evaluacion[i]['nivel_unidades']}', 
                                                '${detalles_evaluacion[i]['nivel_tiempo']}', 
                                                '${detalles_evaluacion[i]['nivel_porcentaje_entrada']}', 
                                                '${detalles_evaluacion[i]['nivel_porcentaje_jornada']}', 
                                                '${detalles_evaluacion[i]['supervision']}', 
                                                '${detalles_evaluacion[i]['evaluacion']}', 
                                                '${detalles_evaluacion[i]['dificultad']}'
                                              )`
        await registerRecord(insertDetalleEvaluacionQuery)
    }
}

const registrarTareasEvaluacion = async(mes, anyo, id_puesto) => {
    //Una tarea puede tener diferentes dificultades..
    //Se pretende sacar la duracion de las tareas, para cada dificultad.

    // Primero elimino las tareas no validadas ni supervisadas
    const query_borrado_tareas= `
        DELETE FROM detalle_evaluaciones
        WHERE detalle_evaluaciones.id_evaluacion IN 
        (SELECT evaluaciones.id_evaluacion 
         FROM evaluaciones
         WHERE evaluaciones.id_puesto_trabajo = ${id_puesto}
         AND evaluaciones.mes = ${mes}
         AND evaluaciones.anio = ${anyo}
        )
        AND detalle_evaluaciones.supervision != 'SI'
        AND detalle_evaluaciones.evaluacion != 'SI'
        AND detalle_evaluaciones.supervision != 'CORREGIDO'
        AND detalle_evaluaciones.evaluacion != 'CORREGIDO'
    `
    const borrado_tareas = await queryPromise(query_borrado_tareas)

    // Primero se añaden las tareas nuevas
    //Obtenemos las de dificultad media.
    const query_tareas_media = `
                SELECT actividades.id_tarea,
                    tareas.indicador,
                    tareas.cuantificable,
                    tareas.entrada,
                    tareas.compartida,
                    tareas.dificultad,
                    tareas.acumulativa,
                    'MEDIA' as nivel_dificultad,
                    IFNULL(SUM(actividades.horas), 0) as horas_sumadas, 
                    IFNULL(SUM(actividades.unidades), 0) as unidades_sumadas 
                FROM actividades 
                INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
                INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
                WHERE 
                    (tareas.dificultad = 'NO' OR (tareas.dificultad = 'SI' 
                                                  AND NOT EXISTS(SELECT * FROM codigos_trazabilidad_actividad 
                                                                 WHERE codigos_trazabilidad_actividad.id_actividad = actividades.id_actividad)
                                                 )) AND
                    actividades.id_puesto = ${id_puesto} AND
                    MONTH(actividades.fecha_actividad) = ${mes} AND 
                    YEAR(actividades.fecha_actividad) = ${anyo} AND
                    actividades.id_tarea NOT IN (SELECT distinct(id_tarea) FROM detalle_evaluaciones
                                     INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
                                     WHERE evaluaciones.id_puesto_trabajo = ${id_puesto}
                                     AND evaluaciones.mes = ${mes}
                                     AND evaluaciones.anio = ${anyo})
                GROUP BY actividades.id_tarea`;
    const tareas_media = await getAllRecords(query_tareas_media)

    //Obtenemos las de dificultad baja.
    const query_tareas_baja = `
                SELECT actividades.id_tarea,
                    tareas.indicador,
                    tareas.cuantificable,
                    tareas.entrada,
                    tareas.compartida,
                    tareas.dificultad,
                    tareas.acumulativa,
                    dificultades.dificultad as nivel_dificultad,
                    IFNULL(SUM(actividades.horas), 0) as horas_sumadas, 
                    IFNULL(SUM(actividades.unidades), 0) as unidades_sumadas 
                FROM actividades 
                INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
                INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
                INNER JOIN codigos_trazabilidad_actividad ON actividades.id_actividad = codigos_trazabilidad_actividad.id_actividad 
                INNER JOIN dificultades ON tareas.id_tarea = dificultades.id_tarea and codigos_trazabilidad_actividad.codigo_trazabilidad = dificultades.codigo_trazabilidad
                WHERE 
                    tareas.dificultad = 'SI' AND
                    actividades.id_puesto = ${id_puesto} AND
                    MONTH(actividades.fecha_actividad) = ${mes} AND 
                    YEAR(actividades.fecha_actividad) = ${anyo} AND
                    dificultades.dificultad = 'BAJA' AND
                    actividades.id_tarea NOT IN (SELECT distinct(id_tarea) FROM detalle_evaluaciones
                                     INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
                                     WHERE evaluaciones.id_puesto_trabajo = ${id_puesto}
                                     AND evaluaciones.mes = ${mes}
                                     AND evaluaciones.anio = ${anyo})
                GROUP BY actividades.id_tarea`;
    const tareas_baja = await getAllRecords(query_tareas_baja)

    //Obtenemos las de dificultad alta.
    const query_tareas_alta = `
                SELECT actividades.id_tarea,
                    tareas.indicador,
                    tareas.cuantificable,
                    tareas.entrada,
                    tareas.compartida,
                    tareas.dificultad,
                    tareas.acumulativa,
                    dificultades.dificultad as nivel_dificultad,
                    IFNULL(SUM(actividades.horas), 0) as horas_sumadas, 
                    IFNULL(SUM(actividades.unidades), 0) as unidades_sumadas 
                FROM actividades 
                INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
                INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
                INNER JOIN codigos_trazabilidad_actividad ON actividades.id_actividad = codigos_trazabilidad_actividad.id_actividad 
                INNER JOIN dificultades ON tareas.id_tarea = dificultades.id_tarea and codigos_trazabilidad_actividad.codigo_trazabilidad = dificultades.codigo_trazabilidad
                WHERE 
                    tareas.dificultad = 'SI' AND
                    actividades.id_puesto = ${id_puesto} AND
                    MONTH(actividades.fecha_actividad) = ${mes} AND 
                    YEAR(actividades.fecha_actividad) = ${anyo} AND
                    dificultades.dificultad = 'ALTA' AND
                    actividades.id_tarea NOT IN (SELECT distinct(id_tarea) FROM detalle_evaluaciones
                                     INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
                                     WHERE evaluaciones.id_puesto_trabajo = ${id_puesto}
                                     AND evaluaciones.mes = ${mes}
                                     AND evaluaciones.anio = ${anyo})
                GROUP BY actividades.id_tarea`;
    const tareas_alta = await getAllRecords(query_tareas_alta)
    
    const tareas_all = tareas_media.concat(tareas_baja, tareas_alta).sort( (a,b) => a.id_tarea - b.id_tarea );

    // Obtenemos las tareas ya evaluadas o supervisadas
    const query_tareas_evaluadas = `
                SELECT detalle_evaluaciones.id_tarea,
                    IFNULL(detalle_evaluaciones.horas, 0) as horas_sumadas,
                    IFNULL(detalle_evaluaciones.unidades, 0) as unidades_sumadas,
                    (case IFNULL(nivel_unidades_corregido, 'N/A') when 'N/A' then nivel_unidades else nivel_unidades_corregido end) as nivel_unidades,
                    (case IFNULL(nivel_tiempo_corregido, 'N/A') when 'N/A' then nivel_tiempo else nivel_tiempo_corregido end) as nivel_tiempo,
                    (case IFNULL(nivel_porcentaje_entrada_corregido, 'N/A') when 'N/A' then nivel_porcentaje_entrada else nivel_porcentaje_entrada_corregido end) as nivel_porcentaje_entrada,
                    (case IFNULL(nivel_porcentaje_jornada_corregido, 'N/A') when 'N/A' then nivel_porcentaje_jornada else nivel_porcentaje_jornada_corregido end) as nivel_porcentaje_jornada
                FROM detalle_evaluaciones 
                INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
                WHERE evaluaciones.id_puesto_trabajo = ${id_puesto}
                AND evaluaciones.mes = ${mes}
                AND evaluaciones.anio = ${anyo}
                GROUP BY detalle_evaluaciones.id_tarea`
    const tareas_evaluadas = await getAllRecords(query_tareas_evaluadas)
    
    let horas_totales = 0
    let horas_totales_evaluadas = 0
    let sumatorio_tareas = 0
    for (let i = 0; i < tareas_all.length; i++) {
        if(tareas_all[i].horas_sumadas > 0 ) {
            horas_totales = horas_totales + tareas_all[i].horas_sumadas
        }
    }

    for (let i = 0; i < tareas_evaluadas.length; i++) {
        if(tareas_evaluadas[i].horas_sumadas > 0) {
            horas_totales = horas_totales + tareas_evaluadas[i].horas_sumadas
        }
    }
   
//Calculamos los detalles de la evaluacion    
    let detalles_evaluacion = []
    let detalles_evaluacion_global = []
    for (let i = 0; i < tareas_all.length; i++) {
        let niveles_evaluacion = {nivel_global: 'N/A', nivel_unidades: 'N/A', nivel_tiempo: 'N/A', nivel_porcentaje_entrada: 'N/A', nivel_porcentaje_jornada: 'N/A' }
        if (tareas_all[i].indicador == 'SI') {
            const query_objetivo = `
                SELECT objetivos.* 
                FROM objetivos 
                WHERE 
                    objetivos.id_tarea = ${tareas_all[i].id_tarea} AND
                    objetivos.dificultad = '${tareas_all[i].nivel_dificultad}'
                `;
            const objetivo = await getAllRecords(query_objetivo)

            if (objetivo.length == 1) {
                //Hay objetivo, calculamos sus niveles.

                //Calculamos el nivel de unidad.
                if (tareas_all[i].cuantificable == 'SI') {
                    if (tareas_all[i].compartida == 'NO') {
                      if (objetivo[0].unidades_minimo && objetivo[0].unidades_minimo >= 0) {
                          if (objetivo[0].magnitud_temporal == 'Dia' ) {
                              const dias_laborables = await jornadaUtilidades.diasLaborablesMes(id_puesto, mes, anyo)
                              if( tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                          if (objetivo[0].magnitud_temporal == 'Semana' ) {
                              const dias_laborables = await jornadaUtilidades.diasLaborablesMes(id_puesto, mes, anyo) / 5.0
                              if( tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                          if (objetivo[0].magnitud_temporal == 'Mes' ) {
                              const dias_laborables_mes = await jornadaUtilidades.diasMes(id_puesto, mes, anyo)
                              if( tareas_all[i].unidades_sumadas < dias_laborables_mes * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables_mes * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables_mes * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables_mes * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables_mes * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables_mes * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                      } 
                    }
                    if (tareas_all[i].compartida == 'SI') {
                      if (objetivo[0].unidades_minimo && objetivo[0].unidades_minimo >= 0) {
                          if (objetivo[0].magnitud_temporal == 'Dia' ) {
                              const dias_laborables = await jornadaUtilidades.diasLaborablesMes(id_puesto, mes, anyo)
                              const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(id_puesto, tareas_all[i].id_tarea, mes, anyo)
                              if( tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables * responsabilidad[0].resultado * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables * responsabilidad.resultado * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables * responsabilidad.resultado * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                          if (objetivo[0].magnitud_temporal == 'Semana' ) {
                              const dias_laborables = await jornadaUtilidades.diasLaborablesMes(id_puesto, mes, anyo) / 5.0
                              const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(id_puesto, tareas_all[i].id_tarea, mes, anyo)
                              if( tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables * responsabilidad.resultado * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables * responsabilidad.resultado * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables * responsabilidad.resultado * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables * responsabilidad.resultado * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                          if (objetivo[0].magnitud_temporal == 'Mes' ) {
                              const dias_laborables_mes = await jornadaUtilidades.diasMes(id_puesto, mes, anyo)
                              const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(id_puesto, tareas_all[i].id_tarea, mes, anyo)
                              if( tareas_all[i].unidades_sumadas < dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_minimo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'INSATISFACTORIO'    
                              }
                              if( dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_minimo <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_medio ) {
                                  niveles_evaluacion['nivel_unidades'] = 'SATISFACTORIO'    
                              }
                              if( dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_medio <= tareas_all[i].unidades_sumadas && 
                                  tareas_all[i].unidades_sumadas < dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_maximo  ) {
                                  niveles_evaluacion['nivel_unidades'] = 'ALTO'    
                              }
                              if( tareas_all[i].unidades_sumadas >= dias_laborables_mes * responsabilidad.resultado * objetivo[0].unidades_maximo ) {
                                  niveles_evaluacion['nivel_unidades'] = 'EXCELENTE'    
                              }
                          }
                      } 
                    }
                  }

                //Calculamos el nivel de tiempo.
                if (objetivo[0].tiempo_minimo && objetivo[0].tiempo_minimo >= 0) {
                    if(tareas_all[i].unidades_sumadas >= 0) {
                        const tiempo = tareas_all[i].horas_sumadas * 60 / tareas_all[i].unidades_sumadas
                        if( tiempo <= objetivo[0].tiempo_minimo ) {
                            niveles_evaluacion['nivel_tiempo'] = 'EXCELENTE'    
                        }
                        if( objetivo[0].tiempo_minimo < tiempo && 
                            tiempo <= objetivo[0].tiempo_medio ) {
                            niveles_evaluacion['nivel_tiempo'] = 'ALTO'    
                        }
                        if( objetivo[0].tiempo_medio < tiempo && 
                            tiempo <= objetivo[0].tiempo_maximo  ) {
                            niveles_evaluacion['nivel_tiempo'] = 'SATISFACTORIO'    
                        }
                        if( tiempo > objetivo[0].tiempo_maximo ) {
                            niveles_evaluacion['nivel_tiempo'] = 'INSATISFACTORIO'    
                        }
                    }
                    else {
                        if( tareas_all[i].horas_sumadas * 60 > objetivo[0].tiempo_maximo ) {
                            niveles_evaluacion['nivel_tiempo'] = 'INSATISFACTORIO'
                        }
                        else {
                            niveles_evaluacion['nivel_tiempo'] = 'SIN DATOS'
                        }
                    }
                }
                
                //Calculamos el nivel de entrada.
                if (tareas_all[i].entrada == 'SI') {
                    if(objetivo[0].porcentaje_entrada_minimo && objetivo[0].porcentaje_entrada_minimo >= 0) {
                      if (tareas_all[i].compartida == 'NO') {
                        const queryEntradaNoCompartida = `
                            SELECT *
                            FROM entradas_no_compartidas
                            WHERE 
                                id_tarea = ${tareas_all[i].id_tarea} AND
                                id_puesto_trabajo = ${id_puesto} AND
                                mes = ${mes} AND
                                anio = ${anyo}
                            `
                        const entradaNoCompartida = await getAllRecords(queryEntradaNoCompartida)
                        if( entradaNoCompartida && entradaNoCompartida.length > 0 ) {
                            const dias_laborables_mes = await jornadaUtilidades.diasMes(id_puesto, mes, anyo)
                            const porcentaje_entrada = (100 * tareas_all[i].unidades_sumadas) / (entradaNoCompartida[0].entrada * dias_laborables_mes)
                            if( porcentaje_entrada < objetivo[0].porcentaje_entrada_minimo ) {
                                niveles_evaluacion['nivel_porcentaje_entrada'] = 'INSATISFACTORIO'    
                            }
                            if( objetivo[0].porcentaje_entrada_minimo <= porcentaje_entrada && 
                                porcentaje_entrada < objetivo[0].porcentaje_entrada_medio ) {
                                niveles_evaluacion['nivel_porcentaje_entrada'] = 'SATISFACTORIO'    
                            }
                            if( objetivo[0].porcentaje_entrada_medio <= porcentaje_entrada && 
                                porcentaje_entrada < objetivo[0].porcentaje_entrada_maximo  ) {
                                niveles_evaluacion['nivel_porcentaje_entrada'] = 'ALTO'    
                            }
                            if( porcentaje_entrada >= objetivo[0].porcentaje_entrada_maximo ) {
                                niveles_evaluacion['nivel_porcentaje_entrada'] = 'EXCELENTE'    
                            }
                        }
                        else {
                            niveles_evaluacion['nivel_porcentaje_entrada'] = 'SIN DATOS'
                        }
                      }
                      if (tareas_all[i].compartida == 'SI') {
                        const queryEntrada = `
                        SELECT *
                        FROM entradas
                        WHERE 
                            id_tarea = ${tareas_all[i].id_tarea} AND
                            mes = ${mes} AND
                            anio = ${anyo}
                        ` 
                        const entrada = await getAllRecords(queryEntrada)
                        if( entrada && entrada.length > 0 ) {
                           const dias_laborables_mes = await jornadaUtilidades.diasMes(id_puesto, mes, anyo)
                           const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(id_puesto, tareas_all[i].id_tarea, mes, anyo)
                           const porcentaje_entrada = (100 * tareas_all[i].unidades_sumadas) / (entrada[0].entrada * responsabilidad.resultado * dias_laborables_mes)
                           if( porcentaje_entrada < objetivo[0].porcentaje_entrada_minimo ) {
                              niveles_evaluacion['nivel_porcentaje_entrada'] = 'INSATISFACTORIO'    
                           }
                           if( objetivo[0].porcentaje_entrada_minimo <= porcentaje_entrada && 
                              porcentaje_entrada < objetivo[0].porcentaje_entrada_medio ) {
                              niveles_evaluacion['nivel_porcentaje_entrada'] = 'SATISFACTORIO'    
                           }
                           if( objetivo[0].porcentaje_entrada_medio <= porcentaje_entrada && 
                              porcentaje_entrada < objetivo[0].porcentaje_entrada_maximo  ) {
                              niveles_evaluacion['nivel_porcentaje_entrada'] = 'ALTO'    
                           }
                           if( porcentaje_entrada >= objetivo[0].porcentaje_entrada_maximo ) {
                              niveles_evaluacion['nivel_porcentaje_entrada'] = 'EXCELENTE'    
                           }
                        } else {
                           niveles_evaluacion['nivel_porcentaje_entrada'] = 'SIN DATOS'
                        }
                      }
                    }
                }

                //Calculamos el nivel de jornada.
                if(objetivo[0].porcentaje_jornada_minimo && objetivo[0].porcentaje_jornada_minimo >= 0) {
                   //Hacer el punto 6.
                   const jornada_laboral_mensual = await jornadaUtilidades.jornadaLaboralMensual(id_puesto, mes, anyo);
                   const porcentaje_jornada = (tareas_all[i].horas_sumadas * 100.0) / jornada_laboral_mensual['jornada_laboral_mes_neta_entrada']
                    if( porcentaje_jornada <= objetivo[0].porcentaje_jornada_minimo ) {
                        niveles_evaluacion['nivel_porcentaje_jornada'] = 'EXCELENTE'    
                    }
                    if( objetivo[0].porcentaje_jornada_minimo < porcentaje_jornada && 
                        porcentaje_jornada <= objetivo[0].porcentaje_jornada_medio ) {
                        niveles_evaluacion['nivel_porcentaje_jornada'] = 'ALTO'    
                    }
                    if( objetivo[0].porcentaje_jornada_medio < porcentaje_jornada && 
                        porcentaje_jornada <= objetivo[0].porcentaje_jornada_maximo  ) {
                        niveles_evaluacion['nivel_porcentaje_jornada'] = 'SATISFACTORIO'    
                    }
                    if( porcentaje_jornada > objetivo[0].porcentaje_jornada_maximo ) {
                        niveles_evaluacion['nivel_porcentaje_jornada'] = 'INSATISFACTORIO'    
                    }
                }
            }
        }

        //Calculo del desempeño global de la tarea.
        let suma_indicadores = 0
        let numero_indicadores = 0
        for (const nivel in niveles_evaluacion) {
            if (niveles_evaluacion[nivel] == 'INSATISFACTORIO') {
                suma_indicadores = suma_indicadores + 0
                numero_indicadores = numero_indicadores + 1.0
            }
            if (niveles_evaluacion[nivel] == 'SATISFACTORIO') {
                suma_indicadores = suma_indicadores + 1
                numero_indicadores = numero_indicadores + 1.0
            }
            if (niveles_evaluacion[nivel] == 'ALTO') {
                suma_indicadores = suma_indicadores + 2
                numero_indicadores = numero_indicadores + 1.0
            }
            if (niveles_evaluacion[nivel] == 'EXCELENTE') {
                suma_indicadores = suma_indicadores + 3
                numero_indicadores = numero_indicadores + 1.0
            }
        }

        let valor_nivel_global_tarea = 0
        if (numero_indicadores > 0) {
            valor_nivel_global_tarea = tareas_all[i].horas_sumadas * (suma_indicadores / numero_indicadores)
            sumatorio_tareas = sumatorio_tareas + valor_nivel_global_tarea    
            horas_totales_evaluadas = horas_totales_evaluadas + tareas_all[i].horas_sumadas      
        }

        detalles_evaluacion.push({id_tarea: tareas_all[i].id_tarea, 
                                    horas: tareas_all[i].horas_sumadas, 
                                    unidades: tareas_all[i].unidades_sumadas, 
                                    nivel_unidades: niveles_evaluacion['nivel_unidades'],
                                    nivel_tiempo: niveles_evaluacion['nivel_tiempo'],
                                    nivel_porcentaje_entrada: niveles_evaluacion['nivel_porcentaje_entrada'],
                                    nivel_porcentaje_jornada: niveles_evaluacion['nivel_porcentaje_jornada'],
                                    nivel_global: valor_nivel_global_tarea,
                                    supervision: 'NO',
                                    evaluacion: 'NO',
                                    dificultad: tareas_all[i].nivel_dificultad,
        })
        detalles_evaluacion_global.push({id_tarea: tareas_all[i].id_tarea, 
                                    horas: tareas_all[i].horas_sumadas, 
                                    unidades: tareas_all[i].unidades_sumadas, 
                                    nivel_unidades: niveles_evaluacion['nivel_unidades'],
                                    nivel_tiempo: niveles_evaluacion['nivel_tiempo'],
                                    nivel_porcentaje_entrada: niveles_evaluacion['nivel_porcentaje_entrada'],
                                    nivel_porcentaje_jornada: niveles_evaluacion['nivel_porcentaje_jornada'],
                                    nivel_global: valor_nivel_global_tarea,
                                    supervision: 'NO',
                                    evaluacion: 'NO',
                                    dificultad: tareas_all[i].nivel_dificultad,
        })
    }

    for (let i = 0; i < tareas_evaluadas.length; i++) {
        //Calculo del desempeño global de la tarea.
        let suma_indicadores = 0
        let numero_indicadores = 0
        let niveles_evaluacion = {nivel_global: 'N/A', nivel_unidades: tareas_evaluadas[i].nivel_unidades, nivel_tiempo: tareas_evaluadas[i].nivel_tiempo, 
                                  nivel_porcentaje_entrada: tareas_evaluadas[i].nivel_porcentaje_entrada, nivel_porcentaje_jornada: tareas_evaluadas[i].nivel_porcentaje_jornada }
        for (const nivel in niveles_evaluacion) {
            if (niveles_evaluacion[nivel] == 'INSATISFACTORIO') {
                suma_indicadores = suma_indicadores + 0
                numero_indicadores = numero_indicadores + 1.0
            }
            if (niveles_evaluacion[nivel] == 'SATISFACTORIO') {
                suma_indicadores = suma_indicadores + 1
                numero_indicadores = numero_indicadores + 1.0
            }
            if (niveles_evaluacion[nivel] == 'ALTO') {
                suma_indicadores = suma_indicadores + 2
                numero_indicadores = numero_indicadores + 1.0
            }
            if (niveles_evaluacion[nivel] == 'EXCELENTE') {
                suma_indicadores = suma_indicadores + 3
                numero_indicadores = numero_indicadores + 1.0
            }
        }

        let valor_nivel_global_tarea = 0
        if (numero_indicadores > 0) {
            valor_nivel_global_tarea = tareas_evaluadas[i].horas_sumadas * (suma_indicadores / numero_indicadores)
            sumatorio_tareas = sumatorio_tareas + valor_nivel_global_tarea
            horas_totales_evaluadas = horas_totales_evaluadas + tareas_evaluadas[i].horas_sumadas
        }

        detalles_evaluacion_global.push({id_tarea: tareas_evaluadas[i].id_tarea, 
                                    horas: tareas_evaluadas[i].horas_sumadas, 
                                    unidades: tareas_evaluadas[i].unidades_sumadas, 
                                    nivel_unidades: niveles_evaluacion['nivel_unidades'],
                                    nivel_tiempo: niveles_evaluacion['nivel_tiempo'],
                                    nivel_porcentaje_entrada: niveles_evaluacion['nivel_porcentaje_entrada'],
                                    nivel_porcentaje_jornada: niveles_evaluacion['nivel_porcentaje_jornada'],
                                    nivel_global: valor_nivel_global_tarea,
                                    supervision: 'NO',
                                    evaluacion: 'NO',
                                    dificultad: 'MEDIA',
                                    })
    }

//Calculamos la evaluacion
    //Calculo del nivel global.
    let nivel_global_evaluacion = 'N/A'

    if( sumatorio_tareas/horas_totales_evaluadas < 0.5 ) {
        nivel_global_evaluacion = 'INSATISFACTORIO'    
    }
    if( 0.5 <= sumatorio_tareas/horas_totales_evaluadas && sumatorio_tareas/horas_totales_evaluadas < 1.5 ) {
        nivel_global_evaluacion = 'SATISFACTORIO'    
    }
    if( 1.5 <= sumatorio_tareas/horas_totales_evaluadas && sumatorio_tareas/horas_totales_evaluadas < 2.5  ) {
        nivel_global_evaluacion = 'ALTO'    
    }
    if( sumatorio_tareas/horas_totales_evaluadas >= 2.5 ) {
        nivel_global_evaluacion = 'EXCELENTE'    
    }

    //Calculo del porcentaje de carga.
    const jornada_laboral_mensual = await jornadaUtilidades.jornadaLaboralMensual(id_puesto, mes, anyo);
    const porcentaje_carga = ((horas_totales * 100) / jornada_laboral_mensual['jornada_mes_tipo']).toFixed(2)

    //Calculo del nivel de carga.
    let nivel_carga = 'INSATISFACTORIO'
    const queryConfiguracion = `
                SELECT *
                FROM configuraciones 
                WHERE parametro = 'objetivo_carga_trabajo'`
    let objetivo_carga_trabajo = await getAllRecords(queryConfiguracion)
    objetivo_carga_trabajo = objetivo_carga_trabajo[0].valor
    
    /* No hay objetos personalizados por el momento y el objetivo de carga de trabajo es global
    const queryPersonalizado = `
                SELECT *
                FROM objetivos_personalizados_carga_trabajo 
                WHERE id_puesto = ${id_puesto}`
    const objetivo_personalizado = await getAllRecords(queryPersonalizado)
    if ( objetivo_personalizado.length > 0) {
        objetivo_carga_trabajo = objetivo_personalizado[0].porcentaje_carga
    }
    else {
        const queryCarga = `
                SELECT AVG(objetivos_carga_trabajo.porcentaje_carga) as porcentaje_medio
                FROM objetivos_carga_trabajo
                INNER JOIN perfiles_puesto ON perfiles_puesto.id_perfil = objetivos_carga_trabajo.id_perfil 
                WHERE perfiles_puesto.id_puesto = ${id_puesto}`
        const objetivo_carga = await getAllRecords(queryCarga)

        if(objetivo_carga.length > 0) {
            objetivo_carga_trabajo = objetivo_carga[0].porcentaje_medio
        }
    }
    */

    if( porcentaje_carga >= objetivo_carga_trabajo) {
        nivel_carga = 'SATISFACTORIO'
    }


//Damos persistencia a la evaluación.
const insertEvaluacionQuery = `UPDATE evaluaciones 
                               SET nivel_global =  '${nivel_global_evaluacion}',
                               porcentaje_carga = ${porcentaje_carga}, 
                               nivel_carga = '${nivel_carga}'
                               WHERE id_puesto_trabajo = ${id_puesto}
                               AND mes = ${mes}
                               AND anio = ${anyo}`
const evaluacion = await registerRecord(insertEvaluacionQuery)

//Damos persistencia a cada detalle.    
    for (let i = 0; i < detalles_evaluacion.length; i++) {
        const insertDetalleEvaluacionQuery = `INSERT INTO detalle_evaluaciones 
                                              (
                                                id_evaluacion, id_tarea, horas, unidades, 
                                                nivel_unidades, nivel_tiempo, nivel_porcentaje_entrada,
                                                nivel_porcentaje_jornada, supervision, evaluacion, dificultad
                                              ) 
                                              VALUES (
                                                (SELECT id_evaluacion FROM evaluaciones 
                                                 WHERE id_puesto_trabajo = ${id_puesto}
                                                 AND mes = ${mes}
                                                 AND anio = ${anyo}
                                                ), 
                                                ${detalles_evaluacion[i]['id_tarea']},
                                                ${detalles_evaluacion[i]['horas']}, 
                                                ${detalles_evaluacion[i]['unidades']},  
                                                '${detalles_evaluacion[i]['nivel_unidades']}', 
                                                '${detalles_evaluacion[i]['nivel_tiempo']}', 
                                                '${detalles_evaluacion[i]['nivel_porcentaje_entrada']}', 
                                                '${detalles_evaluacion[i]['nivel_porcentaje_jornada']}', 
                                                '${detalles_evaluacion[i]['supervision']}', 
                                                '${detalles_evaluacion[i]['evaluacion']}', 
                                                '${detalles_evaluacion[i]['dificultad']}'
                                              )`
        await registerRecord(insertDetalleEvaluacionQuery)
    }
}

module.exports = { registrarTareasEvaluacion, registrarEvaluacion, recalcularNivelGlobal }