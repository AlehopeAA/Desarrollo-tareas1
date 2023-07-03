'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    get all task
// @route   GET /api/tareas
// @access  Private/Admin
const getTasks = asyncHandler(async (req, res) => {
  const { id_puesto } = req.user

   const absencesAndGeneralTasksQuery = `
      SELECT tareas.id_tarea , tareas.descripcion_tarea , tareas.cuantificable, tareas.codigo_trazabilidad 
      FROM tareas 
         INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
      WHERE tipos_tarea.tipo_tarea IN ("AUSENCIA", "GENERAL")
      AND tareas.activo = 'SI'
   `
   const specificTasksQuery = `
      SELECT tareas.id_tarea , tareas.descripcion_tarea , tareas.cuantificable, tareas.codigo_trazabilidad 
      FROM tareas 
         INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
         INNER JOIN puestos_trabajo ON tareas.id_puesto = puestos_trabajo.id_puesto  
      WHERE (tipos_tarea.tipo_tarea = "ESPECIFICA" 
         AND puestos_trabajo.id_puesto = '${id_puesto}')
         AND tareas.activo = 'SI'
   `
   const ordExtOthTasksQuery = `
      SELECT tareas.id_tarea , tareas.descripcion_tarea , tareas.cuantificable, tareas.codigo_trazabilidad
      FROM tareas 
         INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
      WHERE (tareas.id_tarea IN (
         SELECT tareas_perfil.id_tarea 
         FROM tareas_perfil 
         WHERE tareas_perfil.id_perfil IN (
            SELECT perfiles_puesto.id_perfil 
            FROM perfiles_puesto 
            WHERE perfiles_puesto.id_puesto = ${id_puesto}
         )
      ) 
         AND tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA","OTRA"))
      AND tareas.activo = 'SI'
   `

   const favoritesTasksQuery = `
      SELECT tareas.id_tarea , tareas.descripcion_tarea , tareas.cuantificable, tareas.codigo_trazabilidad
      FROM tareas_favoritas 
         INNER JOIN tareas ON tareas_favoritas.id_tarea = tareas.id_tarea
         INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
      WHERE tareas_favoritas.id_puesto = ${id_puesto}
         AND tareas.activo='SI'
         AND (tipos_tarea.tipo_tarea IN ("AUSENCIA","GENERAL")
            OR (tipos_tarea.tipo_tarea = "ESPECIFICA" 
               AND tareas.id_puesto = ${id_puesto})
            OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
               AND tareas.id_tarea IN (
                  SELECT tareas_perfil.id_tarea 
                  FROM tareas_perfil 
                  WHERE tareas_perfil.id_perfil IN (
                     SELECT perfiles_puesto.id_perfil 
                     FROM perfiles_puesto 
                     WHERE perfiles_puesto.id_puesto = ${id_puesto}
                  )
               ) 
            )
         )
      ORDER BY tareas.descripcion_tarea
   `

   const notFavoritesTasksQuery = `
      SELECT tareas.id_tarea , tareas.descripcion_tarea , tareas.cuantificable, tareas.codigo_trazabilidad
      FROM tareas
         INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
      WHERE id_tarea NOT IN (SELECT tareas_favoritas.id_tarea FROM tareas_favoritas WHERE tareas_favoritas.id_puesto = ${id_puesto})
         AND (tipos_tarea.tipo_tarea IN ("AUSENCIA","GENERAL")
            OR (tipos_tarea.tipo_tarea = "ESPECIFICA" 
                  AND tareas.id_puesto = ${id_puesto})
            OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
               AND tareas.id_tarea IN (
                  SELECT tareas_perfil.id_tarea 
                  FROM tareas_perfil 
                  WHERE tareas_perfil.id_perfil 
                  IN (
                     SELECT perfiles_puesto.id_perfil 
                     FROM perfiles_puesto 
                     WHERE perfiles_puesto.id_puesto = ${id_puesto}
                  )
               ) 
            )
         )
         AND tareas.activo='SI'
      ORDER BY tareas.descripcion_tarea`

   try {
      const getAllAbsencesAndGeneralTasks = await getAllRecords(absencesAndGeneralTasksQuery)
      const getAllSpecificTasksByUser = await getAllRecords(specificTasksQuery)
      const getAllOrdExtOthTasksByProfilesUser = await getAllRecords(ordExtOthTasksQuery)
      const favoritesTask = await getAllRecords(favoritesTasksQuery)
      const notFavoritesTask = await getAllRecords(notFavoritesTasksQuery)

      res
         .status(200)
         .json([...favoritesTask, ...notFavoritesTask])
   } catch (error) {
      res.status(500).json({ message: error })
   }
})

module.exports = getTasks
