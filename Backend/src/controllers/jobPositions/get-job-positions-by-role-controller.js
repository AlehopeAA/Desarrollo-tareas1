'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { ADMIN_ROLE, RESPONSABLE_ROLE, VALIDADOR_ROLE, GESTOR_DE_PERFILES_ROLE } = require('../../config/users/roles/roles')
// @desc    get all job positions by rolename
// @route   GET /api/puestostrabajo/role/:roleName
// @access  responsible/validator/manager
const getJobPositionsByRole = asyncHandler(async (req, res) => {
  const { roleName } = req.params
  const { id_puesto, permiso } = req.user

  const isAdminRole = permiso.indexOf(ADMIN_ROLE) !== -1
  const isGestorPerfilesRole = permiso.indexOf(GESTOR_DE_PERFILES_ROLE) !== -1
  let query = ''

  if (isAdminRole || (isGestorPerfilesRole && roleName == RESPONSABLE_ROLE) || (isGestorPerfilesRole && roleName == VALIDADOR_ROLE) ) {
    query = `
      SELECT * FROM puestos_trabajo 
      INNER JOIN permisos_puesto 
      ON puestos_trabajo.id_puesto = permisos_puesto.id_puesto 
      WHERE (
        permisos_puesto.id_permiso = (
          SELECT permisos.id_permiso 
          FROM permisos 
          WHERE permisos.permiso = '${roleName}'
        ) 
        AND puestos_trabajo.activo = "SI"
      )
      ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`
  } else {
    query = `
      SELECT * FROM puestos_trabajo 
      INNER JOIN permisos_puesto 
      ON puestos_trabajo.id_puesto = permisos_puesto.id_puesto 
      WHERE (
        puestos_trabajo.activo ="SI" 
        AND puestos_trabajo.id_puesto 
        IN (
          SELECT DISTINCT perfiles_puesto.id_puesto 
          FROM perfiles_puesto 
          INNER JOIN perfiles 
          ON perfiles_puesto.id_perfil = perfiles.id_perfil 
          WHERE (
            perfiles_puesto.id_perfil 
            IN (
              SELECT DISTINCT gestor_perfiles.id_perfil 
              FROM gestor_perfiles 
              WHERE gestor_perfiles.id_puesto = '${id_puesto}'
            ) 
          AND perfiles.activo = "SI"
        ) 
        AND permisos_puesto.id_permiso = (
          SELECT permisos.id_permiso 
          FROM permisos 
          WHERE permisos.permiso = '${roleName}'
        )
      )
    )
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`
  }

  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ message: err.sqlMessage })
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = getJobPositionsByRole
