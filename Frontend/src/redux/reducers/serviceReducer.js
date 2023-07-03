import {
  SERVICE_REGISTER_REQUEST,
  SERVICE_REGISTER_SUCCESS,
  SERVICE_REGISTER_FAIL,
  SERVICE_REGISTER_RESET,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_RESET,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_FAIL,
  SERVICE_UPDATE_RESET,
  SERVICE_DELETE_FAIL,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_RESET,
  SERVICE_RELATED_LIST_REQUEST,
  SERVICE_RELATED_LIST_SUCCESS,
  SERVICE_RELATED_LIST_FAIL,
  SERVICE_RELATED_LIST_RESET,
} from '../constants/serviceConstants'

export const serviceRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_REGISTER_REQUEST:
      return { loadingServiceRegister: true }
    case SERVICE_REGISTER_SUCCESS:
      return {
        loadingServiceRegister: false,
        successServiceRegister: true,
        service: action.payload,
      }
    case SERVICE_REGISTER_FAIL:
      return {
        loadingServiceRegister: false,
        errorServiceRegister: action.payload,
      }
    case SERVICE_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const serviceListReducer = (state = { services: [] }, action) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return { loadingServiceList: true }
    case SERVICE_LIST_SUCCESS:
      return {
        loadingServiceList: false,
        successServiceList: true,
        services: action.payload,
      }
    case SERVICE_LIST_FAIL:
      return { loadingServiceList: false, errorServiceList: action.payload }
    case SERVICE_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const serviceUpdateReducer = (state = { serviceUpdated: {} }, action) => {
  switch (action.type) {
    case SERVICE_UPDATE_REQUEST:
      return { loadingServiceUpdate: true }
    case SERVICE_UPDATE_SUCCESS:
      return {
        loadingServiceUpdate: false,
        successServiceUpdate: true,
        serviceUpdated: action.payload,
      }
    case SERVICE_UPDATE_FAIL:
      return { loadingServiceUpdate: false, errorServiceUpdate: action.payload }
    case SERVICE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const serviceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_DELETE_REQUEST:
      return { loadingServiceDelete: true }
    case SERVICE_DELETE_SUCCESS:
      return { loadingServiceDelete: false, successServiceDelete: true }
    case SERVICE_DELETE_FAIL:
      return { loadingServiceDelete: false, errorServiceDelete: action.payload }
    case SERVICE_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const serviceRelatedListReducer = (state = { servicesRelated: [] }, action) => {
   switch (action.type) {
     case SERVICE_RELATED_LIST_REQUEST:
       return { loadingServiceRelatedList: true }
     case SERVICE_RELATED_LIST_SUCCESS:
       return {
         loadingServiceRelatedList: false,
         successServiceRelatedList: true,
         servicesRelated: action.payload,
       }
     case SERVICE_RELATED_LIST_FAIL:
       return {
         loadingServiceRelatedList: false,
         errorServiceRelatedList: action.payload
      }
     case SERVICE_RELATED_LIST_RESET:
       return {}
     default:
       return state
   }
 }