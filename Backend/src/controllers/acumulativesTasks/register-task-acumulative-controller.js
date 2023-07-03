'use strict'

const asyncHandler = require('express-async-handler')
const { registerRecord } = require('../../utils/queryPromises')
const { queryPromise } = require('../../utils/queryPromises')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    post register acumulatives
// @route   POST /api/acumulativas
// @access  Private/Admin/DataManager
const registerSharedTask = asyncHandler(async (req, res) => {
  const { id_tarea_padre, id_tarea_hija } =
    req.body

  const isUniqueAcumulativesQuery = `
    SELECT * FROM acumulativas WHERE id_tarea_padre = ${id_tarea_padre} AND id_tarea_hija = ${id_tarea_hija}
  `

  const isUniqueAcumulatives = await getAllRecords(isUniqueAcumulativesQuery)

  if (isUniqueAcumulatives.length > 0) {
    return res.status(400).json({ message: 'Ya existe una asociación con las mismas tareas padre e hija' })
  }

  try {
    const insertAcumulativesQuery = `INSERT INTO acumulativas
                                            (
                                              id_tarea_padre, id_tarea_hija
                                            ) 
                                            VALUES (
                                              ${id_tarea_padre}, 
                                              ${id_tarea_hija}
                                            )`
    await queryPromise(insertAcumulativesQuery)
    return res.status(200).json({})
  }
  catch(ex) {
    return res.status(400).json({ message: 'Ha ocurrido un error en el guardado de acumulativas.' })
  }
})

module.exports = registerSharedTask