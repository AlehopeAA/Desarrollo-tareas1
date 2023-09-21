import {
  OBJETIVE_TASK_REQUEST,
  OBJETIVE_TASK_SUCCESS,
  OBJETIVE_TASK_FAIL,
  OBJETIVE_TASK_RESET,
  OBJETIVES_SPECIFIC_REGISTER_REQUEST,
  OBJETIVES_SPECIFIC_REGISTER_SUCCESS,
  OBJETIVES_SPECIFIC_REGISTER_RESET,
  OBJETIVES_SPECIFIC_REGISTER_FAIL,
  OBJETIVES_SPECIFIC_LIST_REQUEST,
  OBJETIVES_SPECIFIC_LIST_SUCCESS,
  OBJETIVES_SPECIFIC_LIST_RESET,
  OBJETIVES_SPECIFIC_LIST_FAIL,
  OBJETIVES_SPECIFIC_UPDATE_REQUEST,
  OBJETIVES_SPECIFIC_UPDATE_SUCCESS,
  OBJETIVES_SPECIFIC_UPDATE_FAIL,
  OBJETIVES_SPECIFIC_DELETE_REQUEST,
  OBJETIVES_SPECIFIC_DELETE_SUCCESS,
  OBJETIVES_SPECIFIC_DELETE_FAIL,
  OBJETIVES_SPECIFIC_UPDATE_RESET,
  OBJETIVES_SPECIFIC_DELETE_RESET,
} from '../constants/objetivesSpecificConstants'

export const objetiveSpecificRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_SPECIFIC_REGISTER_REQUEST:
      return { loadingObjetiveSpecificRegister: true }
    case OBJETIVES_SPECIFIC_REGISTER_SUCCESS:
      return {
        loadingObjetiveSpecificRegister: false,
        successObjetiveSpecificRegister: true,
        objetiveSpecificRegisterData: action.payload,
      }
    case OBJETIVES_SPECIFIC_REGISTER_FAIL:
      return {
        loadingObjetiveSpecificRegister: false,
        errorObjetiveSpecificRegister: action.payload,
      }
    case OBJETIVES_SPECIFIC_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const objetiveSpecificListReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_SPECIFIC_LIST_REQUEST:
      return { loadingObjetiveSpecificList: true }
    case OBJETIVES_SPECIFIC_LIST_SUCCESS:
      return {
        loadingObjetiveSpecificList: false,
        successObjetiveSpecificList: true,
        objetiveSpecificListData: action.payload,
      }
    case OBJETIVES_SPECIFIC_LIST_FAIL:
      return {
        loadingObjetiveSpecificList: false,
        errorObjetiveSpecificList: action.payload,
      }
    case OBJETIVES_SPECIFIC_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const objetivesByTaskReducer = (state = {}, action) => {
  console.log(action.type)
  switch (action.type) {
    case OBJETIVE_TASK_REQUEST:
      return { loadingObjetivesByTask: true }
    case OBJETIVE_TASK_SUCCESS:
      console.log(action.payload.result[0])
      return {
        loadingObjetivesByTask: false,
        successObjetivesByTask: true,
        objetivesByTask: action.payload.result,
      }
    case OBJETIVE_TASK_FAIL:
      return {
        loadingObjetivesByTask: false,
        errorObjetivesByTask: action.payload,
      }
    case OBJETIVE_TASK_RESET:
      return {}
    default:
      return state
  }
}

export const objetivesSpecificUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_SPECIFIC_UPDATE_REQUEST:
      return { loadingObjetiveSpecificUpdate: true }
    case OBJETIVES_SPECIFIC_UPDATE_SUCCESS:
      return {
        loadingObjetiveSpecificUpdate: false,
        successObjetiveSpecificUpdate: true,
        objetiveSpecificUpdateData: action.payload,
      }
    case OBJETIVES_SPECIFIC_UPDATE_FAIL:
      return {
        loadingObjetiveSpecificUpdate: false,
        errorObjetiveSpecificUpdate: action.payload,
      }
    case OBJETIVES_SPECIFIC_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const objetivesSpecificDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_SPECIFIC_DELETE_REQUEST:
      return { loadingObjetiveSpecificDelete: true }
    case OBJETIVES_SPECIFIC_DELETE_SUCCESS:
      return {
        loadingObjetiveSpecificDelete: false,
        successObjetiveSpecificDelete: true,
        objetiveSpecificDeleteData: action.payload,
      }
    case OBJETIVES_SPECIFIC_DELETE_FAIL:
      return {
        loadingObjetiveSpecificDelete: false,
        errorObjetiveSpecificDelete: action.payload,
      }
    case OBJETIVES_SPECIFIC_DELETE_RESET:
      return {}
    default:
      return state
  }
}
