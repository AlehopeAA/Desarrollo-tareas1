'use strict'

const asyncHandler = require('express-async-handler')
const { NULL } = require('mysql/lib/protocol/constants/types')
const db = require('../../config/mysql/db')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    Update  entry
// @route   PUT /api/entradas/lista-tareas/:id
// @access  Private/Admin
const updateEntry = asyncHandler(async (req, res) => {
   const id = req.params.id
   const { entrada, tipo, id_tarea, descripcion_tarea } = req.body

   
   if (tipo == 'COMPARTIDA') {

      const getEntrieDataQuery = `
         SELECT * FROM entradas WHERE id_entrada = ${ id }
      `
      const entrieData = await queryPromise( getEntrieDataQuery )

      const getSharedTaksPositionsQuery = `
         SELECT id_puesto FROM compartidas WHERE id_tarea = ${ id_tarea }
      `
      const sharedTaksPositions = await queryPromise( getSharedTaksPositionsQuery )
      const positions = sharedTaksPositions.map(row => row.id_puesto)

      const isValidated = await validateUpdate(positions, id_tarea, entrieData[0].mes, entrieData[0].anio)
      if ( !isValidated ) {
         return res.status(400).json({ 
            message: `No puede introducir/ modificar la entrada para la tarea "${ descripcion_tarea }" porque ya ha sido corregida, supervisada o validada para alguno de los trabajadores que la realiza.`
         })
      }

      db.query('SELECT * FROM entradas WHERE entradas.id_entrada = ? ', id, (err, results) => {
         if (err) {
            res.status(400).json({ message: err })
         } else if (!results.length) {
            res.status(400).json({ message: 'No existe una entrada con ese id' })
         } else {
            db.query(
               `UPDATE entradas SET fecha_ultima_modificacion = sysdate(), entrada=${entrada}
               WHERE id_entrada = ${id}`,
               (err, result) => {
                  if (err) {
                     res.status(400).json({ message: err.sqlMessage })
                  } else if (result) {
                     res.status(201).json({
                        message: 'Entrada editada correctamente',
                     })
                  }
               }
            )
         }
      })
   } else if (tipo == 'NOCOMPARTIDA') {

      const getEntrieDataQuery = `
         SELECT * FROM entradas_no_compartidas WHERE id_entrada = ${ id }
      `
      const entrieData = await queryPromise( getEntrieDataQuery )

      const getEntryDataQuery = `
         SELECT id_tarea, id_puesto_trabajo FROM entradas_no_compartidas WHERE id_entrada = ${ id }
      `
      const entryData = await queryPromise( getEntryDataQuery )
      const taskId = entryData[0].id_tarea
      const position = entryData[0].id_puesto_trabajo

      const isValidated = await validateUpdate([position], taskId, entrieData[0].mes, entrieData[0].anio)
      if ( !isValidated ) {
         return res.status(400).json({ 
            message: `No puede introducir/ modificar la entrada para la tarea "${ descripcion_tarea }" porque ya ha sido corregida, supervisada o validada para alguno de los trabajadores que la realiza.`
         })
      }

      db.query('SELECT * FROM entradas_no_compartidas WHERE entradas_no_compartidas.id_entrada = ? ', id, (err, results) => {
         if (err) {
         res.status(400).json({ message: err })
         } else if (!results.length) {
         res.status(400).json({ message: 'No existe una entrada con ese id' })
         } else {
         db.query(
            `UPDATE entradas_no_compartidas SET fecha_ultima_modificacion = sysdate(), entrada=${entrada}
            WHERE id_entrada = ${id}`,
            (err, result) => {
               if (err) {
               res.status(400).json({ message: err.sqlMessage })
               } else if (result) {
               res.status(201).json({
                  message: 'Entrada editada correctamente',
               })
               }
            }
         )
         }
      })
   }
})

const validateUpdate= async ( positions, taskId, month, year ) => {

   // CONDICIÓN 1
   const mesBloqueadoQuery = `
      SELECT count(*) as cuenta FROM evaluaciones
      WHERE evaluaciones.mes = ${ month }
         AND evaluaciones.anio = ${ year }
         AND evaluaciones.id_puesto_trabajo IN (${ positions.join(", ") })
         AND (
            evaluaciones.supervisada='SI' 
            OR evaluaciones.validada='SI'
            OR evaluaciones.nivel_global_corregido IS NOT null
         )
   `

   const mesBloqueado = await queryPromise(mesBloqueadoQuery)

   if (mesBloqueado[0].cuenta > 0) {
      return false
   }
   // CONDICIÓN 2
   const tareaBloqueadaQuery = `
      SELECT count(*) as cuenta FROM detalle_evaluaciones
         INNER JOIN evaluaciones ON detalle_evaluaciones.id_evaluacion=evaluaciones.id_evaluacion
      WHERE evaluaciones.mes = ${ month }
         AND evaluaciones.anio = ${ year }
         AND evaluaciones.id_puesto_trabajo IN (${ positions.join(", ") })
         AND detalle_evaluaciones.id_tarea = ${ taskId }
         AND (
            detalle_evaluaciones.supervision='SI'
            OR detalle_evaluaciones.evaluacion='SI'
            OR detalle_evaluaciones.supervision='CORREGIDO'
            OR detalle_evaluaciones.evaluacion='CORREGIDO'
         )
   `
   
   const tareaBloqueada = await queryPromise(tareaBloqueadaQuery)

   if (tareaBloqueada[0].cuenta > 0) {
      return  false
   }

   return true
}

module.exports = updateEntry
