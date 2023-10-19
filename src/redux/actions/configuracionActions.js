import axios from 'axios'
import {
  CONFIGURACION_REGISTER_REQUEST,
  CONFIGURACION_REGISTER_SUCCESS,
  CONFIGURACION_REGISTER_FAIL,
  CONFIGURACION_LIST_REQUEST,
  CONFIGURACION_LIST_SUCCESS,
  CONFIGURACION_LIST_FAIL,
  CONFIGURACION_UPDATE_SUCCESS,
  CONFIGURACION_UPDATE_REQUEST,
  CONFIGURACION_UPDATE_FAIL,
  CONFIGURACION_DELETE_FAIL,
  CONFIGURACION_DELETE_REQUEST,
  CONFIGURACION_DELETE_SUCCESS,
  CONFIGURACION_HISTORICAL_SUCCESS,
  CONFIGURACION_HISTORICAL_REQUEST,
  CONFIGURACION_HISTORICAL_FAIL,
} from '../constants/configuracionConstants.js'

export const registerConfiguracion = (configuracion) => async (dispatch) => {
  try {
    dispatch({ type: CONFIGURACION_REGISTER_REQUEST })

    const { data } = await axios.post('/api/configuraciones', configuracion)

    dispatch({ type: CONFIGURACION_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CONFIGURACION_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getConfiguracions = () => async (dispatch) => {
  try {
    dispatch({ type: CONFIGURACION_LIST_REQUEST })

    const { data } = await axios.get('/api/configuraciones')

    dispatch({ type: CONFIGURACION_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CONFIGURACION_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const configuracionUpdateInfo = (configuracion) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONFIGURACION_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.put(`/api/configuraciones/${configuracion.id_configuracion}`, configuracion, config)

    dispatch({ type: CONFIGURACION_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CONFIGURACION_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteConfiguracion = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONFIGURACION_DELETE_REQUEST })

    await axios.delete(`/api/configuraciones/${id}`)

    dispatch({ type: CONFIGURACION_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CONFIGURACION_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getConfiguracionHistorical = (configuracion) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONFIGURACION_HISTORICAL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/configuraciones/historicos/${configuracion.id_configuracion}`, config)

    dispatch({ type: CONFIGURACION_HISTORICAL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CONFIGURACION_HISTORICAL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}