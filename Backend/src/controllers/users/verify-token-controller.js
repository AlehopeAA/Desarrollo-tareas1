'use strict'

const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

// @desc    Auth user && get token
// @route   POST /api/users/verifyToken
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]  
      jwt.verify(token, process.env.JWT_SECRET)

      res.status(200).json({
        ok: 'ok'  
      })
    } catch (error) {
      res.status(401)
      throw new Error('Not Autorizado , Fallo en token')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Autorizado.')
  }
})

module.exports = authUser
