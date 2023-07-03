import axios from 'axios'
import {
  TASK_SPECIFIC_REGISTER_REQUEST,
  TASK_SPECIFIC_REGISTER_SUCCESS,
  TASK_SPECIFIC_REGISTER_FAIL,
  TASK_SPECIFIC_LIST_REQUEST,
  TASK_SPECIFIC_LIST_SUCCESS,
  TASK_SPECIFIC_LIST_FAIL,
  TASK_SPECIFIC_UPDATE_SUCCESS,
  TASK_SPECIFIC_UPDATE_REQUEST,
  TASK_SPECIFIC_UPDATE_FAIL,
  TASK_SPECIFIC_DELETE_FAIL,
  TASK_SPECIFIC_DELETE_REQUEST,
  TASK_SPECIFIC_DELETE_SUCCESS,
  TASK_SPECIFIC_BY_USER_REQUEST,
  TASK_SPECIFIC_BY_USER_SUCCESS,
  TASK_SPECIFIC_BY_USER_FAIL,
} from '../constants/taskSpecificConstants.js'

export const registerTaskSpecific = (taskSpecific) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_SPECIFIC_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post('/api/tareasespecificas', taskSpecific, config)

    dispatch({ type: TASK_SPECIFIC_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_SPECIFIC_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTaskSpecifics = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_SPECIFIC_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get('/api/tareasespecificas', config)

    dispatch({ type: TASK_SPECIFIC_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_SPECIFIC_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTaskSpecificsByUSer = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_SPECIFIC_BY_USER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/tareasespecificas/puestostrabajo/${userId}`, config)

    dispatch({ type: TASK_SPECIFIC_BY_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_SPECIFIC_BY_USER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const taskSpecificUpdateInfo = (task) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_SPECIFIC_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.put(`/api/tareasespecificas/${task.id_tarea}`, task, config)

    dispatch({ type: TASK_SPECIFIC_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_SPECIFIC_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteTaskSpecific = (id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_SPECIFIC_DELETE_REQUEST })

    await axios.delete(`/api/tareasespecificas/${id}`)

    dispatch({ type: TASK_SPECIFIC_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TASK_SPECIFIC_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
