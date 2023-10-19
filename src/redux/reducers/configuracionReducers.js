import {
  CONFIGURACION_REGISTER_REQUEST,
  CONFIGURACION_REGISTER_SUCCESS,
  CONFIGURACION_REGISTER_FAIL,
  CONFIGURACION_REGISTER_RESET,
  CONFIGURACION_LIST_REQUEST,
  CONFIGURACION_LIST_SUCCESS,
  CONFIGURACION_LIST_FAIL,
  CONFIGURACION_LIST_RESET,
  CONFIGURACION_UPDATE_SUCCESS,
  CONFIGURACION_UPDATE_REQUEST,
  CONFIGURACION_UPDATE_FAIL,
  CONFIGURACION_UPDATE_RESET,
  CONFIGURACION_DELETE_FAIL,
  CONFIGURACION_DELETE_REQUEST,
  CONFIGURACION_DELETE_SUCCESS,
  CONFIGURACION_DELETE_RESET,
  CONFIGURACION_HISTORICAL_SUCCESS,
  CONFIGURACION_HISTORICAL_REQUEST,
  CONFIGURACION_HISTORICAL_FAIL,
  CONFIGURACION_HISTORICAL_RESET,
} from '../constants/configuracionConstants.js'

export const configuracionRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIGURACION_REGISTER_REQUEST:
      return { loadingConfiguracionRegister: true }
    case CONFIGURACION_REGISTER_SUCCESS:
      return {
        loadingConfiguracionRegister: false,
        successConfiguracionRegister: true,
        configuracion: action.payload,
      }
    case CONFIGURACION_REGISTER_FAIL:
      return {
        loadingConfiguracionRegister: false,
        errorConfiguracionRegister: action.payload,
      }
    case CONFIGURACION_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const configuracionListReducer = (state = { configuracions: [] }, action) => {
  switch (action.type) {
    case CONFIGURACION_LIST_REQUEST:
      return { loadingConfiguracionList: true }
    case CONFIGURACION_LIST_SUCCESS:
      return {
        loadingConfiguracionList: false,
        successConfiguracionList: true,
        configuracions: action.payload,
      }
    case CONFIGURACION_LIST_FAIL:
      return { loadingConfiguracionList: false, errorConfiguracionList: action.payload }
    case CONFIGURACION_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const configuracionUpdateReducer = (state = { configuracionUpdated: {} }, action) => {
  switch (action.type) {
    case CONFIGURACION_UPDATE_REQUEST:
      return { loadingConfiguracionUpdate: true }
    case CONFIGURACION_UPDATE_SUCCESS:
      return {
        loadingConfiguracionUpdate: false,
        successConfiguracionUpdate: true,
        configuracionUpdated: action.payload,
      }
    case CONFIGURACION_UPDATE_FAIL:
      return { loadingConfiguracionUpdate: false, errorConfiguracionUpdate: action.payload }
    case CONFIGURACION_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const configuracionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIGURACION_DELETE_REQUEST:
      return { loadingConfiguracionDelete: true }
    case CONFIGURACION_DELETE_SUCCESS:
      return { loadingConfiguracionDelete: false, successConfiguracionDelete: true }
    case CONFIGURACION_DELETE_FAIL:
      return { loadingConfiguracionDelete: false, errorConfiguracionDelete: action.payload }
    case CONFIGURACION_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const configuracionHistoricalListReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIGURACION_HISTORICAL_REQUEST:
      return { loadingConfiguracionHistoricalList: true }
    case CONFIGURACION_HISTORICAL_SUCCESS:
      return {
        loadingConfiguracionHistoricalList: false,
        successConfiguracionHistoricalList: true,
        configuracionHistoricalListData: action.payload,
      }
    case CONFIGURACION_HISTORICAL_FAIL:
      return {
        loadingConfiguracionHistoricalList: false,
        errorConfiguracionHistoricalList: action.payload,
      }
    case CONFIGURACION_HISTORICAL_RESET:
      return {}
    default:
      return state
  }
}