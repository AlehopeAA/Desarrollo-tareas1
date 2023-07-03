'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const {
  ADMIN_ROLE,
  SUPER_ROLE,
  GESTOR_DE_PERFILES_ROLE,
} = require('../../config/users/roles/roles')

// @desc    get all specific tasks
// @route   GET /api/tareasespecificas
// @access  Private/Admin
const getSpecificTasks = asyncHandler(async (req, res) => {
  const { id_puesto, permiso } = req.user

  const isAdminOrSuper = permiso.includes(ADMIN_ROLE) || permiso.includes(SUPER_ROLE)
  const isManager = permiso.includes(GESTOR_DE_PERFILES_ROLE)

  if (isAdminOrSuper) {
    const specificTasks = `
    SELECT tareas.* , puestos_trabajo.id_puesto , puestos_trabajo.nombre , puestos_trabajo.apellido1 , puestos_trabajo.apellido2 
    FROM tareas
    LEFT JOIN tipos_tarea 
    ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
    INNER JOIN puestos_trabajo 
    ON tareas.id_puesto = puestos_trabajo.id_puesto 
    WHERE tipos_tarea.tipo_tarea = "ESPECIFICA" 
    AND puestos_trabajo.activo = "SI"
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2, tareas.descripcion_tarea
    `

    db.query(specificTasks, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      res.status(200).json(result)
    })
  } else if (isManager) {
      const managerSpecificTasks = `
        SELECT tareas.* , puestos_trabajo.id_puesto , puestos_trabajo.nombre , puestos_trabajo.apellido1 , puestos_trabajo.apellido2 
    FROM tareas 
    LEFT JOIN tipos_tarea 
    ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
    INNER JOIN puestos_trabajo 
    ON tareas.id_puesto = puestos_trabajo.id_puesto 
    WHERE (tipos_tarea.tipo_tarea = "ESPECIFICA" 
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
    db.query(managerSpecificTasks, (err, result) => {
      if (err) {
        return res.status(400).json({ message: err.sqlMessage })
      }
       res.status(200).json(result)
    })
  }
})

module.exports = getSpecificTasks
