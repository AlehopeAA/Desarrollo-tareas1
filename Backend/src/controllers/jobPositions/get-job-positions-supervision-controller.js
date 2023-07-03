'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all job positions
// @route   GET /api/puestostrabajo/supervision
// @access  responsible
const getJobPositionsSupervision = asyncHandler(async (req, res) => {

  const { id_puesto } = req.user
  const { mes, anyo } = req.body

  const getTrabajadoresSupervisionQuery = `
    SELECT puestos_trabajo.* 
    FROM responsables 
    INNER JOIN puestos_trabajo
    ON puestos_trabajo.id_puesto = responsables.id_puesto 
    WHERE responsables.id_puesto_responsable = ${id_puesto}
    AND puestos_trabajo.activo = 'SI'
    AND (NOT EXISTS (SELECT detalle_evaluaciones.id_detalle_evaluacion FROM evaluaciones
                    INNER JOIN detalle_evaluaciones ON detalle_evaluaciones.id_evaluacion = evaluaciones.id_evaluacion 
                    WHERE id_puesto_trabajo=puestos_trabajo.id_puesto
                    AND mes=${mes} and anio=${anyo})
          OR EXISTS (SELECT detalle_evaluaciones.id_detalle_evaluacion FROM evaluaciones
            INNER JOIN detalle_evaluaciones ON detalle_evaluaciones.id_evaluacion = evaluaciones.id_evaluacion 
            WHERE id_puesto_trabajo=puestos_trabajo.id_puesto
            AND mes=${mes} AND anio=${anyo}
            AND evaluacion='NO')
        )
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`

  db.query(getTrabajadoresSupervisionQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = getJobPositionsSupervision
