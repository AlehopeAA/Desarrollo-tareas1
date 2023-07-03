const db = require('../config/mysql/db')

const getOneRecord = async (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        return reject('Error en la db ')
      }
      if (!results.length) {
        return reject('No existe un registro con ese id')
      }
      return resolve(results)
    })
  })
}

const getAllRecords = async (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        console.log(err)
        return reject('Error en la db ')
      }
      return resolve(results)
    })
  })
}

const registerRecord = async (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        console.log(err)
        return reject('Error en la db ')
      }
      return resolve(results)
    })
  })
}
const queryPromise = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        return reject(err.sqlMessage)
      }
      return resolve(results)
    })
  })
}

module.exports = { getOneRecord, getAllRecords, registerRecord, queryPromise }
