import {
  SHARED_REGISTER_REQUEST,
  SHARED_REGISTER_SUCCESS,
  SHARED_REGISTER_FAIL,
  SHARED_REGISTER_RESET,
  SHARED_LIST_REQUEST,
  SHARED_LIST_SUCCESS,
  SHARED_LIST_FAIL,
  SHARED_LIST_RESET,
  SHARED_UPDATE_SUCCESS,
  SHARED_UPDATE_REQUEST,
  SHARED_UPDATE_FAIL,
  SHARED_UPDATE_RESET,
  SHARED_DELETE_FAIL,
  SHARED_DELETE_REQUEST,
  SHARED_DELETE_SUCCESS,
  SHARED_DELETE_RESET,
  SHARED_LIST_BY_TASK_ID_REQUEST,
  SHARED_LIST_BY_TASK_ID_SUCCESS,
  SHARED_LIST_BY_TASK_ID_FAIL,
  SHARED_LIST_BY_TASK_ID_RESET,
  SHARED_TO_MANAGER_LIST_REQUEST,
  SHARED_TO_MANAGER_LIST_SUCCESS,
  SHARED_TO_MANAGER_LIST_FAIL,
  SHARED_TO_MANAGER_LIST_RESET,
} from '../constants/sharedConstants'

export const sharedRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARED_REGISTER_REQUEST:
      return { loadingSharedRegister: true }
    case SHARED_REGISTER_SUCCESS:
      return {
        loadingSharedRegister: false,
        successSharedRegister: true,
        shared: action.payload,
      }
    case SHARED_REGISTER_FAIL:
      return {
        loadingSharedRegister: false,
        errorSharedRegister: action.payload,
      }
    case SHARED_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const sharedListReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARED_LIST_REQUEST:
      return { loadingSharedList: true }
    case SHARED_LIST_SUCCESS:
      return {
        loadingSharedList: false,
        successSharedList: true,
        sharedList: action.payload,
      }
    case SHARED_LIST_FAIL:
      return { loadingSharedList: false, errorSharedList: action.payload }
    case SHARED_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const sharedUpdateReducer = (state = { sharedUpdated: {} }, action) => {
  switch (action.type) {
    case SHARED_UPDATE_REQUEST:
      return { loadingSharedUpdate: true }
    case SHARED_UPDATE_SUCCESS:
      return {
        loadingSharedUpdate: false,
        successSharedUpdate: true,
        sharedUpdated: action.payload,
      }
    case SHARED_UPDATE_FAIL:
      return { loadingSharedUpdate: false, errorSharedUpdate: action.payload }
    case SHARED_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const sharedDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARED_DELETE_REQUEST:
      return { loadingSharedDelete: true }
    case SHARED_DELETE_SUCCESS:
      return { loadingSharedDelete: false, successSharedDelete: true }
    case SHARED_DELETE_FAIL:
      return { loadingSharedDelete: false, errorSharedDelete: action.payload }
    case SHARED_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const sharedListByTaskIdReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARED_LIST_BY_TASK_ID_REQUEST:
      return { loadingSharedListByTaskId: true }
    case SHARED_LIST_BY_TASK_ID_SUCCESS:
      return {
        loadingSharedListByTaskId: false,
        successSharedListByTaskId: true,
        sharedListByTaskId: action.payload,
      }
    case SHARED_LIST_BY_TASK_ID_FAIL:
      return { loadingSharedListByTaskId: false, errorSharedListByTaskId: action.payload }
    case SHARED_LIST_BY_TASK_ID_RESET:
      return {}
    default:
      return state
  }
}

export const getTasksSharedReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARED_TO_MANAGER_LIST_REQUEST:
      return { loadingTasksShared: true }
    case SHARED_TO_MANAGER_LIST_SUCCESS:
      return {
        loadingTasksShared: false,
        successTasksShared: true,
        tasksShared: action.payload,
      }
    case SHARED_TO_MANAGER_LIST_FAIL:
      return { loadingTasksShared: false, errorTasksShared: action.payload }
    case SHARED_TO_MANAGER_LIST_RESET:
      return {}
    default:
      return state
  }
}