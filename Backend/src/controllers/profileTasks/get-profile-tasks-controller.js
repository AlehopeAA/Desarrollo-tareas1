'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all profile tasks
// @route   GET /api/tareasperfil
// @access  Private/Admin
const getProfileTasks = asyncHandler(async (req, res) => {
  db.query(`SELECT * FROM tareas_perfil`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    res.status(200).json(result)
  })
})

module.exports = getProfileTasks
