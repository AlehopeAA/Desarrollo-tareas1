'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all job positions
// @route   GET /api/actividades/puestostrabajo/id
// @access  Private/Admin
const getActivitiesByJobPositionId = asyncHandler(async (req, res) => {
  const getActivitiesByJobPositionIdQuery = `
    SELECT * FROM actividades 
    INNER JOIN puestos_trabajo
    ON puestos_trabajo.id_puesto =	actividades.id_puesto 
    WHERE puestos_trabajo.id_puesto = '${req.params.id}'
    LIMIT 1
  `
  db.query(getActivitiesByJobPositionIdQuery, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getActivitiesByJobPositionId
