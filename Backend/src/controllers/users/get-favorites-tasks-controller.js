'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Get all favorites tasks assigned to user
// @route   GET /api/users/tareasfavoritas/:idPuesto
// @access  user

const getFavoritesTasks = asyncHandler(async (req, res) => {
  const { idPuesto } = req.params

  const getFavoritesTasksAssignedToUserQuery = `
    SELECT tareas.* FROM tareas 
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
    WHERE (
      tareas.activo = "SI" 
      AND tareas.id_tarea 
      IN (
        SELECT tareas_favoritas.id_tarea 
        FROM tareas_favoritas
        WHERE tareas_favoritas.id_puesto = ${idPuesto}
      )
      AND (tipos_tarea.tipo_tarea IN ("AUSENCIA","GENERAL")
       OR (tipos_tarea.tipo_tarea = "ESPECIFICA" 
           AND tareas.id_puesto = ${idPuesto})
       OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
           AND tareas.id_tarea IN (
             SELECT tareas_perfil.id_tarea 
             FROM tareas_perfil 
             WHERE tareas_perfil.id_perfil 
             IN (
               SELECT perfiles_puesto.id_perfil 
               FROM perfiles_puesto 
               WHERE perfiles_puesto.id_puesto = ${idPuesto}
             )
           ) 
       )
      )
    )
    ORDER BY tareas.descripcion_tarea
  `
  const resultAssigned = await getAllRecords(getFavoritesTasksAssignedToUserQuery)      


  const getFavoritesTasksPendingsUserQuery = `
    SELECT tareas.* FROM tareas
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
    WHERE id_tarea NOT IN (SELECT tareas_favoritas.id_tarea FROM tareas_favoritas WHERE tareas_favoritas.id_puesto = ${idPuesto})
    AND tareas.activo = "SI"
    AND (tipos_tarea.tipo_tarea IN ("AUSENCIA","GENERAL")
       OR (tipos_tarea.tipo_tarea = "ESPECIFICA" 
           AND tareas.id_puesto = ${idPuesto})
       OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
           AND tareas.id_tarea IN (
             SELECT tareas_perfil.id_tarea 
             FROM tareas_perfil 
             WHERE tareas_perfil.id_perfil 
             IN (
               SELECT perfiles_puesto.id_perfil 
               FROM perfiles_puesto 
               WHERE perfiles_puesto.id_puesto = ${idPuesto}
             )
           ) 
       )
    )
    ORDER BY tareas.descripcion_tarea  
    `
  const pendings = await getAllRecords(getFavoritesTasksPendingsUserQuery)

  res.status(200).json({assigned: resultAssigned, pendings: pendings})
})

module.exports = getFavoritesTasks
