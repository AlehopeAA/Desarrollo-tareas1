const registerSpecificTask = require('./register-specific-task-controller')
const updateSpecificTask = require('./update-specific-task-controller')
const getSpecificTasks = require('./get-specific-tasks-controller')
const getSpecificTaskById = require('./get-specific-task-by-id-controller')
const deleteSpecificTask = require('./delete-specific-task-controller')
const getSpecificTasksByUser = require('./get-specific-tasks-by-user-controller')
module.exports = {
  registerSpecificTask,
  getSpecificTasks,
  updateSpecificTask,
  getSpecificTaskById,
  deleteSpecificTask,
  getSpecificTasksByUser,
}
