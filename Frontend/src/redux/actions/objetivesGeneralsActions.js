import axios from 'axios'
import {
  OBJETIVES_GENERAL_REGISTER_REQUEST,
  OBJETIVES_GENERAL_REGISTER_SUCCESS,
  OBJETIVES_GENERAL_REGISTER_FAIL,
  OBJETIVES_GENERAL_LIST_REQUEST,
  OBJETIVES_GENERAL_LIST_FAIL,
  OBJETIVES_GENERAL_LIST_SUCCESS,
  OBJETIVES_GENERAL_UPDATE_REQUEST,
  OBJETIVES_GENERAL_UPDATE_SUCCESS,
  OBJETIVES_GENERAL_UPDATE_FAIL,
  OBJETIVES_GENERAL_DELETE_REQUEST,
  OBJETIVES_GENERAL_DELETE_SUCCESS,
  OBJETIVES_GENERAL_DELETE_FAIL,
} from '../constants/objetivesGeneralsConstants'

export const registerObjetiveGeneral = (objetiveGeneral) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_GENERAL_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { id_tarea } = objetiveGeneral.task
    objetiveGeneral.task = id_tarea
    const { data } = await axios.post('/api/objetivosgenerales', objetiveGeneral, config)

    dispatch({ type: OBJETIVES_GENERAL_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_GENERAL_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getObjetivesGeneral = () => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_GENERAL_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get('/api/objetivosgenerales', config)

    dispatch({ type: OBJETIVES_GENERAL_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_GENERAL_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const objetivesGeneralUpdateInfo = (objetivesGeneral) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_GENERAL_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.put(
      `/api/objetivosgenerales/${objetivesGeneral.id_objetivo}`,
      objetivesGeneral,
      config
    )

    dispatch({ type: OBJETIVES_GENERAL_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_GENERAL_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteObjetivesGeneral = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_GENERAL_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    await axios.delete(`/api/objetivosgenerales/${id}`, config)

    dispatch({ type: OBJETIVES_GENERAL_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: OBJETIVES_GENERAL_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
