import {
  INVESTMENT_REGISTER_REQUEST,
  INVESTMENT_REGISTER_SUCCESS,
  INVESTMENT_REGISTER_FAIL,
  INVESTMENT_REGISTER_RESET,
  INVESTMENT_MY_LIST_REQUEST,
  INVESTMENT_MY_LIST_SUCCESS,
  INVESTMENT_MY_LIST_RESET,
  INVESTMENT_MY_LIST_FAIL,
  INVESTMENT_ANNULATION_REQUEST_REQUEST,
  INVESTMENT_ANNULATION_REQUEST_SUCCESS,
  INVESTMENT_ANNULATION_REQUEST_FAIL,
  INVESTMENT_ANNULATION_REQUEST_RESET,
  INVESTMENT_ADMIN_DECLINE_REQUEST,
  INVESTMENT_ADMIN_DECLINE_SUCCESS,
  INVESTMENT_ADMIN_DECLINE_FAIL,
  INVESTMENT_ADMIN_DECLINE_RESET,
  INVESTMENTS_BY_PROJECT_REQUEST,
  INVESTMENTS_BY_PROJECT_SUCCESS,
  INVESTMENTS_BY_PROJECT_FAIL,
  INVESTMENTS_BY_PROJECT_RESET,
  INVESTMENT_CANCELLATION_LIST_REQUEST,
  INVESTMENT_CANCELLATION_LIST_SUCCESS,
  INVESTMENT_CANCELLATION_LIST_FAIL,
  INVESTMENT_CANCELLATION_LIST_RESET,
  INVESTMENT_LIST_REQUEST,
  INVESTMENT_LIST_SUCCESS,
  INVESTMENT_LIST_FAIL,
  INVESTMENT_LIST_RESET,
  INVESTMENT_HISTORY_REQUEST,
  INVESTMENT_HISTORY_SUCCESS,
  INVESTMENT_HISTORY_FAIL,
  INVESTMENT_HISTORY_RESET,
  INVESTMENTS_BY_PROFILE_AND_PROJECT_REQUEST,
  INVESTMENTS_BY_PROFILE_AND_PROJECT_SUCCESS,
  INVESTMENTS_BY_PROFILE_AND_PROJECT_FAIL,
  INVESTMENTS_BY_PROFILE_AND_PROJECT_RESET,
  INVESTMENTS_BY_PROFILE_REQUEST,
  INVESTMENTS_BY_PROFILE_SUCCESS,
  INVESTMENTS_BY_PROFILE_FAIL,
  INVESTMENTS_BY_PROFILE_RESET,
} from '../constants/investmentConstants'

export const investmentRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTMENT_REGISTER_REQUEST:
      return { loadingInvestmentRegister: true }
    case INVESTMENT_REGISTER_SUCCESS:
      return {
        investmentRegisterSuccess: true,
        loadingInvestmentRegister: false,
        investmentRegisterData: action.payload,
      }
    case INVESTMENT_REGISTER_FAIL:
      return {
        loadingInvestmentRegister: false,
        errorInvestmentRegister: action.payload,
      }
    case INVESTMENT_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const investmentsByProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTMENTS_BY_PROJECT_REQUEST:
      return { loadingInvestmentsByProject: true }
    case INVESTMENTS_BY_PROJECT_SUCCESS:
      return {
        loadingInvestmentsByProject: false,
        successInvestmentsByProject: true,
        investmentsByProject: action.payload,
      }
    case INVESTMENTS_BY_PROJECT_FAIL:
      return {
        loadingInvestmentsByProject: false,
        errorInvestmentsByProject: action.payload,
      }
    case INVESTMENTS_BY_PROJECT_RESET:
      return {}
    default:
      return state
  }
}

export const investmentsByProfileAndProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTMENTS_BY_PROFILE_AND_PROJECT_REQUEST:
      return { loadingInvestmentsByProfileAndProject: true }
    case INVESTMENTS_BY_PROFILE_AND_PROJECT_SUCCESS:
      return {
        loadingInvestmentsByProfileAndProject: false,
        successInvestmentsByProfileAndProject: true,
        investmentsByProfileAndProjectData: action.payload,
      }
    case INVESTMENTS_BY_PROFILE_AND_PROJECT_FAIL:
      return {
        loadingInvestmentsByProfileAndProject: false,
        errorInvestmentsByProfileAndProject: action.payload,
      }
    case INVESTMENTS_BY_PROFILE_AND_PROJECT_RESET:
      return {}
    default:
      return state
  }
}

