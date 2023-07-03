const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')

// Data to insert
// const joinedOdonyms = require('./data/odonymsJoined')

// Mongo Models
// const Odonym = require('./mongoose/models/odonymModel')

const connectDB = require('./mongoose/db')

// Config
dotenv.config()
connectDB()

const importData = async () => {
  try {
    // await Odonym.deleteMany()

    // await Odonym.insertMany(joinedOdonyms)

    console.log('Data imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // await Log.deleteMany()
    // await User.deleteMany()
    console.log('Data destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
