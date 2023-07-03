const registerGeneralTask = require('./register-general-task-controller')
const updateGeneralTask = require('./update-general-task-controller')
const getGeneralTasks = require('./get-general-tasks-controller')
const getGeneralTaskById = require('./get-general-task-by-id-controller')
const deleteGeneralTask = require('./delete-general-task-controller')

module.exports = {
  registerGeneralTask,
  updateGeneralTask,
  getGeneralTasks,
  getGeneralTaskById,
  deleteGeneralTask,
}
