import axios from 'axios'
import {
  OBJETIVES_ORD_EXT_OTHER_REGISTER_REQUEST,
  OBJETIVES_ORD_EXT_OTHER_REGISTER_SUCCESS,
  OBJETIVES_ORD_EXT_OTHER_REGISTER_FAIL,
  OBJETIVES_ORD_EXT_OTHER_LIST_REQUEST,
  OBJETIVES_ORD_EXT_OTHER_LIST_SUCCESS,
  OBJETIVES_ORD_EXT_UPDATE_REQUEST,
  OBJETIVES_ORD_EXT_UPDATE_SUCCESS,
  OBJETIVES_ORD_EXT_UPDATE_FAIL,
  OBJETIVES_ORD_EXT_DELETE_REQUEST,
  OBJETIVES_ORD_EXT_DELETE_SUCCESS,
  OBJETIVES_ORD_EXT_DELETE_FAIL,
  OBJETIVES_ORD_EXT_OTHER_LIST_FAIL,
  OBJETIVES_HISTORICAL_REQUEST,
  OBJETIVES_HISTORICAL_SUCCESS,
  OBJETIVES_HISTORICAL_FAIL,
} from '../constants/objetivesOrdExtOtherConstants'

export const registerObjetiveOrdExtOther = (objetiveOrdExtOther) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_ORD_EXT_OTHER_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { id_tarea } = objetiveOrdExtOther.task
    objetiveOrdExtOther.task = id_tarea
    const { data } = await axios.post('/api/objetivosordextotros', objetiveOrdExtOther, config)

    dispatch({ type: OBJETIVES_ORD_EXT_OTHER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_ORD_EXT_OTHER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getObjetivesOrdExtOther = () => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_ORD_EXT_OTHER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get('/api/objetivosordextotros', config)

    dispatch({ type: OBJETIVES_ORD_EXT_OTHER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_ORD_EXT_OTHER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const objetivesOrdExtUpdateInfo = (objetivesOrdExt) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_ORD_EXT_UPDATE_REQUEST })
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
      `/api/objetivosordextotros/${objetivesOrdExt.id_objetivo}`,
      objetivesOrdExt,
      config
    )

    dispatch({ type: OBJETIVES_ORD_EXT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_ORD_EXT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteObjetivesOrdExtOther = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_ORD_EXT_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    await axios.delete(`/api/objetivosordextotros/${id}`, config)

    dispatch({ type: OBJETIVES_ORD_EXT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: OBJETIVES_ORD_EXT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getObjetivesHistorical = (objetive) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_HISTORICAL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/objetivosordextotros/${objetive.id_objetivo}`, config)

    dispatch({ type: OBJETIVES_HISTORICAL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_HISTORICAL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}