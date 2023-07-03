'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all job positions
// @route   GET /api/puestostrabajo/perfiles/id
// @access  Private/Admin
const getJobPositionsByProfileId = asyncHandler(async (req, res) => {
  const getJobPositionsByProfileIdQuery = `
    SELECT * FROM puestos_trabajo 
    INNER JOIN perfiles_puesto 
    ON puestos_trabajo.id_puesto =	perfiles_puesto.id_puesto 
    WHERE perfiles_puesto.id_perfil = '${req.params.id}'
    UNION
    SELECT * FROM puestos_trabajo 
    INNER JOIN gestor_perfiles
    ON puestos_trabajo.id_puesto =	gestor_perfiles.id_puesto 
    WHERE gestor_perfiles.id_perfil = '${req.params.id}'    
  `
  db.query(getJobPositionsByProfileIdQuery, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getJobPositionsByProfileId
