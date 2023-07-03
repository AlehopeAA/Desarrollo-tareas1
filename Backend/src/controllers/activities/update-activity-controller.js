'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { registerRecord } = require('../../utils/queryPromises')

// @desc    put update activity
// @route   PUT /api/actividades/:id
// @access  Private
const updateActivity = asyncHandler(async (req, res) => {
  const { id } = req.params
  const {
    fecha_actividad,
    tarea,
    modalidad,
    horas,
    unidades,
    observaciones,
    codigos_trazabilidad,
    validada,
    fecha_modificacion,
  } = req.body  

  try {
    const actualizarActividadQuery =  `
                                      UPDATE actividades
                                      SET 
                                        fecha_actividad = '${fecha_actividad}',
                                        modalidad = '${modalidad}',
                                        horas = ${horas}
                                        ${tarea && tarea.length > 0 ? `, id_tarea = ${tarea[0].id_tarea}`: ''}
                                        ${unidades ? `, unidades = ${unidades}`: ''}
                                        ${observaciones ? `, observaciones = '${observaciones}'`: ''}
                                        ${fecha_modificacion ? `, fecha_modificacion = '${fecha_modificacion}'`: ''}
                                        ${validada ? `, validada = '${validada}'`: ''}
                                      WHERE 
                                        actividades.id_actividad = ${id}`
    await registerRecord(actualizarActividadQuery)

    //Borramos todos sus codigos, y damos persistencia a los nuevos.
    const borrarCodigosQuery =  `
                                      DELETE FROM codigos_trazabilidad_actividad
                                      WHERE 
                                        codigos_trazabilidad_actividad.id_actividad = ${id}`
    await registerRecord(borrarCodigosQuery)

    for (let i = 0; i < codigos_trazabilidad.length; i++) {
      const insertCodigoTrazabilidadQuery = `INSERT INTO codigos_trazabilidad_actividad 
                                            (
                                              id_actividad, codigo_trazabilidad
                                            ) 
                                            VALUES (
                                              ${id}, 
                                              '${codigos_trazabilidad[i]}'
                                            )`
      await registerRecord(insertCodigoTrazabilidadQuery)
    }

    return res.status(200).json({message: 'Actividad editada correctamente',})
  }
  catch(ex) {
    return res.status(400).json({ message: 'Ha ocurrido un error en el guardado de la actividad.' })
  }
})

module.exports = updateActivity
