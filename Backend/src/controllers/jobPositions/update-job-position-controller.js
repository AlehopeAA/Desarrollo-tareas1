'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords, queryPromise } = require('../../utils/queryPromises')
const { registerRecord } = require('../../utils/queryPromises')

// @desc    Update job position
// @route   PUT /api/puestostrabajo/:id
// @access  Private/Admin
const updateJobPosition = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { id_puesto } = req.user
  const {
    cod_ayre,
    codigo_puesto,
    denominacion_puesto,
    jornada_laboral,
    activo,
    nombre,
    apellido1,
    apellido2,
    fecha_baja,
    profilesData,
    responsibles,
    validators,
    //tasks,
    ver_objetivos,
  } = req.body

  const variableValues = [
    { active: activo },
    { jobCode: codigo_puesto },
    { denomination: denominacion_puesto },
    { workday: jornada_laboral },
    { nombre },
    { cod_ayre },
    { apellido1 },
    { apellido2 },
    { fecha_baja },
    { ver_objetivos },
  ]

  const keysQuery = []
  const valuesQuery = []
  const jobPositionHistKeys = []
  const jobPositionHistValues = []
  const profilesWithoutRepeating = []
  const responsiblesWithoutRepeating = []
  const validatorsWithoutRepeating = []

  variableValues.map((data) => {
    if (data.jobCode) {
      keysQuery.push('codigo_puesto = ?')
      valuesQuery.push(`${data.jobCode}`)
      jobPositionHistKeys.push('codigo_puesto_nueva = ?')
      jobPositionHistValues.push(`${data.jobCode}`)
    }
    if (data.cod_ayre) {
      keysQuery.push('cod_ayre = ?')
      valuesQuery.push(`${data.cod_ayre}`)
      jobPositionHistKeys.push('cod_ayre_nueva = ?')
      jobPositionHistValues.push(`${data.cod_ayre}`)
    }
    if (data.nombre) {
      keysQuery.push('nombre = ?')
      valuesQuery.push(`${data.nombre}`)
      jobPositionHistKeys.push('nombre_nueva = ?')
      jobPositionHistValues.push(`${data.nombre}`)
    }
    if (data.apellido1) {
      keysQuery.push('apellido1 = ?')
      valuesQuery.push(`${data.apellido1}`)
      jobPositionHistKeys.push('apellido1_nueva = ?')
      jobPositionHistValues.push(`${data.apellido1}`)
    }
    if (data.apellido2) {
      keysQuery.push('apellido2 = ?')
      valuesQuery.push(`${data.apellido2}`)
      jobPositionHistKeys.push('apellido2_nueva = ?')
      jobPositionHistValues.push(`${data.apellido2}`)
    }
    if (data.denomination) {
      keysQuery.push('denominacion_puesto = ?')
      valuesQuery.push(`${data.denomination}`)
      jobPositionHistKeys.push('denominacion_puesto_nueva = ?')
      jobPositionHistValues.push(`${data.denomination}`)
    }
    if (data.workday) {
      keysQuery.push('jornada_laboral = ?')
      valuesQuery.push(`${data.workday}`)
      jobPositionHistKeys.push('jornada_laboral_nueva = ?')
      jobPositionHistValues.push(`${data.workday}`)
    }

    if (data.active) {
      keysQuery.push('activo = ?')
      valuesQuery.push(`${data.active}`)
      jobPositionHistKeys.push('activo_nueva = ?')
      jobPositionHistValues.push(`${data.active}`)
      if (data.active === 'NO' && fecha_baja) {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(`${fecha_baja}`)
        jobPositionHistKeys.push('fecha_baja_nueva = ?')
        jobPositionHistValues.push(`${fecha_baja}`)
      } else {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(null)
        jobPositionHistKeys.push('fecha_baja_nueva = ?')
        jobPositionHistValues.push(null)
      }
    }
    if (data.ver_objetivos) {
      keysQuery.push('ver_objetivos = ?')
      valuesQuery.push(`${data.ver_objetivos}`)
      jobPositionHistKeys.push('ver_objetivos_nueva = ?')
      jobPositionHistValues.push(`${data.ver_objetivos}`)
    }
  })

  const existUserQuery = `
    SELECT * FROM puestos_trabajo 
    WHERE puestos_trabajo.cod_ayre = '${cod_ayre}' 
    AND puestos_trabajo.codigo_puesto = '${codigo_puesto}'
    AND id_puesto <> ${id}
  `
  const existUser = await getAllRecords(existUserQuery)

  if (existUser.length > 0) {
    return res.status(400).json({ message: 'Ya Existe un usuario con el mismo Código Ayre y mismo código de puesto' })
  }

  const getAllProfiles = `
      SELECT perfiles.codigo_perfil    
      FROM perfiles  
      LEFT JOIN perfiles_puesto ON perfiles.id_perfil = perfiles_puesto.id_perfil
      WHERE id_puesto = '${id}'
      `

  const allProfiles = await queryPromise(getAllProfiles)

  if ( allProfiles.length > 0) {
     for (let i = 0; i < allProfiles.length; i++) {
        profilesWithoutRepeating.push(` ${allProfiles[i].codigo_perfil}`)
     }
  }

  const getAllResponsibles = `
      SELECT puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
      FROM responsables
      INNER JOIN puestos_trabajo ON puestos_trabajo.id_puesto = responsables.id_puesto_responsable
      WHERE responsables.id_puesto = '${id}'
      `

  const allResponsibles = await queryPromise(getAllResponsibles)

  if ( allResponsibles.length > 0) {
     for (let i = 0; i < allResponsibles.length; i++) {
        responsiblesWithoutRepeating.push(` ${allResponsibles[i].nombre} ${allResponsibles[i].apellido1} ${allResponsibles[i].apellido2 || ''} `)
     }
  }

  const getAllValidators = `
      SELECT puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
      FROM validadores
      INNER JOIN puestos_trabajo ON puestos_trabajo.id_puesto = validadores.id_puesto_validador
      WHERE validadores.id_puesto = '${id}'
      `

  const allValidators = await queryPromise(getAllValidators)

  if ( allValidators.length > 0) {
     for (let i = 0; i < allValidators.length; i++) {
        validatorsWithoutRepeating.push(` ${allValidators[i].nombre} ${allValidators[i].apellido1} ${allValidators[i].apellido2 || ''} `)
     }
  }
  
  const insertHistoricalQuery = `
    INSERT INTO historico_puestos (id_puesto, id_puesto_modificador, fecha_modificacion, cod_ayre_anterior, codigo_puesto_anterior,
      denominacion_puesto_anterior, nombre_anterior, apellido1_anterior, apellido2_anterior, jornada_laboral_anterior,
      activo_anterior, fecha_baja_anterior, ver_objetivos_anterior, perfiles_anterior, responsables_anterior, validadores_anterior)
    SELECT id_puesto, ${id_puesto}, sysdate(), cod_ayre, codigo_puesto, denominacion_puesto,
           nombre, apellido1, apellido2, jornada_laboral, activo, fecha_baja, ver_objetivos, 
           '${profilesWithoutRepeating.toString()}', '${responsiblesWithoutRepeating.toString()}', '${validatorsWithoutRepeating.toString()}'
    FROM puestos_trabajo WHERE puestos_trabajo.id_puesto = ${id}
  `
  try {
    const historicos = await registerRecord(insertHistoricalQuery)    

    const DeleteOldProfiles = `
    DELETE FROM perfiles_puesto 
    WHERE id_puesto = '${id}'
    `

    const DeleteOldResponsibles = `
    DELETE FROM responsables 
    WHERE id_puesto = '${id}'
    `
 
    const DeleteOldValidators = `
    DELETE FROM validadores
    WHERE id_puesto = '${id}'
    `
    const profilesToSave = []
    const responsiblesToSave = []
    const validatorsToSave = []
    const profilesAntToSave = []
    const responsiblesAntToSave = []
    const validatorsAntToSave = []

    if (profilesData && !!profilesData.length) {    
      profilesData.forEach((profile) => {    
         profilesToSave.push(`('${profile.id_perfil}','${id}')`)
         profilesAntToSave.push(` ${profile.codigo_perfil}`)
      })
    }
    
    const insertProfilesQuery = `
      INSERT INTO perfiles_puesto
      (
        id_perfil,
        id_puesto
      )
      VALUES ${profilesToSave.toString()}
      `

    if (responsibles && !!responsibles.length) {    
      responsibles.forEach((responsible) => {
        responsiblesToSave.push(`('${responsible.id_puesto}','${id}')`)
        responsiblesAntToSave.push(` ${responsible.nombre} ${responsible.apellido1} ${responsible.apellido2 || ''}`)
      })
    }

    const insertResponsiblesQuery = `
       INSERT INTO responsables
       (
         id_puesto_responsable,
         id_puesto
       )
       VALUES ${responsiblesToSave.toString()}`  

    if (validators && !!validators.length) {
      validators.forEach((validator) => {
        validatorsToSave.push(`('${validator.id_puesto}','${id}')`)
        validatorsAntToSave.push(` ${validator.nombre} ${validator.apellido1} ${validator.apellido2 || ''}`)
      })
    }
    
    const insertValidatorsQuery = `
       INSERT INTO validadores
       (
         id_puesto_validador,
         id_puesto
       )
       VALUES ${validatorsToSave.toString()}`  

    jobPositionHistKeys.push('perfiles_nueva = ?')
    jobPositionHistValues.push(`${profilesAntToSave.toString()}`)
    jobPositionHistKeys.push('responsables_nueva = ?')
    jobPositionHistValues.push(`${responsiblesAntToSave.toString()}`)
    jobPositionHistKeys.push('validadores_nueva = ?')
    jobPositionHistValues.push(`${validatorsAntToSave.toString()}`)
  
  db.query('SELECT * FROM puestos_trabajo WHERE id_puesto = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe un puesto de trabajo  con ese id' })
    } else {
      db.query(
        `UPDATE puestos_trabajo SET ${keysQuery.toString()} WHERE puestos_trabajo.id_puesto = '${id}'`,
        valuesQuery,
        async (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }
          if (result) {
            try {
              if (profilesData) {
                await queryPromise(DeleteOldProfiles)
                if (!!profilesData.length) {
                  await queryPromise(insertProfilesQuery)
                }
              }

              if (responsibles) {
                await queryPromise(DeleteOldResponsibles)
                if (!!responsibles.length) {
                  await queryPromise(insertResponsiblesQuery)
                }
              }

              if (validators) {
                await queryPromise(DeleteOldValidators)
                if (!!validators.length) {
                  await queryPromise(insertValidatorsQuery)
                }
              }

              db.query(
                `UPDATE historico_puestos SET ${jobPositionHistKeys.toString()} WHERE (historico_puestos.id_historico_puesto = ${historicos.insertId})`,
                jobPositionHistValues,
                (err, result) => {
                  if (err) {
                    res.status(400).json({ message: err.sqlMessage })
                  }
                  if (result) {
                    res.status(200).json({ message: 'Puesto de trabajo editado correctamente' })
                  }
                }
              )
            } catch (error) {
              res.status(400).json(error)
            }
          }
        }
      )
    }
  })

  }
  catch(ex) {
    return res.status(400).json({ message: 'Ha ocurrido un error en el guardado del puesto de trabajo' })
  }  
})

module.exports = updateJobPosition
