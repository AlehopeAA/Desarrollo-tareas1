'use strict'

const asyncHandler = require('express-async-handler')
const jornadaUtilidades = require('../../utils/jornadaUtilidades')
const { getOneRecord, getAllRecords } = require('../../utils/queryPromises')

// @desc    Obtiene el resumen de la evaluacion para una persona, un mes y un año.
// @route   POST /api/evaluaciones/resumeninforme
// @access  Private/Admin
const getEvaluacionResumenInforme = asyncHandler(async (req, res) => {
  const {
    mes_inicio,
    anyo_inicio,
    mes_fin,
    anyo_fin,
    trabajador_id,
  } = req.body;

  if(anyo_fin < anyo_inicio) {
    res.status(500).json({'message':'El mes/año de inicio debe ser inferior al de fin'});
  } else if(anyo_fin == anyo_inicio && mes_fin < mes_inicio) { 
    res.status(500).json({'message':'El mes/año de inicio debe ser inferior al de fin'});
  }

  if(anyo_fin == anyo_inicio) {
    const queryEvaluaciones = `
       SELECT mes, anio, (case nivel_global_corregido WHEN 'INSATISFACTORIO' THEN nivel_global_corregido WHEN 'SATISFACTORIO' THEN nivel_global_corregido WHEN 'ALTO' THEN nivel_global_corregido WHEN 'EXCELENTE' THEN nivel_global_corregido else nivel_global END) as nivel_global, porcentaje_carga
       FROM evaluaciones 
       WHERE id_puesto_trabajo = ${trabajador_id}
       AND mes >= ${mes_inicio}
       AND mes <= ${mes_fin}
       AND anio = ${anyo_inicio}
       ORDER BY anio, mes`
    var evaluaciones = await getAllRecords(queryEvaluaciones)
  } else {
   const queryEvaluaciones = `
      SELECT mes, anio, (case nivel_global_corregido WHEN 'INSATISFACTORIO' THEN nivel_global_corregido WHEN 'SATISFACTORIO' THEN nivel_global_corregido WHEN 'ALTO' THEN nivel_global_corregido WHEN 'EXCELENTE' THEN nivel_global_corregido else nivel_global END) as nivel_global, porcentaje_carga
      FROM evaluaciones 
      WHERE id_puesto_trabajo = ${trabajador_id}
      AND ((mes <= ${mes_fin} AND anio = ${anyo_fin}) OR (mes >= ${mes_inicio} AND anio = ${anyo_inicio}) OR (anio > ${anyo_inicio} AND anio <${anyo_fin}))
      order by anio, mes`
   var evaluaciones = await getAllRecords(queryEvaluaciones)
  }

  if ( evaluaciones.length > 0) {
     //Calculamos el desempeño y porcentajes globales global.
     let suma_indicadores = 0
     let suma_porcentajes = 0
     let numero_indicadores = 0
     let nivel_global = 'N/A'
     for (let i = 0; i < evaluaciones.length; i++) {
       suma_porcentajes = suma_porcentajes + evaluaciones[i].porcentaje_carga
        if (evaluaciones[i].nivel_global == 'INSATISFACTORIO') {
              suma_indicadores = suma_indicadores + 0
              numero_indicadores = numero_indicadores + 1.0
        }
        if (evaluaciones[i].nivel_global == 'SATISFACTORIO') {
              suma_indicadores = suma_indicadores + 1
              numero_indicadores = numero_indicadores + 1.0
        }
        if (evaluaciones[i].nivel_global == 'ALTO') {
              suma_indicadores = suma_indicadores + 2
              numero_indicadores = numero_indicadores + 1.0
        }
        if (evaluaciones[i].nivel_global == 'EXCELENTE') {
              suma_indicadores = suma_indicadores + 3
              numero_indicadores = numero_indicadores + 1.0
        }
     }

     const valor_nivel_global = (suma_indicadores / numero_indicadores)
     if( valor_nivel_global < 0.5 ) {
        nivel_global = 'INSATISFACTORIO'    
     }
     if( 0.5 <= valor_nivel_global && valor_nivel_global < 1.5 ) {
        nivel_global = 'SATISFACTORIO'    
     }
     if( 1.5 <= valor_nivel_global && valor_nivel_global < 2.5  ) {
        nivel_global = 'ALTO'    
     }
     if( valor_nivel_global >= 2.5 ) {
        nivel_global = 'EXCELENTE'    
     }

     const porcentaje_global = (suma_porcentajes / numero_indicadores)

     const resumen = {
        evaluaciones: evaluaciones,
        nivel_global: nivel_global, 
        porcentaje_global: porcentaje_global,
     }

     return res.status(200).json(resumen)
  } else {
    res.status(500).json({'message':'No existe evaluación para los datos indicados.'});
  }
  
});

module.exports = getEvaluacionResumenInforme
