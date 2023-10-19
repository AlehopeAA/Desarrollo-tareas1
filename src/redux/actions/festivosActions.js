import axios from 'axios'
import {
  FESTIVOS_REGISTER_REQUEST,
  FESTIVOS_REGISTER_SUCCESS,
  FESTIVOS_REGISTER_FAIL,
  FESTIVOS_LIST_REQUEST,
  FESTIVOS_LIST_SUCCESS,
  FESTIVOS_LIST_FAIL,
  FESTIVOS_UPDATE_SUCCESS,
  FESTIVOS_UPDATE_REQUEST,
  FESTIVOS_UPDATE_FAIL,
  FESTIVOS_DELETE_FAIL,
  FESTIVOS_DELETE_REQUEST,
  FESTIVOS_DELETE_SUCCESS,
} from '../constants/festivosConstants.js'

export const registerFestivos = (festivos) => async (dispatch) => {
  try {
    dispatch({ type: FESTIVOS_REGISTER_REQUEST })

    const { data } = await axios.post('/api/festivos', festivos)

    dispatch({ type: FESTIVOS_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FESTIVOS_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getFestivos = () => async (dispatch) => {
  try {
    dispatch({ type: FESTIVOS_LIST_REQUEST })

    const { data } = await axios.get('/api/festivos')

    dispatch({ type: FESTIVOS_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FESTIVOS_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const festivosUpdateInfo = (festivos) => async (dispatch) => {
  try {
    dispatch({ type: FESTIVOS_UPDATE_REQUEST })

    const { data } = await axios.put(`/api/festivos/${festivos.id_calendario}`, festivos)

    dispatch({ type: FESTIVOS_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FESTIVOS_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteFestivos = (id) => async (dispatch) => {
  try {
    dispatch({ type: FESTIVOS_DELETE_REQUEST })

    await axios.delete(`/api/festivos/${id}`)

    dispatch({ type: FESTIVOS_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: FESTIVOS_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
