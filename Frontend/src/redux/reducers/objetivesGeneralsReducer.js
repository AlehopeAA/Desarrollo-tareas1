import {
  OBJETIVES_GENERAL_REGISTER_REQUEST,
  OBJETIVES_GENERAL_REGISTER_SUCCESS,
  OBJETIVES_GENERAL_REGISTER_RESET,
  OBJETIVES_GENERAL_REGISTER_FAIL,
  OBJETIVES_GENERAL_LIST_REQUEST,
  OBJETIVES_GENERAL_LIST_SUCCESS,
  OBJETIVES_GENERAL_LIST_FAIL,
  OBJETIVES_GENERAL_LIST_RESET,
  OBJETIVES_GENERAL_DELETE_REQUEST,
  OBJETIVES_GENERAL_DELETE_SUCCESS,
  OBJETIVES_GENERAL_DELETE_FAIL,
  OBJETIVES_GENERAL_UPDATE_REQUEST,
  OBJETIVES_GENERAL_UPDATE_SUCCESS,
  OBJETIVES_GENERAL_UPDATE_FAIL,
  OBJETIVES_GENERAL_DELETE_RESET,
  OBJETIVES_GENERAL_UPDATE_RESET,
} from '../constants/objetivesGeneralsConstants'

export const objetiveGeneralRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_GENERAL_REGISTER_REQUEST:
      return { loadingObjetiveGeneralRegister: true }
    case OBJETIVES_GENERAL_REGISTER_SUCCESS:
      return {
        loadingObjetiveGeneralRegister: false,
        successObjetiveGeneralRegister: true,
        objetiveGeneralRegisterData: action.payload,
      }
    case OBJETIVES_GENERAL_REGISTER_FAIL:
      return {
        loadingObjetiveGeneralRegister: false,
        errorObjetiveGeneralRegister: action.payload,
      }
    case OBJETIVES_GENERAL_REGISTER_RESET:
      return {}
    default:
      return state
  }
}
export const objetiveGeneralListReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_GENERAL_LIST_REQUEST:
      return { loadingObjetiveGeneralList: true }
    case OBJETIVES_GENERAL_LIST_SUCCESS:
      return {
        loadingObjetiveGeneralList: false,
        successObjetiveGeneralList: true,
        objetiveGeneralListData: action.payload,
      }
    case OBJETIVES_GENERAL_LIST_FAIL:
      return {
        loadingObjetiveGeneralList: false,
        errorObjetiveGeneralList: action.payload,
      }
    case OBJETIVES_GENERAL_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const objetivesGeneralUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_GENERAL_UPDATE_REQUEST:
      return { loadingObjetiveGeneralUpdate: true }
    case OBJETIVES_GENERAL_UPDATE_SUCCESS:
      return {
        loadingObjetiveGeneralUpdate: false,
        successObjetiveGeneralUpdate: true,
        objetiveGeneralUpdateData: action.payload,
      }
    case OBJETIVES_GENERAL_UPDATE_FAIL:
      return {
        loadingObjetiveGeneralUpdate: false,
        errorObjetiveGeneralUpdate: action.payload,
      }
    case OBJETIVES_GENERAL_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const objetivesGeneralDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_GENERAL_DELETE_REQUEST:
      return { loadingObjetiveGeneralDelete: true }
    case OBJETIVES_GENERAL_DELETE_SUCCESS:
      return {
        loadingObjetiveGeneralDelete: false,
        successObjetiveGeneralDelete: true,
        objetiveGeneralDeleteData: action.payload,
      }
    case OBJETIVES_GENERAL_DELETE_FAIL:
      return {
        loadingObjetiveGeneralDelete: false,
        errorObjetiveGeneralDelete: action.payload,
      }
    case OBJETIVES_GENERAL_DELETE_RESET:
      return {}
    default:
      return state
  }
}
