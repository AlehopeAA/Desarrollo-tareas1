import {
  TASK_SPECIFIC_REGISTER_REQUEST,
  TASK_SPECIFIC_REGISTER_SUCCESS,
  TASK_SPECIFIC_REGISTER_FAIL,
  TASK_SPECIFIC_REGISTER_RESET,
  TASK_SPECIFIC_LIST_REQUEST,
  TASK_SPECIFIC_LIST_SUCCESS,
  TASK_SPECIFIC_LIST_FAIL,
  TASK_SPECIFIC_LIST_RESET,
  TASK_SPECIFIC_UPDATE_SUCCESS,
  TASK_SPECIFIC_UPDATE_REQUEST,
  TASK_SPECIFIC_UPDATE_FAIL,
  TASK_SPECIFIC_UPDATE_RESET,
  TASK_SPECIFIC_DELETE_FAIL,
  TASK_SPECIFIC_DELETE_REQUEST,
  TASK_SPECIFIC_DELETE_SUCCESS,
  TASK_SPECIFIC_DELETE_RESET,
  TASK_SPECIFIC_BY_USER_REQUEST,
  TASK_SPECIFIC_BY_USER_SUCCESS,
  TASK_SPECIFIC_BY_USER_FAIL,
  TASK_SPECIFIC_BY_USER_RESET,
} from '../constants/taskSpecificConstants.js'

export const taskSpecificRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_SPECIFIC_REGISTER_REQUEST:
      return { loadingTaskSpecificRegister: true }
    case TASK_SPECIFIC_REGISTER_SUCCESS:
      return {
        loadingTaskSpecificRegister: false,
        successTaskSpecificRegister: true,
        taskSpecific: action.payload,
      }
    case TASK_SPECIFIC_REGISTER_FAIL:
      return {
        loadingTaskSpecificRegister: false,
        errorTaskSpecificRegister: action.payload,
      }
    case TASK_SPECIFIC_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const taskSpecificListReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_SPECIFIC_LIST_REQUEST:
      return { loadingTaskSpecificList: true }
    case TASK_SPECIFIC_LIST_SUCCESS:
      return {
        loadingTaskSpecificList: false,
        successTaskSpecificList: true,
        taskSpecifics: action.payload,
      }
    case TASK_SPECIFIC_LIST_FAIL:
      return { loadingTaskSpecificList: false, errorTaskSpecificList: action.payload }
    case TASK_SPECIFIC_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const taskSpecificByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_SPECIFIC_BY_USER_REQUEST:
      return { loadingTaskSpecificByUser: true }
    case TASK_SPECIFIC_BY_USER_SUCCESS:
      return {
        loadingTaskSpecificByUser: false,
        successTaskSpecificByUser: true,
        taskSpecificByUser: action.payload,
      }
    case TASK_SPECIFIC_BY_USER_FAIL:
      return { loadingTaskSpecificByUser: false, errorTaskSpecificByUser: action.payload }
    case TASK_SPECIFIC_BY_USER_RESET:
      return {}
    default:
      return state
  }
}

export const taskSpecificUpdateReducer = (state = { taskSpecificUpdated: {} }, action) => {
  switch (action.type) {
    case TASK_SPECIFIC_UPDATE_REQUEST:
      return { loadingTaskSpecificUpdate: true }
    case TASK_SPECIFIC_UPDATE_SUCCESS:
      return {
        loadingTaskSpecificUpdate: false,
        successTaskSpecificUpdate: true,
        taskSpecificUpdated: action.payload,
      }
    case TASK_SPECIFIC_UPDATE_FAIL:
      return { loadingTaskSpecificUpdate: false, errorTaskSpecificUpdate: action.payload }
    case TASK_SPECIFIC_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const taskSpecificDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_SPECIFIC_DELETE_REQUEST:
      return { loadingTaskSpecificDelete: true }
    case TASK_SPECIFIC_DELETE_SUCCESS:
      return { loadingTaskSpecificDelete: false, successTaskSpecificDelete: true }
    case TASK_SPECIFIC_DELETE_FAIL:
      return { loadingTaskSpecificDelete: false, errorTaskSpecificDelete: action.payload }
    case TASK_SPECIFIC_DELETE_RESET:
      return {}
    default:
      return state
  }
}
