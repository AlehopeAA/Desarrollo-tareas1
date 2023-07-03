const registerTask = require('./register-task-controller')
const registerTaskByProfile = require('./register-task-by-profile-controller')
const updateTask = require('./update-task-controller')
const getTasks = require('./get-tasks-controller')
const getAllTasks = require('./get-all-tasks-controller')
const getTaskByProfileId = require('./get-task-by-profile-controller')
const getTasksById = require('./get-task-by-id-controller')
const deleteTask = require('./delete-task-controller')

module.exports = {
  registerTask,
  registerTaskByProfile,
  updateTask,
  getAllTasks,
  getTasks,
  getTasksById,
  deleteTask,
  getTaskByProfileId,
}
