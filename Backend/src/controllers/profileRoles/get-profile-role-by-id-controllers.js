'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get  profile role by id
// @route   GET /api/perfilroles/:id
// @access  Private/Admin
const getProfileRolesById = asyncHandler(async (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM perfil_rol WHERE id_rol = ? ', id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (!result.length) {
      res.status(400).json({ message: 'No existe un perfil rol con ese id' })
    }
    res.status(200).json(result)
  })
})

module.exports = getProfileRolesById
