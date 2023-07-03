import axios from 'axios'
import {
  LOG_DELETE_MANY_REQUEST,
  LOG_DELETE_MANY_SUCCESS,
  LOG_DELETE_MANY_FAIL,
  LOG_DELETE_REQUEST,
  LOG_DELETE_SUCCESS,
  LOG_DELETE_FAIL,
  LOG_DETAILS_REQUEST,
  LOG_DETAILS_SUCCESS,
  LOG_DETAILS_FAIL,
  LOG_LIST_REQUEST,
  LOG_LIST_SUCCESS,
  LOG_LIST_FAIL,
  LOG_REGISTER_REQUEST,
  LOG_REGISTER_SUCCESS,
  LOG_REGISTER_FAIL,
} from '../constants/logConstants'

export const registerLog = (log) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOG_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/logs', log, config)

    dispatch({ type: LOG_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LOG_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getLogs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOG_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/logs', config)

    dispatch({ type: LOG_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LOG_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getLogById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOG_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/logs/${id}`, config)

    dispatch({ type: LOG_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LOG_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteLog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOG_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/logs/${id}`, config)

    dispatch({ type: LOG_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LOG_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteAllLogs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOG_DELETE_MANY_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/logs`, config)

    dispatch({ type: LOG_DELETE_MANY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LOG_DELETE_MANY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
