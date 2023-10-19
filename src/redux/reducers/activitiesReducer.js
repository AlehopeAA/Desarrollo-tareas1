import {
  ACTIVITIES_LIST_REQUEST,
  ACTIVITIES_LIST_SUCCESS,
  ACTIVITIES_LIST_FAIL,
  ACTIVITIES_LIST_RESET,
  ACTIVITIES_INFO_REQUEST,
  ACTIVITIES_INFO_SUCCESS,
  ACTIVITIES_INFO_FAIL,
  ACTIVITIES_INFO_RESET,
  ACTIVITIES_REGISTER_REQUEST,
  ACTIVITIES_REGISTER_SUCCESS,
  ACTIVITIES_REGISTER_FAIL,
  ACTIVITIES_REGISTER_RESET,
  ACTIVITIES_UPDATE_REQUEST,
  ACTIVITIES_UPDATE_SUCCESS,
  ACTIVITIES_UPDATE_FAIL,
  ACTIVITIES_UPDATE_RESET,
  ACTIVITIES_DELETE_REQUEST,
  ACTIVITIES_DELETE_SUCCESS,
  ACTIVITIES_DELETE_FAIL,
  ACTIVITIES_DELETE_RESET,
  ACTIVITIES_LIST_BY_JOB_POSITION_ID_REQUEST,
  ACTIVITIES_LIST_BY_JOB_POSITION_ID_SUCCESS,
  ACTIVITIES_LIST_BY_JOB_POSITION_ID_RESET,
  ACTIVITIES_LIST_BY_JOB_POSITION_ID_FAIL,
} from '../constants/activitiesConstants'

export const activitiesListReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVITIES_LIST_REQUEST:
      return { loadingActivitiesList: true }
    case ACTIVITIES_LIST_SUCCESS:
      return {
        loadingActivitiesList: false,
        successActivitiesList: true,
        activitiesListData: action.payload,
      }
    case ACTIVITIES_LIST_FAIL:
      return {
        loadingActivitiesList: false,
        errorActivitiesList: action.payload,
      }
    case ACTIVITIES_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const activityInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVITIES_INFO_REQUEST:
      return { loadingActivityInfo: true, successActivityInfo: false, }
    case ACTIVITIES_INFO_SUCCESS:
      return {
        loadingActivityInfo: false,
        successActivityInfo: true,
        activityInfoData: action.payload,
      }
    case ACTIVITIES_INFO_FAIL:
      return {
        loadingActivityInfo: false,
        successActivityInfo: false,
        errorActivityInfo: action.payload,
      }
    case ACTIVITIES_INFO_RESET:
      return {}
    default:
      return state
  }
}

export const activitiesRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVITIES_REGISTER_REQUEST:
      return { loadingActivitiesRegister: true }
    case ACTIVITIES_REGISTER_SUCCESS:
      return {
        loadingActivitiesRegister: false,
        successActivitiesRegister: true,
        activitiesRegisterData: action.payload,
      }
    case ACTIVITIES_REGISTER_FAIL:
      return {
        loadingActivitiesRegister: false,
        errorActivitiesRegister: action.payload,
      }
    case ACTIVITIES_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const activitiesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVITIES_UPDATE_REQUEST:
      return { loadingActivitiesUpdate: true }
    case ACTIVITIES_UPDATE_SUCCESS:
      return {
        loadingActivitiesUpdate: false,
        successActivitiesUpdate: true,
        activitiesUpdateData: action.payload,
      }
    case ACTIVITIES_UPDATE_FAIL:
      return {
        loadingActivitiesUpdate: false,
        errorActivitiesUpdate: action.payload,
      }
    case ACTIVITIES_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const activitiesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVITIES_DELETE_REQUEST:
      return { loadingActivitiesDelete: true }
    case ACTIVITIES_DELETE_SUCCESS:
      return {
        loadingActivitiesDelete: false,
        successActivitiesDelete: true,
        activitiesDeleteData: action.payload,
      }
    case ACTIVITIES_DELETE_FAIL:
      return {
        loadingActivitiesDelete: false,
        errorActivitiesDelete: action.payload,
      }
    case ACTIVITIES_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const activitiesListByJobPositionIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVITIES_LIST_BY_JOB_POSITION_ID_REQUEST:
      return { loadingActivitiesListByJobPositionId: true }
    case ACTIVITIES_LIST_BY_JOB_POSITION_ID_SUCCESS:
      return {
        successActivitiesListByJobPositionId: true,
        loadingActivitiesListByJobPositionId: false,
        activitiesListByJobPositionIdData: action.payload,
      }
    case ACTIVITIES_LIST_BY_JOB_POSITION_ID_FAIL:
      return {
        loadingActivitiesListByJobPositionId: false,
        errorActivitiesListByJobPositionId: action.payload,
      }
    case ACTIVITIES_LIST_BY_JOB_POSITION_ID_RESET:
      return {}
    default:
      return state
  }
}
