'use strict'

const asyncHandler = require('express-async-handler')
const generateToken = require('../../utils/generateToken')
const { queryPromise } = require('../../utils/queryPromises')
// @desc    Auth user && get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { codAyre } = req.body

  const userQuery = `
    SELECT puestos_trabajo.*,
    nvl (permisos.permiso,'usuario') permiso
    FROM puestos_trabajo 
    LEFT JOIN permisos_puesto 
    ON puestos_trabajo.id_puesto = permisos_puesto.id_puesto 
    LEFT JOIN permisos on permisos_puesto.id_permiso = permisos.id_permiso 
    WHERE puestos_trabajo.activo = 'SI' 
    AND puestos_trabajo.cod_ayre = '${codAyre}'
  `
  try {
    const users = await queryPromise(userQuery)

    if (!users.length > 0) {
      return res.status(400).json({
        message:
          'Su usuario no existe en la aplicación o no está activo. Hable con el administrador para que gestione su acceso',
      })
    }
    const getProfilesQuery = `
        SELECT perfiles.id_perfil , perfiles.codigo_perfil
        FROM perfiles_puesto 
        INNER JOIN perfiles 
        ON perfiles_puesto.id_perfil = perfiles.id_perfil 
        WHERE perfiles_puesto.id_puesto =  ${users[0].id_puesto}
        ORDER BY perfiles.codigo_perfil
    `

    const profiles = await queryPromise(getProfilesQuery)

    const userData = {
      ...users[0],
      permiso: users.map((userPermmision) => userPermmision.permiso),
      perfiles: profiles,
    }

    res.status(200).json({
      token: generateToken(userData),
    })
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = authUser
