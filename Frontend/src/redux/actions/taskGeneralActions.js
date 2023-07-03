import axios from 'axios'
import {
  TASK_GENERAL_REGISTER_REQUEST,
  TASK_GENERAL_REGISTER_SUCCESS,
  TASK_GENERAL_REGISTER_FAIL,
  TASK_GENERAL_LIST_REQUEST,
  TASK_GENERAL_LIST_SUCCESS,
  TASK_GENERAL_LIST_FAIL,
  TASK_GENERAL_UPDATE_SUCCESS,
  TASK_GENERAL_UPDATE_REQUEST,
  TASK_GENERAL_UPDATE_FAIL,
  TASK_GENERAL_DELETE_FAIL,
  TASK_GENERAL_DELETE_REQUEST,
  TASK_GENERAL_DELETE_SUCCESS,
} from '../constants/taskGeneralConstants.js'

export const registerTaskGeneral = (taskGeneral) => async (dispatch) => {
  try {
    dispatch({ type: TASK_GENERAL_REGISTER_REQUEST })

    const { data } = await axios.post('/api/tareasgenerales', taskGeneral)

    dispatch({ type: TASK_GENERAL_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_GENERAL_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTaskGenerals = () => async (dispatch) => {
  try {
    dispatch({ type: TASK_GENERAL_LIST_REQUEST })

    const { data } = await axios.get('/api/tareasgenerales')

    dispatch({ type: TASK_GENERAL_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_GENERAL_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const taskGeneralUpdateInfo = (taskGeneral) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_GENERAL_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
  
    const { data } = await axios.put(`/api/tareasgenerales/${taskGeneral.id_tarea}`, taskGeneral, config)

    dispatch({ type: TASK_GENERAL_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_GENERAL_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteTaskGeneral = (id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_GENERAL_DELETE_REQUEST })

    await axios.delete(`/api/tareasgenerales/${id}`)

    dispatch({ type: TASK_GENERAL_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TASK_GENERAL_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
