'use strict'
const registerTaskTypes = require('./register-task-types-controller')
const updateTaskTypes = require('./update-task-types-controller')
const getTaskTypes = require('./get-task-types-controller')
const getTaskTypesById = require('./get-task-types-by-id-controller')
const deleteTaskTypes =require('./delete-task-types-controller')

module.exports = {
  registerTaskTypes,
  updateTaskTypes,
  getTaskTypes,
  getTaskTypesById,
  deleteTaskTypes
}
