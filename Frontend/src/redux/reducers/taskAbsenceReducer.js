import {
  TASK_ABSENCE_REGISTER_REQUEST,
  TASK_ABSENCE_REGISTER_SUCCESS,
  TASK_ABSENCE_REGISTER_FAIL,
  TASK_ABSENCE_REGISTER_RESET,
  TASK_ABSENCE_LIST_REQUEST,
  TASK_ABSENCE_LIST_SUCCESS,
  TASK_ABSENCE_LIST_FAIL,
  TASK_ABSENCE_LIST_RESET,
  TASK_ABSENCE_UPDATE_SUCCESS,
  TASK_ABSENCE_UPDATE_REQUEST,
  TASK_ABSENCE_UPDATE_FAIL,
  TASK_ABSENCE_UPDATE_RESET,
  TASK_ABSENCE_DELETE_FAIL,
  TASK_ABSENCE_DELETE_REQUEST,
  TASK_ABSENCE_DELETE_SUCCESS,
  TASK_ABSENCE_DELETE_RESET,
} from '../constants/taskAbsenceConstants.js'

export const taskAbsenceRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_ABSENCE_REGISTER_REQUEST:
      return { loadingTaskAbsenceRegister: true }
    case TASK_ABSENCE_REGISTER_SUCCESS:
      return {
        loadingTaskAbsenceRegister: false,
        successTaskAbsenceRegister: true,
        taskAbsence: action.payload,
      }
    case TASK_ABSENCE_REGISTER_FAIL:
      return {
        loadingTaskAbsenceRegister: false,
        errorTaskAbsenceRegister: action.payload,
      }
    case TASK_ABSENCE_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const taskAbsenceListReducer = (state = { taskAbsences: [] }, action) => {
  switch (action.type) {
    case TASK_ABSENCE_LIST_REQUEST:
      return { loadingTaskAbsenceList: true }
    case TASK_ABSENCE_LIST_SUCCESS:
      return {
        loadingTaskAbsenceList: false,
        successTaskAbsenceList: true,
        taskAbsences: action.payload,
      }
    case TASK_ABSENCE_LIST_FAIL:
      return { loadingTaskAbsenceList: false, errorTaskAbsenceList: action.payload }
    case TASK_ABSENCE_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const taskAbsenceUpdateReducer = (state = { taskAbsenceUpdated: {} }, action) => {
  switch (action.type) {
    case TASK_ABSENCE_UPDATE_REQUEST:
      return { loadingTaskAbsenceUpdate: true }
    case TASK_ABSENCE_UPDATE_SUCCESS:
      return {
        loadingTaskAbsenceUpdate: false,
        successTaskAbsenceUpdate: true,
        taskAbsenceUpdated: action.payload,
      }
    case TASK_ABSENCE_UPDATE_FAIL:
      return { loadingTaskAbsenceUpdate: false, errorTaskAbsenceUpdate: action.payload }
    case TASK_ABSENCE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const taskAbsenceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_ABSENCE_DELETE_REQUEST:
      return { loadingTaskAbsenceDelete: true }
    case TASK_ABSENCE_DELETE_SUCCESS:
      return { loadingTaskAbsenceDelete: false, successTaskAbsenceDelete: true }
    case TASK_ABSENCE_DELETE_FAIL:
      return { loadingTaskAbsenceDelete: false, errorTaskAbsenceDelete: action.payload }
    case TASK_ABSENCE_DELETE_RESET:
      return {}
    default:
      return state
  }
}
