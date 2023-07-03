'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    get all  activities
// @route   GET /api/actividades
// @access  Private/Admin
const getActivities = asyncHandler(async (req, res) => {
    const { id_puesto } = req.user
     
    const queryActividades = `
        SELECT actividades.*, tareas.descripcion_tarea,
        concat_ws (' ',puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2) as nombre
        FROM actividades
        INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
        INNER JOIN puestos_trabajo ON actividades.id_puesto = puestos_trabajo.id_puesto
        WHERE actividades.id_puesto = ${id_puesto}
        ORDER BY actividades.fecha_actividad desc
    `

    var actividades = await getAllRecords(queryActividades)

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

})

module.exports = getActivities
