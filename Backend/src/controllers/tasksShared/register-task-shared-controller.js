'use strict'

const asyncHandler = require('express-async-handler')
const { registerRecord } = require('../../utils/queryPromises')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    post register activity
// @route   POST /api/compartidas
// @access  Private
const registerSharedTask = asyncHandler(async (req, res) => {
  const { id_tarea, idpuestos, porcentajes } =
    req.body

  const deletePuestosQuery = `
    DELETE FROM compartidas WHERE id_tarea=${id_tarea}
  `
  
  try {
    const deletePuestos = await queryPromise(deletePuestosQuery)
    for (let i = 0; i < idpuestos.length; i++) {
      const insertPuestosQuery = `INSERT INTO compartidas 
                                            (
                                              id_tarea, id_puesto, porcentaje_responsabilidad
                                            ) 
                                            VALUES (
                                              ${id_tarea}, 
                                              ${idpuestos[i]},
                                              ${porcentajes[i]}
                                            )`
      await queryPromise(insertPuestosQuery)
    }
    return res.status(200).json({})
  }
  catch(ex) {
    return res.status(400).json({ message: 'Ha ocurrido un error en el guardado de compartidas.' })
  }
})

module.exports = registerSharedTask