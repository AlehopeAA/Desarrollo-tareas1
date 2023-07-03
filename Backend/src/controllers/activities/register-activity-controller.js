'use strict'

const asyncHandler = require('express-async-handler')
const { registerRecord } = require('../../utils/queryPromises')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    post register activity
// @route   POST /api/actividades
// @access  Private
const registerActivity = asyncHandler(async (req, res) => {
   const { id_puesto } = req.user
   const { fecha_actividad, modalidad, horas, unidades, codigo_trazabilidad, observaciones, tarea, fecha_alta } =
      req.body

   const taskKeys = ['fecha_creacion', 'id_puesto', 'fecha_actividad', 'id_tarea', 'modalidad', 'horas', 'validada']
   const taskValues = [
      `'${fecha_alta}'`,
      `'${id_puesto}'`,
      `'${fecha_actividad}'`,
      `'${tarea.id_tarea}'`,
      `'${modalidad}'`,
      `replace('${horas}',',','.')`,
      `'${'NO'}'`,
   ]

   if (unidades) {
      taskKeys.push('unidades')
      taskValues.push(`replace('${unidades}',',','.')`)
   }

   if (observaciones) {
      taskKeys.push('observaciones')
      taskValues.push(`'${observaciones}'`)
   }

   const mesBloqueadoQuery = `
      SELECT count(*) as cuenta FROM evaluaciones
      WHERE evaluaciones.mes=(select MONTH('${fecha_actividad}'))
         AND evaluaciones.anio=(select YEAR('${fecha_actividad}'))
         AND evaluaciones.id_puesto_trabajo=${id_puesto}
         AND (
            evaluaciones.supervisada='SI' 
            OR evaluaciones.validada='SI'
            OR evaluaciones.nivel_global_corregido IS NOT null
         )
   `
   const mesBloqueado = await queryPromise(mesBloqueadoQuery)

   if (mesBloqueado[0].cuenta > 0) {
      return res.status(400).json({ message: 'No puede registrar actividad para este mes porque dicho mes ya está supervisado o validado' })
   }

   const tareaBloqueadaQuery = `
      SELECT count(*) as cuenta
      FROM detalle_evaluaciones
         INNER JOIN evaluaciones ON detalle_evaluaciones.id_evaluacion=evaluaciones.id_evaluacion
      WHERE evaluaciones.mes=(select MONTH('${fecha_actividad}'))
         AND evaluaciones.anio=(select YEAR('${fecha_actividad}'))
         AND evaluaciones.id_puesto_trabajo=${id_puesto}
         AND detalle_evaluaciones.id_tarea=${tarea.id_tarea}
         AND (
            detalle_evaluaciones.supervision='SI' 
            OR detalle_evaluaciones.evaluacion='SI' 
            OR detalle_evaluaciones.supervision='CORREGIDO' 
            OR detalle_evaluaciones.evaluacion='CORREGIDO'
         )
   `
   const tareaBloqueada = await queryPromise(tareaBloqueadaQuery)

   if (tareaBloqueada[0].cuenta > 0) {
      return res.status(400).json({ message: 'No puede registrar la tarea porque para este mes la tarea ya está supervisada o validada' })
   }

   const insertActivityQuery = `
      INSERT INTO actividades (
         ${taskKeys.toString()}
      ) VALUES(${taskValues.toString()})
   `
   try {
      const actividad = await registerRecord(insertActivityQuery)
      for (let i = 0; i < codigo_trazabilidad.length; i++) {
         const insertCodigoTrazabilidadQuery = `INSERT INTO codigos_trazabilidad_actividad 
                                             (
                                                id_actividad, codigo_trazabilidad
                                             ) 
                                             VALUES (
                                                ${actividad.insertId}, 
                                                '${codigo_trazabilidad[i]}'
                                             )`
         await registerRecord(insertCodigoTrazabilidadQuery)
      }
      return res.status(200).json({})
   }
   catch(ex) {
      return res.status(400).json({ message: 'Ha ocurrido un error en el guardado de la actividad.' })
   }
})

module.exports = registerActivity
