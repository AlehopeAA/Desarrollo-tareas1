'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all general task
// @route   GET /api/objetivosausencia
// @access  Private/Admin
const getSpecificObjetives = asyncHandler(async (req, res) => {
  const { id_puesto, permiso } = req.user
  
  const objetivesQuery = `
    SELECT objetivos.*, tareas.descripcion_tarea, tareas.dificultad as tardif, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
    FROM objetivos 
    INNER JOIN tareas ON objetivos.id_tarea = tareas.id_tarea 
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea     
    INNER JOIN puestos_trabajo 
    ON tareas.id_puesto = puestos_trabajo.id_puesto 
    WHERE (tipos_tarea.tipo_tarea = "ESPECIFICA" 
    AND tareas.activo = "SI"
    AND puestos_trabajo.activo = "SI" 
    AND (puestos_trabajo.id_puesto = ${id_puesto}
      OR tareas.id_puesto 
      IN ( 
        SELECT perfiles_puesto.id_puesto 
        FROM perfiles_puesto 
        INNER JOIN perfiles 
        ON perfiles_puesto.id_perfil = perfiles.id_perfil 
        WHERE perfiles.activo="SI" 
        AND perfiles_puesto.id_perfil 
        IN ( 
          SELECT gestor_perfiles.id_perfil 
          FROM gestor_perfiles 
          WHERE gestor_perfiles.id_puesto = ${id_puesto}
        ) 
      )
    )
    )
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2, tareas.descripcion_tarea
  `

  db.query(objetivesQuery, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getSpecificObjetives
