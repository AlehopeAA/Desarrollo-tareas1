'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { registerRecord } = require('../../utils/queryPromises')

// @desc    Update configuracion
// @route   put /api/configuraciones/:id
// @access  Private/Admin
const updateConfiguracion = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { id_puesto } = req.user
  const { parametro, valor, descripcion } = req.body

  const variableValues = [
    { parametro: parametro },
    { valor: valor },
    { descripcion: descripcion },
  ]

  const keysQuery = []
  const valuesQuery = []
  const confHistKeys = []
  const confHistValues = []

  variableValues.map((data, i) => {
    if (data.parametro) {
      keysQuery.push('parametro = ?')
      valuesQuery.push(`${data.parametro}`)
      confHistKeys.push('parametro_nueva = ?')
      confHistValues.push(`${data.parametro}`)
    }
    if (data.valor) {
      keysQuery.push('valor = ?')
      valuesQuery.push(`${data.valor}`)
      confHistKeys.push('valor_nueva = ?')
      confHistValues.push(`${data.valor}`)
    }
    if (data.descripcion) {
      keysQuery.push('descripcion = ?')
      valuesQuery.push(`${data.descripcion}`)
      confHistKeys.push('descripcion_nueva = ?')
      confHistValues.push(`${data.descripcion}`)
    }
  })

  const insertHistoricalQuery = `
    INSERT INTO historico_configuraciones (id_configuracion, id_puesto, fecha_modificacion, parametro_anterior, valor_anterior, descripcion_anterior)
    SELECT id_configuracion, ${id_puesto}, sysdate(), parametro, valor, descripcion
    FROM configuraciones WHERE configuraciones.id_configuracion = ${id}
  `
  try {
    const historicos = await registerRecord(insertHistoricalQuery)

    db.query(
      `UPDATE configuraciones SET ${keysQuery.toString()} WHERE id_configuracion = '${id}'`, valuesQuery,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        if (result) {
          db.query(
            `UPDATE historico_configuraciones SET ${confHistKeys.toString()} WHERE (historico_configuraciones.id_historico_configuracion = ${historicos.insertId})`,
            confHistValues,
            (err, result) => {
              if (err) {
                res.status(400).json({ message: err.sqlMessage })
              }
              if (result) {
                res.status(201).json({
                  message: 'Configuración editada correctamente',
                })
              }
            }
          )
        }
      }
    )
  }
  catch(ex) {
    return res.status(400).json({ message: 'Ha ocurrido un error en el guardado de las configuraciones' })
  }

})

module.exports = updateConfiguracion
