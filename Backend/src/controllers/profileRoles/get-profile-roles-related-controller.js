'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all related profile roles
// @route   GET /api/perfilroles/relacionados
// @access  Private/Admin
const getProfileRolesRelated = asyncHandler(async (req, res) => {

   const { id_puesto } = req.user
      
   const roleProfileQuery = `
      SELECT *
      FROM perfil_rol 
      WHERE id_rol IN (
         SELECT DISTINCT p.id_subdireccion
            FROM perfiles_puesto AS pp 
               INNER JOIN perfiles AS p ON p.id_perfil = pp.id_perfil 
            WHERE pp.id_puesto IN (
               SELECT id_puesto 
               FROM actividades.responsables R 
               WHERE R.id_puesto_responsable = ${ id_puesto }
               
               UNION 
               
               SELECT id_puesto 
               FROM actividades.validadores R 
               WHERE R.id_puesto_validador = ${ id_puesto }
            )
      )
      ORDER BY descripcion_rol
   `
   
   db.query(roleProfileQuery, (err, result) => {
      if (err) {
         res.status(400).json({ message: err.sqlMessage })
      }
      res.status(200).json(result)
   })
})

module.exports = getProfileRolesRelated
