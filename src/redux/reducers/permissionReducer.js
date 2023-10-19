import {
  PERMISSION_REGISTER_REQUEST,
  PERMISSION_REGISTER_SUCCESS,
  PERMISSION_REGISTER_FAIL,
  PERMISSION_REGISTER_RESET,
  PERMISSION_LIST_REQUEST,
  PERMISSION_LIST_SUCCESS,
  PERMISSION_LIST_FAIL,
  PERMISSION_LIST_RESET,
  PERMISSION_UPDATE_SUCCESS,
  PERMISSION_UPDATE_REQUEST,
  PERMISSION_UPDATE_FAIL,
  PERMISSION_UPDATE_RESET,
  PERMISSION_DELETE_FAIL,
  PERMISSION_DELETE_REQUEST,
  PERMISSION_DELETE_SUCCESS,
  PERMISSION_DELETE_RESET,
} from '../constants/permissionConstants.js'

export const permissionRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PERMISSION_REGISTER_REQUEST:
      return { loadingPermissionRegister: true }
    case PERMISSION_REGISTER_SUCCESS:
      return {
        loadingPermissionRegister: false,
        successPermissionRegister: true,
        permission: action.payload,
      }
    case PERMISSION_REGISTER_FAIL:
      return {
        loadingPermissionRegister: false,
        errorPermissionRegister: action.payload,
      }
    case PERMISSION_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const permissionListReducer = (state = { permissions: [] }, action) => {
  switch (action.type) {
    case PERMISSION_LIST_REQUEST:
      return { loadingPermissionList: true }
    case PERMISSION_LIST_SUCCESS:
      return {
        loadingPermissionList: false,
        successPermissionList: true,
        permissions: action.payload,
      }
    case PERMISSION_LIST_FAIL:
      return { loadingPermissionList: false, errorPermissionList: action.payload }
    case PERMISSION_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const permissionUpdateReducer = (state = { permissionUpdated: {} }, action) => {
  switch (action.type) {
    case PERMISSION_UPDATE_REQUEST:
      return { loadingPermissionUpdate: true }
    case PERMISSION_UPDATE_SUCCESS:
      return {
        loadingPermissionUpdate: false,
        successPermissionUpdate: true,
        permissionUpdated: action.payload,
      }
    case PERMISSION_UPDATE_FAIL:
      return { loadingPermissionUpdate: false, errorPermissionUpdate: action.payload }
    case PERMISSION_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const permissionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PERMISSION_DELETE_REQUEST:
      return { loadingPermissionDelete: true }
    case PERMISSION_DELETE_SUCCESS:
      return { loadingPermissionDelete: false, successPermissionDelete: true }
    case PERMISSION_DELETE_FAIL:
      return { loadingPermissionDelete: false, errorPermissionDelete: action.payload }
    case PERMISSION_DELETE_RESET:
      return {}
    default:
      return state
  }
}
