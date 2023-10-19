import {
  TASK_OTHER_REGISTER_REQUEST,
  TASK_OTHER_REGISTER_SUCCESS,
  TASK_OTHER_REGISTER_FAIL,
  TASK_OTHER_REGISTER_RESET,
  TASK_OTHER_LIST_REQUEST,
  TASK_OTHER_LIST_SUCCESS,
  TASK_OTHER_LIST_FAIL,
  TASK_OTHER_LIST_RESET,
  TASK_OTHER_UPDATE_SUCCESS,
  TASK_OTHER_UPDATE_REQUEST,
  TASK_OTHER_UPDATE_FAIL,
  TASK_OTHER_UPDATE_RESET,
  TASK_OTHER_DELETE_FAIL,
  TASK_OTHER_DELETE_REQUEST,
  TASK_OTHER_DELETE_SUCCESS,
  TASK_OTHER_DELETE_RESET,
  TASK_HISTORICAL_REQUEST,
  TASK_HISTORICAL_SUCCESS,
  TASK_HISTORICAL_FAIL,
  TASK_HISTORICAL_RESET,
  TASK_PROFILES_REQUEST,
  TASK_PROFILES_SUCCESS,
  TASK_PROFILES_FAIL,
  TASK_PROFILES_RESET,
} from '../constants/taskOtherConstants.js'

export const taskOtherRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_OTHER_REGISTER_REQUEST:
      return { loadingTaskOtherRegister: true }
    case TASK_OTHER_REGISTER_SUCCESS:
      return {
        loadingTaskOtherRegister: false,
        successTaskOtherRegister: true,
        taskOther: action.payload,
      }
    case TASK_OTHER_REGISTER_FAIL:
      return {
        loadingTaskOtherRegister: false,
        errorTaskOtherRegister: action.payload,
      }
    case TASK_OTHER_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const taskOtherListReducer = (state = { taskOthers: [] }, action) => {
  switch (action.type) {
    case TASK_OTHER_LIST_REQUEST:
      return { loadingTaskOtherList: true }
    case TASK_OTHER_LIST_SUCCESS:
      return {
        loadingTaskOtherList: false,
        successTaskOtherList: true,
        taskOthers: action.payload,
      }
    case TASK_OTHER_LIST_FAIL:
      return { loadingTaskOtherList: false, errorTaskOtherList: action.payload }
    case TASK_OTHER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const taskOtherUpdateReducer = (state = { taskOtherUpdated: {} }, action) => {
  switch (action.type) {
    case TASK_OTHER_UPDATE_REQUEST:
      return { loadingTaskOtherUpdate: true }
    case TASK_OTHER_UPDATE_SUCCESS:
      return {
        loadingTaskOtherUpdate: false,
        successTaskOtherUpdate: true,
        taskOtherUpdated: action.payload,
      }
    case TASK_OTHER_UPDATE_FAIL:
      return { loadingTaskOtherUpdate: false, errorTaskOtherUpdate: action.payload }
    case TASK_OTHER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const taskOtherDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_OTHER_DELETE_REQUEST:
      return { loadingTaskOtherDelete: true }
    case TASK_OTHER_DELETE_SUCCESS:
      return { loadingTaskOtherDelete: false, successTaskOtherDelete: true }
    case TASK_OTHER_DELETE_FAIL:
      return { loadingTaskOtherDelete: false, errorTaskOtherDelete: action.payload }
    case TASK_OTHER_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const taskHistoricalListReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_HISTORICAL_REQUEST:
      return { loadingTaskHistoricalList: true }
    case TASK_HISTORICAL_SUCCESS:
      return {
        loadingTaskHistoricalList: false,
        successTaskHistoricalList: true,
        taskHistoricalListData: action.payload,
      }
    case TASK_HISTORICAL_FAIL:
      return {
        loadingTaskHistoricalList: false,
        errorTaskHistoricalList: action.payload,
      }
    case TASK_HISTORICAL_RESET:
      return {}
    default:
      return state
  }
}

export const taskProfilesReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_PROFILES_REQUEST:
      return { loadingTaskProfiles: true }
    case TASK_PROFILES_SUCCESS:
      return {
        loadingTaskProfiles: false,
        successTaskProfiles: true,
        taskProfilesData: action.payload,
      }
    case TASK_PROFILES_FAIL:
      return {
        loadingTaskProfiles: false,
        errorTaskProfiles: action.payload,
      }
    case TASK_PROFILES_RESET:
      return {}
    default:
      return state
  }
}
