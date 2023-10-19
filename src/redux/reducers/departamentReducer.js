import {
   DEPARTAMENT_REGISTER_REQUEST,
   DEPARTAMENT_REGISTER_SUCCESS,
   DEPARTAMENT_REGISTER_FAIL,
   DEPARTAMENT_REGISTER_RESET,
   DEPARTAMENT_LIST_REQUEST,
   DEPARTAMENT_LIST_SUCCESS,
   DEPARTAMENT_LIST_FAIL,
   DEPARTAMENT_LIST_RESET,
   DEPARTAMENT_UPDATE_SUCCESS,
   DEPARTAMENT_UPDATE_REQUEST,
   DEPARTAMENT_UPDATE_FAIL,
   DEPARTAMENT_UPDATE_RESET,
   DEPARTAMENT_DELETE_FAIL,
   DEPARTAMENT_DELETE_REQUEST,
   DEPARTAMENT_DELETE_SUCCESS,
   DEPARTAMENT_DELETE_RESET,
   DEPARTAMENT_RELATED_LIST_REQUEST,
   DEPARTAMENT_RELATED_LIST_SUCCESS,
   DEPARTAMENT_RELATED_LIST_FAIL,
   DEPARTAMENT_RELATED_LIST_RESET,
} from '../constants/departamentConstants.js'

export const departamentRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTAMENT_REGISTER_REQUEST:
      return { loadingDepartamentRegister: true }
    case DEPARTAMENT_REGISTER_SUCCESS:
      return {
        loadingDepartamentRegister: false,
        successDepartamentRegister: true,
        departament: action.payload,
      }
    case DEPARTAMENT_REGISTER_FAIL:
      return {
        loadingDepartamentRegister: false,
        errorDepartamentRegister: action.payload,
      }
    case DEPARTAMENT_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const departamentListReducer = (state = { departaments: [] }, action) => {
  switch (action.type) {
    case DEPARTAMENT_LIST_REQUEST:
      return { loadingDepartamentList: true }
    case DEPARTAMENT_LIST_SUCCESS:
      return {
        loadingDepartamentList: false,
        successDepartamentList: true,
        departaments: action.payload,
      }
    case DEPARTAMENT_LIST_FAIL:
      return { loadingDepartamentList: false, errorDepartamentList: action.payload }
    case DEPARTAMENT_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const departamentUpdateReducer = (state = { departamentUpdated: {} }, action) => {
  switch (action.type) {
    case DEPARTAMENT_UPDATE_REQUEST:
      return { loadingDepartamentUpdate: true }
    case DEPARTAMENT_UPDATE_SUCCESS:
      return {
        loadingDepartamentUpdate: false,
        successDepartamentUpdate: true,
        departamentUpdated: action.payload,
      }
    case DEPARTAMENT_UPDATE_FAIL:
      return { loadingDepartamentUpdate: false, errorDepartamentUpdate: action.payload }
    case DEPARTAMENT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const departamentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTAMENT_DELETE_REQUEST:
      return { loadingDepartamentDelete: true }
    case DEPARTAMENT_DELETE_SUCCESS:
      return { loadingDepartamentDelete: false, successDepartamentDelete: true }
    case DEPARTAMENT_DELETE_FAIL:
      return { loadingDepartamentDelete: false, errorDepartamentDelete: action.payload }
    case DEPARTAMENT_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const departamentRelatedListReducer = (state = { departamentsRelated: [] }, action) => {
   switch (action.type) {
      case DEPARTAMENT_RELATED_LIST_REQUEST:
         return { loadingDepartamentRelatedList: true }
      case DEPARTAMENT_RELATED_LIST_SUCCESS:
         return {
            loadingDepartamentRelatedList: false,
            successDepartamentRelatedList: true,
            departamentsRelated: action.payload,
         }
      case DEPARTAMENT_RELATED_LIST_FAIL:
         return {
            loadingDepartamentRelatedList: false,
            errorDepartamentRelatedList: action.payload
         }
      case DEPARTAMENT_RELATED_LIST_RESET:
         return {}
      default:
         return state
   }
 }
