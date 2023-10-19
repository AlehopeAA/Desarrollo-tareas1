import {
  LOG_DELETE_MANY_FAIL,
  LOG_DELETE_MANY_REQUEST,
  LOG_DELETE_MANY_RESET,
  LOG_DELETE_MANY_SUCCESS,
  LOG_DELETE_REQUEST,
  LOG_DELETE_RESET,
  LOG_DELETE_SUCCESS,
  LOG_DELETE_FAIL,
  LOG_DETAILS_FAIL,
  LOG_DETAILS_REQUEST,
  LOG_DETAILS_RESET,
  LOG_DETAILS_SUCCESS,
  LOG_LIST_FAIL,
  LOG_LIST_REQUEST,
  LOG_LIST_RESET,
  LOG_LIST_SUCCESS,
  LOG_REGISTER_FAIL,
  LOG_REGISTER_REQUEST,
  LOG_REGISTER_RESET,
  LOG_REGISTER_SUCCESS,
} from '../constants/logConstants'

export const logRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_REGISTER_REQUEST:
      return { loadingLogRegister: true }
    case LOG_REGISTER_SUCCESS:
      return { loadingLogRegister: false, successLogRegister: true }
    case LOG_REGISTER_FAIL:
      return { loadingLogRegister: false, errorLogRegister: action.payload }
    case LOG_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const logListReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_LIST_REQUEST:
      return { loadingLogList: true }
    case LOG_LIST_SUCCESS:
      return { loadingLogList: false, logs: action.payload }
    case LOG_LIST_FAIL:
      return { loadingLogList: false, errorLogList: action.payload }
    case LOG_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const logDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_DETAILS_REQUEST:
      return { loadingLogDetails: true }
    case LOG_DETAILS_SUCCESS:
      return { loadingLogDetails: false, log: action.payload }
    case LOG_DETAILS_FAIL:
      return { loadingLogDetails: false, errorLogDetails: action.payload }
    case LOG_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const logDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_DELETE_REQUEST:
      return { loadingLogDelete: true }
    case LOG_DELETE_SUCCESS:
      return { loadingLogDelete: false, successLogDelete: true }
    case LOG_DELETE_FAIL:
      return { loadingLogDelete: false, errorLogDelete: action.payload }
    case LOG_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const logDeleteManyReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_DELETE_MANY_REQUEST:
      return { loadingLogDeleteMany: true }
    case LOG_DELETE_MANY_SUCCESS:
      return { loadingLogDeleteMany: false, successLogDeleteMany: true }
    case LOG_DELETE_MANY_FAIL:
      return { loadingLogDeleteMany: false, errorLogDeleteMany: action.payload }
    case LOG_DELETE_MANY_RESET:
      return {}
    default:
      return state
  }
}
