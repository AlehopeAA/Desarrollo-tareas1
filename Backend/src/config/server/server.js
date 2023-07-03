'use strict'

const express = require('express')
const session = require('express-session')

const { createServer } = require('http')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const colors = require('colors')
const connectDB = require('../mysql/db')
const { notFound, errorHandler } = require('../../middleware/errorMiddleware')
const passport = require('../passport/passport')


const routes = require('../../routes')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 5000
    this.httpServer = createServer(this.app)
  }

  configPassport() {
    this.app.use(session({resave: false, secret: process.env.JWT_SECRET, saveUninitialized: true}))
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(express.urlencoded({ extended: false })); // Replaces Body Parser
  }

  rulesOfApi() {
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', req.header('origin'));
      res.header('Access-Control-Allow-Headers', 'Cache-Control, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers, Access-Control-Request-Headers');
      res.header('Access-Control-Allow-Credentials', 'true');
  
      if (req.method == 'OPTIONS') {
          res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
          return res.status(200).json({});
      }
  
      next();
    });
  }

  routesSaml() {
    /** Passport & SAML Routes */
    this.app.get('/login', passport.authenticate('saml', {failureRedirect: '/login', failureFlash: true}), (req, res, next) => {
      return res.redirect(process.env.ENPOINT_FRONTEND);
    });

    this.app.post('/login/callback', passport.authenticate('saml', {failureRedirect: '/login', failureFlash: true}), (req, res, next) => {
      return res.redirect(process.env.ENPOINT_FRONTEND);
    });

    this.app.get('/logout', (req, res, next) => {
      req.logout();
      return res.status(200).json({ok: 'ok'});
    });

    this.app.get('/whoami', (req, res, next) => {
      if (!req.isAuthenticated()) {
          return res.status(401).json({
              message: 'Unauthorized'
          });
      } else {
        return res.status(200).json({codAyre: req.user.extensionattribute1});
      }
    });
  }

  middlewares() {
    this.app.use(cors({credentials: true, origin: process.env.ENPOINT_FRONTEND}))
    this.app.use(express.json())
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'))
    }
    this.app.use('/public', express.static(path.join(__dirname, '../../../public')))
  }

  router() {
    this.app.use('/api', routes)
  }

  staticConfig() {
    if (process.env.NODE_ENV === 'production') {
      this.app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../../../public', 'index.html')))
    }

    this.app.use(notFound)
    this.app.use(errorHandler)
  }

  connectDataBase() {
    connectDB.connect((err) => {
      if (err) {
        throw err
      }
      console.log('MySQL Connected')
    })
  }

  execute() {
    this.configPassport()
    this.rulesOfApi()
    this.middlewares()
    this.router()
    this.routesSaml()
    this.staticConfig()
    this.connectDataBase()
    this.app.listen(this.port, () => console.log(`Server running ${this.port}`.yellow.bold))
  }
}

module.exports = Server
