import axios from 'axios'
import {
  TASK_ABSENCE_REGISTER_REQUEST,
  TASK_ABSENCE_REGISTER_SUCCESS,
  TASK_ABSENCE_REGISTER_FAIL,
  TASK_ABSENCE_LIST_REQUEST,
  TASK_ABSENCE_LIST_SUCCESS,
  TASK_ABSENCE_LIST_FAIL,
  TASK_ABSENCE_UPDATE_SUCCESS,
  TASK_ABSENCE_UPDATE_REQUEST,
  TASK_ABSENCE_UPDATE_FAIL,
  TASK_ABSENCE_DELETE_FAIL,
  TASK_ABSENCE_DELETE_REQUEST,
  TASK_ABSENCE_DELETE_SUCCESS,
} from '../constants/taskAbsenceConstants.js'

export const registerTaskAbsence = (taskAbsence) => async (dispatch) => {
  try {
    dispatch({ type: TASK_ABSENCE_REGISTER_REQUEST })

    const { data } = await axios.post('/api/tareasausencias', taskAbsence)

    dispatch({ type: TASK_ABSENCE_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_ABSENCE_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTaskAbsences = () => async (dispatch) => {
  try {
    dispatch({ type: TASK_ABSENCE_LIST_REQUEST })

    const { data } = await axios.get('/api/tareasausencias')

    dispatch({ type: TASK_ABSENCE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_ABSENCE_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const taskAbsenceUpdateInfo = (taskAbsence) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_ABSENCE_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.put(`/api/tareasausencias/${taskAbsence.id_tarea}`, taskAbsence, config)

    dispatch({ type: TASK_ABSENCE_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_ABSENCE_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteTaskAbsence = (id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_ABSENCE_DELETE_REQUEST })

    await axios.delete(`/api/tareasausencias/${id}`)

    dispatch({ type: TASK_ABSENCE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TASK_ABSENCE_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
