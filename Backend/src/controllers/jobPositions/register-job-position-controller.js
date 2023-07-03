'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords, queryPromise } = require('../../utils/queryPromises')

// @desc    Create job position
// @route   POST /api/puestostrabajo
// @access  Private/Admin
const registerJobPosition = asyncHandler(async (req, res) => {
  const {
    cod_ayre,
    codigo_puesto,
    denominacion_puesto,
    jornada_laboral,
    fecha_alta,
    nombre,
    apellido1,
    apellido2,
    profilesData,
    //tasks,
    validators,
    responsibles,
    ver_objetivos,
  } = req.body

  const existUserQuery = `
    SELECT * FROM puestos_trabajo 
    WHERE (puestos_trabajo.cod_ayre = '${cod_ayre}' 
    AND puestos_trabajo.codigo_puesto = '${codigo_puesto}')
  `
  const existUser = await getAllRecords(existUserQuery)

  if (existUser.length > 0) {
    return res.status(400).json({ message: 'Ya Existe un usuario con el mismo Código Ayre y mismo código de puesto' })
  }

  if (!profilesData.length > 0) {
    return res.status(400).json({ message: 'Debes asignar mínimo un perfil ' })
  }

  const insertJobPositionQuery = `
    INSERT INTO puestos_trabajo 
    ( cod_ayre,
      codigo_puesto, 
      denominacion_puesto, 
      jornada_laboral, 
      activo, 
      fecha_alta, 
      nombre, 
      apellido1, 
      apellido2,
      ver_objetivos 
      ) 
    VALUES 
      (
      '${cod_ayre}',
      '${codigo_puesto}',
      '${denominacion_puesto}',
      '${jornada_laboral}',
      '${'SI'}',
      '${fecha_alta}', 
      '${nombre}', 
      '${apellido1}',
      '${apellido2}', 
      '${ver_objetivos}'
    )
  `
  let newJobPositionId = ''
  queryPromise(insertJobPositionQuery)
    .then((newJobPosition) => {
      newJobPositionId = newJobPosition.insertId
      const profilesToSave = profilesData.map((profile) => `('${profile.id_perfil}','${newJobPosition.insertId}')`)
      const insertProfilesQuery = `
    INSERT INTO perfiles_puesto
    (
      id_perfil,
      id_puesto
    )
    VALUES ${profilesToSave.toString()}`
      return queryPromise(insertProfilesQuery)
    })
    .then((profilesInserted) => {
      if (!!validators.length) {
        const validatorsToSave = validators.map((profile) => `('${profile.id_puesto}','${newJobPositionId}')`)
        const insertValidatorsQuery = `
            INSERT INTO validadores
            (
              id_puesto_validador,
              id_puesto
            )
            VALUES ${validatorsToSave.toString()}`
        return queryPromise(insertValidatorsQuery)
      } else return profilesInserted
    })
    .then((validatorsInserted) => {
      if (!!responsibles.length) {
        const responsiblesToSave = responsibles.map(
          (responsible) => `('${responsible.id_puesto}','${newJobPositionId}')`
        )
        const insertResponsibleQuery = `
        INSERT INTO responsables
        (
          id_puesto_responsable,
          id_puesto
        )
        VALUES ${responsiblesToSave.toString()}`
        return queryPromise(insertResponsibleQuery)
      } else return validatorsInserted
    })
    .then((responsiblesInserted) => {
      /*
      if (!!tasks.length) {
        const idSpecificTaskType = 1
        const tasksToSave = []
        tasks.map((task) =>
          tasksToSave.push(
            `('${task.descripcion_tarea}','${idSpecificTaskType}','${task.cuantificable}','${'SI'}','${fecha_alta}','${
              task.indicador
            }','${task.entrada}','${task.compartida}','${task.dificultad}','${newJobPositionId}','${task.acumulativa}')`
          )
        )

        const insertTaskQuery = `
                    INSERT INTO tareas (
                      descripcion_tarea,
                      id_tipo_tarea,
                      cuantificable,
                      activo,
                      fecha_alta,
                      indicador,
                      entrada, 
                      compartida, 
                      dificultad,
                      id_puesto,
                      acumulativa) VALUES ${tasksToSave.toString()}`
        return queryPromise(insertTaskQuery)
      } else return responsiblesInserted
    })
    .then((insertedTasks) => {
      */
      res.status(201).json({
        message: 'puesto de trabajo creado',
      })
    })
    .catch((error) => {
      res.status(500).json(error)
    })
})

module.exports = registerJobPosition
