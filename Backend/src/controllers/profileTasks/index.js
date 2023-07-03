const registerProfileTask = require('./register-profile-task-controller')
const updateProfileTask = require('./update-profile-task-controller')
const getProfileTasks = require('./get-profile-tasks-controller')
const getProfileTaskById = require('./get-profile-task-by-id-controller')
const deleteProfiletask = require('./delete-profile-task-controller')

module.exports = {
  registerProfileTask,
  updateProfileTask,
  getProfileTasks,
  getProfileTaskById,
  deleteProfiletask,
}
