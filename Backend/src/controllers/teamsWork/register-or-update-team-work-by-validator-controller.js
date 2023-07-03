'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create validator team
// @route   POST /api/equipostrabajo/validadores
// @access  Private/Admin/SuperAdmin
const registerOrUpdateTeamWorkByValidator = asyncHandler(async (req, res) => {
  const { assigned, validatorId } = req.body

  const deleteQuery = `
  DELETE validadores 
  FROM validadores 
  WHERE validadores.id_puesto_validador = ${validatorId}
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
          valuesToSave.push(`('${jobPosition.id}','${validatorId}')`)
        })

        const multipleInserQuery = `
        INSERT INTO validadores (id_puesto , id_puesto_validador)
        VALUES ${valuesToSave.toString()}`

        db.query(multipleInserQuery, (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          } else {
            return res.status(201).json({ message: 'Puestos asignados al validador' })
          }
        })
      } else {
        res.status(200).json({ message: 'Puestos desasignados' })
      }
    }
  })
})

module.exports = registerOrUpdateTeamWorkByValidator
