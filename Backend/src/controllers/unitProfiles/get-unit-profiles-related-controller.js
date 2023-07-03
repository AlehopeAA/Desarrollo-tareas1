'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all related related unit roles
// @route   GET /api/perfilunidades/relacionados
// @access  Private/Admin
const getUnitProfilesRelated = asyncHandler(async (req, res) => {

   const { id_puesto } = req.user
      
   const unitProfileQuery = `
      SELECT *
      FROM perfil_unidad 
      WHERE id_unidad IN (
         SELECT DISTINCT p.id_unidad
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
      ORDER BY descripcion_unidad
   `

   db.query(unitProfileQuery, (err, result) => {
      if (err) {
         res.status(400).json({ message: err.sqlMessage })
      }
      res.status(200).json(result)
   })
})

module.exports = getUnitProfilesRelated
