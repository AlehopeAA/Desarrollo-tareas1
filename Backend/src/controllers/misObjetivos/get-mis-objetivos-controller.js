'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getOneRecord, getAllRecords } = require('../../utils/queryPromises')

// @desc    get all general task
// @route   GET /api/misObjetivos
// @access  Private/Admin
const getMisObjetivos = asyncHandler(async (req, res) => {
  const { id_puesto } = req.user
  
  const tasksWithoutRepeating = []

  const objetivosFavoritosQuery = `
    SELECT objetivos.*, tareas.descripcion_tarea, tareas.compartida, tareas.dificultad as tardif, perfiles.codigo_perfil
    FROM objetivos
    INNER JOIN tareas_favoritas ON objetivos.id_tarea = tareas_favoritas.id_tarea 
    INNER JOIN tareas ON tareas_favoritas.id_tarea = tareas.id_tarea    
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
    LEFT JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
    LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
    WHERE
    tareas_favoritas.id_puesto = ${id_puesto}
    AND tareas.activo = "SI"  
    AND (tipos_tarea.tipo_tarea IN ("AUSENCIA","GENERAL")
          OR (tipos_tarea.tipo_tarea = "ESPECIFICA" AND tareas.id_puesto = ${id_puesto})
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
    ORDER BY tareas.descripcion_tarea
  `
  const objetivosFavoritos = await getAllRecords(objetivosFavoritosQuery)

  objetivosFavoritos.map((task) => {
    const existInArray = tasksWithoutRepeating.map((task) => task.id_tarea).indexOf(task.id_tarea) === -1

    if (existInArray) {
      const repeatTasks = objetivosFavoritos.filter((taskRepeat) => taskRepeat.id_tarea === task.id_tarea)

      tasksWithoutRepeating.push({
        ...task,
        codigo_perfil: repeatTasks.map((taskCod) => taskCod.codigo_perfil),
      })
    }
  })

  const objetivosNoFavoritosQuery = `
    SELECT objetivos.*, tareas.descripcion_tarea, tareas.compartida, tareas.dificultad as tardif, perfiles.codigo_perfil
    FROM objetivos
    INNER JOIN tareas ON objetivos.id_tarea = tareas.id_tarea 
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
    LEFT JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
    LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
    WHERE
    tareas.id_tarea NOT IN (SELECT tareas_favoritas.id_tarea FROM tareas_favoritas WHERE tareas_favoritas.id_puesto = ${id_puesto})
    AND tareas.activo = "SI"
    AND (tipos_tarea.tipo_tarea IN ("AUSENCIA","GENERAL")
          OR (tipos_tarea.tipo_tarea = "ESPECIFICA" AND tareas.id_puesto = ${id_puesto})
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
    ORDER BY tareas.descripcion_tarea
  `
  const objetivosNoFavoritos = await getAllRecords(objetivosNoFavoritosQuery)

  objetivosNoFavoritos.map((task) => {
    const existInArray = tasksWithoutRepeating.map((task) => task.id_objetivo).indexOf(task.id_objetivo) === -1

    if (existInArray) {
      const repeatTasks = objetivosNoFavoritos.filter((taskRepeat) => taskRepeat.id_objetivo === task.id_objetivo)

      tasksWithoutRepeating.push({
        ...task,
        codigo_perfil: repeatTasks.map((taskCod) => taskCod.codigo_perfil),
      })
    }
  })



  res.status(200).json(tasksWithoutRepeating)
})

module.exports = getMisObjetivos
