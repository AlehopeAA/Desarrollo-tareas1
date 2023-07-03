'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Obtiene los resultados para mostrar en cuadro de mandos.
// @route   POST /api/cuadromandos
// @access  validators/responsibles
const getDashboard = asyncHandler(async (req, res) => {
   const {
      mes,
      anio,
      perfiles_seleccionados,
      subdirecciones_seleccionados,
      servicios_seleccionados,
      departamentos_seleccionados,
      unidades_seleccionados,
      roles_seleccionados,
   } = req.body;

   const { id_puesto } = req.user

   const querySubdirecciones = `
      SELECT 0 as id_subdireccion, 'AGENCIA' as descripcion_subdireccion FROM dual
         UNION
      SELECT id_subdireccion, descripcion_subdireccion
      FROM perfil_subdireccion
      ${
         subdirecciones_seleccionados.length > 0 
            ? ` WHERE id_subdireccion IN (${subdirecciones_seleccionados.toString()})`
            : ` WHERE id_subdireccion IN (
                  SELECT DISTINCT p.id_subdireccion
                  FROM perfiles_puesto AS pp 
                     INNER JOIN perfiles AS p ON p.id_perfil = pp.id_perfil 
                  WHERE pp.id_puesto IN (
                     SELECT id_puesto 
                     FROM actividades.responsables R 
                     WHERE R.id_puesto_responsable = ${ id_puesto }
                     
                     UNION 
                     
                     SELECT id_puesto 
                     FROM actividades.validadores R 
                     WHERE R.id_puesto_validador = ${ id_puesto }
                  )
               )`
      }
   `

   const subdirecciones = await getAllRecords(querySubdirecciones)

   subdirecciones[0] = {
      datosPuestoNivelSubdireccion: {}, 
      datosPuestoNivelTareaSubdireccion: {},
      datosTareaNivelSubdireccion: {},
      datosCargaSubdireccion: {},
      ...subdirecciones[0]
   }

   // PUESTOS DE TRABAJO POR NIVEL DE DESEMPEÑO
   var queryNivelesDesempeñoAgencia = `
      SELECT nivel_global, nivel_global_corregido
      FROM evaluaciones
      WHERE evaluaciones.mes = ${mes}
         AND evaluaciones.anio = ${anio}
         AND (
            nivel_global <> 'N/A'
            OR nivel_global_corregido <> 'N/A'
         )
         AND evaluaciones.id_puesto_trabajo IN (
            SELECT id_puesto 
            FROM actividades.responsables R 
            WHERE R.id_puesto_responsable = ${ id_puesto }
            
            UNION 
            
            SELECT id_puesto 
            FROM actividades.validadores R 
            WHERE R.id_puesto_validador = ${ id_puesto }
         )
   `
   var info_desempeñoAgencia = await getAllRecords(queryNivelesDesempeñoAgencia)

   if ( info_desempeñoAgencia.length > 0) {
      let numero_insatisfactorios = 0
      let numero_satisfactorios = 0
      let numero_altos = 0
      let numero_excelentes = 0

      for (let j = 0; j < info_desempeñoAgencia.length; j++) {
         let valor = info_desempeñoAgencia[j].nivel_global_corregido != null && info_desempeñoAgencia[j].nivel_global_corregido.length > 0 ? info_desempeñoAgencia[j].nivel_global_corregido: info_desempeñoAgencia[j].nivel_global 

         if(valor == 'INSATISFACTORIO') {
            numero_insatisfactorios = numero_insatisfactorios + 1      
         }
         if(valor == 'SATISFACTORIO') {
            numero_satisfactorios = numero_satisfactorios + 1      
         }
         if(valor == 'ALTO') {
            numero_altos = numero_altos + 1      
         }
         if(valor == 'EXCELENTE') {
            numero_excelentes = numero_excelentes + 1      
         }
      }

      subdirecciones[0].datosPuestoNivelSubdireccion = [
         { title: 'Insatisfactorios', value: numero_insatisfactorios },
         { title: 'Satisfactorios', value: numero_satisfactorios },
         { title: 'Altos', value: numero_altos },
         { title: 'Excelentes', value: numero_excelentes },
      ]
   } else {
      subdirecciones[0].datosPuestoNivelSubdireccion = [
         { title: 'Insatisfactorios', value: 0 },
         { title: 'Satisfactorios', value: 0 },
         { title: 'Altos', value: 0 },
         { title: 'Excelentes', value: 0 },
      ]
   }
   // PUESTOS DE TRABAJO POR NIVEL DE DESEMPEÑO ESPECÍFICOS DE TAREAS
   queryNivelesDesempeñoAgencia = `
      SELECT nivel_unidades, nivel_unidades_corregido, nivel_tiempo, nivel_tiempo_corregido, 
               nivel_porcentaje_entrada, nivel_porcentaje_entrada_corregido, nivel_porcentaje_jornada, nivel_porcentaje_jornada_corregido
      FROM detalle_evaluaciones
         INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
      WHERE evaluaciones.mes = ${mes}
      AND evaluaciones.anio = ${anio}
      AND (
         nivel_unidades <> 'N/A'
         OR nivel_unidades_corregido <> 'N/A'
         OR nivel_tiempo <> 'N/A' OR nivel_tiempo_corregido <> 'N/A'
         OR nivel_porcentaje_entrada <> 'N/A'
         OR nivel_porcentaje_entrada_corregido <> 'N/A' 
         OR nivel_porcentaje_jornada <> 'N/A'
         OR nivel_porcentaje_jornada_corregido <> 'N/A'
      )
      AND evaluaciones.id_puesto_trabajo IN (
         SELECT id_puesto 
         FROM actividades.responsables R 
         WHERE R.id_puesto_responsable = ${ id_puesto }
         
         UNION 
         
         SELECT id_puesto 
         FROM actividades.validadores R 
         WHERE R.id_puesto_validador = ${ id_puesto }
      )
   `
   info_desempeñoAgencia = await getAllRecords(queryNivelesDesempeñoAgencia)

   if ( info_desempeñoAgencia.length > 0) {
      let numero_insatisfactorios = 0
      let numero_satisfactorios = 0
      let numero_altos = 0
      let numero_excelentes = 0

      for (let j = 0; j < info_desempeñoAgencia.length; j++) {
         let valor = (info_desempeñoAgencia[j].nivel_unidades_corregido != null && info_desempeñoAgencia[j].nivel_unidades_corregido.length > 0) ? info_desempeñoAgencia[j].nivel_unidades_corregido: info_desempeñoAgencia[j].nivel_unidades 

         if(valor == 'INSATISFACTORIO') {
            numero_insatisfactorios = numero_insatisfactorios + 1      
         }
         if(valor == 'SATISFACTORIO') {
            numero_satisfactorios = numero_satisfactorios + 1      
         }
         if(valor == 'ALTO') {
            numero_altos = numero_altos + 1      
         }
         if(valor == 'EXCELENTE') {
            numero_excelentes = numero_excelentes + 1      
         }
      }

      for (let j = 0; j < info_desempeñoAgencia.length; j++) {
         let valor = info_desempeñoAgencia[j].nivel_tiempo_corregido != null && info_desempeñoAgencia[j].nivel_tiempo_corregido.length > 0 ? info_desempeñoAgencia[j].nivel_tiempo_corregido: info_desempeñoAgencia[j].nivel_tiempo 

         if(valor == 'INSATISFACTORIO') {
            numero_insatisfactorios = numero_insatisfactorios + 1      
         }
         if(valor == 'SATISFACTORIO') {
            numero_satisfactorios = numero_satisfactorios + 1      
         }
         if(valor == 'ALTO') {
            numero_altos = numero_altos + 1      
         }
         if(valor == 'EXCELENTE') {
            numero_excelentes = numero_excelentes + 1      
         }
      }

      for (let j = 0; j < info_desempeñoAgencia.length; j++) {
         let valor = info_desempeñoAgencia[j].nivel_porcentaje_entrada_corregido != null && info_desempeñoAgencia[j].nivel_porcentaje_entrada_corregido.length > 0 ? info_desempeñoAgencia[j].nivel_porcentaje_entrada_corregido: info_desempeñoAgencia[j].nivel_porcentaje_entrada 

         if(valor == 'INSATISFACTORIO') {
            numero_insatisfactorios = numero_insatisfactorios + 1      
         }
         if(valor == 'SATISFACTORIO') {
            numero_satisfactorios = numero_satisfactorios + 1      
         }
         if(valor == 'ALTO') {
            numero_altos = numero_altos + 1      
         }
         if(valor == 'EXCELENTE') {
            numero_excelentes = numero_excelentes + 1      
         }
      }

      for (let j = 0; j < info_desempeñoAgencia.length; j++) {
         let valor = info_desempeñoAgencia[j].nivel_porcentaje_jornada_corregido != null && info_desempeñoAgencia[j].nivel_porcentaje_jornada_corregido.length > 0 ? info_desempeñoAgencia[j].nivel_porcentaje_jornada_corregido: info_desempeñoAgencia[j].nivel_porcentaje_jornada 

         if(valor == 'INSATISFACTORIO') {
            numero_insatisfactorios = numero_insatisfactorios + 1      
         }
         if(valor == 'SATISFACTORIO') {
            numero_satisfactorios = numero_satisfactorios + 1      
         }
         if(valor == 'ALTO') {
            numero_altos = numero_altos + 1      
         }
         if(valor == 'EXCELENTE') {
            numero_excelentes = numero_excelentes + 1      
         }
      }
   
      subdirecciones[0].datosPuestoNivelTareaSubdireccion = [
         { title: 'Insatisfactorios', value: numero_insatisfactorios },
         { title: 'Satisfactorios', value: numero_satisfactorios },
         { title: 'Altos', value: numero_altos },
         { title: 'Excelentes', value: numero_excelentes },
      ]
   } else {
      subdirecciones[0].datosPuestoNivelTareaSubdireccion = [
         { title: 'Insatisfactorios', value: 0 },
         { title: 'Satisfactorios', value: 0 },
         { title: 'Altos', value: 0 },
         { title: 'Excelentes', value: 0 },
      ]
   }

   queryNivelesDesempeñoAgencia = `
      SELECT id_tarea,
         (CASE IFNULL(nivel_tiempo_corregido, 'N/A') WHEN 'N/A' THEN nivel_tiempo ELSE nivel_tiempo_corregido END) AS nivel,
         count(*) AS cuenta
      FROM detalle_evaluaciones
         INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
      WHERE evaluaciones.mes = ${mes}
         AND evaluaciones.anio = ${anio}
         AND (CASE IFNULL(nivel_tiempo_corregido, 'N/A') WHEN 'N/A' THEN nivel_tiempo ELSE nivel_tiempo_corregido END) <> 'N/A'
         AND evaluaciones.id_puesto_trabajo IN (
            SELECT id_puesto 
            FROM actividades.responsables R 
            WHERE R.id_puesto_responsable = ${ id_puesto }
            
            UNION 
            
            SELECT id_puesto 
            FROM actividades.validadores R 
            WHERE R.id_puesto_validador = ${ id_puesto }
         )
      GROUP BY id_tarea, nivel

         UNION

      SELECT id_tarea,
         (CASE IFNULL(nivel_unidades_corregido, 'N/A') WHEN 'N/A' THEN nivel_unidades ELSE nivel_unidades_corregido END) AS nivel,
         count(*) AS cuenta
      FROM detalle_evaluaciones
         INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
      WHERE evaluaciones.mes = ${mes}
         AND evaluaciones.anio = ${anio}
         AND (case IFNULL(nivel_unidades_corregido, 'N/A') when 'N/A' then nivel_unidades else nivel_unidades_corregido end) <> 'N/A'
         AND evaluaciones.id_puesto_trabajo IN (
            SELECT id_puesto 
            FROM actividades.responsables R 
            WHERE R.id_puesto_responsable = ${ id_puesto }
            
            UNION 
            
            SELECT id_puesto 
            FROM actividades.validadores R 
            WHERE R.id_puesto_validador = ${ id_puesto }
         )
      GROUP BY id_tarea, nivel

         UNION

      SELECT id_tarea,
         (case IFNULL(nivel_porcentaje_entrada_corregido, 'N/A') when 'N/A' then nivel_porcentaje_entrada else nivel_porcentaje_entrada_corregido end) as nivel,
         count(*) as cuenta
      FROM detalle_evaluaciones
         INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
      WHERE evaluaciones.mes = ${mes}
         AND evaluaciones.anio = ${anio}
         AND (case IFNULL(nivel_porcentaje_entrada_corregido, 'N/A') when 'N/A' then nivel_porcentaje_entrada else nivel_porcentaje_entrada_corregido end) <> 'N/A'
         AND evaluaciones.id_puesto_trabajo IN (
            SELECT id_puesto 
            FROM actividades.responsables R 
            WHERE R.id_puesto_responsable = ${ id_puesto }
            
            UNION 
            
            SELECT id_puesto 
            FROM actividades.validadores R 
            WHERE R.id_puesto_validador = ${ id_puesto }
         )
      GROUP BY id_tarea, nivel

         UNION

      SELECT id_tarea,
         (case IFNULL(nivel_porcentaje_jornada_corregido, 'N/A') when 'N/A' then nivel_porcentaje_jornada else nivel_porcentaje_jornada_corregido end) as nivel,
         count(*) as cuenta
      FROM detalle_evaluaciones
         INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
      WHERE evaluaciones.mes = ${mes}
         AND evaluaciones.anio = ${anio}
         AND (case IFNULL(nivel_porcentaje_jornada_corregido, 'N/A') when 'N/A' then nivel_porcentaje_jornada else nivel_porcentaje_jornada_corregido end) <> 'N/A'
         AND evaluaciones.id_puesto_trabajo IN (
            SELECT id_puesto 
            FROM actividades.responsables R 
            WHERE R.id_puesto_responsable = ${ id_puesto }
            
            UNION 
            
            SELECT id_puesto 
            FROM actividades.validadores R 
            WHERE R.id_puesto_validador = ${ id_puesto }
         )
      GROUP BY id_tarea, nivel
      ORDER BY id_tarea;
   `
   info_desempeñoAgencia = await getAllRecords(queryNivelesDesempeñoAgencia)

   if ( info_desempeñoAgencia.length > 0) {
         let numero_insatisfactorios = 0
         let numero_satisfactorios = 0
         let numero_altos = 0
         let numero_excelentes = 0

         for (let j = 0; j < info_desempeñoAgencia.length; j++) {
            let valor = info_desempeñoAgencia[j].nivel

            if(valor == 'INSATISFACTORIO') {
               numero_insatisfactorios = numero_insatisfactorios + info_desempeñoAgencia[j].cuenta
            }
            if(valor == 'SATISFACTORIO') {
               numero_satisfactorios = numero_satisfactorios + info_desempeñoAgencia[j].cuenta
            }
            if(valor == 'ALTO') {
               numero_altos = numero_altos + info_desempeñoAgencia[j].cuenta
            }
            if(valor == 'EXCELENTE') {
               numero_excelentes = numero_excelentes + info_desempeñoAgencia[j].cuenta
            }
         }

         subdirecciones[0].datosTareaNivelSubdireccion = [
            { title: 'Insatisfactorios', value: numero_insatisfactorios },
            { title: 'Satisfactorios', value: numero_satisfactorios },
            { title: 'Altos', value: numero_altos },
            { title: 'Excelentes', value: numero_excelentes },
         ]
   } else {
      subdirecciones[0].datosTareaNivelSubdireccion = [
         { title: 'Insatisfactorios', value: 0 },
         { title: 'Satisfactorios', value: 0 },
         { title: 'Altos', value: 0 },
         { title: 'Excelentes', value: 0 },
      ]
   }

   queryNivelesDesempeñoAgencia = `
      SELECT round(sum(porcentaje_carga) / count(porcentaje_carga)) AS porcentaje
      FROM evaluaciones
      WHERE evaluaciones.mes = ${mes}
         AND evaluaciones.anio = ${anio}
         AND evaluaciones.id_puesto_trabajo IN (
            SELECT id_puesto 
            FROM actividades.responsables R 
            WHERE R.id_puesto_responsable = ${ id_puesto }
            
            UNION 
            
            SELECT id_puesto 
            FROM actividades.validadores R 
            WHERE R.id_puesto_validador = ${ id_puesto }
         )
   `
   info_desempeñoAgencia = await getAllRecords(queryNivelesDesempeñoAgencia)

   if ( info_desempeñoAgencia.length > 0) {
         let valor = info_desempeñoAgencia[0].porcentaje
         let valor_resto = 100-info_desempeñoAgencia[0].porcentaje

         subdirecciones[0].datosCargaSubdireccion = [
            { title: '% Registradas', value: valor },
            { title: '% No Registradas', value: valor_resto },
         ]
   } else {
      subdirecciones[0].datosCargaSubdireccion = [
         { title: '% Registradas', value: 0 },
         { title: '% No Registradas', value: 100 },
      ]
   }      

   if ( subdirecciones.length > 1) {
      //Calculamos las cuentas de cada subdireccion
      for (let i = 1; i < subdirecciones.length; i++) {

         subdirecciones[i] = {
            datosPuestoNivelSubdireccion: {}, 
            datosPuestoNivelTareaSubdireccion: {},
            datosTareaNivelSubdireccion: {},
            datosCargaSubdireccion: {},
            ...subdirecciones[i]
         }

         queryNivelesDesempeñoAgencia = `
            SELECT nivel_global, nivel_global_corregido
            FROM evaluaciones 
            WHERE evaluaciones.mes = ${mes}
               AND evaluaciones.anio = ${anio}
               AND (
                  nivel_global <> 'N/A'
                  OR nivel_global_corregido <> 'N/A'
               )
               AND id_puesto_trabajo IN (
                  SELECT puestos_trabajo.id_puesto
                  FROM puestos_trabajo
                     INNER JOIN perfiles_puesto ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto
                     INNER JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
                  WHERE perfiles.id_subdireccion = ${subdirecciones[i].id_subdireccion}
                     ${servicios_seleccionados.length > 0 ? ` AND perfiles.id_servicio IN (${servicios_seleccionados.toString()})`: ''}
                     ${departamentos_seleccionados.length > 0 ? ` AND perfiles.id_departamento IN (${departamentos_seleccionados.toString()})`: ''}
                     ${unidades_seleccionados.length > 0 ? ` AND perfiles.id_unidad IN (${unidades_seleccionados.toString()})`: ''}
                     ${roles_seleccionados.length > 0 ? ` AND perfiles.id_rol IN (${roles_seleccionados.toString()})`: ''}
                     ${perfiles_seleccionados.length > 0 ? ` AND perfiles.id_perfil IN (${perfiles_seleccionados.toString()})`: ''}
               )
               AND id_puesto_trabajo IN (
                  SELECT id_puesto 
                  FROM actividades.responsables R 
                  WHERE R.id_puesto_responsable = ${ id_puesto }
                  
                  UNION 
                  
                  SELECT id_puesto 
                  FROM actividades.validadores R 
                  WHERE R.id_puesto_validador = ${ id_puesto }
               )
         `
         info_desempeñoAgencia = await getAllRecords(queryNivelesDesempeñoAgencia)

         if ( info_desempeñoAgencia.length > 0) {
            let numero_insatisfactorios = 0
            let numero_satisfactorios = 0
            let numero_altos = 0
            let numero_excelentes = 0

            for (let j = 0; j < info_desempeñoAgencia.length; j++) {
               let valor = info_desempeñoAgencia[j].nivel_global_corregido != null && info_desempeñoAgencia[j].nivel_global_corregido.length > 0 ? info_desempeñoAgencia[j].nivel_global_corregido: info_desempeñoAgencia[j].nivel_global 

               if(valor == 'INSATISFACTORIO') {
                  numero_insatisfactorios = numero_insatisfactorios + 1      
               }
               if(valor == 'SATISFACTORIO') {
                  numero_satisfactorios = numero_satisfactorios + 1      
               }
               if(valor == 'ALTO') {
                  numero_altos = numero_altos + 1      
               }
               if(valor == 'EXCELENTE') {
                  numero_excelentes = numero_excelentes + 1      
               }
            }

            subdirecciones[i].datosPuestoNivelSubdireccion = [
               { title: 'Insatisfactorios', value: numero_insatisfactorios },
               { title: 'Satisfactorios', value: numero_satisfactorios },
               { title: 'Altos', value: numero_altos },
               { title: 'Excelentes', value: numero_excelentes },
            ]
         } else {
            subdirecciones[i].datosPuestoNivelSubdireccion = [
               { title: 'Insatisfactorios', value: 0 },
               { title: 'Satisfactorios', value: 0 },
               { title: 'Altos', value: 0 },
               { title: 'Excelentes', value: 0 },
            ]
         }

         queryNivelesDesempeñoAgencia = `
            SELECT nivel_unidades, nivel_unidades_corregido, nivel_tiempo, nivel_tiempo_corregido, 
                  nivel_porcentaje_entrada, nivel_porcentaje_entrada_corregido, nivel_porcentaje_jornada, nivel_porcentaje_jornada_corregido
            FROM detalle_evaluaciones
               INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
            WHERE evaluaciones.mes = ${mes}
            AND evaluaciones.anio = ${anio}
            AND (nivel_unidades <> 'N/A' OR nivel_unidades_corregido <> 'N/A' OR nivel_tiempo <> 'N/A' OR nivel_tiempo_corregido <> 'N/A'
               OR nivel_porcentaje_entrada <> 'N/A' OR nivel_porcentaje_entrada_corregido <> 'N/A' 
               OR nivel_porcentaje_jornada <> 'N/A' OR nivel_porcentaje_jornada_corregido <> 'N/A')
            AND evaluaciones.id_puesto_trabajo in 
               ( SELECT puestos_trabajo.id_puesto FROM puestos_trabajo
                  INNER JOIN perfiles_puesto ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto
                  INNER JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
                  WHERE perfiles.id_subdireccion = ${subdirecciones[i].id_subdireccion}
                  ${servicios_seleccionados.length > 0 ? ` AND perfiles.id_servicio IN (${servicios_seleccionados.toString()})`: ''}
                  ${departamentos_seleccionados.length > 0 ? ` AND perfiles.id_departamento IN (${departamentos_seleccionados.toString()})`: ''}
                  ${unidades_seleccionados.length > 0 ? ` AND perfiles.id_unidad IN (${unidades_seleccionados.toString()})`: ''}
                  ${roles_seleccionados.length > 0 ? ` AND perfiles.id_rol IN (${roles_seleccionados.toString()})`: ''}
                  ${perfiles_seleccionados.length > 0 ? ` AND perfiles.id_perfil IN (${perfiles_seleccionados.toString()})`: ''}
               )
            AND evaluaciones.id_puesto_trabajo IN (
               SELECT id_puesto 
               FROM actividades.responsables R 
               WHERE R.id_puesto_responsable = ${ id_puesto }
               
               UNION 
               
               SELECT id_puesto 
               FROM actividades.validadores R 
               WHERE R.id_puesto_validador = ${ id_puesto }
            )
         `
         info_desempeñoAgencia = await getAllRecords(queryNivelesDesempeñoAgencia)

         if ( info_desempeñoAgencia.length > 0) {
            let numero_insatisfactorios = 0
            let numero_satisfactorios = 0
            let numero_altos = 0
            let numero_excelentes = 0

            for (let j = 0; j < info_desempeñoAgencia.length; j++) {
               let valor = info_desempeñoAgencia[j].nivel_unidades_corregido != null && info_desempeñoAgencia[j].nivel_unidades_corregido.length > 0 ? info_desempeñoAgencia[j].nivel_unidades_corregido: info_desempeñoAgencia[j].nivel_unidades 

               if(valor == 'INSATISFACTORIO') {
                  numero_insatisfactorios = numero_insatisfactorios + 1      
               }
               if(valor == 'SATISFACTORIO') {
                  numero_satisfactorios = numero_satisfactorios + 1      
               }
               if(valor == 'ALTO') {
                  numero_altos = numero_altos + 1      
               }
               if(valor == 'EXCELENTE') {
                  numero_excelentes = numero_excelentes + 1      
               }
            }

            for (let j = 0; j < info_desempeñoAgencia.length; j++) {
               let valor = info_desempeñoAgencia[j].nivel_tiempo_corregido != null && info_desempeñoAgencia[j].nivel_tiempo_corregido.length > 0 ? info_desempeñoAgencia[j].nivel_tiempo_corregido: info_desempeñoAgencia[j].nivel_tiempo 

               if(valor == 'INSATISFACTORIO') {
               numero_insatisfactorios = numero_insatisfactorios + 1      
               }
               if(valor == 'SATISFACTORIO') {
               numero_satisfactorios = numero_satisfactorios + 1      
               }
               if(valor == 'ALTO') {
               numero_altos = numero_altos + 1      
               }
               if(valor == 'EXCELENTE') {
               numero_excelentes = numero_excelentes + 1      
               }
            }

            for (let j = 0; j < info_desempeñoAgencia.length; j++) {
               let valor = info_desempeñoAgencia[j].nivel_porcentaje_entrada_corregido != null && info_desempeñoAgencia[j].nivel_porcentaje_entrada_corregido.length > 0 ? info_desempeñoAgencia[j].nivel_porcentaje_entrada_corregido: info_desempeñoAgencia[j].nivel_porcentaje_entrada 

               if(valor == 'INSATISFACTORIO') {
               numero_insatisfactorios = numero_insatisfactorios + 1      
               }
               if(valor == 'SATISFACTORIO') {
               numero_satisfactorios = numero_satisfactorios + 1      
               }
               if(valor == 'ALTO') {
               numero_altos = numero_altos + 1      
               }
               if(valor == 'EXCELENTE') {
               numero_excelentes = numero_excelentes + 1      
               }
            }

            for (let j = 0; j < info_desempeñoAgencia.length; j++) {
               let valor = info_desempeñoAgencia[j].nivel_porcentaje_jornada_corregido != null && info_desempeñoAgencia[j].nivel_porcentaje_jornada_corregido.length > 0 ? info_desempeñoAgencia[j].nivel_porcentaje_jornada_corregido: info_desempeñoAgencia[j].nivel_porcentaje_jornada 

               if(valor == 'INSATISFACTORIO') {
               numero_insatisfactorios = numero_insatisfactorios + 1      
               }
               if(valor == 'SATISFACTORIO') {
               numero_satisfactorios = numero_satisfactorios + 1      
               }
               if(valor == 'ALTO') {
               numero_altos = numero_altos + 1      
               }
               if(valor == 'EXCELENTE') {
               numero_excelentes = numero_excelentes + 1      
               }
            }
         
            subdirecciones[i].datosPuestoNivelTareaSubdireccion = [
               { title: 'Insatisfactorios', value: numero_insatisfactorios },
               { title: 'Satisfactorios', value: numero_satisfactorios },
               { title: 'Altos', value: numero_altos },
               { title: 'Excelentes', value: numero_excelentes },
            ]
         } else {
            subdirecciones[i].datosPuestoNivelTareaSubdireccion = [
               { title: 'Insatisfactorios', value: 0 },
               { title: 'Satisfactorios', value: 0 },
               { title: 'Altos', value: 0 },
               { title: 'Excelentes', value: 0 },
            ]
         }

         queryNivelesDesempeñoAgencia = `
            SELECT id_tarea, (case IFNULL(nivel_tiempo_corregido, 'N/A') when 'N/A' then nivel_tiempo else nivel_tiempo_corregido end) as nivel, count(*) as cuenta
            FROM detalle_evaluaciones
               INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
            WHERE evaluaciones.mes = ${mes}
            AND evaluaciones.anio = ${anio}
            AND (case IFNULL(nivel_tiempo_corregido, 'N/A') when 'N/A' then nivel_tiempo else nivel_tiempo_corregido end) <> 'N/A'
            AND evaluaciones.id_puesto_trabajo in 
               ( SELECT puestos_trabajo.id_puesto FROM puestos_trabajo
                  INNER JOIN perfiles_puesto ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto
                  INNER JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
                  WHERE perfiles.id_subdireccion = ${subdirecciones[i].id_subdireccion}
                  ${servicios_seleccionados.length > 0 ? ` AND perfiles.id_servicio IN (${servicios_seleccionados.toString()})`: ''}
                  ${departamentos_seleccionados.length > 0 ? ` AND perfiles.id_departamento IN (${departamentos_seleccionados.toString()})`: ''}
                  ${unidades_seleccionados.length > 0 ? ` AND perfiles.id_unidad IN (${unidades_seleccionados.toString()})`: ''}
                  ${roles_seleccionados.length > 0 ? ` AND perfiles.id_rol IN (${roles_seleccionados.toString()})`: ''}
                  ${perfiles_seleccionados.length > 0 ? ` AND perfiles.id_perfil IN (${perfiles_seleccionados.toString()})`: ''}
               )
            AND evaluaciones.id_puesto_trabajo IN (
               SELECT id_puesto 
               FROM actividades.responsables R 
               WHERE R.id_puesto_responsable = ${ id_puesto }
               
               UNION 
               
               SELECT id_puesto 
               FROM actividades.validadores R 
               WHERE R.id_puesto_validador = ${ id_puesto }
            )
            group by id_tarea, nivel

            UNION

            SELECT id_tarea, (case IFNULL(nivel_unidades_corregido, 'N/A') when 'N/A' then nivel_unidades else nivel_unidades_corregido end) as nivel, count(*) as cuenta
            FROM detalle_evaluaciones
            INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
            WHERE evaluaciones.mes = ${mes}
            AND evaluaciones.anio = ${anio}
            AND (case IFNULL(nivel_unidades_corregido, 'N/A') when 'N/A' then nivel_unidades else nivel_unidades_corregido end) <> 'N/A'
            AND evaluaciones.id_puesto_trabajo in 
               ( SELECT puestos_trabajo.id_puesto FROM puestos_trabajo
                  INNER JOIN perfiles_puesto ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto
                  INNER JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
                  WHERE perfiles.id_subdireccion = ${subdirecciones[i].id_subdireccion}
                  ${servicios_seleccionados.length > 0 ? ` AND perfiles.id_servicio IN (${servicios_seleccionados.toString()})`: ''}
                  ${departamentos_seleccionados.length > 0 ? ` AND perfiles.id_departamento IN (${departamentos_seleccionados.toString()})`: ''}
                  ${unidades_seleccionados.length > 0 ? ` AND perfiles.id_unidad IN (${unidades_seleccionados.toString()})`: ''}
                  ${roles_seleccionados.length > 0 ? ` AND perfiles.id_rol IN (${roles_seleccionados.toString()})`: ''}
                  ${perfiles_seleccionados.length > 0 ? ` AND perfiles.id_perfil IN (${perfiles_seleccionados.toString()})`: ''}
               )
            AND evaluaciones.id_puesto_trabajo IN (
               SELECT id_puesto 
               FROM actividades.responsables R 
               WHERE R.id_puesto_responsable = ${ id_puesto }
               
               UNION 
               
               SELECT id_puesto 
               FROM actividades.validadores R 
               WHERE R.id_puesto_validador = ${ id_puesto }
            )
            group by id_tarea, nivel

            UNION

            SELECT id_tarea, (case IFNULL(nivel_porcentaje_entrada_corregido, 'N/A') when 'N/A' then nivel_porcentaje_entrada else nivel_porcentaje_entrada_corregido end) as nivel, count(*) as cuenta
            FROM detalle_evaluaciones
            INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
            WHERE evaluaciones.mes = ${mes}
            AND evaluaciones.anio = ${anio}
            AND (case IFNULL(nivel_porcentaje_entrada_corregido, 'N/A') when 'N/A' then nivel_porcentaje_entrada else nivel_porcentaje_entrada_corregido end) <> 'N/A'
            AND evaluaciones.id_puesto_trabajo in 
               ( SELECT puestos_trabajo.id_puesto FROM puestos_trabajo
                  INNER JOIN perfiles_puesto ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto
                  INNER JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
                  WHERE perfiles.id_subdireccion = ${subdirecciones[i].id_subdireccion}
                  ${servicios_seleccionados.length > 0 ? ` AND perfiles.id_servicio IN (${servicios_seleccionados.toString()})`: ''}
                  ${departamentos_seleccionados.length > 0 ? ` AND perfiles.id_departamento IN (${departamentos_seleccionados.toString()})`: ''}
                  ${unidades_seleccionados.length > 0 ? ` AND perfiles.id_unidad IN (${unidades_seleccionados.toString()})`: ''}
                  ${roles_seleccionados.length > 0 ? ` AND perfiles.id_rol IN (${roles_seleccionados.toString()})`: ''}
                  ${perfiles_seleccionados.length > 0 ? ` AND perfiles.id_perfil IN (${perfiles_seleccionados.toString()})`: ''}
               )
            AND evaluaciones.id_puesto_trabajo IN (
               SELECT id_puesto 
               FROM actividades.responsables R 
               WHERE R.id_puesto_responsable = ${ id_puesto }
               
               UNION 
               
               SELECT id_puesto 
               FROM actividades.validadores R 
               WHERE R.id_puesto_validador = ${ id_puesto }
            )
            group by id_tarea, nivel

            UNION

            SELECT id_tarea, (case IFNULL(nivel_porcentaje_jornada_corregido, 'N/A') when 'N/A' then nivel_porcentaje_jornada else nivel_porcentaje_jornada_corregido end) as nivel, count(*) as cuenta
            FROM detalle_evaluaciones
            INNER JOIN evaluaciones ON evaluaciones.id_evaluacion = detalle_evaluaciones.id_evaluacion
            WHERE evaluaciones.mes = ${mes}
            AND evaluaciones.anio = ${anio}
            AND (case IFNULL(nivel_porcentaje_jornada_corregido, 'N/A') when 'N/A' then nivel_porcentaje_jornada else nivel_porcentaje_jornada_corregido end) <> 'N/A'
            AND evaluaciones.id_puesto_trabajo in 
               ( SELECT puestos_trabajo.id_puesto FROM puestos_trabajo
                  INNER JOIN perfiles_puesto ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto
                  INNER JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
                  WHERE perfiles.id_subdireccion = ${subdirecciones[i].id_subdireccion}
                  ${servicios_seleccionados.length > 0 ? ` AND perfiles.id_servicio IN (${servicios_seleccionados.toString()})`: ''}
                  ${departamentos_seleccionados.length > 0 ? ` AND perfiles.id_departamento IN (${departamentos_seleccionados.toString()})`: ''}
                  ${unidades_seleccionados.length > 0 ? ` AND perfiles.id_unidad IN (${unidades_seleccionados.toString()})`: ''}
                  ${roles_seleccionados.length > 0 ? ` AND perfiles.id_rol IN (${roles_seleccionados.toString()})`: ''}
                  ${perfiles_seleccionados.length > 0 ? ` AND perfiles.id_perfil IN (${perfiles_seleccionados.toString()})`: ''}
               )
            AND evaluaciones.id_puesto_trabajo IN (
               SELECT id_puesto 
               FROM actividades.responsables R 
               WHERE R.id_puesto_responsable = ${ id_puesto }
               
               UNION 
               
               SELECT id_puesto 
               FROM actividades.validadores R 
               WHERE R.id_puesto_validador = ${ id_puesto }
            )
            group by id_tarea, nivel
            order by id_tarea;
         `
         info_desempeñoAgencia = await getAllRecords(queryNivelesDesempeñoAgencia)

         if ( info_desempeñoAgencia.length > 0) {
            let numero_insatisfactorios = 0
            let numero_satisfactorios = 0
            let numero_altos = 0
            let numero_excelentes = 0

            for (let j = 0; j < info_desempeñoAgencia.length; j++) {
               let valor = info_desempeñoAgencia[j].nivel

               if(valor == 'INSATISFACTORIO') {
                  numero_insatisfactorios = numero_insatisfactorios + info_desempeñoAgencia[j].cuenta
               }
               if(valor == 'SATISFACTORIO') {
                  numero_satisfactorios = numero_satisfactorios + info_desempeñoAgencia[j].cuenta
               }
               if(valor == 'ALTO') {
                  numero_altos = numero_altos + info_desempeñoAgencia[j].cuenta
               }
               if(valor == 'EXCELENTE') {
                  numero_excelentes = numero_excelentes + info_desempeñoAgencia[j].cuenta
               }
            }

            subdirecciones[i].datosTareaNivelSubdireccion = [
               { title: 'Insatisfactorios', value: numero_insatisfactorios },
               { title: 'Satisfactorios', value: numero_satisfactorios },
               { title: 'Altos', value: numero_altos },
               { title: 'Excelentes', value: numero_excelentes },
            ]
         } else {
            subdirecciones[i].datosTareaNivelSubdireccion = [
               { title: 'Insatisfactorios', value: 0 },
               { title: 'Satisfactorios', value: 0 },
               { title: 'Altos', value: 0 },
               { title: 'Excelentes', value: 0 },
            ]
         }

         queryNivelesDesempeñoAgencia = `
            SELECT round(sum(porcentaje_carga) / count(porcentaje_carga)) as porcentaje
            FROM evaluaciones
            WHERE evaluaciones.mes = ${mes}
               AND evaluaciones.anio = ${anio}
               AND evaluaciones.id_puesto_trabajo in 
                  ( SELECT puestos_trabajo.id_puesto FROM puestos_trabajo
                     INNER JOIN perfiles_puesto ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto
                     INNER JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
                     WHERE perfiles.id_subdireccion = ${subdirecciones[i].id_subdireccion}
                     ${servicios_seleccionados.length > 0 ? ` AND perfiles.id_servicio IN (${servicios_seleccionados.toString()})`: ''}
                     ${departamentos_seleccionados.length > 0 ? ` AND perfiles.id_departamento IN (${departamentos_seleccionados.toString()})`: ''}
                     ${unidades_seleccionados.length > 0 ? ` AND perfiles.id_unidad IN (${unidades_seleccionados.toString()})`: ''}
                     ${roles_seleccionados.length > 0 ? ` AND perfiles.id_rol IN (${roles_seleccionados.toString()})`: ''}
                     ${perfiles_seleccionados.length > 0 ? ` AND perfiles.id_perfil IN (${perfiles_seleccionados.toString()})`: ''}
                  )
               AND evaluaciones.id_puesto_trabajo IN (
                  SELECT id_puesto 
                  FROM actividades.responsables R 
                  WHERE R.id_puesto_responsable = ${ id_puesto }
                  
                  UNION 
                  
                  SELECT id_puesto 
                  FROM actividades.validadores R 
                  WHERE R.id_puesto_validador = ${ id_puesto }
               )
         `
         info_desempeñoAgencia = await getAllRecords(queryNivelesDesempeñoAgencia)

         if ( info_desempeñoAgencia.length > 0) {
            let valor = info_desempeñoAgencia[0].porcentaje
            let valor_resto = 100-info_desempeñoAgencia[0].porcentaje

            subdirecciones[i].datosCargaSubdireccion = [
               { title: '% Registradas', value: valor },
               { title: '% No Registradas', value: valor_resto },
            ]
         } else {
            subdirecciones[i].datosCargaSubdireccion = [
                  { title: '% Registradas', value: 0 },
                  { title: '% No Registradas', value: 100 },
            ]
         }
      }

      res.status(200).json(subdirecciones);
   }
   else {
      res.status(500).json({'message':'No existen resultados para los filtros indicados.'});
   }
});

module.exports = getDashboard
