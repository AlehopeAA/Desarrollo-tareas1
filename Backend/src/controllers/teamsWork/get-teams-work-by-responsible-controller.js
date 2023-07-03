'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Get all job positions with responsible role
// @route   GET /api/equipostrabajo/responsables/:idPuesto
// @access  manager/admin/superAdmin
const getTeamsWorkByResponsible = asyncHandler(async (req, res) => {
  const { idPuesto } = req.params

  const getTeamsWorkAssignedToResponsibleQuery = `
    SELECT * FROM puestos_trabajo 
    WHERE (
      puestos_trabajo.activo = "SI" 
      AND puestos_trabajo.id_puesto 
      IN (
        SELECT responsables.id_puesto 
        FROM responsables 
        WHERE responsables.id_puesto_responsable = ${idPuesto}
      )
    )
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
  `

  const getTeamsWorkPendingsResponsibleQuery = `
    SELECT * FROM puestos_trabajo 
    WHERE (
      puestos_trabajo.activo = "SI" 
      AND puestos_trabajo.id_puesto 
      IN (
        SELECT responsables.id_puesto 
        FROM responsables 
        WHERE responsables.id_puesto_responsable <> ${idPuesto}
      )
    )
    ORDER BY puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
    `

  db.query(getTeamsWorkAssignedToResponsibleQuery, (err, resultAssigned) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    const dataToSend = {}
    dataToSend.assigned = resultAssigned

    db.query(getTeamsWorkPendingsResponsibleQuery, (err, pendings) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }

      dataToSend.pendings = pendings

      res.status(200).json(dataToSend)
    })
  })
})

module.exports = getTeamsWorkByResponsible
