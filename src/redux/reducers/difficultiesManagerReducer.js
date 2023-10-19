import {
  DIFFICULTIES_TO_MANAGER_LIST_REQUEST,
  DIFFICULTIES_TO_MANAGER_LIST_SUCCESS,
  DIFFICULTIES_TO_MANAGER_LIST_FAIL,
  DIFFICULTIES_TO_MANAGER_LIST_RESET,
  DIFFICULTIES_TO_MANAGER_REGISTER_REQUEST,
  DIFFICULTIES_TO_MANAGER_REGISTER_SUCCESS,
  DIFFICULTIES_TO_MANAGER_REGISTER_FAIL,
  DIFFICULTIES_TO_MANAGER_REGISTER_RESET,
} from '../constants/difficultiesManagerConstants'

export const difficultiesToManagerListReducer = (state = {}, action) => {
  switch (action.type) {
    case DIFFICULTIES_TO_MANAGER_LIST_REQUEST:
      return { loadingDifficultiesToManagerList: true }
    case DIFFICULTIES_TO_MANAGER_LIST_SUCCESS:
      return {
        loadingDifficultiesToManagerList: false,
        successDifficultiesToManagerList: true,
        difficultiesToManagerList: action.payload,
      }
    case DIFFICULTIES_TO_MANAGER_LIST_FAIL:
      return { loadingDifficultiesToManagerList: false, errorDifficultiesToManagerList: action.payload }
    case DIFFICULTIES_TO_MANAGER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const difficultiesToManagerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case DIFFICULTIES_TO_MANAGER_REGISTER_REQUEST:
      return { loadingDifficultiesToManagerRegister: true }
    case DIFFICULTIES_TO_MANAGER_REGISTER_SUCCESS:
      return {
        loadingDifficultiesToManagerRegister: false,
        successDifficultiesToManagerRegister: true,
        DifficultiesToManagerRegister: action.payload,
      }
    case DIFFICULTIES_TO_MANAGER_REGISTER_FAIL:
      return { loadingDifficultiesToManagerRegister: false, errorDifficultiesToManagerRegister: action.payload }
    case DIFFICULTIES_TO_MANAGER_REGISTER_RESET:
      return {}
    default:
      return state
  }
}
