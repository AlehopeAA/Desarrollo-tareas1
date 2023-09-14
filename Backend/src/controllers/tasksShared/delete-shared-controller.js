'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Delete shared
// @route   DELETE /api/compartidas/:id
// @access  Private/Admin
const deleteShared = asyncHandler(async (req, res) => {
  const id = req.params.id

  console.log(id)

  db.query(`DELETE FROM compartidas WHERE id_tarea = '${id}'`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json({ message: 'Porcentaje compartido borrado correctamente' })
  })


})

module.exports = deleteShared
