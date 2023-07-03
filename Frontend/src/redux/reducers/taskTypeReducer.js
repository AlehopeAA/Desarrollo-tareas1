import {
  TASK_TYPE_REGISTER_REQUEST,
  TASK_TYPE_REGISTER_SUCCESS,
  TASK_TYPE_REGISTER_FAIL,
  TASK_TYPE_REGISTER_RESET,
  TASK_TYPE_LIST_REQUEST,
  TASK_TYPE_LIST_SUCCESS,
  TASK_TYPE_LIST_FAIL,
  TASK_TYPE_LIST_RESET,
  TASK_TYPE_UPDATE_SUCCESS,
  TASK_TYPE_UPDATE_REQUEST,
  TASK_TYPE_UPDATE_FAIL,
  TASK_TYPE_UPDATE_RESET,
  TASK_TYPE_DELETE_FAIL,
  TASK_TYPE_DELETE_REQUEST,
  TASK_TYPE_DELETE_SUCCESS,
  TASK_TYPE_DELETE_RESET,
} from '../constants/taskTypeConstants.js'

export const taskTypeRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_TYPE_REGISTER_REQUEST:
      return { loadingTaskTypeRegister: true }
    case TASK_TYPE_REGISTER_SUCCESS:
      return {
        loadingTaskTypeRegister: false,
        successTaskTypeRegister: true,
        taskType: action.payload,
      }
    case TASK_TYPE_REGISTER_FAIL:
      return {
        loadingTaskTypeRegister: false,
        errorTaskTypeRegister: action.payload,
      }
    case TASK_TYPE_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const taskTypeListReducer = (state = { taskTypes: [] }, action) => {
  switch (action.type) {
    case TASK_TYPE_LIST_REQUEST:
      return { loadingTaskTypeList: true }
    case TASK_TYPE_LIST_SUCCESS:
      return {
        loadingTaskTypeList: false,
        successTaskTypeList: true,
        taskTypes: action.payload,
      }
    case TASK_TYPE_LIST_FAIL:
      return { loadingTaskTypeList: false, errorTaskTypeList: action.payload }
    case TASK_TYPE_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const taskTypeUpdateReducer = (state = { taskTypeUpdated: {} }, action) => {
  switch (action.type) {
    case TASK_TYPE_UPDATE_REQUEST:
      return { loadingTaskTypeUpdate: true }
    case TASK_TYPE_UPDATE_SUCCESS:
      return {
        loadingTaskTypeUpdate: false,
        successTaskTypeUpdate: true,
        taskTypeUpdated: action.payload,
      }
    case TASK_TYPE_UPDATE_FAIL:
      return { loadingTaskTypeUpdate: false, errorTaskTypeUpdate: action.payload }
    case TASK_TYPE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const taskTypeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_TYPE_DELETE_REQUEST:
      return { loadingTaskTypeDelete: true }
    case TASK_TYPE_DELETE_SUCCESS:
      return { loadingTaskTypeDelete: false, successTaskTypeDelete: true }
    case TASK_TYPE_DELETE_FAIL:
      return { loadingTaskTypeDelete: false, errorTaskTypeDelete: action.payload }
    case TASK_TYPE_DELETE_RESET:
      return {}
    default:
      return state
  }
}
