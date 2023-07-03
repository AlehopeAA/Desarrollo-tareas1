import {
  PROJECT_REGISTER_REQUEST,
  PROJECT_REGISTER_SUCCESS,
  PROJECT_REGISTER_FAIL,
  PROJECT_REGISTER_RESET,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_LIST_RESET,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_RESET,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_RESET,
} from '../constants/projectConstant'

export const projectRegisterReducer = (state = { loadingProjectRegister: false }, action) => {
  switch (action.type) {
    case PROJECT_REGISTER_REQUEST:
      return { loadingProjectRegister: true }
    case PROJECT_REGISTER_SUCCESS:
      return {
        successProjectRegister: true,
        loadingProjectRegister: false,
        projectRegisterData: action.payload,
      }
    case PROJECT_REGISTER_FAIL:
      return {
        loadingProjectRegister: false,
        errorProjectRegister: action.payload,
      }
    case PROJECT_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const projectListReducer = (state = { loadingProjectList: false }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loadingProjectList: true }
    case PROJECT_LIST_SUCCESS:
      return {
        successProjectList: true,
        loadingProjectList: false,
        projectListData: action.payload,
      }
    case PROJECT_LIST_FAIL:
      return {
        loadingProjectList: false,
        errorProjectList: action.payload,
      }
    case PROJECT_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const projectUpdateReducer = (state = { loadingProjectUpdate: false }, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return { loadingProjectUpdate: true }
    case PROJECT_UPDATE_SUCCESS:
      return {
        successProjectUpdate: true,
        loadingProjectUpdate: false,
        projectUpdateData: action.payload,
      }
    case PROJECT_UPDATE_FAIL:
      return {
        loadingProjectUpdate: false,
        errorProjectUpdate: action.payload,
      }
    case PROJECT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const projectDeleteReducer = (state = { loadingProjectDelete: false }, action) => {
  switch (action.type) {
    case PROJECT_DELETE_REQUEST:
      return { loadingProjectDelete: true }
    case PROJECT_DELETE_SUCCESS:
      return {
        successProjectDelete: true,
        loadingProjectDelete: false,
        projectDeleteData: action.payload,
      }
    case PROJECT_DELETE_FAIL:
      return {
        loadingProjectDelete: false,
        errorProjectDelete: action.payload,
      }
    case PROJECT_DELETE_RESET:
      return {}
    default:
      return state
  }
}
