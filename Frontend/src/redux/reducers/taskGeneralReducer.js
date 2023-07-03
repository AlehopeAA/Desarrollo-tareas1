import {
  TASK_GENERAL_REGISTER_REQUEST,
  TASK_GENERAL_REGISTER_SUCCESS,
  TASK_GENERAL_REGISTER_FAIL,
  TASK_GENERAL_REGISTER_RESET,
  TASK_GENERAL_LIST_REQUEST,
  TASK_GENERAL_LIST_SUCCESS,
  TASK_GENERAL_LIST_FAIL,
  TASK_GENERAL_LIST_RESET,
  TASK_GENERAL_UPDATE_SUCCESS,
  TASK_GENERAL_UPDATE_REQUEST,
  TASK_GENERAL_UPDATE_FAIL,
  TASK_GENERAL_UPDATE_RESET,
  TASK_GENERAL_DELETE_FAIL,
  TASK_GENERAL_DELETE_REQUEST,
  TASK_GENERAL_DELETE_SUCCESS,
  TASK_GENERAL_DELETE_RESET,
} from '../constants/taskGeneralConstants.js'

export const taskGeneralRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_GENERAL_REGISTER_REQUEST:
      return { loadingTaskGeneralRegister: true }
    case TASK_GENERAL_REGISTER_SUCCESS:
      return {
        loadingTaskGeneralRegister: false,
        successTaskGeneralRegister: true,
        taskGeneral: action.payload,
      }
    case TASK_GENERAL_REGISTER_FAIL:
      return {
        loadingTaskGeneralRegister: false,
        errorTaskGeneralRegister: action.payload,
      }
    case TASK_GENERAL_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const taskGeneralListReducer = (state = { taskGenerals: [] }, action) => {
  switch (action.type) {
    case TASK_GENERAL_LIST_REQUEST:
      return { loadingTaskGeneralList: true }
    case TASK_GENERAL_LIST_SUCCESS:
      return {
        loadingTaskGeneralList: false,
        successTaskGeneralList: true,
        taskGenerals: action.payload,
      }
    case TASK_GENERAL_LIST_FAIL:
      return { loadingTaskGeneralList: false, errorTaskGeneralList: action.payload }
    case TASK_GENERAL_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const taskGeneralUpdateReducer = (state = { taskGeneralUpdated: {} }, action) => {
  switch (action.type) {
    case TASK_GENERAL_UPDATE_REQUEST:
      return { loadingTaskGeneralUpdate: true }
    case TASK_GENERAL_UPDATE_SUCCESS:
      return {
        loadingTaskGeneralUpdate: false,
        successTaskGeneralUpdate: true,
        taskGeneralUpdated: action.payload,
      }
    case TASK_GENERAL_UPDATE_FAIL:
      return { loadingTaskGeneralUpdate: false, errorTaskGeneralUpdate: action.payload }
    case TASK_GENERAL_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const taskGeneralDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_GENERAL_DELETE_REQUEST:
      return { loadingTaskGeneralDelete: true }
    case TASK_GENERAL_DELETE_SUCCESS:
      return { loadingTaskGeneralDelete: false, successTaskGeneralDelete: true }
    case TASK_GENERAL_DELETE_FAIL:
      return { loadingTaskGeneralDelete: false, errorTaskGeneralDelete: action.payload }
    case TASK_GENERAL_DELETE_RESET:
      return {}
    default:
      return state
  }
}
