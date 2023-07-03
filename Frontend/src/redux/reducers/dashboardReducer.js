import {
  DASHBOARD_INFO_REQUEST,
  DASHBOARD_INFO_SUCCESS,
  DASHBOARD_INFO_FAIL,
  DASHBOARD_INFO_RESET,
} from '../constants/dashboardConstants'

export const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_INFO_REQUEST:
      return { loadingDashboard: true }
    case DASHBOARD_INFO_SUCCESS:
      return {
        loadingDashboard: false,
        successDashboard: true,
        dashboardData: action.payload,
      }
    case DASHBOARD_INFO_FAIL:
      return {
        loadingDashboard: false,
        errorDashboard: action.payload,
      }
    case DASHBOARD_INFO_RESET:
      return {}
    default:
      return state
  }
}