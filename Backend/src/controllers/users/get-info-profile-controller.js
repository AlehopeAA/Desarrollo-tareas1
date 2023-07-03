'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get info for profileScreen
// @route   GET /api/users/info-profile/:id
// @access  Private/Admin
const getProfiles = asyncHandler(async (req, res) => {
  const profileInfo = {}
  const misValidadoresQuery = `
  SELECT * FROM validadores 
  INNER JOIN puestos_trabajo on validadores.id_puesto_validador = puestos_trabajo.id_puesto 
  WHERE validadores.id_puesto = ${req.params.id} 
  AND puestos_trabajo.activo = 'SI'
  ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`

  const misPerfilesQuery = `
  SELECT * FROM perfiles_puesto
  INNER JOIN perfiles on perfiles_puesto.id_perfil = perfiles.id_perfil 
  WHERE perfiles_puesto.id_puesto = ${req.params.id}
  AND perfiles.activo = 'SI'
  ORDER BY perfiles.codigo_perfil`

  const misResponsablesQuery = `
  SELECT * FROM responsables
  INNER JOIN puestos_trabajo on responsables.id_puesto_responsable = puestos_trabajo.id_puesto
  WHERE responsables.id_puesto = ${req.params.id}
  AND puestos_trabajo.activo = 'SI'
  ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`

  const favoritesTasksQuery = `
  SELECT tareas.*, tipos_tarea.tipo_tarea 
  FROM tareas_favoritas 
  INNER JOIN tareas ON tareas_favoritas.id_tarea = tareas.id_tarea
  INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
  WHERE tareas_favoritas.id_puesto = ${req.params.id}
  AND tareas.activo='SI'
  AND (tipos_tarea.tipo_tarea IN ("AUSENCIA","GENERAL")
     OR (tipos_tarea.tipo_tarea = "ESPECIFICA"
         AND tareas.id_puesto = ${req.params.id})
     OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
         AND tareas.id_tarea IN (
           SELECT tareas_perfil.id_tarea 
           FROM tareas_perfil 
           WHERE tareas_perfil.id_perfil 
           IN (
             SELECT perfiles_puesto.id_perfil 
             FROM perfiles_puesto 
             WHERE perfiles_puesto.id_puesto = ${req.params.id}
           )
         ) 
     )
  )
  ORDER BY tareas.descripcion_tarea`

  const notFavoritesTasksQuery = `
  SELECT tareas.*, tipos_tarea.tipo_tarea FROM tareas
  INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
  WHERE id_tarea NOT IN 
    (SELECT tareas_favoritas.id_tarea FROM tareas_favoritas WHERE tareas_favoritas.id_puesto = ${req.params.id})
  AND (tipos_tarea.tipo_tarea IN ("AUSENCIA","GENERAL")
     OR (tipos_tarea.tipo_tarea = "ESPECIFICA" 
         AND tareas.id_puesto = ${req.params.id})
     OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
         AND tareas.id_tarea IN (
           SELECT tareas_perfil.id_tarea 
           FROM tareas_perfil 
           WHERE tareas_perfil.id_perfil 
           IN (
             SELECT perfiles_puesto.id_perfil 
             FROM perfiles_puesto 
             WHERE perfiles_puesto.id_puesto = ${req.params.id}
           )
         ) 
     )
  )
  AND tareas.activo='SI'
  ORDER BY tareas.descripcion_tarea`

  db.query(misValidadoresQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (result) {
      profileInfo.validadores = result
      db.query(misPerfilesQuery, (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) {
          profileInfo.perfiles = result
          db.query(misResponsablesQuery, async (err, result) => {
            if (err) {
              res.status(400).json({ message: err.sqlMessage })
            }
            if (result) {
              profileInfo.responsables = result
              const favoritesTask = await queryPromise(favoritesTasksQuery)
              const notFavoritesTask = await queryPromise(notFavoritesTasksQuery)
              const allsTasksId = [
                ...favoritesTask,
                ...notFavoritesTask,
              ].map((task) => task.id_tarea)
              const objetivesByTasksQuery = `SELECT * FROM objetivos WHERE objetivos.id_tarea IN (${allsTasksId.toString()})`
              const getObjetivesByTask = await queryPromise(objetivesByTasksQuery)
              ;(profileInfo.tareas = [...favoritesTask,...notFavoritesTask]),
                (profileInfo.favoritas = [...favoritesTask])
              profileInfo.objetivos = getObjetivesByTask
              res.status(200).json(profileInfo)
            }
          })
        }
      })
    }
  })
})

module.exports = getProfiles
