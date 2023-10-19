import {
   ROLE_REGISTER_REQUEST,
   ROLE_REGISTER_SUCCESS,
   ROLE_REGISTER_FAIL,
   ROLE_REGISTER_RESET,
   ROLE_LIST_REQUEST,
   ROLE_LIST_SUCCESS,
   ROLE_LIST_FAIL,
   ROLE_LIST_RESET,
   ROLE_UPDATE_SUCCESS,
   ROLE_UPDATE_REQUEST,
   ROLE_UPDATE_FAIL,
   ROLE_UPDATE_RESET,
   ROLE_DELETE_FAIL,
   ROLE_DELETE_REQUEST,
   ROLE_DELETE_SUCCESS,
   ROLE_DELETE_RESET,
   ROLE_RELATED_LIST_REQUEST,
   ROLE_RELATED_LIST_SUCCESS,
   ROLE_RELATED_LIST_FAIL,
   ROLE_RELATED_LIST_RESET,
} from '../constants/roleConstants.js'

export const roleRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ROLE_REGISTER_REQUEST:
      return { loadingRoleRegister: true }
    case ROLE_REGISTER_SUCCESS:
      return {
        loadingRoleRegister: false,
        successRoleRegister: true,
        role: action.payload,
      }
    case ROLE_REGISTER_FAIL:
      return {
        loadingRoleRegister: false,
        errorRoleRegister: action.payload,
      }
    case ROLE_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const roleListReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case ROLE_LIST_REQUEST:
      return { loadingRoleList: true }
    case ROLE_LIST_SUCCESS:
      return {
        loadingRoleList: false,
        successRoleList: true,
        roles: action.payload,
      }
    case ROLE_LIST_FAIL:
      return { loadingRoleList: false, errorRoleList: action.payload }
    case ROLE_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const roleUpdateReducer = (state = { roleUpdated: {} }, action) => {
  switch (action.type) {
    case ROLE_UPDATE_REQUEST:
      return { loadingRoleUpdate: true }
    case ROLE_UPDATE_SUCCESS:
      return {
        loadingRoleUpdate: false,
        successRoleUpdate: true,
        roleUpdated: action.payload,
      }
    case ROLE_UPDATE_FAIL:
      return { loadingRoleUpdate: false, errorRoleUpdate: action.payload }
    case ROLE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const roleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ROLE_DELETE_REQUEST:
      return { loadingRoleDelete: true }
    case ROLE_DELETE_SUCCESS:
      return { loadingRoleDelete: false, successRoleDelete: true }
    case ROLE_DELETE_FAIL:
      return { loadingRoleDelete: false, errorRoleDelete: action.payload }
    case ROLE_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const roleRelatedListReducer = (state = { rolesRelated: [] }, action) => {
   switch (action.type) {
      case ROLE_RELATED_LIST_REQUEST:
         return { loadingRoleRelatedList: true }
      case ROLE_RELATED_LIST_SUCCESS:
         return {
            loadingRoleRelatedList: false,
            successRoleRelatedList: true,
            rolesRelated: action.payload,
         }
      case ROLE_RELATED_LIST_FAIL:
         return {
            loadingRoleRelatedList: false,
            errorRoleRelatedList: action.payload
         }
      case ROLE_RELATED_LIST_RESET:
         return {}
      default:
         return state
   }
 }
