'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Obtiene los resultados para mostrar en informe agregado.
// @route   POST /api/evaluaciones/agregado
// @access  Private/Admin
const getEvaluacionAgregado = asyncHandler(async (req, res) => {
  const {
    mes_desde,
    anyo_desde,
    mes_hasta,
    anyo_hasta,
    
    indicadores_seleccionados,
    niveles_seleccionados,
    modalidades_seleccionados,
    perfiles_seleccionados,
    puestos_seleccionados,
    tareas_seleccionados,
        
    indicadores,
    compartida,
    cuantificable,
    dificultad,
    entrada,
    acumulativa,
  } = req.body;

  var queryDetalles = ``
    
  let desempeño_filtrado = [`'INSATISFACTORIO'`, `'SATISFACTORIO'`, `'ALTO'`, `'EXCELENTE'`]
  if ( niveles_seleccionados.length > 0) {
    desempeño_filtrado = niveles_seleccionados
  }
  
  let modalidades_filtrado = [`'Oficina'`, `'Teletrabajo'`, `'N/A'`]
  if ( modalidades_seleccionados.length > 0) {
    modalidades_filtrado = modalidades_seleccionados
  
    queryDetalles = `
        SELECT actividades.id_tarea,
            tareas.descripcion_tarea,
            CONCAT( MONTH(actividades.fecha_actividad), "/", YEAR(actividades.fecha_actividad) ) as fecha,
            SUM(actividades.horas) AS horas_totales,
            AVG(actividades.horas) AS horas_media,
            SUM(actividades.unidades) AS unidades_totales,
            AVG(actividades.unidades) AS unidades_media,
            COUNT(distinct actividades.id_puesto) as numero_puestos
        FROM actividades
          INNER JOIN tareas ON tareas.id_tarea = actividades.id_tarea
          ${indicadores_seleccionados.length > 0 ? ` INNER JOIN detalle_evaluaciones ON actividades.id_tarea = detalle_evaluaciones.id_tarea 
          AND actividades.id_puesto = detalle_evaluaciones.id_puesto AND MONTH(actividades.fecha_actividad) = detalle_evaluaciones.mes
          AND YEAR(actividades.fecha_actividad) = detalle_evaluaciones.anio)`: ''}
          
        WHERE
          STR_TO_DATE(CONCAT( MONTH(actividades.fecha_actividad), "/", YEAR(actividades.fecha_actividad) ),'%m/%Y') >= STR_TO_DATE(CONCAT( ${mes_desde}, "/", ${anyo_desde} ),'%m/%Y') AND
          STR_TO_DATE(CONCAT( MONTH(actividades.fecha_actividad), "/", YEAR(actividades.fecha_actividad) ),'%m/%Y') <= STR_TO_DATE(CONCAT( ${mes_hasta}, "/", ${anyo_hasta} ), '%m/%Y')
          ${puestos_seleccionados.length > 0 ? ` AND actividades.id_puesto IN (${puestos_seleccionados.toString()})`: ''}
          ${perfiles_seleccionados.length > 0 ? ` AND actividades.id_puesto IN (SELECT perfiles_puesto.id_puesto FROM perfiles_puesto WHERE perfiles_puesto.id_perfil IN (${perfiles_seleccionados.toString()}))`: ''}
          
          ${tareas_seleccionados.length > 0 ? ` AND actividades.id_tarea IN (${tareas_seleccionados.toString()})`: ''}
          ${indicadores.length > 0 ? ` AND tareas.indicador = '${indicadores}'`: ''}
          ${compartida.length > 0 ? ` AND tareas.compartida = '${compartida}'`: ''}
          ${cuantificable.length > 0 ? ` AND tareas.cuantificable = '${cuantificable}'`: ''}
          ${dificultad.length > 0 ? ` AND tareas.dificultad = '${dificultad}'`: ''}
          ${entrada.length > 0 ? ` AND tareas.entrada = '${entrada}'`: ''}
          ${acumulativa.length > 0 ? ` AND tareas.acumulativa = '${acumulativa}'`: ''}
          ${modalidades_seleccionados.length > 0 ? ` AND actividades.modalidad IN (${modalidades_filtrado.toString()})`: ''}
          ${indicadores_seleccionados.length > 0 && 
              indicadores_seleccionados.map((indicador) => indicador).indexOf('Unidades') != -1 ? 
                ` AND (detalle_evaluaciones.nivel_unidades IN (${desempeño_filtrado.toString()}) OR detalle_evaluaciones.nivel_unidades_corregido IN (${desempeño_filtrado.toString()}))`
              : ''
          }
          ${indicadores_seleccionados.length > 0 &&    
              indicadores_seleccionados.map((indicador) => indicador).indexOf('Tiempo') != -1 ?
                ` AND (detalle_evaluaciones.nivel_tiempo IN (${desempeño_filtrado.toString()}) OR detalle_evaluaciones.nivel_tiempo_corregido IN (${desempeño_filtrado.toString()}))`
              : ''
          } 
          ${indicadores_seleccionados.length > 0 &&    
              indicadores_seleccionados.map((indicador) => indicador).indexOf('% entrada') != -1 ?
                ` AND (detalle_evaluaciones.nivel_porcentaje_entrada IN (${desempeño_filtrado.toString()}) OR detalle_evaluaciones.nivel_porcentaje_entrada_corregido IN (${desempeño_filtrado.toString()}))`
              : ''
          }
          ${indicadores_seleccionados.length > 0 &&
              indicadores_seleccionados.map((indicador) => indicador).indexOf('% jornada') != -1 ?
                ` AND (detalle_evaluaciones.nivel_porcentaje_jornada IN (${desempeño_filtrado.toString()}) OR detalle_evaluaciones.nivel_porcentaje_jornada_corregido IN (${desempeño_filtrado.toString()}))`
              : ''
          }

          ${indicadores_seleccionados.length == 0 && niveles_seleccionados.length > 0 ? 
              ` AND (
                  detalle_evaluaciones.nivel_unidades IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_unidades_corregido IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_tiempo IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_tiempo_corregido IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_porcentaje_entrada IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_porcentaje_entrada_corregido IN (${desempeño_filtrado.toString()})
                  OR detalle_evaluaciones.nivel_porcentaje_jornada IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_porcentaje_jornada_corregido IN (${desempeño_filtrado.toString()})
                )
              `
          : ''
        }

        GROUP BY actividades.id_tarea, fecha
        ORDER BY fecha asc`
  } else {
    queryDetalles = `
        SELECT detalle_evaluaciones.id_tarea,
            tareas.descripcion_tarea,
            CONCAT( evaluaciones.mes, "/", evaluaciones.anio ) as fecha,
            SUM(detalle_evaluaciones.horas) AS horas_totales,
            AVG(detalle_evaluaciones.horas) AS horas_media,
            SUM(detalle_evaluaciones.unidades) AS unidades_totales,
            AVG(detalle_evaluaciones.unidades) AS unidades_media,
            COUNT(distinct detalle_evaluaciones.id_evaluacion) as numero_puestos
        FROM detalle_evaluaciones
          INNER JOIN tareas ON tareas.id_tarea = detalle_evaluaciones.id_tarea
          INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
        WHERE
          STR_TO_DATE(CONCAT( evaluaciones.mes, "/", evaluaciones.anio ),'%m/%Y') >= STR_TO_DATE(CONCAT( ${mes_desde}, "/", ${anyo_desde} ),'%m/%Y') AND
          STR_TO_DATE(CONCAT( evaluaciones.mes, "/", evaluaciones.anio ),'%m/%Y') <= STR_TO_DATE(CONCAT( ${mes_hasta}, "/", ${anyo_hasta} ), '%m/%Y')
          ${puestos_seleccionados.length > 0 ? ` AND evaluaciones.id_puesto_trabajo IN (${puestos_seleccionados.toString()})`: ''}
          ${perfiles_seleccionados.length > 0 ? ` AND evaluaciones.id_puesto_trabajo IN (SELECT perfiles_puesto.id_puesto FROM perfiles_puesto WHERE perfiles_puesto.id_perfil IN (${perfiles_seleccionados.toString()}))`: ''}
          
          ${tareas_seleccionados.length > 0 ? ` AND detalle_evaluaciones.id_tarea IN (${tareas_seleccionados.toString()})`: ''}
          ${indicadores.length > 0 ? ` AND tareas.indicador = '${indicadores}'`: ''}
          ${compartida.length > 0 ? ` AND tareas.compartida = '${compartida}'`: ''}
          ${cuantificable.length > 0 ? ` AND tareas.cuantificable = '${cuantificable}'`: ''}
          ${dificultad.length > 0 ? ` AND tareas.dificultad = '${dificultad}'`: ''}
          ${entrada.length > 0 ? ` AND tareas.entrada = '${entrada}'`: ''}
          ${acumulativa.length > 0 ? ` AND tareas.acumulativa = '${acumulativa}'`: ''}
          ${indicadores_seleccionados.length > 0 && 
              indicadores_seleccionados.map((indicador) => indicador).indexOf('Unidades') != -1 ? 
                ` AND (detalle_evaluaciones.nivel_unidades IN (${desempeño_filtrado.toString()}) OR detalle_evaluaciones.nivel_unidades_corregido IN (${desempeño_filtrado.toString()}))`
              : ''
          }
          ${indicadores_seleccionados.length > 0 &&    
              indicadores_seleccionados.map((indicador) => indicador).indexOf('Tiempo') != -1 ?
                ` AND (detalle_evaluaciones.nivel_tiempo IN (${desempeño_filtrado.toString()}) OR detalle_evaluaciones.nivel_tiempo_corregido IN (${desempeño_filtrado.toString()}))`
              : ''
          } 
          ${indicadores_seleccionados.length > 0 &&    
              indicadores_seleccionados.map((indicador) => indicador).indexOf('% entrada') != -1 ?
                ` AND (detalle_evaluaciones.nivel_porcentaje_entrada IN (${desempeño_filtrado.toString()}) OR detalle_evaluaciones.nivel_porcentaje_entrada_corregido IN (${desempeño_filtrado.toString()}))`
              : ''
          }
          ${indicadores_seleccionados.length > 0 &&
              indicadores_seleccionados.map((indicador) => indicador).indexOf('% jornada') != -1 ?
                ` AND (detalle_evaluaciones.nivel_porcentaje_jornada IN (${desempeño_filtrado.toString()}) OR detalle_evaluaciones.nivel_porcentaje_jornada_corregido IN (${desempeño_filtrado.toString()}))`
              : ''
          }

          ${indicadores_seleccionados.length == 0 && niveles_seleccionados.length > 0 ? 
              ` AND (
                  detalle_evaluaciones.nivel_unidades IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_unidades_corregido IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_tiempo IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_tiempo_corregido IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_porcentaje_entrada IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_porcentaje_entrada_corregido IN (${desempeño_filtrado.toString()})
                  OR detalle_evaluaciones.nivel_porcentaje_jornada IN (${desempeño_filtrado.toString()}) 
                  OR detalle_evaluaciones.nivel_porcentaje_jornada_corregido IN (${desempeño_filtrado.toString()})
                )
              `
          : ''
        }

        GROUP BY detalle_evaluaciones.id_tarea, fecha
        ORDER BY fecha asc`
  }
  const detalles = await getAllRecords(queryDetalles)

  if ( detalles.length > 0) {
    //Calculamos las cuentas de los indicadores.
    for (let i = 0; i < detalles.length; i++) {
      const queryNivelesDesempeño = `
                SELECT detalle_evaluaciones.*
                FROM detalle_evaluaciones 
                  INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
                WHERE 
                  detalle_evaluaciones.id_tarea = ${detalles[i].id_tarea} AND
                  CONCAT( evaluaciones.mes, "/", evaluaciones.anio ) = '${detalles[i].fecha}'
                  ${puestos_seleccionados.length > 0 ? ` AND evaluaciones.id_puesto_trabajo IN (${puestos_seleccionados.toString()})`: ''}
                  ${perfiles_seleccionados.length > 0 ? ` AND evaluaciones.id_puesto_trabajo IN (SELECT perfiles_puesto.id_puesto FROM perfiles_puesto WHERE perfiles_puesto.id_perfil IN (${perfiles_seleccionados.toString()}))`: ''}
                `
      const info_desempeño = await getAllRecords(queryNivelesDesempeño)

      if ( info_desempeño.length > 0) {
        let numero_insatisfactorios = 0
        let numero_satisfactorios = 0
        let numero_altos = 0
        let numero_excelentes = 0

        for (let j = 0; j < info_desempeño.length; j++) {
          let valor_unidades = info_desempeño[j].nivel_unidades_corregido != null && info_desempeño[j].nivel_unidades_corregido.length > 0 ? info_desempeño[j].nivel_unidades_corregido: info_desempeño[j].nivel_unidades 
          let valor_tiempo = info_desempeño[j].nivel_tiempo_corregido != null && info_desempeño[j].nivel_tiempo_corregido.length > 0 ? info_desempeño[j].nivel_tiempo_corregido: info_desempeño[j].nivel_tiempo           
          let valor_entrada = info_desempeño[j].nivel_porcentaje_entrada_corregido != null && info_desempeño[j].nivel_porcentaje_entrada_corregido.length > 0 ? info_desempeño[j].nivel_porcentaje_entrada_corregido: info_desempeño[j].nivel_porcentaje_entrada
          let valor_jornada = info_desempeño[j].nivel_porcentaje_jornada_corregido != null && info_desempeño[j].nivel_porcentaje_jornada_corregido.length > 0 ? info_desempeño[j].nivel_porcentaje_jornada_corregido: info_desempeño[j].nivel_porcentaje_jornada 

          //Unidades
          if(valor_unidades == 'INSATISFACTORIO') {
            numero_insatisfactorios = numero_insatisfactorios + 1      
          }
          if(valor_unidades == 'SATISFACTORIO') {
            numero_satisfactorios = numero_satisfactorios + 1      
          }
          if(valor_unidades == 'ALTO') {
            numero_altos = numero_altos + 1      
          }
          if(valor_unidades == 'EXCELENTE') {
            numero_excelentes = numero_excelentes + 1      
          }

          //Tiempo
          if(valor_tiempo == 'INSATISFACTORIO') {
            numero_insatisfactorios = numero_insatisfactorios + 1      
          }
          if(valor_tiempo == 'SATISFACTORIO') {
            numero_satisfactorios = numero_satisfactorios + 1      
          }
          if(valor_tiempo == 'ALTO') {
            numero_altos = numero_altos + 1      
          }
          if(valor_tiempo == 'EXCELENTE') {
            numero_excelentes = numero_excelentes + 1      
          }

          //Entrada
          if(valor_entrada == 'INSATISFACTORIO') {
            numero_insatisfactorios = numero_insatisfactorios + 1      
          }
          if(valor_entrada == 'SATISFACTORIO') {
            numero_satisfactorios = numero_satisfactorios + 1      
          }
          if(valor_entrada == 'ALTO') {
            numero_altos = numero_altos + 1      
          }
          if(valor_entrada == 'EXCELENTE') {
            numero_excelentes = numero_excelentes + 1      
          }

          //Jornada
          if(valor_jornada == 'INSATISFACTORIO') {
            numero_insatisfactorios = numero_insatisfactorios + 1      
          }
          if(valor_jornada == 'SATISFACTORIO') {
            numero_satisfactorios = numero_satisfactorios + 1      
          }
          if(valor_jornada == 'ALTO') {
            numero_altos = numero_altos + 1      
          }
          if(valor_jornada == 'EXCELENTE') {
            numero_excelentes = numero_excelentes + 1      
          }
        }



        detalles[i].numero_insatisfactorios = numero_insatisfactorios
        detalles[i].numero_satisfactorios = numero_satisfactorios
        detalles[i].numero_altos = numero_altos
        detalles[i].numero_excelentes = numero_excelentes
      }
    }


    res.status(200).json(detalles);
  }
  else {
    res.status(500).json({'message':'No existen resultados para los filtros indicados.'});
  }
});

module.exports = getEvaluacionAgregado
