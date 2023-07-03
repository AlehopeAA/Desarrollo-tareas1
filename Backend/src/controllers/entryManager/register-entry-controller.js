'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    post register entry
// @route   POST /api/entradas/lista-tareas/:id
// @access  Private
const registerEntry = asyncHandler(async (req, res) => {
   const { id_tarea, entradaNow, entradaBack, entradaCompNow, entradaCompBack, puestos } = req.body  

   // cálculo de fecha mes actual y fecha mes anterior
   const actualDate = new Date()
   const pastDate = new Date()
   pastDate.setMonth(pastDate.getMonth() - 1)

   const actualMonth = actualDate.getMonth() + 1
   const pastMonth = pastDate.getMonth() + 1
   const actualYear = actualDate.getFullYear()
   const pastYear = pastDate.getFullYear()

   if (entradaBack != null && entradaBack.length > 0 && entradaBack > 0) {
      
      const getSharedTaksPositionsQuery = `
         SELECT id_puesto FROM compartidas WHERE id_tarea = ${ id_tarea }
      `
      const sharedTaksPositions = await queryPromise( getSharedTaksPositionsQuery )
      const positions = sharedTaksPositions.map(row => row.id_puesto)

      const isValidated = await validateRegister( positions, id_tarea, pastMonth, pastYear )
      if ( !isValidated ) {
         const getTaskDataQuery = `
            SELECT descripcion_tarea FROM tareas WHERE id_tarea = ${ id_tarea };
         `
         const taskData = await queryPromise( getTaskDataQuery )

         return res.status(400).json({ 
            message: `Para el mes anterior, no puede introducir/ modificar la entrada para la tarea "${ taskData[0].descripcion_tarea }" porque ya ha sido corregida, supervisada o validada para alguno de los trabajadores que la realiza.`
         })
      }


      db.query('SELECT * FROM entradas WHERE entradas.id_tarea = ? and anio=(select YEAR(date_sub(NOW(), interval 1 MONTH))) and mes=(select MONTH(date_sub(NOW(), interval 1 MONTH)))', id_tarea, (err, results) => {
         if (err) {
         return res.status(400).json({ message: err })
         } else if (!results.length) {
         db.query(
            `INSERT INTO entradas (fecha_ultima_modificacion, id_tarea, anio, mes, entrada)
            VALUES (sysdate(), ${id_tarea}, (select YEAR(date_sub(NOW(), interval 1 MONTH))), 
            (select MONTH(date_sub(NOW(), interval 1 MONTH))), ${entradaBack})
            `,
            (err, result) => {
               if (err) {
               return res.status(400).json({ message: err.sqlMessage })
               }
            }
         )        
         } else {
         db.query(
            `UPDATE entradas 
            SET fecha_ultima_modificacion = sysdate(), 
            entrada = nvl(entrada,0) + ${entradaBack}
            WHERE id_tarea = ${id_tarea} 
            and anio=(select YEAR(date_sub(NOW(), interval 1 MONTH)))
            and mes=(select MONTH(date_sub(NOW(), interval 1 MONTH)))
            `,
            (err, result) => {
               if (err) {
               return res.status(400).json({ message: err.sqlMessage })
               }
            }
         )
         }
      })
   }

   if (entradaCompBack && entradaCompBack.length > 0) {

      const isValidated = await validateRegister( puestos, id_tarea, pastMonth, pastYear )
      if ( !isValidated ) {  
         const getTaskDataQuery = `
            SELECT descripcion_tarea FROM tareas WHERE id_tarea = ${ id_tarea };
         `
         const taskData = await queryPromise( getTaskDataQuery )

         return res.status(400).json({ 
            message: `Para el mes anterior, no puede introducir/ modificar la entrada para la tarea "${ taskData[0].descripcion_tarea }" porque ya ha sido corregida, supervisada o validada para alguno de los trabajadores que la realiza.`
         })
      }


      try {
         for (let i = 0; i < entradaCompBack.length; i++) {
            if ( entradaCompBack[i] && entradaCompBack[i] != null && entradaCompBack[i]>0 ) {

               const insertEntradasBackQuery = `
                  UPDATE entradas_no_compartidas
                  SET fecha_ultima_modificacion = sysdate(), 
                     entrada = nvl(entrada,0) + ${entradaCompBack[i]}
                  WHERE id_tarea = ${id_tarea} 
                     AND id_puesto_trabajo = ${puestos[i]}
                     AND anio=(select YEAR(date_sub(NOW(), interval 1 MONTH)))
                     AND mes=(select MONTH(date_sub(NOW(), interval 1 MONTH)))
               `
               await queryPromise(insertEntradasBackQuery)
               
            }
         }
      }
      catch(ex) {
         return res.status(400).json({ message: 'Ha ocurrido un error en el guardado de entradas.' })
      }
   }

   if (entradaNow != null && entradaNow.length > 0 && entradaNow > 0) {
      
      const getSharedTaksPositionsQuery = `
         SELECT id_puesto FROM compartidas WHERE id_tarea = ${ id_tarea }
      `
      const sharedTaksPositions = await queryPromise( getSharedTaksPositionsQuery )
      const positions = sharedTaksPositions.map(row => row.id_puesto)

      const isValidated = await validateRegister( positions, id_tarea, actualMonth, actualYear )
      if ( !isValidated ) {  
         const getTaskDataQuery = `
            SELECT descripcion_tarea FROM tareas WHERE id_tarea = ${ id_tarea };
         `
         const taskData = await queryPromise( getTaskDataQuery )

         return res.status(400).json({ 
            message: `Para el mes actual, no puede introducir/ modificar la entrada para la tarea "${ taskData[0].descripcion_tarea }" porque ya ha sido corregida, supervisada o validada para alguno de los trabajadores que la realiza.`
         })
      }


      db.query('SELECT * FROM entradas WHERE entradas.id_tarea = ? and anio=(select YEAR(NOW())) and mes=(select MONTH(NOW()))', id_tarea, (err, results) => {
         if (err) {
            return res.status(400).json({ message: err })
         } else if (!results.length) {
            db.query(`INSERT INTO entradas (fecha_ultima_modificacion, id_tarea, anio, mes, entrada)
                  VALUES (sysdate(), ${id_tarea}, (select YEAR(NOW())), (select MONTH(NOW())), ${entradaNow})`,
               (err, result) => {
                  if (err) {
                     return res.status(400).json({ message: err.sqlMessage })
                  } else {
                     if (entradaBack != null && entradaBack.length>0 && entradaBack>0) {
                        db.query('SELECT * FROM entradas WHERE entradas.id_tarea = ? and anio=(select YEAR(NOW())) and mes=(select MONTH(NOW()))', id_tarea, (err, results) => {
                           if (err) {
                           return res.status(400).json({ message: err })
                           } else if (!results.length) {
                           db.query(
                              `INSERT INTO entradas (fecha_ultima_modificacion, id_tarea, anio, mes, entrada)
                              VALUES (sysdate(), ${id_tarea}, (select YEAR(date_sub(NOW(), interval 1 MONTH))), 
                              (select MONTH(date_sub(NOW(), interval 1 MONTH))), ${entradaBack})
                              `,
                              (err, result) => {
                                 if (err) {
                                 return res.status(400).json({ message: err.sqlMessage })
                                 }
                              }
                           )        
                           } else {
                           db.query(
                              `UPDATE entradas 
                              SET fecha_ultima_modificacion = sysdate(), 
                                 entrada = nvl(entrada,0) + ${entradaBack}
                              WHERE id_tarea = ${id_tarea} 
                                 AND anio=(select YEAR(date_sub(NOW(), interval 1 MONTH)))
                                 AND mes=(select MONTH(date_sub(NOW(), interval 1 MONTH)))
                              `,
                              (err, result) => {
                                 if (err) {
                                    return res.status(400).json({ message: err.sqlMessage })
                                 }
                              }
                           )
                           }
                        })
                     }
                  }
               }
            )        
         } else {
            db.query(
               `UPDATE entradas 
               SET fecha_ultima_modificacion = sysdate(), 
                  entrada = nvl(entrada,0) + ${entradaNow}
               WHERE id_tarea = ${id_tarea} 
                  AND anio=(select YEAR(NOW()))
                  AND mes=(select MONTH(NOW()))
               `,
               (err, result) => {
                  if (err) {
                     return res.status(400).json({ message: err.sqlMessage })
                  } else {
                     if (entradaBack != null && entradaBack.length>0 && entradaBack>0) {
                        db.query('SELECT * FROM entradas WHERE entradas.id_tarea = ? anio=(select YEAR(date_sub(NOW(), interval 1 MONTH))) and mes=(select MONTH(date_sub(NOW(), interval 1 MONTH)))', id_tarea, (err, results) => {
                           if (err) {
                              return res.status(400).json({ message: err })
                           } else if (!results.length) {
                              db.query(
                                 `INSERT INTO entradas (fecha_ultima_modificacion, id_tarea, anio, mes, entrada)
                                 VALUES (sysdate(), ${id_tarea}, (select YEAR(date_sub(NOW(), interval 1 MONTH))), 
                                 (select MONTH(date_sub(NOW(), interval 1 MONTH))), ${entradaBack})
                                 `,
                                 (err, result) => {
                                    if (err) {
                                    return res.status(400).json({ message: err.sqlMessage })
                                    }
                                 }
                              )        
                           } else {
                              db.query(
                                 `UPDATE entradas 
                                 SET fecha_ultima_modificacion = sysdate(), 
                                    entrada = nvl(entrada,0) + ${entradaBack}
                                 WHERE id_tarea = ${id_tarea} 
                                    AND anio=(select YEAR(date_sub(NOW(), interval 1 MONTH)))
                                    AND mes=(select MONTH(date_sub(NOW(), interval 1 MONTH)))
                                 `,
                                 (err, result) => {
                                    if (err) {
                                       return res.status(400).json({ message: err.sqlMessage })
                                    }
                                 }
                              )
                           }
                        })
                     }
                  }
               }
            )
         }
      })
   }
     
   if (entradaCompNow && entradaCompNow.length > 0) {
      
      const isValidated = await validateRegister( puestos, id_tarea, actualMonth, actualYear )
      if ( !isValidated ) {  
         const getTaskDataQuery = `
            SELECT descripcion_tarea FROM tareas WHERE id_tarea = ${ id_tarea };
         `
         const taskData = await queryPromise( getTaskDataQuery )

         return res.status(400).json({ 
            message: `Para el mes actual, no puede introducir/ modificar la entrada para la tarea "${ taskData[0].descripcion_tarea }" porque ya ha sido corregida, supervisada o validada para alguno de los trabajadores que la realiza.`
         })
      }


      try {
         for (let i = 0; i < entradaCompNow.length; i++) {
            if ( entradaCompNow[i] && entradaCompNow[i] != null && entradaCompNow[i] > 0 ) {       

               const insertEntradasNowQuery = `
                  UPDATE entradas_no_compartidas
                  SET fecha_ultima_modificacion = sysdate(), 
                     entrada = nvl(entrada,0) + ${entradaCompNow[i]}
                  WHERE id_tarea = ${id_tarea} 
                     AND id_puesto_trabajo = ${puestos[i]}
                     AND anio=(select YEAR(NOW()))
                     AND mes=(select MONTH(NOW()))
               `
               await queryPromise(insertEntradasNowQuery)                   
            }
         }
      }
      catch(ex) {
         return res.status(400).json({ message: 'Ha ocurrido un error en el guardado de entradas.' })
      }
   }


   return res.status(200).json({ message: 'Entrada registrada correctamente'})
})

const validateRegister = async ( positions, taskId, month, year ) => {
   const actualDate = new Date()
   if ( year === actualDate.getFullYear() && month === actualDate.getMonth + 1 ) return true

   // CONDICIÓN 1
   const mesBloqueadoQuery = `
      SELECT count(*) as cuenta FROM evaluaciones
      WHERE evaluaciones.mes = ${ month }
         AND evaluaciones.anio = ${ year }
         ${ positions.length ? `AND evaluaciones.id_puesto_trabajo IN (${ positions.join(", ") })` : "" }
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
         ${ positions.length ? `AND evaluaciones.id_puesto_trabajo IN (${ positions.join(", ") })` : "" }
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

module.exports = registerEntry
