
'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete absences task
// @route   DELETE /api/objetivosausencias/:id
// @access  Private/Admin

const objetivos = asyncHandler(async (req, res) => {
  const tarea = req.params.tarea

console.log(req.params.tarea)  

  db.query(`SELECT * FROM objetivos WHERE id_tarea = ${tarea}`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    console.log(result)
    if (result) { res.status(200).json({ result})
    }
  })
})

module.exports = objetivos