import {
  FESTIVOS_REGISTER_REQUEST,
  FESTIVOS_REGISTER_SUCCESS,
  FESTIVOS_REGISTER_FAIL,
  FESTIVOS_REGISTER_RESET,
  FESTIVOS_LIST_REQUEST,
  FESTIVOS_LIST_SUCCESS,
  FESTIVOS_LIST_FAIL,
  FESTIVOS_LIST_RESET,
  FESTIVOS_UPDATE_SUCCESS,
  FESTIVOS_UPDATE_REQUEST,
  FESTIVOS_UPDATE_FAIL,
  FESTIVOS_UPDATE_RESET,
  FESTIVOS_DELETE_FAIL,
  FESTIVOS_DELETE_REQUEST,
  FESTIVOS_DELETE_SUCCESS,
  FESTIVOS_DELETE_RESET,
} from '../constants/festivosConstants.js'

export const festivosRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case FESTIVOS_REGISTER_REQUEST:
      return { loadingFestivosRegister: true }
    case FESTIVOS_REGISTER_SUCCESS:
      return {
        loadingFestivosRegister: false,
        successFestivosRegister: true,
        festivos: action.payload,
      }
    case FESTIVOS_REGISTER_FAIL:
      return {
        loadingFestivosRegister: false,
        errorFestivosRegister: action.payload,
      }
    case FESTIVOS_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const festivosListReducer = (state = { festivos: [] }, action) => {
  switch (action.type) {
    case FESTIVOS_LIST_REQUEST:
      return { loadingFestivosList: true }
    case FESTIVOS_LIST_SUCCESS:
      return {
        loadingFestivosList: false,
        successFestivosList: true,
        festivos: action.payload,
      }
    case FESTIVOS_LIST_FAIL:
      return { loadingFestivosList: false, errorFestivosList: action.payload }
    case FESTIVOS_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const festivosUpdateReducer = (state = { festivosUpdated: {} }, action) => {
  switch (action.type) {
    case FESTIVOS_UPDATE_REQUEST:
      return { loadingFestivosUpdate: true }
    case FESTIVOS_UPDATE_SUCCESS:
      return {
        loadingFestivosUpdate: false,
        successFestivosUpdate: true,
        festivosUpdated: action.payload,
      }
    case FESTIVOS_UPDATE_FAIL:
      return { loadingFestivosUpdate: false, errorFestivosUpdate: action.payload }
    case FESTIVOS_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const festivosDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FESTIVOS_DELETE_REQUEST:
      return { loadingFestivosDelete: true }
    case FESTIVOS_DELETE_SUCCESS:
      return { loadingFestivosDelete: false, successFestivosDelete: true }
    case FESTIVOS_DELETE_FAIL:
      return { loadingFestivosDelete: false, errorFestivosDelete: action.payload }
    case FESTIVOS_DELETE_RESET:
      return {}
    default:
      return state
  }
}