export const investmentsByProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTMENTS_BY_PROFILE_REQUEST:
      return { loadingInvestmentsByProfile: true }
    case INVESTMENTS_BY_PROFILE_SUCCESS:
      return {
        loadingInvestmentsByProfile: false,
        successInvestmentsByProfile: true,
        investmentsByProfileData: action.payload,
      }
    case INVESTMENTS_BY_PROFILE_FAIL:
      return {
        loadingInvestmentsByProfile: false,
        errorInvestmentsByProfile: action.payload,
      }
    case INVESTMENTS_BY_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

// export const investmentMyListReducer = (state = {}, action) => {
//   switch (action.type) {
//     case INVESTMENT_MY_LIST_REQUEST:
//       return { loadingInvestmentMyList: true }
//     case INVESTMENT_MY_LIST_SUCCESS:
//       return {
//         successInvestmentMyList: true,
//         loadingInvestmentMyList: false,
//         investmentMyListData: action.payload,
//       }
//     case INVESTMENT_MY_LIST_FAIL:
//       return {
//         loadingInvestmentMyList: false,
//         errorInvestmentMyList: action.payload,
//       }
//     case INVESTMENT_MY_LIST_RESET:
//       return {}
//     default:
//       return state
//   }
// }

export const investmentCancellationListReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTMENT_CANCELLATION_LIST_REQUEST:
      return { loadingInvestmentsCancelationList: true }
    case INVESTMENT_CANCELLATION_LIST_SUCCESS:
      return {
        loadingInvestmentsCancelationList: false,
        successInvestmentsCancelationList: true,
        investmentsCancelationList: action.payload,
      }
    case INVESTMENT_CANCELLATION_LIST_FAIL:
      return {
        loadingInvestmentsCancelationList: false,
        errorInvestmentsCancelationList: action.payload,
      }
    case INVESTMENT_CANCELLATION_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const investmentListReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTMENT_LIST_REQUEST:
      return { loadingInvestmentsList: true }
    case INVESTMENT_LIST_SUCCESS:
      return {
        loadingInvestmentsList: false,
        successInvestmentsList: true,
        investmentsList: action.payload,
      }
    case INVESTMENT_LIST_FAIL:
      return {
        loadingInvestmentsList: false,
        errorInvestmentsList: action.payload,
      }
    case INVESTMENT_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const investmentHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTMENT_HISTORY_REQUEST:
      return { loadingInvestmentsHistory: true }
    case INVESTMENT_HISTORY_SUCCESS:
      return {
        loadingInvestmentsHistory: false,
        successInvestmentsHistory: true,
        investmentsHistory: action.payload,
      }
    case INVESTMENT_HISTORY_FAIL:
      return {
        loadingInvestmentsHistory: false,
        errorInvestmentsHistory: action.payload,
      }
    case INVESTMENT_HISTORY_RESET:
      return {}
    default:
      return state
  }
}

export const investmentAnnulationRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTMENT_ANNULATION_REQUEST_REQUEST:
      return { loadingInvestmentAnnulationRequest: true }
    case INVESTMENT_ANNULATION_REQUEST_SUCCESS:
      return {
        successInvestmentAnnulationRequest: true,
        loadingInvestmentAnnulationRequest: false,
        investmentAnnulationRequestData: action.payload,
      }
    case INVESTMENT_ANNULATION_REQUEST_FAIL:
      return {
        loadingInvestmentAnnulationRequest: false,
        errorInvestmentAnnulationRequest: action.payload,
      }
    case INVESTMENT_ANNULATION_REQUEST_RESET:
      return {}
    default:
      return state
  }
}

export const investmentDeclineBySuperAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTMENT_ADMIN_DECLINE_REQUEST:
      return { loadingInvestmentDeclineBySuperAdmin: true }
    case INVESTMENT_ADMIN_DECLINE_SUCCESS:
      return {
        successInvestmentDeclineBySuperAdmin: true,
        loadingInvestmentDeclineBySuperAdmin: false,
        investmentDeclineBySuperAdminData: action.payload,
      }
    case INVESTMENT_ADMIN_DECLINE_FAIL:
      return {
        loadingInvestmentDeclineBySuperAdmin: false,
        errorInvestmentDeclineBySuperAdmin: action.payload,
      }
    case INVESTMENT_ADMIN_DECLINE_RESET:
      return {}
    default:
      return state
  }
}
