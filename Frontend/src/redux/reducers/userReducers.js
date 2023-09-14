import {
  USER_AVISOS_REQUEST,
  USER_AVISOS_SUCCESS,
  USER_AVISOS_FAIL,
  USER_AVISOS_RESET,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_REFRESH_TOKEN_REQUEST,
  USER_REFRESH_TOKEN_SUCCESS,
  USER_REFRESH_TOKEN_FAIL,
  USER_REFRESH_TOKEN_RESET,
  USER_LIST_BY_ROLE_NAME_REQUEST,
  USER_LIST_BY_ROLE_NAME_SUCCESS,
  USER_LIST_BY_ROLE_NAME_FAIL,
  USER_LIST_BY_ROLE_NAME_RESET,
  USER_PROFILE_INFO_RESET,
  USER_PROFILE_INFO_REQUEST,
  USER_PROFILE_INFO_SUCCESS,
  USER_PROFILE_INFO_FAIL,
  USER_RESPONSIBLES_LIST_REQUEST,
  USER_RESPONSIBLES_LIST_SUCCESS,
  USER_RESPONSIBLES_LIST_FAIL,
  USER_RESPONSIBLES_LIST_RESET,
  USER_VALIDATORS_LIST_REQUEST,
  USER_VALIDATORS_LIST_SUCCESS,
  USER_VALIDATORS_LIST_RESET,
  USER_VALIDATORS_LIST_FAIL,
  USER_LIST_BY_PROFILE_ID_REQUEST,
  USER_LIST_BY_PROFILE_ID_SUCCESS,
  USER_LIST_BY_PROFILE_ID_RESET,
  USER_LIST_BY_PROFILE_ID_FAIL,
  USER_GET_FAVORITES_RESET,
  USER_GET_FAVORITES_REQUEST,
  USER_GET_FAVORITES_SUCCESS,
  USER_GET_FAVORITES_FAIL,
  USER_REGISTER_FAVORITES_RESET,
  USER_REGISTER_FAVORITES_REQUEST,
  USER_REGISTER_FAVORITES_SUCCESS,
  USER_REGISTER_FAVORITES_FAIL,
  USER_SHARED_TASKS_COUNT_REQUEST,
  USER_SHARED_TASKS_COUNT_SUCCESS,
  USER_SHARED_TASKS_COUNT_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loadingUserInfo: true }
    case USER_LOGIN_SUCCESS:
      return { loadingUserInfo: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loadingUserInfo: false, errorUserInfo: action.payload }
    case USER_LOGOUT:
      localStorage.removeItem('setADA')
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loadingUserRegister: true }
    case USER_REGISTER_SUCCESS:
      return {
        loadingUserRegister: false,
        successUserRegister: true,
        user: action.payload,
      }
    case USER_REGISTER_FAIL:
      return {
        loadingUserRegister: false,
        errorUserRegister: action.payload,
      }
    case USER_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const userSharedTasksCountReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SHARED_TASKS_COUNT_REQUEST:
      return { loadingUserSharedTaskCount : true }
    case USER_SHARED_TASKS_COUNT_SUCCESS:
      return {
        loadingUserSharedTaskCount: false,
        successUserSharedTaskCount: true,
        countUserSharedTaskCount: action.payload,
      }
    case USER_SHARED_TASKS_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const userAvisosReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_AVISOS_REQUEST:
      return { loadingUserAvisos: true }
    case USER_AVISOS_SUCCESS:
      return {
        loadingUserAvisos: false,
        successUserAvisos: true,
        avisos: action.payload,
      }
    case USER_AVISOS_FAIL:
      return {
        loadingUserAvisos: false,
        errorUserAvisos: action.payload,
      }
    case USER_AVISOS_RESET:
      return {}
    default:
      return state
  }
}

