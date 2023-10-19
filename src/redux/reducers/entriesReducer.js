import {
  ENTRIES_LIST_REQUEST,
  ENTRIES_LIST_SUCCESS,
  ENTRIES_LIST_FAIL,
  ENTRIES_LIST_RESET,
  ENTRIES_DELETE_REQUEST,
  ENTRIES_DELETE_SUCCESS,
  ENTRIES_DELETE_FAIL,
  ENTRIES_DELETE_RESET,
  ENTRIES_LIST_BY_MANAGER_ID_REQUEST,
  ENTRIES_LIST_BY_MANAGER_ID_SUCCESS,
  ENTRIES_LIST_BY_MANAGER_ID_FAIL,
  ENTRIES_LIST_BY_MANAGER_ID_RESET,
  ENTRIES_LIST_BY_TASK_ID_REQUEST,
  ENTRIES_LIST_BY_TASK_ID_SUCCESS,
  ENTRIES_LIST_BY_TASK_ID_FAIL,
  ENTRIES_LIST_BY_TASK_ID_RESET,
  ENTRIES_REGISTER_REQUEST,
  ENTRIES_REGISTER_SUCCESS,
  ENTRIES_REGISTER_FAIL,
  ENTRIES_REGISTER_RESET,
  ENTRIES_UPDATE_REQUEST,
  ENTRIES_UPDATE_SUCCESS,
  ENTRIES_UPDATE_FAIL,
  ENTRIES_UPDATE_RESET,
} from '../constants/entriesConstants'

export const entriesRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRIES_REGISTER_REQUEST:
      return { loadingEntriesRegister: true }
    case ENTRIES_REGISTER_SUCCESS:
      return {
        loadingEntriesRegister: false,
        successEntriesRegister: true,
        entriesRegister: action.payload,
      }
    case ENTRIES_REGISTER_FAIL:
      return { loadingEntriesRegister: false, errorEntriesRegister: action.payload }
    case ENTRIES_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const entriesListReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRIES_LIST_REQUEST:
      return { loadingEntriesList: true }
    case ENTRIES_LIST_SUCCESS:
      return {
        loadingEntriesList: false,
        successEntriesList: true,
        entriesList: action.payload,
      }
    case ENTRIES_LIST_FAIL:
      return { loadingEntriesList: false, errorEntriesList: action.payload }
    case ENTRIES_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const entriesListByManagerIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRIES_LIST_BY_MANAGER_ID_REQUEST:
      return { loadingEntriesListByManagerId: true }
    case ENTRIES_LIST_BY_MANAGER_ID_SUCCESS:
      return {
        loadingEntriesListByManagerId: false,
        successEntriesListByManagerId: true,
        entriesListByManagerId: action.payload,
      }
    case ENTRIES_LIST_BY_MANAGER_ID_FAIL:
      return { loadingEntriesListByManagerId: false, errorEntriesListByManagerId: action.payload }
    case ENTRIES_LIST_BY_MANAGER_ID_RESET:
      return {}
    default:
      return state
  }
}

export const entriesListByTaskIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRIES_LIST_BY_TASK_ID_REQUEST:
      return { loadingEntriesListByTaskId: true }
    case ENTRIES_LIST_BY_TASK_ID_SUCCESS:
      return {
        loadingEntriesListByTaskId: false,
        successEntriesListByTaskId: true,
        entriesListByTaskId: action.payload,
      }
    case ENTRIES_LIST_BY_TASK_ID_FAIL:
      return { loadingEntriesListByTaskId: false, errorEntriesListByTaskId: action.payload }
    case ENTRIES_LIST_BY_TASK_ID_RESET:
      return {}
    default:
      return state
  }
}

export const entriesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRIES_DELETE_REQUEST:
      return { loadingEntriesDelete: true }
    case ENTRIES_DELETE_SUCCESS:
      return {
        loadingEntriesDelete: false,
        successEntriesDelete: true,
      }
    case ENTRIES_DELETE_FAIL:
      return { loadingEntriesDelete: false, errorEntriesDelete: action.payload }
    case ENTRIES_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const entriesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRIES_UPDATE_REQUEST:
      return { loadingEntriesUpdate: true }
    case ENTRIES_UPDATE_SUCCESS:
      return {
        loadingEntriesUpdate: false,
        successEntriesUpdate: true,
        entriesUpdate: action.payload,
      }
    case ENTRIES_UPDATE_FAIL:
      return { loadingEntriesUpdate: false, errorEntriesUpdate: action.payload }
    case ENTRIES_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
