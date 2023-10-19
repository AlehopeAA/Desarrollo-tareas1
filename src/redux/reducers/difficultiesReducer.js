import {
  DIFFICULTIES_LIST_REQUEST,
  DIFFICULTIES_LIST_SUCCESS,
  DIFFICULTIES_LIST_FAIL,
  DIFFICULTIES_LIST_RESET,
  DIFFICULTIES_DELETE_REQUEST,
  DIFFICULTIES_DELETE_SUCCESS,
  DIFFICULTIES_DELETE_FAIL,
  DIFFICULTIES_DELETE_RESET,
} from '../constants/difficultiesConstants'

export const difficultiesListReducer = (state = {}, action) => {
  switch (action.type) {
    case DIFFICULTIES_LIST_REQUEST:
      return { loadingDifficultiesList: true }
    case DIFFICULTIES_LIST_SUCCESS:
      return {
        loadingDifficultiesList: false,
        successDifficultiesList: true,
        difficultiesList: action.payload,
      }
    case DIFFICULTIES_LIST_FAIL:
      return { loadingDifficultiesList: false, errorDifficultiesList: action.payload }
    case DIFFICULTIES_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const difficultiesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DIFFICULTIES_DELETE_REQUEST:
      return { loadingDifficultiesDelete: true }
    case DIFFICULTIES_DELETE_SUCCESS:
      return {
        loadingDifficultiesDelete: false,
        successDifficultiesDelete: true,
      }
    case DIFFICULTIES_DELETE_FAIL:
      return { loadingDifficultiesDelete: false, errorDifficultiesDelete: action.payload }
    case DIFFICULTIES_DELETE_RESET:
      return {}
    default:
      return state
  }
}
