const getDifficultiesByManager = require('./get-difficulties-by-manager-controller')
const assignDifficultiesToManager = require('./assign-bulk-difficulties-to-manager-controller')
const getDifficulties = require('./get-managers-difficulties-controller')
const getDificultiesByManagerId = require('./get-dificulties-by-manager-id-controller')
const getTasksDificultiesByManager = require('./get-tasks-dificulties-by-manager-controller')
const deleteDifficulty = require('./delete-difficulty-controller')
const getDificultiesByTaskId = require('./get-dificulties-by-task-id-controller')
const registerDificulty = require('./register-dificulty-controller')
const updateDificulty = require('./update-dificulty-controller')
const deleteDificulty = require('./delete-dificulty-controller')

module.exports = {
  getDifficultiesByManager,
  assignDifficultiesToManager,
  getDifficulties,
  getDificultiesByManagerId,
  getTasksDificultiesByManager,
  deleteDifficulty,
  getDificultiesByTaskId,
  registerDificulty,
  updateDificulty,
  deleteDificulty,
}
