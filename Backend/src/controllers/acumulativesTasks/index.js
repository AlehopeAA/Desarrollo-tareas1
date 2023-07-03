const getAcumulativesTasks = require('./get-tasks-acumulative-controller')
const deleteAcumulatives = require('./delete-acumulative-controller')
const getAcumulativesTasksByManager = require('./get-tasks-acumulative-by-manager-controller')
const getAcumulativesTasksHijaByManager = require('./get-tasks-acumulative-hija-by-manager-controller')
const getAcumulativesByTaskId = require('./get-acumulative-by-task-id-controller')
const registerAcumulativesTasks = require('./register-task-acumulative-controller')

module.exports = {
  getAcumulativesTasks,
  deleteAcumulatives,
  getAcumulativesTasksByManager,
  getAcumulativesTasksHijaByManager,
  getAcumulativesByTaskId,
  registerAcumulativesTasks,
}
