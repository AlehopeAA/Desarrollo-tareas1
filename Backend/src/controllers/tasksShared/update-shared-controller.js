'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { registerRecord } = require('../../utils/queryPromises')

// @desc    put update shared
// @route   PUT /api/compartidas/:id
// @access  Private
const updateShared = asyncHandler(async (req, res) => {
  const { id } = req.params
  const {
    porcentaje_responsabilidad,
  } = req.body  

  try {
    const actualizarSharedQuery =  `
                                      UPDATE compartidas
                                      SET 
                                        porcentaje_responsabilidad = '${porcentaje_responsabilidad}'
                                      WHERE 
                                        compartidas.id_compartida = ${id}`
    await registerRecord(actualizarSharedQuery)

    return res.status(200).json({message: 'Porcentaje editado correctamente',})
  }
  catch(ex) {
    return res.status(400).json({ message: 'Ha ocurrido un error en el guardado del porcentaje de responsabilidad compartido.' })
  }
})

module.exports = updateShared