export const refreshTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REFRESH_TOKEN_REQUEST:
      return { loadingRefreshToken: true }
    case USER_REFRESH_TOKEN_SUCCESS:
      return {
        loadingRefreshToken: false,
        successRefreshToken: true,
      }
    case USER_REFRESH_TOKEN_FAIL:
      return {
        loadingRefreshToken: false,
        errorRefreshToken: action.payload,
      }
    case USER_REFRESH_TOKEN_RESET:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loadingUserList: true }
    case USER_LIST_SUCCESS:
      return {
        loadingUserList: false,
        successUserList: true,
        thatsIt: action.payload.length === 0 ? true : false,
        users: action.payload,
      }
    case USER_LIST_FAIL:
      return { loadingUserList: false, errorUserList: action.payload }
    case USER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loadingUserDetails: true }
    case USER_DETAILS_SUCCESS:
      return {
        loadingUserDetails: false,
        successUserDetails: true,
        userDetailData: action.payload,
      }
    case USER_DETAILS_FAIL:
      return {
        loadingUserDetails: false,
        errorUserDetails: action.payload,
      }
    case USER_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const userUpdateReducer = (state = { userUpdated: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loadingUserUpdate: true }
    case USER_UPDATE_SUCCESS:
      return {
        loadingUserUpdate: false,
        successUserUpdate: true,
        userUpdated: action.payload,
      }
    case USER_UPDATE_FAIL:
      return { loadingUserUpdate: false, errorUserUpdate: action.payload }
    case USER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
export const userGetProfileInfoeReducer = (state = { profileInfo: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_INFO_REQUEST:
      return { loadingUserProfileInfo: true }
    case USER_PROFILE_INFO_SUCCESS:
      return {
        loadingUserProfileInfo: false,
        successUserProfileInfo: true,
        profileInfo: action.payload,
      }
    case USER_PROFILE_INFO_FAIL:
      return { loadingUserProfileInfo: false, errorUserProfileInfo: action.payload }
    case USER_PROFILE_INFO_RESET:
      return {}
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loadingUserDelete: true }
    case USER_DELETE_SUCCESS:
      return { loadingUserDelete: false, successUserDelete: true }
    case USER_DELETE_FAIL:
      return { loadingUserDelete: false, errorUserDelete: action.payload }
    case USER_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const userListByRoleNameReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_BY_ROLE_NAME_REQUEST:
      return { loadingUserListByRoleName: true }
    case USER_LIST_BY_ROLE_NAME_SUCCESS:
      return {
        successUserListByRoleName: true,
        loadingUserListByRoleName: false,
        userListByRoleNameData: action.payload,
      }
    case USER_LIST_BY_ROLE_NAME_FAIL:
      return {
        loadingUserListByRoleName: false,
        errorUserListByRoleName: action.payload,
      }
    case USER_LIST_BY_ROLE_NAME_RESET:
      return {}
    default:
      return state
  }
}

export const userListByProfileIdReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_BY_PROFILE_ID_REQUEST:
      return { loadingUserListByProfileId: true }
    case USER_LIST_BY_PROFILE_ID_SUCCESS:
      return {
        successUserListByProfileId: true,
        loadingUserListByProfileId: false,
        userListByProfileIdData: action.payload,
      }
    case USER_LIST_BY_PROFILE_ID_FAIL:
      return {
        loadingUserListByProfileId: false,
        errorUserListByProfileId: action.payload,
      }
    case USER_LIST_BY_PROFILE_ID_RESET:
      return {}
    default:
      return state
  }
}

export const userListResponsiblesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESPONSIBLES_LIST_REQUEST:
      return { loadingUserResponsiblesList: true }
    case USER_RESPONSIBLES_LIST_SUCCESS:
      return {
        successUserResponsiblesList: true,
        loadingUserResponsiblesList: false,
        userResponsiblesListData: action.payload,
      }
    case USER_RESPONSIBLES_LIST_FAIL:
      return {
        loadingUserResponsiblesList: false,
        errorUserResponsiblesList: action.payload,
      }
    case USER_RESPONSIBLES_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const userListValidatorsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VALIDATORS_LIST_REQUEST:
      return { loadingUserValidatorsList: true }
    case USER_VALIDATORS_LIST_SUCCESS:
      return {
        successUserValidatorsList: true,
        loadingUserValidatorsList: false,
        userValidatorsListData: action.payload,
      }
    case USER_VALIDATORS_LIST_FAIL:
      return {
        loadingUserValidatorsList: false,
        errorUserValidatorsList: action.payload,
      }
    case USER_VALIDATORS_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const userGetFavoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_FAVORITES_REQUEST:
      return { loadingUserGetFavorites: true }
    case USER_GET_FAVORITES_SUCCESS:
      return {
        loadingUserGetFavorites: false,
        successUserGetFavorites: true,
        userGetFavorites: action.payload,
      }
    case USER_GET_FAVORITES_FAIL:
      return {
        loadingUserGetFavorites: false,
        errorUserGetFavorites: action.payload,
      }
    case USER_GET_FAVORITES_RESET:
      return {}
    default:
      return state
  }
}

export const userRegisterFavoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_FAVORITES_REQUEST:
      return { loadingUserRegisterFavorites: true }
    case USER_REGISTER_FAVORITES_SUCCESS:
      return {
        loadingUserRegisterFavorites: false,
        successUserRegisterFavorites: true,
        userRegisterFavorites: action.payload,
      }
    case USER_REGISTER_FAVORITES_FAIL:
      return {
        loadingUserRegisterFavorites: false,
        errorUserRegisterFavorites: action.payload,
      }
    case USER_REGISTER_FAVORITES_RESET:
      return {}
    default:
      return state
  }
}