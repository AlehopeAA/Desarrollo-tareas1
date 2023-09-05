'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create validator profile team
// @route   POST /api/equipostrabajo/responsablesvalidadores/profile
// @access  Private/Admin/SuperAdmin
const asignedProfilesToValidatorOrResponsable = asyncHandler(async (req, res) => {
  const { assigned, validatorId, assignedTo } = req.body

  const deleteQuery = ` 
  DELETE v
  FROM validadores v
  JOIN perfiles_puesto pp ON v.id_puesto = pp.id_puesto
  WHERE v.id_puesto_validador = ${validatorId};
  `
  console.log(validatorId)
  console.log(assigned)
  var idsPerfil = "";
  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.log("error 1")

      res.status(400).json({ message: err.sqlMessage })
      console.log(message)
    }
    if (result) {
      if (err) {
        console.log(err)
        console.log("error 2")

        res.status(400).json({ message: err.sqlMessage })
      }
      if (assigned.length > 0) {

        assigned.forEach((perfil) => idsPerfil += perfil.id + ",")
        var idsquery = idsPerfil.slice(0, -1);
        console.log(idsquery)
        const query = `
        INSERT INTO validadores (id_puesto, id_puesto_validador)
        SELECT pp.id_puesto, ${validatorId}
        FROM perfiles_puesto pp
        LEFT JOIN validadores v ON pp.id_puesto = v.id_puesto AND v.id_puesto_validador =  ${validatorId}
        WHERE pp.id_perfil in (${idsquery}) AND v.id_validador IS NULL;  
        `
        db.query(query, (err, result) => {
          if (err) {
            console.log("error 3")

            res.status(400).json({ message: err.sqlMessage })
          } else {
            return res.status(201).json({ message: 'Perfiles asignados al validador' })
          }
        })
      }else{
        res.status(200).json({ message: 'Perfiles desasignados' })
      }
    }
  })
})

module.exports = asignedProfilesToValidatorOrResponsable
