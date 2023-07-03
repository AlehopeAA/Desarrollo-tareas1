'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all profiles
// @route   GET /api/perfiles/puesto
// @access  Private/Admin
const getProfilesByPosition = asyncHandler(async (req, res) => {
   const { id_puesto } = req.user

   const query = `
         SELECT 
            perfiles.id_perfil, 
            perfiles.codigo_perfil, 
            perfiles.fecha_alta,
            perfiles.fecha_baja, 
            perfiles.activo,  
            perfiles.descripcion_perfil , 
            perfil_subdireccion.descripcion_subdireccion , 
            perfil_unidad.descripcion_unidad , 
            perfil_servicio.descripcion_servicio , 
            perfil_rol.descripcion_rol, 
            perfil_departamento.descripcion_departamento 
         FROM perfiles 
            LEFT JOIN perfil_subdireccion ON perfiles.id_subdireccion = perfil_subdireccion.id_subdireccion 
            LEFT JOIN perfil_servicio ON perfiles.id_servicio = perfil_servicio.id_servicio 
            LEFT JOIN perfil_departamento ON perfiles.id_departamento = perfil_departamento.id_departamento 
            LEFT JOIN perfil_unidad ON perfiles.id_unidad = perfil_unidad.id_unidad 
            LEFT JOIN perfil_rol ON perfiles.id_rol = perfil_rol.id_rol 
         WHERE perfiles.id_perfil IN (
            SELECT gestor_perfiles.id_perfil 
            FROM gestor_perfiles 
            WHERE gestor_perfiles.id_puesto = ${id_puesto}
         )
         ORDER BY perfiles.codigo_perfil`
   
   db.query(query, (err, result) => {
      if (err) {
         res.status(400).json({ message: err.sqlMessage })
      }
      res.status(200).json(result)
   })
})

module.exports = getProfilesByPosition
