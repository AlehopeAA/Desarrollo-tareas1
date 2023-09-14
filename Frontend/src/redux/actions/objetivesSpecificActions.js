import axios from 'axios'
import {
  OBJETIVES_SPECIFIC_REGISTER_REQUEST,
  OBJETIVES_SPECIFIC_REGISTER_SUCCESS,
  OBJETIVES_SPECIFIC_REGISTER_FAIL,
  OBJETIVES_SPECIFIC_LIST_REQUEST,
  OBJETIVES_SPECIFIC_LIST_SUCCESS,
  OBJETIVE_TASK_REQUEST,
  OBJETIVE_TASK_SUCCESS,
  OBJETIVE_TASK_FAIL,
  OBJETIVES_SPECIFIC_UPDATE_REQUEST,
  OBJETIVES_SPECIFIC_UPDATE_SUCCESS,
  OBJETIVES_SPECIFIC_UPDATE_FAIL,
  OBJETIVES_SPECIFIC_DELETE_REQUEST,
  OBJETIVES_SPECIFIC_DELETE_SUCCESS,
  OBJETIVES_SPECIFIC_DELETE_FAIL,
  OBJETIVES_SPECIFIC_LIST_FAIL,
} from '../constants/objetivesSpecificConstants'

export const registerObjetiveSpecific = (objetiveSpecific) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_SPECIFIC_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { id_tarea } = objetiveSpecific.task
    objetiveSpecific.task = id_tarea
    const { data } = await axios.post('/api/objetivosespecificos', objetiveSpecific, config)

    dispatch({ type: OBJETIVES_SPECIFIC_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_SPECIFIC_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getObjetivesSpecific = () => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_SPECIFIC_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get('/api/objetivosespecificos', config)

    dispatch({ type: OBJETIVES_SPECIFIC_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_SPECIFIC_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}


export const getObjetivesByTask = (tarea) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVE_TASK_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(
      `/api/objetivosespecificos/nuevo/${tarea}`, config
    )

    dispatch({ type: OBJETIVE_TASK_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVE_TASK_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const objetivesSpecificUpdateInfo = (objetivesSpecific) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_SPECIFIC_UPDATE_REQUEST })
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
      `/api/objetivosespecificos/${objetivesSpecific.id_objetivo}`,
      objetivesSpecific,
      config
    )

    dispatch({ type: OBJETIVES_SPECIFIC_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_SPECIFIC_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteObjetivesSpecific = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_SPECIFIC_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    await axios.delete(`/api/objetivosespecificos/${id}`, config)

    dispatch({ type: OBJETIVES_SPECIFIC_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: OBJETIVES_SPECIFIC_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
