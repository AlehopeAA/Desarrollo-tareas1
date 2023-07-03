'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create job profiles
// @route   POST /api/perfilestrabajo
// @access  Private/Admin
const registerJobProfile = asyncHandler(async (req, res) => {
  const { id_perfil, id_puesto } = req.body

  db.query(
    `INSERT INTO perfiles_puesto (id_perfil , id_puesto ) VALUES ('${id_perfil}','${id_puesto}')`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result) {
        res.status(201).json({
          message: 'Perfil creado',
        })
      }
    }
  )
})

module.exports = registerJobProfile
