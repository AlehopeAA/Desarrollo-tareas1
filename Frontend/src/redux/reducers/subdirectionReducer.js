import {
   SUBDIRECTION_REGISTER_REQUEST,
   SUBDIRECTION_REGISTER_SUCCESS,
   SUBDIRECTION_REGISTER_FAIL,
   SUBDIRECTION_REGISTER_RESET,
   SUBDIRECTION_LIST_REQUEST,
   SUBDIRECTION_LIST_SUCCESS,
   SUBDIRECTION_LIST_FAIL,
   SUBDIRECTION_LIST_RESET,
   SUBDIRECTION_UPDATE_SUCCESS,
   SUBDIRECTION_UPDATE_REQUEST,
   SUBDIRECTION_UPDATE_FAIL,
   SUBDIRECTION_UPDATE_RESET,
   SUBDIRECTION_DELETE_FAIL,
   SUBDIRECTION_DELETE_REQUEST,
   SUBDIRECTION_DELETE_SUCCESS,
   SUBDIRECTION_DELETE_RESET,
   SUBDIRECTION_RELATED_LIST_REQUEST,
   SUBDIRECTION_RELATED_LIST_SUCCESS,
   SUBDIRECTION_RELATED_LIST_FAIL,
   SUBDIRECTION_RELATED_LIST_RESET,
} from '../constants/subdirectionConstants.js'

export const subdirectionRegisterReducer = (state = {}, action) => {
   switch (action.type) {
      case SUBDIRECTION_REGISTER_REQUEST:
         return { loadingSubdirectionRegister: true }
      case SUBDIRECTION_REGISTER_SUCCESS:
         return {
         loadingSubdirectionRegister: false,
         successSubdirectionRegister: true,
         subdirection: action.payload,
         }
      case SUBDIRECTION_REGISTER_FAIL:
         return {
         loadingSubdirectionRegister: false,
         errorSubdirectionRegister: action.payload,
         }
      case SUBDIRECTION_REGISTER_RESET:
         return {}
      default:
         return state
   }
}

export const subdirectionListReducer = (state = { subdirections: [] }, action) => {
   switch (action.type) {
      case SUBDIRECTION_LIST_REQUEST:
         return { loadingSubdirectionList: true }
      case SUBDIRECTION_LIST_SUCCESS:
         return {
         loadingSubdirectionList: false,
         successSubdirectionList: true,
         subdirections: action.payload,
         }
      case SUBDIRECTION_LIST_FAIL:
         return { loadingSubdirectionList: false, errorSubdirectionList: action.payload }
      case SUBDIRECTION_LIST_RESET:
         return {}
      default:
         return state
   }
}

export const subdirectionUpdateReducer = (state = { subdirectionUpdated: {} }, action) => {
   switch (action.type) {
      case SUBDIRECTION_UPDATE_REQUEST:
         return { loadingSubdirectionUpdate: true }
      case SUBDIRECTION_UPDATE_SUCCESS:
         return {
         loadingSubdirectionUpdate: false,
         successSubdirectionUpdate: true,
         subdirectionUpdated: action.payload,
         }
      case SUBDIRECTION_UPDATE_FAIL:
         return { loadingSubdirectionUpdate: false, errorSubdirectionUpdate: action.payload }
      case SUBDIRECTION_UPDATE_RESET:
         return {}
      default:
         return state
   }
}

export const subdirectionDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case SUBDIRECTION_DELETE_REQUEST:
         return { loadingSubdirectionDelete: true }
      case SUBDIRECTION_DELETE_SUCCESS:
         return { loadingSubdirectionDelete: false, successSubdirectionDelete: true }
      case SUBDIRECTION_DELETE_FAIL:
         return { loadingSubdirectionDelete: false, errorSubdirectionDelete: action.payload }
      case SUBDIRECTION_DELETE_RESET:
         return {}
      default:
         return state
   }
}

export const subdirectionRelatedListReducer = (state = { subdirectionsRelated: [] }, action) => {
   switch (action.type) {
      case SUBDIRECTION_RELATED_LIST_REQUEST:
         return { loadingSubdirectionRelatedList: true }
      case SUBDIRECTION_RELATED_LIST_SUCCESS:
         return {
         loadingSubdirectionRelatedList: false,
         successSubdirectionRelatedList: true,
         subdirectionsRelated: action.payload,
         }
      case SUBDIRECTION_RELATED_LIST_FAIL:
         return { loadingSubdirectionRelatedList: false, errorSubdirectionRelatedList: action.payload }
      case SUBDIRECTION_RELATED_LIST_RESET:
         return {}
      default:
         return state
   }
}
