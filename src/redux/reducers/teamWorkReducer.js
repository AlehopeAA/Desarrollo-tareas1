import {
  TEAM_WORK_REGISTER_BY_RESPONSIBLE_REQUEST,
  TEAM_WORK_REGISTER_BY_RESPONSIBLE_SUCCESS,
  TEAM_WORK_REGISTER_BY_RESPONSIBLE_FAIL,
  TEAM_WORK_REGISTER_BY_RESPONSIBLE_RESET,
  TEAM_WORK_REGISTER_BY_PERMISSION_REQUEST,
  TEAM_WORK_REGISTER_BY_PERMISSION_SUCCESS,
  TEAM_WORK_REGISTER_BY_PERMISSION_FAIL,
  TEAM_WORK_REGISTER_BY_PERMISSION_RESET,
  TEAM_WORK_LIST_REQUEST,
  TEAM_WORK_LIST_SUCCESS,
  TEAM_WORK_LIST_FAIL,
  TEAM_WORK_LIST_RESET,
  TEAM_WORK_UPDATE_SUCCESS,
  TEAM_WORK_UPDATE_REQUEST,
  TEAM_WORK_UPDATE_FAIL,
  TEAM_WORK_UPDATE_RESET,
  TEAM_WORK_DELETE_FAIL,
  TEAM_WORK_DELETE_REQUEST,
  TEAM_WORK_DELETE_SUCCESS,
  TEAM_WORK_DELETE_RESET,
  TEAM_WORK_LIST_BY_ROLE_REQUEST,
  TEAM_WORK_LIST_BY_ROLE_SUCCESS,
  TEAM_WORK_LIST_BY_ROLE_FAIL,
  TEAM_WORK_LIST_BY_ROLE_RESET,
  TEAM_WORKS_BY_RESPONSIBLE_REQUEST,
  TEAM_WORKS_BY_RESPONSIBLE_SUCCESS,
  TEAM_WORKS_BY_RESPONSIBLE_FAIL,
  TEAM_WORKS_BY_RESPONSIBLE_RESET,
  TEAM_WORKS_BY_VALIDATOR_REQUEST,
  TEAM_WORKS_BY_VALIDATOR_SUCCESS,
  TEAM_WORKS_BY_VALIDATOR_FAIL,
  TEAM_WORKS_BY_VALIDATOR_RESET,
  TEAM_WORK_REGISTER_BY_VALIDATOR_REQUEST,
  TEAM_WORK_REGISTER_BY_VALIDATOR_SUCCESS,
  TEAM_WORK_REGISTER_BY_VALIDATOR_FAIL,
  TEAM_WORK_REGISTER_BY_VALIDATOR_RESET,
  TEAM_WORK_HISTORICAL_REQUEST,
  TEAM_WORK_HISTORICAL_SUCCESS,
  TEAM_WORK_HISTORICAL_FAIL,
  TEAM_WORK_HISTORICAL_RESET,
} from '../constants/teamWorkConstants'

export const teamWorkRegisterByResponsibleReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_WORK_REGISTER_BY_RESPONSIBLE_REQUEST:
      return { loadingTeamWorkByResponsibleRegister: true }
    case TEAM_WORK_REGISTER_BY_RESPONSIBLE_SUCCESS:
      return {
        loadingTeamWorkByResponsibleRegister: false,
        successTeamWorkByResponsibleRegister: true,
        teamWorkByResponsibleRegisterData: action.payload,
      }
    case TEAM_WORK_REGISTER_BY_RESPONSIBLE_FAIL:
      return {
        loadingTeamWorkByResponsibleRegister: false,
        errorTeamWorkByResponsibleRegister: action.payload,
      }
    case TEAM_WORK_REGISTER_BY_RESPONSIBLE_RESET:
      return {}
    default:
      return state
  }
}

export const teamWorkRegisterByPermissionReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_WORK_REGISTER_BY_PERMISSION_REQUEST:
      return { loadingTeamWorkByPermissionRegister: true }
    case TEAM_WORK_REGISTER_BY_PERMISSION_SUCCESS:
      return {
        loadingTeamWorkByPermissionRegister: false,
        successTeamWorkByPermissionRegister: true,
        teamWorkByPermissionRegisterData: action.payload,
      }
    case TEAM_WORK_REGISTER_BY_PERMISSION_FAIL:
      return {
        loadingTeamWorkByPermissionRegister: false,
        errorTeamWorkByPermissionRegister: action.payload,
      }
    case TEAM_WORK_REGISTER_BY_PERMISSION_RESET:
      return {}
    default:
      return state
  }
}

export const teamWorkRegisterByValidatorReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_WORK_REGISTER_BY_VALIDATOR_REQUEST:
      return { loadingTeamWorkByValidatorRegister: true }
    case TEAM_WORK_REGISTER_BY_VALIDATOR_SUCCESS:
      return {
        loadingTeamWorkByValidatorRegister: false,
        successTeamWorkByValidatorRegister: true,
        teamWorkByValidatorRegisterData: action.payload,
      }
    case TEAM_WORK_REGISTER_BY_VALIDATOR_FAIL:
      return {
        loadingTeamWorkByValidatorRegister: false,
        errorTeamWorkByValidatorRegister: action.payload,
      }
    case TEAM_WORK_REGISTER_BY_VALIDATOR_RESET:
      return {}
    default:
      return state
  }
}

export const teamWorkListReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_WORK_LIST_REQUEST:
      return { loadingTeamWorkList: true }
    case TEAM_WORK_LIST_SUCCESS:
      return {
        loadingTeamWorkList: false,
        successTeamWorkList: true,
        teamWorkListData: action.payload,
      }
    case TEAM_WORK_LIST_FAIL:
      return { loadingTeamWorkList: false, errorTeamWorkList: action.payload }
    case TEAM_WORK_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const teamWorkListByRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_WORK_LIST_BY_ROLE_REQUEST:
      return { loadingTeamWorkListByRole: true }
    case TEAM_WORK_LIST_BY_ROLE_SUCCESS:
      return {
        loadingTeamWorkListByRole: false,
        successTeamWorkListByRole: true,
        teamWorkListByRoleData: action.payload,
      }
    case TEAM_WORK_LIST_BY_ROLE_FAIL:
      return { loadingTeamWorkListByRole: false, errorTeamWorkListByRole: action.payload }
    case TEAM_WORK_LIST_BY_ROLE_RESET:
      return {}
    default:
      return state
  }
}

export const teamWorksByResponsibleReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_WORKS_BY_RESPONSIBLE_REQUEST:
      return { loadingTeamWorksByResponsible: true }
    case TEAM_WORKS_BY_RESPONSIBLE_SUCCESS:
      return {
        loadingTeamWorksByResponsible: false,
        successTeamWorksByResponsible: true,
        teamWorksByResponsibleData: action.payload,
      }
    case TEAM_WORKS_BY_RESPONSIBLE_FAIL:
      return { loadingTeamWorksByResponsible: false, errorTeamWorksByResponsible: action.payload }
    case TEAM_WORKS_BY_RESPONSIBLE_RESET:
      return {}
    default:
      return state
  }
}

export const teamWorksByValidatorReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_WORKS_BY_VALIDATOR_REQUEST:
      return { loadingTeamWorksByValidator: true }
    case TEAM_WORKS_BY_VALIDATOR_SUCCESS:
      return {
        loadingTeamWorksByValidator: false,
        successTeamWorksByValidator: true,
        teamWorksByValidatorData: action.payload,
      }
    case TEAM_WORKS_BY_VALIDATOR_FAIL:
      return { loadingTeamWorksByValidator: false, errorTeamWorksByValidator: action.payload }
    case TEAM_WORKS_BY_VALIDATOR_RESET:
      return {}
    default:
      return state
  }
}

export const teamWorkDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_WORK_DELETE_REQUEST:
      return { loadingTeamWorkDelete: true }
    case TEAM_WORK_DELETE_SUCCESS:
      return { loadingTeamWorkDelete: false, successTeamWorkDelete: true }
    case TEAM_WORK_DELETE_FAIL:
      return { loadingTeamWorkDelete: false, errorTeamWorkDelete: action.payload }
    case TEAM_WORK_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const teamWorkUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_WORK_UPDATE_REQUEST:
      return { loadingTeamWorkUpdate: true }
    case TEAM_WORK_UPDATE_SUCCESS:
      return { loadingTeamWorkUpdate: false, successTeamWorkUpdate: true }
    case TEAM_WORK_UPDATE_FAIL:
      return { loadingTeamWorkUpdate: false, errorTeamWorkUpdate: action.payload }
    case TEAM_WORK_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const teamWorkHistoricalListReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_WORK_HISTORICAL_REQUEST:
      return { loadingTeamWorkHistoricalList: true }
    case TEAM_WORK_HISTORICAL_SUCCESS:
      return {
        loadingTeamWorkHistoricalList: false,
        successTeamWorkHistoricalList: true,
        teamWorkHistoricalListData: action.payload,
      }
    case TEAM_WORK_HISTORICAL_FAIL:
      return {
        loadingTeamWorkHistoricalList: false,
        errorTeamWorkHistoricalList: action.payload,
      }
    case TEAM_WORK_HISTORICAL_RESET:
      return {}
    default:
      return state
  }
}