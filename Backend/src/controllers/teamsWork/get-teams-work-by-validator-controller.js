'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Get all job positions with validator role
// @route   GET /api/equipostrabajo/validadores/:idPuesto
// @access  manager/admin/superAdmin
const getTeamsWorkByValidator = asyncHandler(async (req, res) => {
  const { idPuesto } = req.params

  const getTeamsWorkAssignedToValidatorQuery = `
    SELECT * FROM puestos_trabajo 
    WHERE (
      puestos_trabajo.activo = "SI" 
      AND puestos_trabajo.id_puesto 
      IN (
        SELECT validadores.id_puesto 
        FROM validadores 
        WHERE validadores.id_puesto_validador = ${idPuesto}
      )
    )
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
  `

  const getTeamsWorkPendingsValidatorQuery = `
    SELECT * FROM puestos_trabajo 
    WHERE (
      puestos_trabajo.activo = "SI" 
      AND puestos_trabajo.id_puesto 
      IN (
        SELECT validadores.id_puesto 
        FROM validadores 
        WHERE validadores.id_puesto_validador <> ${idPuesto}
      )
    )
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
  `

  db.query(getTeamsWorkAssignedToValidatorQuery, (err, resultAssigned) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    const dataToSend = {}
    dataToSend.assigned = resultAssigned

    db.query(getTeamsWorkPendingsValidatorQuery, (err, pendings) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }

      dataToSend.pendings = pendings

      res.status(200).json(dataToSend)
    })
  })
})

module.exports = getTeamsWorkByValidator
