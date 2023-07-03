'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create responsible team
// @route   POST /api/equipostrabajo/responsables
// @access  Private/Admin/SuperAdmin
const registerOrUpdateTeamWorkByResponsable = asyncHandler(async (req, res) => {
  const { assigned, responsibleId } = req.body

  const deleteQuery = `
  DELETE responsables 
  FROM responsables 
  WHERE responsables.id_puesto_responsable = ${responsibleId}
  `
  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.log(err)
      res.status(400).json({ message: err.sqlMessage })
    }
    if (result) {
      if (err) {
        console.log(err)
        res.status(400).json({ message: err.sqlMessage })
      }
      if (assigned.length > 0) {
        let valuesToSave = []

        assigned.map((jobPosition) => {
          valuesToSave.push(`('${jobPosition.id}','${responsibleId}')`)
        })

        const multipleInserQuery = `
        INSERT INTO responsables (id_puesto , id_puesto_responsable)
        VALUES ${valuesToSave.toString()}`

        db.query(multipleInserQuery, (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          } else {
            return res.status(201).json({ message: 'Puestos asignados al responsable' })
          }
        })
      } else {
        res.status(200).json({ message: 'Puestos desasignados' })
      }
    }
  })
})

module.exports = registerOrUpdateTeamWorkByResponsable
