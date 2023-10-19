import {
   PROFILE_REGISTER_REQUEST,
   PROFILE_REGISTER_SUCCESS,
   PROFILE_REGISTER_FAIL,
   PROFILE_REGISTER_RESET,
   PROFILE_LIST_REQUEST,
   PROFILE_LIST_SUCCESS,
   PROFILE_LIST_FAIL,
   PROFILE_LIST_RESET,
   PROFILE_UPDATE_SUCCESS,
   PROFILE_UPDATE_REQUEST,
   PROFILE_UPDATE_FAIL,
   PROFILE_UPDATE_RESET,
   PROFILE_DELETE_FAIL,
   PROFILE_DELETE_REQUEST,
   PROFILE_DELETE_SUCCESS,
   PROFILE_DELETE_RESET,
   PROFILE_BY_POSITION_LIST_REQUEST,
   PROFILE_BY_POSITION_LIST_SUCCESS,
   PROFILE_BY_POSITION_LIST_FAIL,
   PROFILE_BY_POSITION_LIST_RESET,
} from '../constants/profileConstants.js'

export const profileRegisterReducer = (state = {}, action) => {
   switch (action.type) {
      case PROFILE_REGISTER_REQUEST:
         return { loadingProfileRegister: true }
      case PROFILE_REGISTER_SUCCESS:
         return {
         loadingProfileRegister: false,
         successProfileRegister: true,
         profile: action.payload,
         }
      case PROFILE_REGISTER_FAIL:
         return {
         loadingProfileRegister: false,
         errorProfileRegister: action.payload,
         }
      case PROFILE_REGISTER_RESET:
         return {}
      default:
         return state
   }
}

export const profileListReducer = (state = { profiles: [] }, action) => {
   switch (action.type) {
      case PROFILE_LIST_REQUEST:
         return { loadingProfileList: true }
      case PROFILE_LIST_SUCCESS:
         return {
         loadingProfileList: false,
         successProfileList: true,
         profiles: action.payload,
         }
      case PROFILE_LIST_FAIL:
         return { loadingProfileList: false, errorProfileList: action.payload }
      case PROFILE_LIST_RESET:
         return {}
      default:
         return state
   }
}

export const profileUpdateReducer = (state = { profileUpdated: {} }, action) => {
   switch (action.type) {
      case PROFILE_UPDATE_REQUEST:
         return { loadingProfileUpdate: true }
      case PROFILE_UPDATE_SUCCESS:
         return {
         loadingProfileUpdate: false,
         successProfileUpdate: true,
         profileUpdated: action.payload,
         }
      case PROFILE_UPDATE_FAIL:
         return { loadingProfileUpdate: false, errorProfileUpdate: action.payload }
      case PROFILE_UPDATE_RESET:
         return {}
      default:
         return state
   }
}

export const profileDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case PROFILE_DELETE_REQUEST:
         return { loadingProfileDelete: true }
      case PROFILE_DELETE_SUCCESS:
         return { loadingProfileDelete: false, successProfileDelete: true }
      case PROFILE_DELETE_FAIL:
         return { loadingProfileDelete: false, errorProfileDelete: action.payload }
      case PROFILE_DELETE_RESET:
         return {}
      default:
         return state
   }
}

export const profileByPositionListReducer = (state = { profileByPosition: [] }, action) => {
   switch (action.type) {
      case PROFILE_BY_POSITION_LIST_REQUEST:
         return { loadingProfileByPositionList: true }
      case PROFILE_BY_POSITION_LIST_SUCCESS:
         return {
         loadingProfileByPositionList: false,
         successProfileByPositionList: true,
         profilesByPosition: action.payload,
         }
      case PROFILE_BY_POSITION_LIST_FAIL:
         return { loadingProfileByPositionList: false, errorProfileByPositionList: action.payload }
      case PROFILE_BY_POSITION_LIST_RESET:
         return {}
      default:
         return state
   }
}
