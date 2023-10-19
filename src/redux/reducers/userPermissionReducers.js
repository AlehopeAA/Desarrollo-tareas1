import {
  USER_PERMISSION_REGISTER_REQUEST,
  USER_PERMISSION_REGISTER_SUCCESS,
  USER_PERMISSION_REGISTER_FAIL,
  USER_PERMISSION_REGISTER_RESET,
  USER_PERMISSION_LIST_REQUEST,
  USER_PERMISSION_LIST_SUCCESS,
  USER_PERMISSION_LIST_FAIL,
  USER_PERMISSION_LIST_RESET,
  USER_PERMISSION_UPDATE_SUCCESS,
  USER_PERMISSION_UPDATE_REQUEST,
  USER_PERMISSION_UPDATE_FAIL,
  USER_PERMISSION_UPDATE_RESET,
  USER_PERMISSION_DELETE_FAIL,
  USER_PERMISSION_DELETE_REQUEST,
  USER_PERMISSION_DELETE_SUCCESS,
  USER_PERMISSION_DELETE_RESET,
} from '../constants/userPermissionConstants.js'

export const userPermissionRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PERMISSION_REGISTER_REQUEST:
      return { loadingUserPermissionRegister: true }
    case USER_PERMISSION_REGISTER_SUCCESS:
      return {
        loadingUserPermissionRegister: false,
        successUserPermissionRegister: true,
        userPermission: action.payload,
      }
    case USER_PERMISSION_REGISTER_FAIL:
      return {
        loadingUserPermissionRegister: false,
        errorUserPermissionRegister: action.payload,
      }
    case USER_PERMISSION_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const userPermissionListReducer = (state = { userPermissions: [] }, action) => {
  switch (action.type) {
    case USER_PERMISSION_LIST_REQUEST:
      return { loadingUserPermissionList: true }
    case USER_PERMISSION_LIST_SUCCESS:
      return {
        loadingUserPermissionList: false,
        successUserPermissionList: true,
        userPermissions: action.payload,
      }
    case USER_PERMISSION_LIST_FAIL:
      return { loadingUserPermissionList: false, errorUserPermissionList: action.payload }
    case USER_PERMISSION_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const userPermissionUpdateReducer = (state = { userPermissionUpdated: {} }, action) => {
  switch (action.type) {
    case USER_PERMISSION_UPDATE_REQUEST:
      return { loadingUserPermissionUpdate: true }
    case USER_PERMISSION_UPDATE_SUCCESS:
      return {
        loadingUserPermissionUpdate: false,
        successUserPermissionUpdate: true,
        userPermissionUpdated: action.payload,
      }
    case USER_PERMISSION_UPDATE_FAIL:
      return { loadingUserPermissionUpdate: false, errorUserPermissionUpdate: action.payload }
    case USER_PERMISSION_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const userPermissionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PERMISSION_DELETE_REQUEST:
      return { loadingUserPermissionDelete: true }
    case USER_PERMISSION_DELETE_SUCCESS:
      return { loadingUserPermissionDelete: false, successUserPermissionDelete: true }
    case USER_PERMISSION_DELETE_FAIL:
      return { loadingUserPermissionDelete: false, errorUserPermissionDelete: action.payload }
    case USER_PERMISSION_DELETE_RESET:
      return {}
    default:
      return state
  }
}
