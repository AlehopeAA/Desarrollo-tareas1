import {
  DIFICULTIES_LIST_REQUEST,
  DIFICULTIES_LIST_SUCCESS,
  DIFICULTIES_LIST_FAIL,
  DIFICULTIES_LIST_RESET,
  DIFICULTIES_DELETE_REQUEST,
  DIFICULTIES_DELETE_SUCCESS,
  DIFICULTIES_DELETE_FAIL,
  DIFICULTIES_DELETE_RESET,
  DIFICULTIES_LIST_BY_MANAGER_ID_REQUEST,
  DIFICULTIES_LIST_BY_MANAGER_ID_SUCCESS,
  DIFICULTIES_LIST_BY_MANAGER_ID_FAIL,
  DIFICULTIES_LIST_BY_MANAGER_ID_RESET,
  DIFICULTIES_LIST_BY_TASK_ID_REQUEST,
  DIFICULTIES_LIST_BY_TASK_ID_SUCCESS,
  DIFICULTIES_LIST_BY_TASK_ID_FAIL,
  DIFICULTIES_LIST_BY_TASK_ID_RESET,
  DIFICULTIES_REGISTER_REQUEST,
  DIFICULTIES_REGISTER_SUCCESS,
  DIFICULTIES_REGISTER_FAIL,
  DIFICULTIES_REGISTER_RESET,
  DIFICULTIES_UPDATE_REQUEST,
  DIFICULTIES_UPDATE_SUCCESS,
  DIFICULTIES_UPDATE_FAIL,
  DIFICULTIES_UPDATE_RESET,
} from '../constants/dificultiesConstants'

export const dificultiesRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case DIFICULTIES_REGISTER_REQUEST:
      return { loadingDificultiesRegister: true }
    case DIFICULTIES_REGISTER_SUCCESS:
      return {
        loadingDificultiesRegister: false,
        successDificultiesRegister: true,
        DificultiesRegister: action.payload,
      }
    case DIFICULTIES_REGISTER_FAIL:
      return { loadingDificultiesRegister: false, errorDificultiesRegister: action.payload }
    case DIFICULTIES_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const dificultiesListReducer = (state = {}, action) => {
  switch (action.type) {
    case DIFICULTIES_LIST_REQUEST:
      return { loadingDificultiesList: true }
    case DIFICULTIES_LIST_SUCCESS:
      return {
        loadingDificultiesList: false,
        successDificultiesList: true,
        dificultiesList: action.payload,
      }
    case DIFICULTIES_LIST_FAIL:
      return { loadingDificultiesList: false, errorDificultiesList: action.payload }
    case DIFICULTIES_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const dificultiesListByManagerIdReducer = (state = {}, action) => {
  switch (action.type) {
    case DIFICULTIES_LIST_BY_MANAGER_ID_REQUEST:
      return { loadingDificultiesListByManagerId: true }
    case DIFICULTIES_LIST_BY_MANAGER_ID_SUCCESS:
      return {
        loadingDificultiesListByManagerId: false,
        successDificultiesListByManagerId: true,
        dificultiesListByManagerId: action.payload,
      }
    case DIFICULTIES_LIST_BY_MANAGER_ID_FAIL:
      return { loadingDificultiesListByManagerId: false, errorDificultiesListByManagerId: action.payload }
    case DIFICULTIES_LIST_BY_MANAGER_ID_RESET:
      return {}
    default:
      return state
  }
}

export const dificultiesListByTaskIdReducer = (state = {}, action) => {
  switch (action.type) {
    case DIFICULTIES_LIST_BY_TASK_ID_REQUEST:
      return { loadingDificultiesListByTaskId: true }
    case DIFICULTIES_LIST_BY_TASK_ID_SUCCESS:
      return {
        loadingDificultiesListByTaskId: false,
        successDificultiesListByTaskId: true,
        dificultiesListByTaskId: action.payload,
      }
    case DIFICULTIES_LIST_BY_TASK_ID_FAIL:
      return { loadingDificultiesListByTaskId: false, errorDificultiesListByTaskId: action.payload }
    case DIFICULTIES_LIST_BY_TASK_ID_RESET:
      return {}
    default:
      return state
  }
}

export const dificultiesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DIFICULTIES_DELETE_REQUEST:
      return { loadingDificultiesDelete: true }
    case DIFICULTIES_DELETE_SUCCESS:
      return {
        loadingDificultiesDelete: false,
        successDificultiesDelete: true,
      }
    case DIFICULTIES_DELETE_FAIL:
      return { loadingDificultiesDelete: false, errorDificultiesDelete: action.payload }
    case DIFICULTIES_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const dificultiesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DIFICULTIES_UPDATE_REQUEST:
      return { loadingDificultiesUpdate: true }
    case DIFICULTIES_UPDATE_SUCCESS:
      return {
        loadingDificultiesUpdate: false,
        successDificultiesUpdate: true,
        dificultiesUpdate: action.payload,
      }
    case DIFICULTIES_UPDATE_FAIL:
      return { loadingDificultiesUpdate: false, errorDificultiesUpdate: action.payload }
    case DIFICULTIES_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
