'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    delete all managers entries
// @route   DELETE /entradas/gestores-entradas/:id
// @access  Private/Admin

const deleteEntry = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deleteEntryQuery = `
  DELETE FROM gestor_entradas
  WHERE gestor_entradas.id_gestor_entrada = ${id}
  `

  db.query(deleteEntryQuery, (err) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json({ message: 'entrada eliminada correctamente' })
  })
})

module.exports = deleteEntry
