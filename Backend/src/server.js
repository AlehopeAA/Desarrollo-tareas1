'use strict'

const Server = require('./config/server/server')
require('dotenv').config()

const server = new Server()
const app = server.app

server.execute()

module.exports = app
