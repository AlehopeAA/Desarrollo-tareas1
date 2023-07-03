'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')
const {
    ADMIN_ROLE,
    SUPER_ROLE,
    GESTOR_DE_PERFILES_ROLE,
  } = require('../../config/users/roles/roles')

// @desc    get tasks shared by manager id
// @route   GET /api/compartidas/lista-tareas/:id
// @access  Profile manager/Admin
const getTasksSharedByManager = asyncHandler(async (req, res) => {
  const { id_puesto, permiso } = req.user

  const isAdminOrSuper = permiso.includes(ADMIN_ROLE) || permiso.includes(SUPER_ROLE)
  const isManager = permiso.includes(GESTOR_DE_PERFILES_ROLE)
  const tasksWithoutRepeating = []

  const tareasNuevasQuery = `
     SELECT tareas.id_tarea
     FROM tareas
     WHERE tareas.activo = "SI" 
     AND tareas.compartida = "SI"
     AND not exists (select id_tarea from compartidas 
                     where compartidas.id_tarea=tareas.id_tarea)
  `

  const tareasNuevas = await queryPromise(tareasNuevasQuery)

  if ( tareasNuevas.length > 0) {
    for (let i = 0; i < tareasNuevas.length; i++) {
       const numPuestosQuery = `
          SELECT count(*) as cuenta
          FROM puestos_trabajo
          INNER JOIN perfiles_puesto ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto 
          INNER JOIN tareas_perfil ON tareas_perfil.id_perfil = perfiles_puesto.id_perfil
          INNER JOIN tareas ON tareas.id_tarea = tareas_perfil.id_tarea
          WHERE tareas.id_tarea = ${tareasNuevas[i].id_tarea}
          AND puestos_trabajo.activo = "SI"
       `

       const numPuestos = await queryPromise(numPuestosQuery)
    
       if (numPuestos[0].cuenta > 0) {
          const insertaSharedQuery = `
            INSERT into compartidas (id_tarea, id_puesto, porcentaje_responsabilidad)
            (SELECT tareas.id_tarea, puestos_trabajo.id_puesto, 100 / ${numPuestos[0].cuenta}
            FROM tareas
            INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
            INNER JOIN perfiles_puesto ON tareas_perfil.id_perfil = perfiles_puesto.id_perfil
            INNER JOIN puestos_trabajo ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto     
            WHERE tareas.id_tarea = ${tareasNuevas[i].id_tarea} 
            AND puestos_trabajo.activo = "SI"
            )
          `
          const insertaShared = await queryPromise(insertaSharedQuery)
       }         
    }
  } 
  
  const tareasExistentesQuery = `
      SELECT distinct compartidas.id_tarea
      FROM compartidas
  `

  const tareasExistentes = await queryPromise(tareasExistentesQuery)

  if ( tareasExistentes.length > 0) {
       for (let i = 0; i < tareasExistentes.length; i++) {
          const numPuestosTareasQuery = `
             SELECT count(*) as cuenta
             FROM puestos_trabajo
             INNER JOIN perfiles_puesto ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto 
             INNER JOIN tareas_perfil ON tareas_perfil.id_perfil = perfiles_puesto.id_perfil
             INNER JOIN tareas ON tareas.id_tarea = tareas_perfil.id_tarea
             WHERE tareas.id_tarea = ${tareasExistentes[i].id_tarea}
             AND puestos_trabajo.activo = "SI"
             AND not exists (select id_tarea, id_puesto from compartidas 
              where compartidas.id_tarea=tareas.id_tarea
              and compartidas.id_puesto=puestos_trabajo.id_puesto)
          `

          const numPuestosTareas = await queryPromise(numPuestosTareasQuery)          
    
          if (numPuestosTareas[0].cuenta > 0) {

            const sumaPorcentajesQuery = `
              SELECT sum(porcentaje_responsabilidad) as suma
              FROM compartidas 
              where compartidas.id_tarea=${tareasExistentes[i].id_tarea}
            `

            const sumaPorcentajes = await queryPromise(sumaPorcentajesQuery)

            const insertaPuestosSharedQuery = `
              INSERT into compartidas (id_tarea, id_puesto, porcentaje_responsabilidad)
              (SELECT tareas.id_tarea, puestos_trabajo.id_puesto, (100-${sumaPorcentajes[0].suma}) / ${numPuestosTareas[0].cuenta}
              FROM tareas
              INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
              INNER JOIN perfiles_puesto ON tareas_perfil.id_perfil = perfiles_puesto.id_perfil
              INNER JOIN puestos_trabajo ON perfiles_puesto.id_puesto = puestos_trabajo.id_puesto     
              WHERE tareas.id_tarea = ${tareasExistentes[i].id_tarea} 
              AND puestos_trabajo.activo = "SI"
              AND not exists (select id_tarea, id_puesto from compartidas 
                where compartidas.id_tarea=tareas.id_tarea
                and compartidas.id_puesto=puestos_trabajo.id_puesto)
              )
            `
            const insertaPuestosShared = await queryPromise(insertaPuestosSharedQuery)
         }         
      }
    
  }

  if (isAdminOrSuper) {
    const adminTaskSharedQuery = `
    SELECT tareas.id_tarea, tareas.descripcion_tarea, perfiles.codigo_perfil
    FROM tareas
    LEFT JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
    LEFT JOIN perfiles ON tareas_perfil.id_perfil = perfiles.id_perfil
    WHERE tareas.activo = "SI"
    AND tareas.compartida = "SI"
    ORDER BY tareas.descripcion_tarea 
    `

    try {
      const tasks = await queryPromise(adminTaskSharedQuery)

      tasks.map((task) => {
        const existInArray = tasksWithoutRepeating.map((task) => task.id_tarea).indexOf(task.id_tarea) === -1

        if (existInArray) {
          const repeatTasks = tasks.filter((taskRepeat) => taskRepeat.id_tarea === task.id_tarea)

          tasksWithoutRepeating.push({
            ...task,
            codigo_perfil: repeatTasks.map((taskCod) => taskCod.codigo_perfil),
          })
        }
      })

      res.status(200).json(tasksWithoutRepeating)
    } catch (error) {
      res.status(400).json({ message: 'Error al obtener las tareas compartidas' })
    }
  } else if (isManager) {
    const queryTasksSharedByManager = `
      SELECT tareas.id_tarea, tareas.descripcion_tarea, perfiles.codigo_perfil
      FROM tareas
      INNER JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
      INNER JOIN perfiles ON tareas_perfil.id_perfil = perfiles.id_perfil
      WHERE tareas.activo = "SI" 
      AND tareas.compartida = "SI" 
      AND perfiles.id_perfil 
      IN (
        SELECT gestor_perfiles.id_perfil
        FROM gestor_perfiles
        WHERE gestor_perfiles.id_puesto = '${id_puesto}'
      )
    `
    try {
      const tasks = await queryPromise(queryTasksSharedByManager)
  
      tasks.map((task) => {
        const existInArray = tasksWithoutRepeating.map((task) => task.id_tarea).indexOf(task.id_tarea) === -1
  
        if (existInArray) {
          const repeatTasks = tasks.filter((taskRepeat) => taskRepeat.id_tarea === task.id_tarea)
  
          tasksWithoutRepeating.push({
            ...task,
            codigo_perfil: repeatTasks.map((taskCod) => taskCod.codigo_perfil),
          })
        }
      })
  
      res.status(200).json(tasksWithoutRepeating)
    } catch (error) {
      res.status(400).json({ message: 'Error al obtener las tareas compartidas' })
    }
  }
})

module.exports = getTasksSharedByManager
