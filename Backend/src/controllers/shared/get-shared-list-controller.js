'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    get all tasks shared
// @route   GET /api/compartidas
// @access  Private/Admin/DataManager
const getShareds = asyncHandler(async (req, res) => {
  const { id_puesto } = req.user

  const sharedsQuery = `
    SELECT *
    FROM compartidas  
  `
  db.query(sharedsQuery, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }

    res.status(200).json(result)
  })
})

module.exports = getShareds
