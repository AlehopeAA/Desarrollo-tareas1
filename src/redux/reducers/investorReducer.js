import {
  INVESTOR_REGISTER_REQUEST,
  INVESTOR_REGISTER_SUCCESS,
  INVESTOR_REGISTER_FAIL,
  INVESTOR_REGISTER_RESET,
  INVESTOR_LIST_FAIL,
  INVESTOR_LIST_REQUEST,
  INVESTOR_LIST_SUCCESS,
  INVESTOR_LIST_RESET,
} from '../constants/investorConstant'

export const investorRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTOR_REGISTER_REQUEST:
      return { loadingInvestorRegister: true }
    case INVESTOR_REGISTER_SUCCESS:
      return {
        succesInvestorRegister: true,
        loadingInvestorRegister: false,
        investorResponse: action.payload,
      }
    case INVESTOR_REGISTER_FAIL:
      return {
        loadingInvestorRegister: false,
        errorInvestorRegister: action.payload,
      }
    case INVESTOR_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const investorGetUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTOR_LIST_REQUEST:
      return { loadingInvestorGetUsers: true }
    case INVESTOR_LIST_SUCCESS:
      return {
        successInvestorGetUsers: true,
        loadingInvestorGetUsers: false,
        investorGetUsersData: action.payload,
      }
    case INVESTOR_LIST_FAIL:
      return {
        loadingInvestorGetUsers: false,
        errorInvestorGetUsersData: action.payload,
      }
    case INVESTOR_LIST_RESET:
      return {}
    default:
      return state
  }
}
