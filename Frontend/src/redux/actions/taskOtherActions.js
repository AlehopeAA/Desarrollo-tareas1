import axios from 'axios'
import {
  TASK_OTHER_REGISTER_REQUEST,
  TASK_OTHER_REGISTER_SUCCESS,
  TASK_OTHER_REGISTER_FAIL,
  TASK_OTHER_LIST_REQUEST,
  TASK_OTHER_LIST_SUCCESS,
  TASK_OTHER_LIST_FAIL,
  TASK_OTHER_UPDATE_SUCCESS,
  TASK_OTHER_UPDATE_REQUEST,
  TASK_OTHER_UPDATE_FAIL,
  TASK_OTHER_DELETE_FAIL,
  TASK_OTHER_DELETE_REQUEST,
  TASK_OTHER_DELETE_SUCCESS,
  TASK_HISTORICAL_REQUEST,
  TASK_HISTORICAL_SUCCESS,
  TASK_HISTORICAL_FAIL,
  TASK_PROFILES_REQUEST,
  TASK_PROFILES_SUCCESS,
  TASK_PROFILES_FAIL,
} from '../constants/taskOtherConstants.js'

export const registerTaskOther = (taskOther) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_OTHER_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post('/api/tareasordextotras', taskOther, config)

    dispatch({ type: TASK_OTHER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_OTHER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTaskOthers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_OTHER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get('/api/tareasordextotras/objetivos', config)

    dispatch({ type: TASK_OTHER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_OTHER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const taskOtherUpdateInfo = (taskOther) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_OTHER_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.put(`/api/tareasordextotras/${taskOther.id_tarea}`, taskOther, config)

    dispatch({ type: TASK_OTHER_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_OTHER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteTaskOther = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_OTHER_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    await axios.delete(`/api/tareasordextotras/${id}`, config)

    dispatch({ type: TASK_OTHER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TASK_OTHER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTaskHistorical = (task) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_HISTORICAL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/tareasordextotras/${task.id_tarea}`, config)

    dispatch({ type: TASK_HISTORICAL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_HISTORICAL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTaskProfiles = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_PROFILES_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/tareasordextotras/perfiles/${id}`, config)

    dispatch({ type: TASK_PROFILES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_PROFILES_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}