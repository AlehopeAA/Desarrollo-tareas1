import {
  PROFILE_TO_MANAGER_REGISTER_REQUEST,
  PROFILE_TO_MANAGER_REGISTER_SUCCESS,
  PROFILE_TO_MANAGER_REGISTER_FAIL,
  PROFILE_TO_MANAGER_REGISTER_RESET,
  PROFILE_TO_MANAGER_LIST_REQUEST,
  PROFILE_TO_MANAGER_LIST_SUCCESS,
  PROFILE_TO_MANAGER_LIST_FAIL,
  PROFILE_TO_MANAGER_LIST_RESET,
  PROFILE_TO_MANAGER_UPDATE_SUCCESS,
  PROFILE_TO_MANAGER_UPDATE_REQUEST,
  PROFILE_TO_MANAGER_UPDATE_FAIL,
  PROFILE_TO_MANAGER_UPDATE_RESET,
  PROFILE_TO_MANAGER_DELETE_FAIL,
  PROFILE_TO_MANAGER_DELETE_REQUEST,
  PROFILE_TO_MANAGER_DELETE_SUCCESS,
  PROFILE_TO_MANAGER_DELETE_RESET,
} from '../constants/profileToManagerConstants.js'

export const profileToManagerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_TO_MANAGER_REGISTER_REQUEST:
      return { loadingProfileToManagerRegister: true }
    case PROFILE_TO_MANAGER_REGISTER_SUCCESS:
      return {
        loadingProfileToManagerRegister: false,
        successProfileToManagerRegister: true,
        profileToManager: action.payload,
      }
    case PROFILE_TO_MANAGER_REGISTER_FAIL:
      return {
        loadingProfileToManagerRegister: false,
        errorProfileToManagerRegister: action.payload,
      }
    case PROFILE_TO_MANAGER_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const profileToManagerListReducer = (state = { profileToManagers: [] }, action) => {
  switch (action.type) {
    case PROFILE_TO_MANAGER_LIST_REQUEST:
      return { loadingProfileToManagerList: true }
    case PROFILE_TO_MANAGER_LIST_SUCCESS:
      return {
        loadingProfileToManagerList: false,
        successProfileToManagerList: true,
        profileToManagers: action.payload,
      }
    case PROFILE_TO_MANAGER_LIST_FAIL:
      return { loadingProfileToManagerList: false, errorProfileToManagerList: action.payload }
    case PROFILE_TO_MANAGER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const profileToManagerUpdateReducer = (state = { profileToManagerUpdated: {} }, action) => {
  switch (action.type) {
    case PROFILE_TO_MANAGER_UPDATE_REQUEST:
      return { loadingProfileToManagerUpdate: true }
    case PROFILE_TO_MANAGER_UPDATE_SUCCESS:
      return {
        loadingProfileToManagerUpdate: false,
        successProfileToManagerUpdate: true,
        profileToManagerUpdated: action.payload,
      }
    case PROFILE_TO_MANAGER_UPDATE_FAIL:
      return { loadingProfileToManagerUpdate: false, errorProfileToManagerUpdate: action.payload }
    case PROFILE_TO_MANAGER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const profileToManagerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_TO_MANAGER_DELETE_REQUEST:
      return { loadingProfileToManagerDelete: true }
    case PROFILE_TO_MANAGER_DELETE_SUCCESS:
      return { loadingProfileToManagerDelete: false, successProfileToManagerDelete: true }
    case PROFILE_TO_MANAGER_DELETE_FAIL:
      return { loadingProfileToManagerDelete: false, errorProfileToManagerDelete: action.payload }
    case PROFILE_TO_MANAGER_DELETE_RESET:
      return {}
    default:
      return state
  }
}
