'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Get all job positions with validator role
// @route   GET /api/equipostrabajo/validadores/:idPuesto
// @access  manager/admin/superAdmin
//DOIT
const getTeamsWorkByValidator = asyncHandler(async (req, res) => {
  var { idPuesto } = req.params
  var array = idPuesto.split("_");
  idPuesto = array[0];
  var operación = array[1];

  if (operación == undefined && idPuesto != undefined) {
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
  } else {
    if (operación === "P") {
      //Busqueda de perfiles asignados 
      const getPerfilesToValidatorQuery = `
      SELECT p.id_perfil, p.codigo_perfil, p.descripcion_perfil
      FROM perfiles p
      JOIN perfiles_puesto pp ON p.id_perfil = pp.id_perfil
      GROUP BY p.id_perfil
      HAVING SUM(
        CASE WHEN EXISTS 
        (SELECT 1 
          FROM validadores v 
          WHERE v.id_puesto = pp.id_puesto 
          AND v.id_puesto_validador = ${idPuesto}
        ) 
      THEN 1 ELSE 0 END) = COUNT(*);
    `
      const getPerfilesPendingsValidatorQuery = `
    SELECT p.id_perfil ,p.codigo_perfil
    FROM perfiles p
    JOIN perfiles_puesto pp ON p.id_perfil = pp.id_perfil
    GROUP BY p.id_perfil
    HAVING SUM
      (CASE WHEN EXISTS 
        (SELECT 1 
          FROM validadores v 
          WHERE v.id_puesto = pp.id_puesto 
          AND v.id_puesto_validador = ${idPuesto}
        ) 
      THEN 1 ELSE 0 END) < COUNT(*);
  `
      db.query(getPerfilesToValidatorQuery, (err, resultAssigned) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        const dataToSend = {}
        dataToSend.assigned = resultAssigned

        db.query(getPerfilesPendingsValidatorQuery, (err, pendings) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }

          dataToSend.pendings = pendings

          res.status(200).json(dataToSend)
        })
      })
    }
  }
})

module.exports = getTeamsWorkByValidator
