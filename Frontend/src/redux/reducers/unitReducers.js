import {
   UNIT_REGISTER_REQUEST,
   UNIT_REGISTER_SUCCESS,
   UNIT_REGISTER_FAIL,
   UNIT_REGISTER_RESET,
   UNIT_LIST_REQUEST,
   UNIT_LIST_SUCCESS,
   UNIT_LIST_FAIL,
   UNIT_LIST_RESET,
   UNIT_UPDATE_SUCCESS,
   UNIT_UPDATE_REQUEST,
   UNIT_UPDATE_FAIL,
   UNIT_UPDATE_RESET,
   UNIT_DELETE_FAIL,
   UNIT_DELETE_REQUEST,
   UNIT_DELETE_SUCCESS,
   UNIT_DELETE_RESET,
   UNIT_RELATED_LIST_REQUEST,
   UNIT_RELATED_LIST_SUCCESS,
   UNIT_RELATED_LIST_FAIL,
   UNIT_RELATED_LIST_RESET,
} from '../constants/unitConstants.js'

export const unitRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case UNIT_REGISTER_REQUEST:
      return { loadingUnitRegister: true }
    case UNIT_REGISTER_SUCCESS:
      return {
        loadingUnitRegister: false,
        successUnitRegister: true,
        unit: action.payload,
      }
    case UNIT_REGISTER_FAIL:
      return {
        loadingUnitRegister: false,
        errorUnitRegister: action.payload,
      }
    case UNIT_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const unitListReducer = (state = { units: [] }, action) => {
  switch (action.type) {
    case UNIT_LIST_REQUEST:
      return { loadingUnitList: true }
    case UNIT_LIST_SUCCESS:
      return {
        loadingUnitList: false,
        successUnitList: true,
        units: action.payload,
      }
    case UNIT_LIST_FAIL:
      return { loadingUnitList: false, errorUnitList: action.payload }
    case UNIT_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const unitUpdateReducer = (state = { unitUpdated: {} }, action) => {
  switch (action.type) {
    case UNIT_UPDATE_REQUEST:
      return { loadingUnitUpdate: true }
    case UNIT_UPDATE_SUCCESS:
      return {
        loadingUnitUpdate: false,
        successUnitUpdate: true,
        unitUpdated: action.payload,
      }
    case UNIT_UPDATE_FAIL:
      return { loadingUnitUpdate: false, errorUnitUpdate: action.payload }
    case UNIT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const unitDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case UNIT_DELETE_REQUEST:
      return { loadingUnitDelete: true }
    case UNIT_DELETE_SUCCESS:
      return { loadingUnitDelete: false, successUnitDelete: true }
    case UNIT_DELETE_FAIL:
      return { loadingUnitDelete: false, errorUnitDelete: action.payload }
    case UNIT_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const unitRelatedListReducer = (state = { unitsRelated: [] }, action) => {
   switch (action.type) {
      case UNIT_RELATED_LIST_REQUEST:
         return { loadingUnitRelatedList: true }
      case UNIT_RELATED_LIST_SUCCESS:
         return {
            loadingUnitRelatedList: false,
            successUnitRelatedList: true,
            unitsRelated: action.payload,
         }
      case UNIT_RELATED_LIST_FAIL:
         return {
            loadingUnitRelatedList: false,
            errorUnitRelatedList: action.payload
         }
      case UNIT_RELATED_LIST_RESET:
         return {}
      default:
         return state
   }
 }
