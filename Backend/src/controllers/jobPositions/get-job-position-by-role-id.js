'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords } = require('../../utils/queryPromises')
// @desc    get all job positions by rolename
// @route   GET /api/puestostrabajo/role/:roleName
// @access  responsible/validator/manager
const getJobPositionsByRoleId = asyncHandler(async (req, res) => {
  const { id } = req.params

  let queryAssigned = `SELECT * FROM puestos_trabajo 
    INNER JOIN permisos_puesto 
    ON puestos_trabajo.id_puesto = permisos_puesto.id_puesto 
    INNER JOIN permisos 
    ON permisos_puesto.id_permiso = permisos.id_permiso 
    WHERE (permisos.id_permiso = '${id}' 
      AND puestos_trabajo.activo = 'SI')
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`

  let queryPending = `
  SELECT * FROM puestos_trabajo 
  WHERE puestos_trabajo.id_puesto NOT IN (
    SELECT permisos_puesto.id_puesto 
    FROM permisos_puesto
    INNER JOIN permisos 
    ON permisos_puesto.id_permiso = permisos.id_permiso 
    WHERE permisos.id_permiso = '${id}'
  )
  AND puestos_trabajo.activo = 'SI'
  ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`

  try {
    const getAssigned = await getAllRecords(queryAssigned)
    const getPending = await getAllRecords(queryPending)

    const profiles = {
      pendings: getPending,
      assigned: getAssigned,
    }

    return res.status(200).json(profiles)
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los perfiles' })
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

module.exports = getJobPositionsByRoleId
