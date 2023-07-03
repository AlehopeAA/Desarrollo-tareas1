'use strict'

const jwt = require('jsonwebtoken')

/**
 * Generates and returns a user token
 * @param {Object} id User object
 * @returns {String} Token
 */

const generateToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: '12h',
  })
}

module.exports = generateToken
