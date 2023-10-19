import {
  ACUMULATIVES_REGISTER_REQUEST,
  ACUMULATIVES_REGISTER_SUCCESS,
  ACUMULATIVES_REGISTER_FAIL,
  ACUMULATIVES_REGISTER_RESET,
  ACUMULATIVES_LIST_REQUEST,
  ACUMULATIVES_LIST_SUCCESS,
  ACUMULATIVES_LIST_FAIL,
  ACUMULATIVES_LIST_RESET,
  ACUMULATIVES_DELETE_FAIL,
  ACUMULATIVES_DELETE_REQUEST,
  ACUMULATIVES_DELETE_SUCCESS,
  ACUMULATIVES_DELETE_RESET,
  ACUMULATIVES_LIST_BY_TASK_ID_REQUEST,
  ACUMULATIVES_LIST_BY_TASK_ID_SUCCESS,
  ACUMULATIVES_LIST_BY_TASK_ID_FAIL,
  ACUMULATIVES_LIST_BY_TASK_ID_RESET,
  ACUMULATIVES_TO_MANAGER_LIST_REQUEST,
  ACUMULATIVES_TO_MANAGER_LIST_SUCCESS,
  ACUMULATIVES_TO_MANAGER_LIST_FAIL,
  ACUMULATIVES_TO_MANAGER_LIST_RESET,
  ACUMULATIVES_HIJA_TO_MANAGER_LIST_REQUEST,
  ACUMULATIVES_HIJA_TO_MANAGER_LIST_SUCCESS,
  ACUMULATIVES_HIJA_TO_MANAGER_LIST_FAIL,
  ACUMULATIVES_HIJA_TO_MANAGER_LIST_RESET,
} from '../constants/acumulativesConstants'

export const acumulativesRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ACUMULATIVES_REGISTER_REQUEST:
      return { loadingAcumulativesRegister: true }
    case ACUMULATIVES_REGISTER_SUCCESS:
      return {
        loadingAcumulativesRegister: false,
        successAcumulativesRegister: true,
        acumulatives: action.payload,
      }
    case ACUMULATIVES_REGISTER_FAIL:
      return {
        loadingAcumulativesRegister: false,
        errorAcumulativesRegister: action.payload,
      }
    case ACUMULATIVES_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const acumulativesListReducer = (state = {}, action) => {
  switch (action.type) {
    case ACUMULATIVES_LIST_REQUEST:
      return { loadingAcumulativesList: true }
    case ACUMULATIVES_LIST_SUCCESS:
      return {
        loadingAcumulativesList: false,
        successAcumulativesList: true,
        acumulativesList: action.payload,
      }
    case ACUMULATIVES_LIST_FAIL:
      return { loadingAcumulativesList: false, errorAcumulativesList: action.payload }
    case ACUMULATIVES_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const acumulativesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ACUMULATIVES_DELETE_REQUEST:
      return { loadingAcumulativesDelete: true }
    case ACUMULATIVES_DELETE_SUCCESS:
      return { loadingAcumulativesDelete: false, successAcumulativesDelete: true }
    case ACUMULATIVES_DELETE_FAIL:
      return { loadingAcumulativesDelete: false, errorAcumulativesDelete: action.payload }
    case ACUMULATIVES_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const acumulativesListByTaskIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ACUMULATIVES_LIST_BY_TASK_ID_REQUEST:
      return { loadingAcumulativesListByTaskId: true }
    case ACUMULATIVES_LIST_BY_TASK_ID_SUCCESS:
      return {
        loadingAcumulativesListByTaskId: false,
        successAcumulativesListByTaskId: true,
        acumulativesListByTaskId: action.payload,
      }
    case ACUMULATIVES_LIST_BY_TASK_ID_FAIL:
      return { loadingAcumulativesListByTaskId: false, errorAcumulativesListByTaskId: action.payload }
    case ACUMULATIVES_LIST_BY_TASK_ID_RESET:
      return {}
    default:
      return state
  }
}

export const acumulativesTasksSelectReducer = (state = {}, action) => {
  switch (action.type) {
    case ACUMULATIVES_TO_MANAGER_LIST_REQUEST:
      return { loadingAcumulativesTasksSelect: true }
    case ACUMULATIVES_TO_MANAGER_LIST_SUCCESS:
      return {
        loadingAcumulativesTasksSelect: false,
        successAcumulativesTasksSelect: true,
        acumulativesTasksSelect: action.payload,
      }
    case ACUMULATIVES_TO_MANAGER_LIST_FAIL:
      return { loadingAcumulativesTasksSelect: false, errorAcumulativesTasksSelect: action.payload }
    case ACUMULATIVES_TO_MANAGER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const acumulativesTasksHijaSelectReducer = (state = {}, action) => {
  switch (action.type) {
    case ACUMULATIVES_HIJA_TO_MANAGER_LIST_REQUEST:
      return { loadingAcumulativesTasksHijaSelect: true }
    case ACUMULATIVES_HIJA_TO_MANAGER_LIST_SUCCESS:
      return {
        loadingAcumulativesTasksHijaSelect: false,
        successAcumulativesTasksHijaSelect: true,
        acumulativesTasksHijaSelect: action.payload,
      }
    case ACUMULATIVES_HIJA_TO_MANAGER_LIST_FAIL:
      return { loadingAcumulativesTasksHijaSelect: false, errorAcumulativesTasksHijaSelect: action.payload }
    case ACUMULATIVES_HIJA_TO_MANAGER_LIST_RESET:
      return {}
    default:
      return state
  }
}
