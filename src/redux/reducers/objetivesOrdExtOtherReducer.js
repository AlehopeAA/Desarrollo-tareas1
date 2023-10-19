import {
  OBJETIVES_ORD_EXT_OTHER_REGISTER_REQUEST,
  OBJETIVES_ORD_EXT_OTHER_REGISTER_SUCCESS,
  OBJETIVES_ORD_EXT_OTHER_REGISTER_RESET,
  OBJETIVES_ORD_EXT_OTHER_REGISTER_FAIL,
  OBJETIVES_ORD_EXT_OTHER_LIST_REQUEST,
  OBJETIVES_ORD_EXT_OTHER_LIST_SUCCESS,
  OBJETIVES_ORD_EXT_OTHER_LIST_FAIL,
  OBJETIVES_ORD_EXT_OTHER_LIST_RESET,
  OBJETIVES_ORD_EXT_UPDATE_REQUEST,
  OBJETIVES_ORD_EXT_UPDATE_SUCCESS,
  OBJETIVES_ORD_EXT_UPDATE_FAIL,
  OBJETIVES_ORD_EXT_DELETE_REQUEST,
  OBJETIVES_ORD_EXT_DELETE_SUCCESS,
  OBJETIVES_ORD_EXT_DELETE_FAIL,
  OBJETIVES_ORD_EXT_DELETE_RESET,
  OBJETIVES_ORD_EXT_UPDATE_RESET,
  OBJETIVES_HISTORICAL_REQUEST,
  OBJETIVES_HISTORICAL_SUCCESS,
  OBJETIVES_HISTORICAL_FAIL,
  OBJETIVES_HISTORICAL_RESET,
} from '../constants/objetivesOrdExtOtherConstants'

export const objetiveOrdExtOtherRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_ORD_EXT_OTHER_REGISTER_REQUEST:
      return { loadingObjetiveOrdExtOtherRegister: true }
    case OBJETIVES_ORD_EXT_OTHER_REGISTER_SUCCESS:
      return {
        loadingObjetiveOrdExtOtherRegister: false,
        successObjetiveOrdExtOtherRegister: true,
        objetiveOrdExtOtherRegisterData: action.payload,
      }
    case OBJETIVES_ORD_EXT_OTHER_REGISTER_FAIL:
      return {
        loadingObjetiveOrdExtOtherRegister: false,
        errorObjetiveOrdExtOtherRegister: action.payload,
      }
    case OBJETIVES_ORD_EXT_OTHER_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const objetiveOrdExtOtherListReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_ORD_EXT_OTHER_LIST_REQUEST:
      return { loadingObjetiveOrdExtOtherList: true }
    case OBJETIVES_ORD_EXT_OTHER_LIST_SUCCESS:
      return {
        loadingObjetiveOrdExtOtherList: false,
        successObjetiveOrdExtOtherList: true,
        objetiveOrdExtOtherListData: action.payload,
      }
    case OBJETIVES_ORD_EXT_OTHER_LIST_FAIL:
      return {
        loadingObjetiveOrdExtOtherList: false,
        errorObjetiveOrdExtOtherList: action.payload,
      }
    case OBJETIVES_ORD_EXT_OTHER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const objetivesOrdExtUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_ORD_EXT_UPDATE_REQUEST:
      return { loadingObjetiveOrdExtUpdate: true }
    case OBJETIVES_ORD_EXT_UPDATE_SUCCESS:
      return {
        loadingObjetiveOrdExtUpdate: false,
        successObjetiveOrdExtUpdate: true,
        objetiveOrdExtUpdateData: action.payload,
      }
    case OBJETIVES_ORD_EXT_UPDATE_FAIL:
      return {
        loadingObjetiveOrdExtUpdate: false,
        errorObjetiveOrdExtUpdate: action.payload,
      }
    case OBJETIVES_ORD_EXT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const objetivesOrdExtDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_ORD_EXT_DELETE_REQUEST:
      return { loadingObjetiveOrdExtDelete: true }
    case OBJETIVES_ORD_EXT_DELETE_SUCCESS:
      return {
        loadingObjetiveOrdExtDelete: false,
        successObjetiveOrdExtDelete: true,
        objetiveOrdExtDeleteData: action.payload,
      }
    case OBJETIVES_ORD_EXT_DELETE_FAIL:
      return {
        loadingObjetiveOrdExtDelete: false,
        errorObjetiveOrdExtDelete: action.payload,
      }
    case OBJETIVES_ORD_EXT_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const objetiveHistoricalListReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_HISTORICAL_REQUEST:
      return { loadingObjetiveHistoricalList: true }
    case OBJETIVES_HISTORICAL_SUCCESS:
      return {
        loadingObjetiveHistoricalList: false,
        successObjetiveHistoricalList: true,
        objetiveHistoricalListData: action.payload,
      }
    case OBJETIVES_HISTORICAL_FAIL:
      return {
        loadingObjetiveHistoricalList: false,
        errorObjetiveHistoricalList: action.payload,
      }
    case OBJETIVES_HISTORICAL_RESET:
      return {}
    default:
      return state
  }
}