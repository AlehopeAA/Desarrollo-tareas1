'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords, getOneRecord } = require('../../utils/queryPromises')

// @desc    get  job position by id
// @route   GET /api/puestostrabajo/:id
// @access  Private/Admin
const getJobPositionById = asyncHandler(async (req, res) => {
  const { id } = req.params

  const userDataQuery = `SELECT * FROM puestos_trabajo WHERE id_puesto = '${id}'`

  const responsiblesByUserQuery = `
    SELECT * FROM puestos_trabajo 
    WHERE puestos_trabajo.activo = 'SI'
    AND (puestos_trabajo.id_puesto 
    IN (
      SELECT responsables.id_puesto_responsable 
      FROM puestos_trabajo 
      INNER JOIN responsables 
      ON puestos_trabajo.id_puesto = responsables.id_puesto 
      WHERE puestos_trabajo.id_puesto = '${id}'
    ))
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
  `
  const validatorsByUserQuery = `
  SELECT * FROM puestos_trabajo 
  WHERE puestos_trabajo.activo = 'SI'
  AND (puestos_trabajo.id_puesto 
  IN (
    SELECT validadores.id_puesto_validador 
    FROM puestos_trabajo 
    INNER JOIN validadores 
    ON puestos_trabajo.id_puesto = validadores.id_puesto 
    WHERE puestos_trabajo.id_puesto = '${id}'
  ))
  ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
  `
  const profilesByUserQuery = `
    SELECT perfiles.codigo_perfil , perfiles.id_perfil 
    FROM perfiles_puesto 
    INNER JOIN perfiles 
    ON perfiles_puesto.id_perfil = perfiles.id_perfil 
    WHERE perfiles_puesto.id_puesto = ${id}
    AND perfiles.activo = 'SI'
    ORDER BY perfiles.codigo_perfil
  `
const favoritesTasksQuery = `
  SELECT tareas.*, "SI" favorita 
  FROM tareas_favoritas 
  INNER JOIN tareas ON tareas_favoritas.id_tarea = tareas.id_tarea
  INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
  WHERE tareas_favoritas.id_puesto = ${id}
  AND tareas.activo='SI'
  AND (tipos_tarea.tipo_tarea = "ESPECIFICA" AND tareas.id_puesto = ${id}
     OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
         AND tareas.id_tarea IN (
           SELECT tareas_perfil.id_tarea 
           FROM tareas_perfil 
           WHERE tareas_perfil.id_perfil 
           IN (
             SELECT perfiles_puesto.id_perfil 
             FROM perfiles_puesto 
             WHERE perfiles_puesto.id_puesto = ${id}
           )
         ) 
     )
  )
  ORDER BY tareas.descripcion_tarea`

  const notFavoritesTasksQuery = `
  SELECT tareas.*, "NO" favorita FROM tareas
  INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
  WHERE id_tarea NOT IN (SELECT tareas_favoritas.id_tarea FROM tareas_favoritas WHERE tareas_favoritas.id_puesto = ${id})
  AND tareas.activo='SI'
  AND (tipos_tarea.tipo_tarea = "ESPECIFICA" AND tareas.id_puesto = ${id}
     OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
         AND tareas.id_tarea IN (
           SELECT tareas_perfil.id_tarea 
           FROM tareas_perfil 
           WHERE tareas_perfil.id_perfil 
           IN (
             SELECT perfiles_puesto.id_perfil 
             FROM perfiles_puesto 
             WHERE perfiles_puesto.id_puesto = ${id}
           )
         ) 
     )
  )
  ORDER BY tareas.descripcion_tarea`

  const objetivesByFavoritesTasksQuery = `
  SELECT * FROM objetivos
  WHERE objetivos.id_tarea IN (
    SELECT tareas.id_tarea 
    FROM tareas_favoritas 
    INNER JOIN tareas ON tareas_favoritas.id_tarea = tareas.id_tarea
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea
    WHERE tareas_favoritas.id_puesto = ${id}
    AND (tipos_tarea.tipo_tarea = "ESPECIFICA" AND tareas.id_puesto = ${id}
     OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
         AND tareas.id_tarea IN (
           SELECT tareas_perfil.id_tarea 
           FROM tareas_perfil 
           WHERE tareas_perfil.id_perfil 
           IN (
             SELECT perfiles_puesto.id_perfil 
             FROM perfiles_puesto 
             WHERE perfiles_puesto.id_puesto = ${id}
           )
         ) 
     )
    )
  )`

  const objetivesByNotFavoritesTasksQuery = `
  SELECT * FROM objetivos
  WHERE objetivos.id_tarea IN (
    SELECT tareas.id_tarea FROM tareas
    INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
    WHERE id_tarea NOT IN (SELECT tareas_favoritas.id_tarea FROM tareas_favoritas WHERE tareas_favoritas.id_puesto = ${id})
    AND (tipos_tarea.tipo_tarea = "ESPECIFICA" AND tareas.id_puesto = ${id}
       OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
           AND tareas.id_tarea IN (
             SELECT tareas_perfil.id_tarea 
             FROM tareas_perfil 
             WHERE tareas_perfil.id_perfil 
             IN (
               SELECT perfiles_puesto.id_perfil 
               FROM perfiles_puesto 
               WHERE perfiles_puesto.id_puesto = ${id}
             )
           ) 
       )
    )
  )`

  try {
    const userData = await getOneRecord(userDataQuery)
    const allResponsibles = await getAllRecords(responsiblesByUserQuery)
    const allValidators = await getAllRecords(validatorsByUserQuery)
    const allProfiles = await getAllRecords(profilesByUserQuery)
    const favoritesTasks = await getAllRecords(favoritesTasksQuery)
    const notFavoritesTasks = await getAllRecords(notFavoritesTasksQuery)    
    const getObjetivesByFavoritesTask = await getAllRecords(objetivesByFavoritesTasksQuery)
    const getObjetivesByNotFavoritesTask = await getAllRecords(objetivesByNotFavoritesTasksQuery)

        const userDataResponse = {
      user: userData[0],
      perfiles: allProfiles,
      validadores: allValidators,
      responsables: allResponsibles,
      tareas: [...favoritesTasks, ...notFavoritesTasks],
      objetivos: [...getObjetivesByFavoritesTask, ...getObjetivesByNotFavoritesTask],
    }

    return res.json(userDataResponse)
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage })
  }
})

module.exports = getJobPositionById
