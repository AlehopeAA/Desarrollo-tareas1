'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { queryPromise } = require('../../utils/queryPromises')
const { registerRecord } = require('../../utils/queryPromises')

// @desc    Update ord ext task
// @route   PUT /api/tareasordextotras/:id
// @access  Private/Admin

const updateOrdExtTask = asyncHandler(async (req, res) => {
  console.log(req.body)
  const id = req.params.id
  const { id_puesto } = req.user
  const {
    descripcion_tarea,
    id_tipo_tarea,
    activo,
    codigo_trazabilidad,
    cuantificable,
    fecha_baja,
    indicador,
    entrada,
    compartida,
    dificultad,
    acumulativa,
    profilesData,
  } = req.body

  const variableValues = [
    { v_activo: activo },
    { v_id_tipo_tarea: id_tipo_tarea },
    { v_cuantificable: cuantificable },
    { v_codigo_trazabilidad: codigo_trazabilidad },
    { v_indicador: indicador },
    { v_entrada: entrada },
    { v_compartida: compartida },
    { v_dificultad: dificultad },
    { v_acumulativa: acumulativa },
    { fecha_baja },
  ]

  const keysQuery = ['descripcion_tarea = ?']
  const valuesQuery = [`${descripcion_tarea}`]
  const taskHistKeys = ['descripcion_nueva = ?']
  const taskHistValues = [`${descripcion_tarea}`]

  variableValues.map((data) => {
    if (data.v_activo) {
      keysQuery.push('activo = ?')
      valuesQuery.push(`${data.v_activo}`)
      taskHistKeys.push('activo_nueva = ?')
      taskHistValues.push(`${data.v_activo}`)
      if (data.v_activo === 'NO' && fecha_baja) {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(`${fecha_baja}`)
        taskHistKeys.push('fecha_baja_nueva = ?')
        taskHistValues.push(`${fecha_baja}`)
      } else {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(null)
        taskHistKeys.push('fecha_baja_nueva = ?')
        taskHistValues.push(null)
      }
    }
    if (data.v_id_tipo_tarea) {
      keysQuery.push('id_tipo_tarea = ?')
      valuesQuery.push(`${data.v_id_tipo_tarea}`)
      taskHistKeys.push('id_tipo_tarea_nueva = ?')
      taskHistValues.push(`${data.v_id_tipo_tarea}`)
    }
    if (data.v_codigo_trazabilidad) {
      keysQuery.push('codigo_trazabilidad = ?')
      valuesQuery.push(`${data.v_codigo_trazabilidad}`)
      taskHistKeys.push('codigo_trazabilidad_nueva = ?')
      taskHistValues.push(`${data.v_codigo_trazabilidad}`)
    }
    if (data.v_cuantificable) {
      keysQuery.push('cuantificable = ?')
      valuesQuery.push(`${data.v_cuantificable}`)
      taskHistKeys.push('cuantificable_nueva = ?')
      taskHistValues.push(`${data.v_cuantificable}`)
    }
    if (data.v_indicador) {
      keysQuery.push('indicador = ?')
      valuesQuery.push(`${data.v_indicador}`)
      taskHistKeys.push('indicador_nueva = ?')
      taskHistValues.push(`${data.v_indicador}`)
    }
    if (data.v_entrada) {
      keysQuery.push('entrada = ?')
      valuesQuery.push(`${data.v_entrada}`)
      taskHistKeys.push('entrada_nueva = ?')
      taskHistValues.push(`${data.v_entrada}`)
    }
    if (data.v_compartida) {
      keysQuery.push('compartida = ?')
      valuesQuery.push(`${data.v_compartida}`)
      taskHistKeys.push('compartida_nueva = ?')
      taskHistValues.push(`${data.v_compartida}`)
    }
    if (data.v_dificultad) {
      keysQuery.push('dificultad = ?')
      valuesQuery.push(`${data.v_dificultad}`)
      taskHistKeys.push('dificultad_nueva = ?')
      taskHistValues.push(`${data.v_dificultad}`)
    }    
    if (data.v_acumulativa) {
      keysQuery.push('acumulativa = ?')
      valuesQuery.push(`${data.v_acumulativa}`)
      taskHistKeys.push('acumulativa_nueva = ?')
      taskHistValues.push(`${data.v_acumulativa}`)
    }
  })

  const insertHistoricalQuery = `
    INSERT INTO historico_tareas (id_tarea, id_puesto, fecha_modificacion, descripcion_anterior, id_tipo_tarea_anterior,
      indicador_anterior, cuantificable_anterior, entrada_anterior, compartida_anterior,
      dificultad_anterior, acumulativa_anterior, codigo_trazabilidad_anterior, activo_anterior, fecha_baja_anterior)
    SELECT id_tarea, ${id_puesto}, sysdate(), descripcion_tarea, id_tipo_tarea, indicador,
           cuantificable, entrada, compartida, dificultad, acumulativa, codigo_trazabilidad, activo, fecha_baja
    FROM tareas WHERE tareas.id_tarea = ${id}
  `
  try {
    const historicos = await registerRecord(insertHistoricalQuery)

    const DeleteOldProfiles = `
    DELETE FROM tareas_perfil 
    WHERE id_tarea = '${id}'
    `

    const profilesToSave = []

    if (profilesData && !!profilesData.length) {    
      profilesData.forEach((profile) => {    
         profilesToSave.push(`('${profile.id_perfil}','${id}')`)
      })
    }
    
    const insertProfilesQuery = `
      INSERT INTO tareas_perfil
      (
        id_perfil,
        id_tarea
      )
      VALUES ${profilesToSave.toString()}
      `

    if (profilesData) {
        await queryPromise(DeleteOldProfiles)
        if (!!profilesData.length) {
          await queryPromise(insertProfilesQuery)
        }
    }

    db.query(
      `UPDATE tareas SET ${keysQuery.toString()} WHERE id_tarea = '${id}'`, valuesQuery,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) {
          try {                         
             db.query(
               `UPDATE historico_tareas SET ${taskHistKeys.toString()} WHERE (historico_tareas.id_historico_tarea = ${historicos.insertId})`,
               taskHistValues,
               (err, result) => {
                 if (err) {
                   res.status(400).json({ message: err.sqlMessage })
                 }
                 if (result) {                  
                   res.status(201).json({
                     message: 'Tarea ord ext editada correctamente',
                   })
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
  catch(ex) {
    return res.status(400).json({ message: 'Ha ocurrido un error en el guardado de las tareas ord / ext' })
  }

})

module.exports = updateOrdExtTask
