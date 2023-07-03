'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get all entries by task id
// @route   GET /entradas/lista-tarea/:id
// @access  Private/data manager

const getEntriesByTaskId = asyncHandler(async (req, res) => {
   const { id } = req.params

   const insertActualEntriesQuery = `
      INSERT into entradas_no_compartidas (id_tarea, id_puesto_trabajo, anio, mes, entrada)
         (SELECT tareas.id_tarea, puestos_trabajo.id_puesto, (select YEAR(NOW())), (select MONTH(NOW())), 0 
      FROM tareas
         INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
         INNER JOIN perfiles_puesto ON tareas_perfil.id_perfil = perfiles_puesto.id_perfil
         INNER JOIN puestos_trabajo ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto 
      WHERE tareas.id_tarea = ${id}
         AND tareas.compartida = "NO"
         AND puestos_trabajo.activo = "SI"
         AND not exists (select id_tarea, id_puesto_trabajo from entradas_no_compartidas 
            where entradas_no_compartidas.id_tarea=tareas.id_tarea
               and entradas_no_compartidas.id_puesto_trabajo=puestos_trabajo.id_puesto
               and anio = (select YEAR(NOW()))
               and mes = (select MONTH(NOW()))
         )
      )
      UNION
         (SELECT tareas.id_tarea, puestos_trabajo.id_puesto, (select YEAR(NOW())), (select MONTH(NOW())), 0 
      FROM tareas
         INNER JOIN puestos_trabajo ON tareas.id_puesto = puestos_trabajo.id_puesto 
      WHERE tareas.id_tarea = ${id}
         AND tareas.id_tipo_tarea=1
         AND tareas.compartida = "NO"
         AND puestos_trabajo.activo = "SI"
         AND not exists (
            SELECT id_tarea, id_puesto_trabajo
            FROM entradas_no_compartidas 
            WHERE entradas_no_compartidas.id_tarea=tareas.id_tarea
               AND entradas_no_compartidas.id_puesto_trabajo=puestos_trabajo.id_puesto
               AND anio = (select YEAR(NOW()))
               AND mes = (select MONTH(NOW()))
         )
      )
   `

   const insertPastEntriesQuery = `
      INSERT into entradas_no_compartidas (id_tarea, id_puesto_trabajo, anio, mes, entrada)
         (SELECT tareas.id_tarea, puestos_trabajo.id_puesto, ( select YEAR(date_sub(NOW(), interval 1 MONTH)) ), ( select MONTH(date_sub(NOW(), interval 1 MONTH)) ), 0 
      FROM tareas
         INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
         INNER JOIN perfiles_puesto ON tareas_perfil.id_perfil = perfiles_puesto.id_perfil
         INNER JOIN puestos_trabajo ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto 
      WHERE tareas.id_tarea = ${id}
         AND tareas.compartida = "NO"
         AND puestos_trabajo.activo = "SI"
         AND not exists (
            SELECT id_tarea, id_puesto_trabajo
            FROM entradas_no_compartidas 
            WHERE entradas_no_compartidas.id_tarea=tareas.id_tarea
               AND entradas_no_compartidas.id_puesto_trabajo=puestos_trabajo.id_puesto
               AND anio = ( select YEAR(date_sub(NOW(), interval 1 MONTH)) )
               AND mes = ( select MONTH(date_sub(NOW(), interval 1 MONTH)) )
         )
      )
      UNION
         (SELECT tareas.id_tarea, puestos_trabajo.id_puesto, ( select YEAR(date_sub(NOW(), interval 1 MONTH)) ), ( select MONTH(date_sub(NOW(), interval 1 MONTH)) ), 0 
      FROM tareas
         INNER JOIN puestos_trabajo ON tareas.id_puesto = puestos_trabajo.id_puesto 
      WHERE tareas.id_tarea = ${id}
         AND tareas.id_tipo_tarea=1
         AND tareas.compartida = "NO"
         AND puestos_trabajo.activo = "SI"
         AND not exists (
            SELECT id_tarea, id_puesto_trabajo
            FROM entradas_no_compartidas 
            WHERE entradas_no_compartidas.id_tarea=tareas.id_tarea
               AND entradas_no_compartidas.id_puesto_trabajo=puestos_trabajo.id_puesto
               AND anio = ( select YEAR(date_sub(NOW(), interval 1 MONTH)) )
               AND mes = ( select MONTH(date_sub(NOW(), interval 1 MONTH)) )
         )
      )
   `

   const compartidaTaskQuery = `
      select compartida
      from tareas
      where id_tarea = ${id}
   `

   const EntriesNowByTaskIdQuery = `
      select anio, mes, fecha_ultima_modificacion, entrada
      from entradas
      where id_tarea = ${id}
         and anio=(select YEAR(NOW()))
         and mes=(select MONTH(NOW()))
   `

   const EntriesBackByTaskIdQuery = `
      select anio, mes, fecha_ultima_modificacion, entrada
      from entradas
      where id_tarea = ${id}
         and anio=(select YEAR(date_sub(NOW(), interval 1 MONTH)))
         and mes=(select MONTH(date_sub(NOW(), interval 1 MONTH)))
   `

   const EntriesCompNowByTaskIdQuery = `
      select puestos_trabajo.id_puesto, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2,
               anio, mes, fecha_ultima_modificacion, entrada
      from entradas_no_compartidas
         inner join puestos_trabajo on entradas_no_compartidas.id_puesto_trabajo = puestos_trabajo.id_puesto
      where id_tarea = ${id}
         and anio=(select YEAR(NOW()))
         and mes=(select MONTH(NOW()))
   `

   const EntriesCompBackByTaskIdQuery = `
      select puestos_trabajo.id_puesto, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2,
               anio, mes, fecha_ultima_modificacion, entrada
      from entradas_no_compartidas
         inner join puestos_trabajo on entradas_no_compartidas.id_puesto_trabajo = puestos_trabajo.id_puesto
      where id_tarea = ${id}
         and anio=(select YEAR(date_sub(NOW(), interval 1 MONTH)))
         and mes=(select MONTH(date_sub(NOW(), interval 1 MONTH)))
   `

   try {    
      await queryPromise(insertActualEntriesQuery)
      await queryPromise(insertPastEntriesQuery)
      const compartidaTask = await queryPromise(compartidaTaskQuery)
      const getEntriesNow = await queryPromise(EntriesNowByTaskIdQuery)
      const getEntriesBack = await queryPromise(EntriesBackByTaskIdQuery)
      const getEntriesCompNow = await queryPromise(EntriesCompNowByTaskIdQuery)
      const getEntriesCompBack = await queryPromise(EntriesCompBackByTaskIdQuery)

      const entries = {
         compartida: compartidaTask,
         entriesNow: getEntriesNow,
         entriesBack: getEntriesBack,
         entriesCompNow: getEntriesCompNow,
         entriesCompBack: getEntriesCompBack,
      }

      return res.status(200).json(entries)
   } catch (error) {
      res.status(400).json({ message: 'Error al obtener las entradas' })
   }
})

module.exports = getEntriesByTaskId
