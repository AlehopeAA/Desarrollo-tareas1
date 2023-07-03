'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { registerRecord } = require('../../utils/queryPromises')

// @desc    put update activity
// @route   PUT /api/objetivosgenerales/:id
// @access  Private
const updateAbsencesObjetives = asyncHandler(async (req, res) => {
   const { id } = req.params
   const { id_puesto } = req.user
   const {
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

   const variablesValues = [
      { dificulty },
      { unit_min: unit_min === "" ? "null" : unit_min },
      { unit_mid: unit_mid === "" ? "null" : unit_mid },
      { unit_max: unit_max === "" ? "null" : unit_max },
      { entry_min: entry_min === "" ? "null" : entry_min },
      { entry_mid: entry_mid === "" ? "null" : entry_mid },
      { entry_max: entry_max === "" ? "null" : entry_max },
      { time_min: time_min === "" ? "null" : time_min },
      { time_mid: time_mid === "" ? "null" : time_mid },
      { time_max: time_max === "" ? "null" : time_max },
      { working_min: working_min === "" ? "null" : working_min },
      { working_mid: working_mid === "" ? "null" : working_mid },
      { working_max: working_max === "" ? "null" : working_max },
      { magnitud_temporal },
   ]
   const objetiveKeys = []
   const objetiveValues = []
   const objetiveHistKeys = []
   const objetiveHistValues = []

   variablesValues.forEach(absencesObjetives => {

      if (absencesObjetives.dificulty) {
         objetiveKeys.push('dificultad = ?')
         objetiveValues.push(`${absencesObjetives.dificulty}`)
         objetiveHistKeys.push('dificultad_nueva = ?')
         objetiveHistValues.push(`${absencesObjetives.dificulty}`)
      }
      else if (absencesObjetives.unit_min) {
         objetiveKeys.push('unidades_minimo = ?')
         objetiveValues.push(absencesObjetives["unit_min"] === "null" ? null : absencesObjetives["unit_min"])
         objetiveHistKeys.push('unidades_minimo_nueva = ?')
         objetiveHistValues.push(absencesObjetives["unit_min"] === "null" ? null : absencesObjetives["unit_min"])
      }
      else if (absencesObjetives.unit_mid) {
         objetiveKeys.push('unidades_medio = ?')
         objetiveValues.push(absencesObjetives["unit_mid"] === "null" ? null : absencesObjetives["unit_mid"])
         objetiveHistKeys.push('unidades_medio_nueva = ?')
         objetiveHistValues.push(absencesObjetives["unit_mid"] === "null" ? null : absencesObjetives["unit_mid"])
      }
      else if (absencesObjetives.unit_max) {
         objetiveKeys.push('unidades_maximo = ?')
         objetiveValues.push(absencesObjetives["unit_max"] === "null" ? null : absencesObjetives["unit_max"])
         objetiveHistKeys.push('unidades_maximo_nueva = ?')
         objetiveHistValues.push(absencesObjetives["unit_max"] === "null" ? null : absencesObjetives["unit_max"])
      }
      else if (absencesObjetives.entry_min) {
         objetiveKeys.push('porcentaje_entrada_minimo = ?')
         objetiveValues.push(absencesObjetives["entry_min"] === "null" ? null : absencesObjetives["entry_min"])
         objetiveHistKeys.push('porcentaje_entrada_minimo_nueva = ?')
         objetiveHistValues.push(absencesObjetives["entry_min"] === "null" ? null : absencesObjetives["entry_min"])
      }
      else if (absencesObjetives.entry_mid) {
         objetiveKeys.push('porcentaje_entrada_medio = ?')
         objetiveValues.push(absencesObjetives["entry_mid"] === "null" ? null : absencesObjetives["entry_mid"])
         objetiveHistKeys.push('porcentaje_entrada_medio_nueva = ?')
         objetiveHistValues.push(absencesObjetives["entry_mid"] === "null" ? null : absencesObjetives["entry_mid"])
      }
      else if (absencesObjetives.entry_max) {
         objetiveKeys.push('porcentaje_entrada_maximo = ?')
         objetiveValues.push(absencesObjetives["entry_max"] === "null" ? null : absencesObjetives["entry_max"])
         objetiveHistKeys.push('porcentaje_entrada_maximo_nueva = ?')
         objetiveHistValues.push(absencesObjetives["entry_max"] === "null" ? null : absencesObjetives["entry_max"])
      }
      else if (absencesObjetives.time_min) {
         objetiveKeys.push('tiempo_minimo = ?')
         objetiveValues.push(absencesObjetives["time_min"] === "null" ? null : absencesObjetives["time_min"])
         objetiveHistKeys.push('tiempo_minimo_nueva = ?')
         objetiveHistValues.push(absencesObjetives["time_min"] === "null" ? null : absencesObjetives["time_min"])
      }
      else if (absencesObjetives.time_mid) {
         objetiveKeys.push('tiempo_medio = ?')
         objetiveValues.push(absencesObjetives["time_mid"] === "null" ? null : absencesObjetives["time_mid"])
         objetiveHistKeys.push('tiempo_medio_nueva = ?')
         objetiveHistValues.push(absencesObjetives["time_mid"] === "null" ? null : absencesObjetives["time_mid"])
      }
      else if (absencesObjetives.time_max) {
         objetiveKeys.push('tiempo_maximo = ?')
         objetiveValues.push(absencesObjetives["time_max"] === "null" ? null : absencesObjetives["time_max"])
         objetiveHistKeys.push('tiempo_maximo_nueva = ?')
         objetiveHistValues.push(absencesObjetives["time_max"] === "null" ? null : absencesObjetives["time_max"])
      }
      else if (absencesObjetives.working_min) {
         objetiveKeys.push('porcentaje_jornada_minimo = ?')
         objetiveValues.push(absencesObjetives["working_min"] === "null" ? null : absencesObjetives["working_min"])
         objetiveHistKeys.push('porcentaje_jornada_minimo_nueva = ?')
         objetiveHistValues.push(absencesObjetives["working_min"] === "null" ? null : absencesObjetives["working_min"])
      }
      else if (absencesObjetives.working_mid) {
         objetiveKeys.push('porcentaje_jornada_medio = ?')
         objetiveValues.push(absencesObjetives["working_mid"] === "null" ? null : absencesObjetives["working_mid"])
         objetiveHistKeys.push('porcentaje_jornada_medio_nueva = ?')
         objetiveHistValues.push(absencesObjetives["working_mid"] === "null" ? null : absencesObjetives["working_mid"])
      }
      else if (absencesObjetives.working_max) {
         objetiveKeys.push('porcentaje_jornada_maximo = ?')
         objetiveValues.push(absencesObjetives["working_max"] === "null" ? null : absencesObjetives["working_max"])
         objetiveHistKeys.push('porcentaje_jornada_maximo_nueva = ?')
         objetiveHistValues.push(absencesObjetives["working_max"] === "null" ? null : absencesObjetives["working_max"])
      }
      else if (absencesObjetives.magnitud_temporal) {
         objetiveKeys.push('magnitud_temporal = ?')
         objetiveValues.push(`${absencesObjetives.magnitud_temporal}`)
         objetiveHistKeys.push('magnitud_temporal_nueva = ?')
         objetiveHistValues.push(`${absencesObjetives.magnitud_temporal}`)
      }
   })

   const insertHistoricalQuery = `
      INSERT INTO historico_objetivos (id_objetivo, id_puesto, fecha_modificacion, dificultad_anterior, unidades_minimo_anterior,
         unidades_medio_anterior, unidades_maximo_anterior, magnitud_temporal_anterior, porcentaje_entrada_minimo_anterior,
         porcentaje_entrada_medio_anterior, porcentaje_entrada_maximo_anterior, tiempo_minimo_anterior, tiempo_medio_anterior,
         tiempo_maximo_anterior, porcentaje_jornada_minimo_anterior, porcentaje_jornada_medio_anterior,
         porcentaje_jornada_maximo_anterior)
      SELECT id_objetivo, ${id_puesto}, sysdate(), dificultad, unidades_minimo,
            unidades_medio, unidades_maximo, magnitud_temporal, porcentaje_entrada_minimo,
            porcentaje_entrada_medio, porcentaje_entrada_maximo, tiempo_minimo, tiempo_medio,
            tiempo_maximo, porcentaje_jornada_minimo, porcentaje_jornada_medio,
            porcentaje_jornada_maximo FROM objetivos WHERE objetivos.id_objetivo = ${id}
   `
   try {
      const historicos = await registerRecord(insertHistoricalQuery)

      db.query(
         `UPDATE objetivos SET fecha_ultima_modificacion=sysdate(), ${objetiveKeys.toString()} WHERE (objetivos.id_objetivo = '${id}')`,
         objetiveValues,
         (err, result) => {
         if (err) {
            res.status(400).json({ message: err.sqlMessage })
         }
         if (result) {
            db.query(
               `UPDATE historico_objetivos SET ${objetiveHistKeys.toString()} WHERE (historico_objetivos.id_historico_objetivo = ${historicos.insertId})`,
               objetiveHistValues,
               (err, result) => {
               if (err) {
                  res.status(400).json({ message: err.sqlMessage })
               }
               if (result) {
                  res.status(201).json({
                     message: 'Objetivo editado correctamente',
                  })
               }
               }
            )
         }
         }
      )
   }
   catch(ex) {
      return res.status(400).json({ message: 'Ha ocurrido un error en el guardado de los objetivos' })
   }
})

module.exports = updateAbsencesObjetives
