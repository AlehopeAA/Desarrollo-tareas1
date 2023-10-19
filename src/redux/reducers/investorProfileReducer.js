import {
  INVESTOR_PROFILE_REGISTER_REQUEST,
  INVESTOR_PROFILE_REGISTER_SUCCESS,
  INVESTOR_PROFILE_REGISTER_FAIL,
  INVESTOR_PROFILE_REGISTER_RESET,
  INVESTORS_PROFILE_BY_USER_REQUEST,
  INVESTORS_PROFILE_BY_USER_SUCCESS,
  INVESTORS_PROFILE_BY_USER_FAIL,
  INVESTORS_PROFILE_BY_USER_RESET,
  INVESTOR_PROFILE_UPDATE_REQUEST,
  INVESTOR_PROFILE_UPDATE_SUCCESS,
  INVESTOR_PROFILE_UPDATE_FAIL,
  INVESTOR_PROFILE_UPDATE_RESET,
} from '../constants/investorProfileConstants'

export const investorProfileRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTOR_PROFILE_REGISTER_REQUEST:
      return { loadingInvestorPofileRegister: true }
    case INVESTOR_PROFILE_REGISTER_SUCCESS:
      return {
        successInvestorProfileRegister: true,
        loadingInvestorPofileRegister: false,
        investorResponse: action.payload,
      }
    case INVESTOR_PROFILE_REGISTER_FAIL:
      return {
        loadingInvestorPofileRegister: false,
        errorInvestorPofileRegister: action.payload,
      }
    case INVESTOR_PROFILE_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const investorsProfileByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTORS_PROFILE_BY_USER_REQUEST:
      return { loadingInvestorsProfileByUser: true }
    case INVESTORS_PROFILE_BY_USER_SUCCESS:
      return {
        successInvestorsProfileByUser: true,
        loadingInvestorsProfileByUser: false,
        investorsProfileByUserData: action.payload,
      }
    case INVESTORS_PROFILE_BY_USER_FAIL:
      return {
        loadingInvestorsProfileByUser: false,
        errorInvestorsProfileByUser: action.payload,
      }
    case INVESTORS_PROFILE_BY_USER_RESET:
      return {}
    default:
      return state
  }
}

export const investorProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTOR_PROFILE_UPDATE_REQUEST:
      return { loadingInvestorProfileUpdate: true }
    case INVESTOR_PROFILE_UPDATE_SUCCESS:
      return {
        successInvestorProfileUpdate: true,
        loadingInvestorProfileUpdate: false,
        investorProfileUpdateData: action.payload,
      }
    case INVESTOR_PROFILE_UPDATE_FAIL:
      return {
        loadingInvestorProfileUpdate: false,
        errorInvestorProfileUpdate: action.payload,
      }
    case INVESTOR_PROFILE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
