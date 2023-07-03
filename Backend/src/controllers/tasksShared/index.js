const getTasksShared = require('./get-tasks-shared-controller')
const deleteShared = require('./delete-shared-controller')
const updateShared = require('./update-shared-controller')
const getTasksSharedByManager = require('./get-tasks-shared-by-manager-controller')
const getSharedByTaskId = require('./get-shared-by-task-id-controller')
const registerSharedTask = require('./register-task-shared-controller')

module.exports = {
  getTasksShared,
  deleteShared,
  updateShared,
  getTasksSharedByManager,
  getSharedByTaskId,
  registerSharedTask,
}
