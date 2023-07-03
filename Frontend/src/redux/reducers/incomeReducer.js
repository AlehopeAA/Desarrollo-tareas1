import {
  INCOME_UPDATE_REQUEST,
  INCOME_UPDATE_SUCCESS,
  INCOME_UPDATE_FAIL,
  INCOME_UPDATE_RESET,
} from '../constants/incomeConstants'

export const incomeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case INCOME_UPDATE_REQUEST:
      return { loadingincomeUpdate: true }
    case INCOME_UPDATE_SUCCESS:
      return {
        successIncomeUpdate: true,
        loadingIncomeUpdate: false,
        incomeUpdateData: action.payload,
      }
    case INCOME_UPDATE_FAIL:
      return {
        loadingIncomeUpdate: false,
        errorIncomeUpdate: action.payload,
      }
    case INCOME_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
