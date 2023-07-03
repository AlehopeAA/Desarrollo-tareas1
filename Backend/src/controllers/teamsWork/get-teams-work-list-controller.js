'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const {
  ADMIN_ROLE,
  RESPONSABLE_ROLE,
  VALIDADOR_ROLE,
  SUPER_ROLE,
  GESTOR_DE_PERFILES_ROLE,
} = require('../../config/users/roles/roles')

// @desc    get all job positions
// @route   GET /api/equipostrabajo
// @access  responsible/validator/manager
const getTeamsWorkList = asyncHandler(async (req, res) => {
  const { id_puesto, permiso } = req.user

  const isAdminOrSuper = permiso.includes(ADMIN_ROLE) || permiso.includes(SUPER_ROLE)
  const isResponsible = permiso.includes(RESPONSABLE_ROLE)
  const isManager = permiso.includes(GESTOR_DE_PERFILES_ROLE)
  const isValidator = permiso.includes(VALIDADOR_ROLE)

  const usersWithoutRepeating = []

  if (isAdminOrSuper) {
    const getAllJobPositions = `
      SELECT puestos_trabajo.*, perfiles.codigo_perfil
      FROM puestos_trabajo  
      LEFT JOIN perfiles_puesto ON puestos_trabajo.id_puesto = perfiles_puesto.id_puesto
      LEFT JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
      ORDER BY puestos_trabajo.activo desc, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
      `

    db.query(getAllJobPositions, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }

      result.map((user) => {
        const existInArray = usersWithoutRepeating.map((user) => user.id_puesto).indexOf(user.id_puesto) === -1

        if (existInArray) {
          const repeatUsers = result.filter((userRepeat) => userRepeat.id_puesto === user.id_puesto)

          usersWithoutRepeating.push({
            ...user,
            codigo_perfil: repeatUsers.map((userCod) => userCod.codigo_perfil),
          })
        }
      })

      res.status(200).json(usersWithoutRepeating)
    })
  } else if (isManager) {
    const managerProfiles = `
      SELECT puestos_trabajo.*, perfiles.codigo_perfil 
      FROM puestos_trabajo 
      LEFT JOIN perfiles_puesto ON puestos_trabajo.id_puesto = perfiles_puesto.id_puesto
      LEFT JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
      WHERE (
        puestos_trabajo.id_puesto 
        IN (
          SELECT DISTINCT perfiles_puesto.id_puesto 
          FROM perfiles_puesto 
          WHERE perfiles_puesto.id_perfil 
          IN (
            SELECT gestor_perfiles.id_perfil 
            FROM gestor_perfiles 
            INNER JOIN perfiles 
            ON gestor_perfiles.id_perfil = perfiles.id_perfil
            WHERE (
              gestor_perfiles.id_puesto = ${id_puesto}
              AND perfiles.activo = 'SI'
            )
          )
        )
      )
      ORDER BY puestos_trabajo.activo desc, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
    `

    db.query(managerProfiles, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }

      result.map((user) => {
        const existInArray = usersWithoutRepeating.map((user) => user.id_puesto).indexOf(user.id_puesto) === -1

        if (existInArray) {
          const repeatUsers = result.filter((userRepeat) => userRepeat.id_puesto === user.id_puesto)

          usersWithoutRepeating.push({
            ...user,
            codigo_perfil: repeatUsers.map((userCod) => userCod.codigo_perfil),
          })
        }
      })

      res.status(200).json(usersWithoutRepeating)
    })
  } else if (isResponsible) {
    const responsibleJobPositions = `
      SELECT puestos_trabajo.*, perfiles.codigo_perfil
      FROM puestos_trabajo 
      LEFT JOIN responsables ON puestos_trabajo.id_puesto = responsables.id_puesto 
      LEFT JOIN perfiles_puesto ON puestos_trabajo.id_puesto = perfiles_puesto.id_puesto
      LEFT JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
      WHERE responsables.id_puesto_responsable = ${id_puesto}
      ORDER BY puestos_trabajo.activo desc, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`

      db.query(responsibleJobPositions, (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
  
        result.map((user) => {
          const existInArray = usersWithoutRepeating.map((user) => user.id_puesto).indexOf(user.id_puesto) === -1
  
          if (existInArray) {
            const repeatUsers = result.filter((userRepeat) => userRepeat.id_puesto === user.id_puesto)
  
            usersWithoutRepeating.push({
              ...user,
              codigo_perfil: repeatUsers.map((userCod) => userCod.codigo_perfil),
            })
          }
        })
  
        res.status(200).json(usersWithoutRepeating)
      })
  } else if (isValidator) {
    const validatorJobPositions = `
      SELECT puestos_trabajo.*, perfiles.codigo_perfil
      FROM puestos_trabajo 
      LEFT JOIN validadores ON puestos_trabajo.id_puesto = validadores.id_puesto 
      LEFT JOIN perfiles_puesto ON puestos_trabajo.id_puesto = perfiles_puesto.id_puesto
      LEFT JOIN perfiles ON perfiles_puesto.id_perfil = perfiles.id_perfil
      WHERE validadores.id_puesto_validador = ${id_puesto}
      ORDER BY puestos_trabajo.activo desc, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`

      db.query(validatorJobPositions, (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
  
        result.map((user) => {
          const existInArray = usersWithoutRepeating.map((user) => user.id_puesto).indexOf(user.id_puesto) === -1
  
          if (existInArray) {
            const repeatUsers = result.filter((userRepeat) => userRepeat.id_puesto === user.id_puesto)
  
            usersWithoutRepeating.push({
              ...user,
              codigo_perfil: repeatUsers.map((userCod) => userCod.codigo_perfil),
            })
          }
        })
  
        res.status(200).json(usersWithoutRepeating)
      })
  }
})

module.exports = getTeamsWorkList
