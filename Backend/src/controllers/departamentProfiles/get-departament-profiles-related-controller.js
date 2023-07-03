'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all related departaments profile
// @route   GET /api/perfildepartamentos/relacionados
// @access  Private/Admin
const getDepartamentProfilesRelated = asyncHandler(async (req, res) => {

   const { id_puesto } = req.user
      
   const departamentsProfileQuery = `
      SELECT *
      FROM perfil_departamento 
      WHERE id_departamento IN (
         SELECT DISTINCT p.id_departamento
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
      ORDER BY descripcion_departamento
   `
   
   db.query(departamentsProfileQuery, (err, result) => {
      if (err) {
         return res.status(400).json({ message: err.sqlMessage })
      }
      res.status(200).json(result)
   })
})

module.exports = getDepartamentProfilesRelated
