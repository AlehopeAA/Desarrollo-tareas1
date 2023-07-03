const registerAbsencesTask = require('./register-absences-task-controller')
const updateAbsencesTask = require('./update-absences-task-controller')
const getAbsencesTasks = require('./get-absences-tasks-controllers')
const getAbsencesTaskById = require('./get-absences-task-by-id-controller')
const deleteAbsencesTask = require('./delete-absences-task-controller')

module.exports = {
  registerAbsencesTask,
  updateAbsencesTask,
  getAbsencesTasks,
  getAbsencesTaskById,
  deleteAbsencesTask,
}
