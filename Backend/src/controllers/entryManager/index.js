const getTasksEntriesByManager = require('./get-tasks-entries-by-manager-controller')
const getEntriesByManagerId = require('./get-entries-by-manager-id-controller')
const getEntriesByTaskId = require('./get-entries-by-task-id-controller')
const assignEntriesToManager = require('./assign-bulk-entries-to-manager-controller')
const getEntries = require('./get-managers-entries-controller')
const updateEntry = require('./update-entry-controller')
const registerEntry = require('./register-entry-controller')
const deleteEntry = require('./delete-entry-controller')

module.exports = {
  getTasksEntriesByManager,
  getEntriesByManagerId,
  getEntriesByTaskId,
  assignEntriesToManager,
  registerEntry,
  updateEntry,
  getEntries,
  deleteEntry,
}
