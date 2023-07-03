'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords } = require('../../utils/queryPromises')

const {
  ADMIN_ROLE,
  RESPONSABLE_ROLE,
  VALIDADOR_ROLE,
  SUPER_ROLE,
  GESTOR_DE_PERFILES_ROLE,
} = require('../../config/users/roles/roles')

// @desc    get all  activities
// @route   GET /api/actividades
// @access  Private/Admin
const getActivitiesRoles = asyncHandler(async (req, res) => {
  const { id_puesto, permiso } = req.user
  const isAdminOrSuper = permiso.includes(ADMIN_ROLE) || permiso.includes(SUPER_ROLE)
  const isResponsible = permiso.includes(RESPONSABLE_ROLE)
  const isManager = permiso.includes(GESTOR_DE_PERFILES_ROLE)
  const isValidator = permiso.includes(VALIDADOR_ROLE)

  if (isAdminOrSuper) {
    let queryByAdmin = `SELECT actividades.*, tareas.descripcion_tarea,
    concat_ws (' ',puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2) as nombre
    FROM actividades
    INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
    INNER JOIN puestos_trabajo ON actividades.id_puesto = puestos_trabajo.id_puesto
    WHERE puestos_trabajo.activo = "SI"
    AND puestos_trabajo.id_puesto <> ${id_puesto}
    ORDER BY actividades.fecha_actividad desc`

    var actividades = await getAllRecords(queryByAdmin)

    var queryCodigosTrazabilidad = ''
    var codigos = ''

    if ( actividades.length > 0) {
      for (let i = 0; i < actividades.length; i++) {
         queryCodigosTrazabilidad = `
            SELECT codigos_trazabilidad_actividad.codigo_trazabilidad
            FROM codigos_trazabilidad_actividad 
            WHERE codigos_trazabilidad_actividad.id_actividad = ${actividades[i].id_actividad}`
         codigos = await getAllRecords(queryCodigosTrazabilidad)
      
         actividades[i]['codigos_trazabilidad'] = [];
         if (codigos.length > 0) {
            codigos.map((codigo) => actividades[i]['codigos_trazabilidad'].push(codigo.codigo_trazabilidad))
         }         
      }
      res.status(200).json(actividades);
    } else {
      res.status(500).json({'message':'No existe actividad para los datos indicados.'});
    }
  } else if (isManager) {
    let queryByManager = `
      SELECT actividades.*, tareas.descripcion_tarea,
      concat_ws (' ',puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2) as nombre
      FROM actividades 
      INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
      INNER JOIN puestos_trabajo ON actividades.id_puesto = puestos_trabajo.id_puesto
      WHERE actividades.id_puesto 
      IN (
        SELECT puestos_trabajo.id_puesto 
        FROM puestos_trabajo 
        INNER JOIN perfiles_puesto 
        ON puestos_trabajo.id_puesto = perfiles_puesto.id_puesto 
        WHERE (
          puestos_trabajo.activo = "SI" 
          AND perfiles_puesto.id_perfil 
          IN (
            SELECT gestor_perfiles.id_perfil 
            FROM gestor_perfiles 
            INNER JOIN perfiles 
            ON gestor_perfiles.id_perfil = perfiles.id_perfil 
            WHERE (
              gestor_perfiles.id_puesto = ${id_puesto}
              AND perfiles.activo = "SI"
            )
          )
        )
      )
      ORDER BY actividades.fecha_actividad desc
    `

    var actividades = await getAllRecords(queryByManager)

    var queryCodigosTrazabilidad = ''
    var codigos = ''

    if ( actividades.length > 0) {
      for (let i = 0; i < actividades.length; i++) {
         queryCodigosTrazabilidad = `
            SELECT codigos_trazabilidad_actividad.codigo_trazabilidad
            FROM codigos_trazabilidad_actividad 
            WHERE codigos_trazabilidad_actividad.id_actividad = ${actividades[i].id_actividad}`
         codigos = await getAllRecords(queryCodigosTrazabilidad)
      
         actividades[i]['codigos_trazabilidad'] = [];
         if (codigos.length > 0) {
            codigos.map((codigo) => actividades[i]['codigos_trazabilidad'].push(codigo.codigo_trazabilidad))
         }         
      }
      res.status(200).json(actividades);
    } else {
      res.status(500).json({'message':'No existe actividad para los datos indicados.'});
    }
  } else if (isResponsible) {
    let queryByResponsible = `
      SELECT * 
      FROM puestos_trabajo 
      INNER JOIN responsables ON puestos_trabajo.id_puesto = responsables.id_puesto 
      WHERE responsables.id_puesto_responsable = ${id_puesto}
      ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
      `

    var responsables = await getAllRecords(queryByResponsible)

    const allIds = [id_puesto]

    if (responsables.length > 0) {
      responsables.map((jobPosition) => allIds.push(jobPosition.id_puesto))

      const getTasksQueryByManager = `
          SELECT actividades.*, tareas.descripcion_tarea,
          concat_ws (' ',puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2) as nombre
          FROM actividades
          INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
          INNER JOIN puestos_trabajo ON actividades.id_puesto = puestos_trabajo.id_puesto
          WHERE actividades.id_puesto IN (${allIds.toString()})
          ORDER BY actividades.fecha_actividad desc
        `

        var actividades = await getAllRecords(getTasksQueryByManager)

        var queryCodigosTrazabilidad = ''
        var codigos = ''
    
        if ( actividades.length > 0) {
          for (let i = 0; i < actividades.length; i++) {
             queryCodigosTrazabilidad = `
                SELECT codigos_trazabilidad_actividad.codigo_trazabilidad
                FROM codigos_trazabilidad_actividad 
                WHERE codigos_trazabilidad_actividad.id_actividad = ${actividades[i].id_actividad}`
             codigos = await getAllRecords(queryCodigosTrazabilidad)
          
             actividades[i]['codigos_trazabilidad'] = [];
             if (codigos.length > 0) {
                codigos.map((codigo) => actividades[i]['codigos_trazabilidad'].push(codigo.codigo_trazabilidad))
             }         
          }
          res.status(200).json(actividades);
        }
        else {
          res.status(500).json({'message':'No existe actividad para los datos indicados.'});
        }
    }
  } else if (isValidator) {
    let queryByValidator = `
        SELECT * 
        FROM puestos_trabajo 
        INNER JOIN validadores ON puestos_trabajo.id_puesto = validadores.id_puesto 
        WHERE validadores.id_puesto_validador = ${id_puesto}
        ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
    `

    var validadores = await getAllRecords(queryByValidator)

    const allIds = [id_puesto]

    if (validadores.length > 0) {
      validadores.map((jobPosition) => allIds.push(jobPosition.id_puesto))

      const getTasksQueryByManager = `
          SELECT actividades.*, tareas.descripcion_tarea,
          concat_ws (' ',puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2) as nombre
          FROM actividades
          INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
          INNER JOIN puestos_trabajo ON actividades.id_puesto = puestos_trabajo.id_puesto
          WHERE actividades.id_puesto IN (${allIds.toString()})
          ORDER BY actividades.fecha_actividad desc
        `
        var actividades = await getAllRecords(getTasksQueryByManager)

        var queryCodigosTrazabilidad = ''
        var codigos = ''
    
        if ( actividades.length > 0) {
          for (let i = 0; i < actividades.length; i++) {
             queryCodigosTrazabilidad = `
                SELECT codigos_trazabilidad_actividad.codigo_trazabilidad
                FROM codigos_trazabilidad_actividad 
                WHERE codigos_trazabilidad_actividad.id_actividad = ${actividades[i].id_actividad}`
             codigos = await getAllRecords(queryCodigosTrazabilidad)
          
             actividades[i]['codigos_trazabilidad'] = [];
             if (codigos.length > 0) {
                codigos.map((codigo) => actividades[i]['codigos_trazabilidad'].push(codigo.codigo_trazabilidad))
             }         
          }
          res.status(200).json(actividades);
        }
        else {
          res.status(500).json({'message':'No existe actividad para los datos indicados.'});
        }
    }
  } 
})

module.exports = getActivitiesRoles
