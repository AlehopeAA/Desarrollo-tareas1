'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Obtiene la actividad para ese id.
// @route   GET /api/actividades/:id
// @access  Private/Admin
const getActivityInfo = asyncHandler(async (req, res) => {
  const { id } = req.params

  const queryActividades = `
      SELECT actividades.*,
        tareas.descripcion_tarea,
        tareas.codigo_trazabilidad as tarea_codigo_trazabilidad
      FROM actividades
      INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea
      WHERE id_actividad = ${id}
     `
  var actividades = await getAllRecords(queryActividades)
  
  if ( actividades.length == 1) {
    const queryCodigosTrazabilidad = `
          SELECT codigos_trazabilidad_actividad.codigo_trazabilidad
          FROM codigos_trazabilidad_actividad 
          WHERE codigos_trazabilidad_actividad.id_actividad = ${actividades[0].id_actividad}`
    const codigos = await getAllRecords(queryCodigosTrazabilidad)
    
    actividades[0]['codigos_trazabilidad'] = [];
    if (codigos.length > 0) {
      codigos.map((codigo) => actividades[0]['codigos_trazabilidad'].push(codigo.codigo_trazabilidad))
    }
    res.status(200).json(actividades[0]);
  }
  else {
    res.status(500).json({'message':'No existe actividad para los datos indicados.'});
  }
});

module.exports = getActivityInfo
