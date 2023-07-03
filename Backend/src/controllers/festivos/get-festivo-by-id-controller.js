'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get festivo by id
// @route   GET /api/festivos/:id
// @access  Private/Admin
const getFestivoById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM calendario_festivos WHERE id_calendario = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No festivo con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getFestivoById
