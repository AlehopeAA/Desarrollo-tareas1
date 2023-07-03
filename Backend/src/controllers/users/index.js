'use strict'

const authUser = require('./auth-user-controller')
const verifyToken = require('./verify-token-controller')
const getAvisos = require('./get-avisos-controller')
const getInfoProfile = require('./get-info-profile-controller')
const getFavoritesTasks = require('./get-favorites-tasks-controller')
const registerFavoritesTasks = require('./register-favorites-tasks-controller')

module.exports = {
  authUser,
  getAvisos,
  verifyToken,
  getInfoProfile,
  getFavoritesTasks,
  registerFavoritesTasks,
}
