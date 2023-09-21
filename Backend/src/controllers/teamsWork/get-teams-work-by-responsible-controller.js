'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Get all job positions with responsible role
// @route   GET /api/equipostrabajo/responsables/:idPuesto
// @access  manager/admin/superAdmin
const getTeamsWorkByResponsible = asyncHandler(async (req, res) => {
  var { idPuesto } = req.params
  var array = idPuesto.split("_");
  idPuesto = array[0];
  var operación = array[1];
  if (operación == undefined && idPuesto != undefined) {
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
  } else {
    if (operación === "P") {
      //Busqueda de perfiles asignados 
      const getPerfilesToResponsibleQuery = `
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
      const getPerfilesPendingsResponsibleQuery = `
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
      db.query(getPerfilesToResponsibleQuery, (err, resultAssigned) => {
        if (err) {
          res.status(400).json({ message: err.sqlMessage })
        }
        const dataToSend = {}
        dataToSend.assigned = resultAssigned

        db.query(getPerfilesPendingsResponsibleQuery, (err, pendings) => {
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

module.exports = getTeamsWorkByResponsible
