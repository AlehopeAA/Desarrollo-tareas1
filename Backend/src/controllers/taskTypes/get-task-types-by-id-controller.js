'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get  task types by id
// @route   GET /api/tipostareas/:id
// @access  Private/Admin
const getTaskTypesById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM tipos_tarea WHERE id_tipo_tarea = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getTaskTypesById
