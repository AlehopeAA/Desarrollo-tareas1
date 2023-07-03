import {
  ENTRIES_TO_MANAGER_LIST_REQUEST,
  ENTRIES_TO_MANAGER_LIST_SUCCESS,
  ENTRIES_TO_MANAGER_LIST_FAIL,
  ENTRIES_TO_MANAGER_LIST_RESET,
  ENTRIES_TO_MANAGER_REGISTER_REQUEST,
  ENTRIES_TO_MANAGER_REGISTER_SUCCESS,
  ENTRIES_TO_MANAGER_REGISTER_FAIL,
  ENTRIES_TO_MANAGER_REGISTER_RESET,
  
} from '../constants/entriesManagerConstants'

export const entriesToManagerListReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRIES_TO_MANAGER_LIST_REQUEST:
      return { loadingEntriesToManagerList: true }
    case ENTRIES_TO_MANAGER_LIST_SUCCESS:
      return {
        loadingEntriesToManagerList: false,
        successEntriesToManagerList: true,
        entriesToManagerList: action.payload,
      }
    case ENTRIES_TO_MANAGER_LIST_FAIL:
      return { loadingEntriesToManagerList: false, errorEntriesToManagerList: action.payload }
    case ENTRIES_TO_MANAGER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const entriesToManagerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRIES_TO_MANAGER_REGISTER_REQUEST:
      return { loadingEntriesToManagerRegister: true }
    case ENTRIES_TO_MANAGER_REGISTER_SUCCESS:
      return {
        loadingEntriesToManagerRegister: false,
        successEntriesToManagerRegister: true,
        entriesToManagerRegister: action.payload,
      }
    case ENTRIES_TO_MANAGER_REGISTER_FAIL:
      return { loadingEntriesToManagerRegister: false, errorEntriesToManagerRegister: action.payload }
    case ENTRIES_TO_MANAGER_REGISTER_RESET:
      return {}
    default:
      return state
  }
}
