'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Update task
// @route   PUT /api/tareas/:id
// @access  Private/Admin
const updateTask = asyncHandler(async (req, res) => {
  const id = req.params.id_tarea
  const {
    descripcion_tarea,
    id_tipo_tarea,
    activo,
    fecha_baja,
    cuantificable,
    indicador,
    entrada,
    compartida,
    dificultad,
    acumulativa,
  } = req.body

  const variableValues = [
    { v_activo: activo },
    { v_id_tipo_tarea: id_tipo_tarea },
    { v_cuantificable: cuantificable },
    { v_indicador: indicador },
    { v_entrada: entrada },
    { v_compartida: compartida },
    { v_dificultad: dificultad },
    { v_acumulativa: acumulativa },
    { fecha_baja },
  ]

  const keysQuery = ['descripcion_tarea = ?']
  const valuesQuery = [`${descripcion_tarea}`]

  variableValues.map((data) => {
    if (data.v_activo) {
      keysQuery.push('activo = ?')
      valuesQuery.push(`${data.v_activo}`)
      if (data.active === 'NO' && fecha_baja) {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(`${fecha_baja}`)
      } else {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(null)
      }
    }
    if (data.departament) {
      keysQuery.push('id_departamento = ?')
      valuesQuery.push(`${data.departament}`)
    }
    if (data.v_id_tipo_tarea) {
      keysQuery.push('id_tipo_tarea = ?')
      valuesQuery.push(`${data.v_id_tipo_tarea}`)
    }
    if (data.v_cuantificable) {
      keysQuery.push('cuantificable = ?')
      valuesQuery.push(`${data.v_cuantificable}`)
    }
    if (data.v_indicador) {
      keysQuery.push('indicador = ?')
      valuesQuery.push(`${data.v_indicador}`)
    }
    if (data.v_entrada) {
      keysQuery.push('entrada = ?')
      valuesQuery.push(`${data.v_entrada}`)
    }
    if (data.v_compartida) {
      keysQuery.push('compartida = ?')
      valuesQuery.push(`${data.v_compartida}`)
    }
    if (data.v_dificultad) {
      keysQuery.push('dificultad = ?')
      valuesQuery.push(`${data.v_dificultad}`)
    }    
    if (data.v_acumulativa) {
      keysQuery.push('acumulativa = ?')
      valuesQuery.push(`${data.v_acumulativa}`)
    }
  })

  db.query('SELECT * FROM tareas WHERE id_tarea = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!results.length) {
      res.status(400).json({ message: 'No existe una tarea con ese id' })
    } else {
      db.query(
        `UPDATE tareas SET  ${keysQuery.toString()} WHERE id_tarea = '${id}'`, valuesQuery,
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }
          if (result)
            res.status(201).json({
              message: 'Tarea editada correctamente',
            })
        }
      )
    }
  })
})

module.exports = updateTask
