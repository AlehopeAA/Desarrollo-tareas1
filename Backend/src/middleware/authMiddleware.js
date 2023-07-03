'use strict'

const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const db = require('../config/mysql/db')
const { ALL_USER_ROLES, ADMIN_ROLE, SUPER_ROLE } = require('../config/users/roles/roles')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const userQuery = `
      SELECT puestos_trabajo.*,
      nvl (permisos.permiso,'usuario') permiso
      FROM puestos_trabajo 
      LEFT JOIN permisos_puesto 
      ON puestos_trabajo.id_puesto = permisos_puesto.id_puesto 
      LEFT JOIN permisos on permisos_puesto.id_permiso = permisos.id_permiso 
      WHERE puestos_trabajo.activo = 'SI' 
      AND puestos_trabajo.cod_ayre = '${decoded.cod_ayre}'`

      db.query(userQuery, (err, results) => {
        if (err) {
          console.log(err)
          res.status(400).json({ message: err.sqlMessage })
        }
        if (!results.length) {
          res.status(400).json({ message: 'No existe un puesto  con ese id' })
        } else {
          const permissions = []
          results.map((user) => {
            permissions.push(user.permiso)
          })

          req.user = {
            ...results[0],
            permiso: permissions,
          }

          next()
        }
      })
    } catch (error) {
      res.status(401)
      throw new Error('Not Autorizado , Fallo en token')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Autorizado.')
  }
})

const forEditor = (req, res, next) => {
  if (req.user && ALL_USER_ROLES.includes(req.user.role)) {
    next()
  } else {
    res.status(401)
    throw new Error('No Autorizado.')
  }
}

const forAdmin = (req, res, next) => {
  if (req.user && [ADMIN_ROLE, SUPER_ROLE].includes(req.user.role) && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('No Autorizado, No eres un Administrador.')
  }
}

const forSuper = (req, res, next) => {
  if (req.user && req.user.isAdmin && req.user.isSuper && req.user.role === SUPER_ROLE) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Autorizado, No eres un SuperAdministrador.')
  }
}

module.exports = { protect, forEditor, forAdmin, forSuper }
