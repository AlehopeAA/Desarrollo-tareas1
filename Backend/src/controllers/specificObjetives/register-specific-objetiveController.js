'use strict'

const asyncHandler = require('express-async-handler')
const { getAllRecords, registerRecord } = require('../../utils/queryPromises')

// @desc    Create specific objetive
// @route   POST /api/objetivosespecificos
// @access  Private/Admin
const registerSpecificObjetive = asyncHandler(async (req, res) => {
  const {
    task,
    dificulty,
    unit_min,
    unit_mid,
    unit_max,
    entry_min,
    entry_mid,
    entry_max,
    time_min,
    time_mid,
    time_max,
    working_min,
    working_mid,
    working_max,
    magnitud_temporal,
  } = req.body

  const variableValues = [
    { unidades_minimo: unit_min },
    { unidades_medio: unit_mid },
    { unidades_maximo: unit_max },
    { porcentaje_entrada_minimo: entry_min },
    { porcentaje_entrada_medio: entry_mid },
    { porcentaje_entrada_maximo: entry_max },
    { tiempo_minimo: time_min },
    { tiempo_medio: time_mid },
    { tiempo_maximo: time_max },
    { porcentaje_jornada_minimo: working_min },
    { porcentaje_jornada_medio: working_mid },
    { porcentaje_jornada_maximo: working_max },
    { magnitud_temporal },
  ]

  const objetiveKeys = ['id_tarea', 'dificultad', 'fecha_ultima_modificacion']
  const objetiveValues = [`'${task}'`, `'${dificulty}'`, `sysdate()`]

  for (let i = 0; i < variableValues.length; i++) {
    if (variableValues[i] && variableValues[i].unidades_minimo) {
      objetiveKeys.push('unidades_minimo')
      objetiveValues.push(`'${variableValues[i].unidades_minimo}'`)
    }
    if (variableValues[i] && variableValues[i].unidades_medio) {
      objetiveKeys.push('unidades_medio')
      objetiveValues.push(`'${variableValues[i].unidades_medio}'`)
    }
    if (variableValues[i] && variableValues[i].unidades_maximo) {
      objetiveKeys.push('unidades_maximo')
      objetiveValues.push(`'${variableValues[i].unidades_maximo}'`)
    }
    if (variableValues[i] && variableValues[i].porcentaje_entrada_minimo) {
      objetiveKeys.push('porcentaje_entrada_minimo')
      objetiveValues.push(`'${variableValues[i].porcentaje_entrada_minimo}'`)
    }
    if (variableValues[i] && variableValues[i].porcentaje_entrada_medio) {
      objetiveKeys.push('porcentaje_entrada_medio')
      objetiveValues.push(`'${variableValues[i].porcentaje_entrada_medio}'`)
    }
    if (variableValues[i] && variableValues[i].porcentaje_entrada_maximo) {
      objetiveKeys.push('porcentaje_entrada_maximo')
      objetiveValues.push(`'${variableValues[i].porcentaje_entrada_maximo}'`)
    }
    if (variableValues[i] && variableValues[i].tiempo_minimo) {
      objetiveKeys.push('tiempo_minimo')
      objetiveValues.push(`'${variableValues[i].tiempo_minimo}'`)
    }
    if (variableValues[i] && variableValues[i].tiempo_medio) {
      objetiveKeys.push('tiempo_medio')
      objetiveValues.push(`'${variableValues[i].tiempo_medio}'`)
    }
    if (variableValues[i] && variableValues[i].tiempo_maximo) {
      objetiveKeys.push('tiempo_maximo')
      objetiveValues.push(`'${variableValues[i].tiempo_maximo}'`)
    }
    if (variableValues[i] && variableValues[i].porcentaje_jornada_minimo) {
      objetiveKeys.push('porcentaje_jornada_minimo')
      objetiveValues.push(`'${variableValues[i].porcentaje_jornada_minimo}'`)
    }
    if (variableValues[i] && variableValues[i].porcentaje_jornada_medio) {
      objetiveKeys.push('porcentaje_jornada_medio')
      objetiveValues.push(`'${variableValues[i].porcentaje_jornada_medio}'`)
    }
    if (variableValues[i] && variableValues[i].porcentaje_jornada_maximo) {
      objetiveKeys.push('porcentaje_jornada_maximo')
      objetiveValues.push(`'${variableValues[i].porcentaje_jornada_maximo}'`)
    }
    if (variableValues[i] && variableValues[i].magnitud_temporal) {
      objetiveKeys.push('magnitud_temporal')
      objetiveValues.push(`'${variableValues[i].magnitud_temporal}'`)
    }
  }

  const existDescriptionQuery = `
    SELECT * FROM objetivos 
    INNER JOIN tareas 
    ON objetivos.id_tarea = tareas.id_tarea 
    WHERE (objetivos.dificultad = '${dificulty}'
    AND objetivos.id_tarea = '${task}')
  `

  const insertNewObjetiveQuery = `INSERT INTO objetivos (${objetiveKeys.toString()}) VALUES (${objetiveValues.toString()})`

  try {
    const existRecord = await getAllRecords(existDescriptionQuery)

    if (existRecord.length) {
      return res.status(400).json({ message: 'Ya existe un objetivo con ese nivel de dificultad ' })
    }

    await registerRecord(insertNewObjetiveQuery)

    res.status(201).json({ message: 'Objetivo registrado correctamente' })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

module.exports = registerSpecificObjetive
