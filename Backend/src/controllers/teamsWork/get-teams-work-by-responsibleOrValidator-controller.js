'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all job positions
// @route   GET /api/equipostrabajo/responsablesovalidadores/:idPuesto
// @access  responsible/validator/manager
const getTeamsWorkByResponsibleOrValidator = asyncHandler(async (req, res) => {
  const { idPuesto } = req.params

  const getTeamsWorkByResponsibleOrValidatorQuery = `
  SELECT * FROM puestos_trabajo 
  INNER JOIN gestor_perfiles ON puestos_trabajo.id_puesto = gestor_perfiles.id_puesto 
  INNER JOIN perfiles_puesto ON gestor_perfiles.id_perfil = perfiles_puesto.id_perfil 
  WHERE puestos_trabajo.id_puesto =${1}
  ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2`

  db.query(getTeamsWorkByResponsibleOrValidatorQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getTeamsWorkByResponsibleOrValidator
