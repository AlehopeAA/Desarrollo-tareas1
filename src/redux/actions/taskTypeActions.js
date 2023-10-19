import axios from 'axios'
import {
  TASK_TYPE_REGISTER_REQUEST,
  TASK_TYPE_REGISTER_SUCCESS,
  TASK_TYPE_REGISTER_FAIL,
  TASK_TYPE_LIST_REQUEST,
  TASK_TYPE_LIST_SUCCESS,
  TASK_TYPE_LIST_FAIL,
  TASK_TYPE_UPDATE_SUCCESS,
  TASK_TYPE_UPDATE_REQUEST,
  TASK_TYPE_UPDATE_FAIL,
  TASK_TYPE_DELETE_FAIL,
  TASK_TYPE_DELETE_REQUEST,
  TASK_TYPE_DELETE_SUCCESS,
} from '../constants/taskTypeConstants'

export const registerTaskType = (taskType) => async (dispatch) => {
  try {
    dispatch({ type: TASK_TYPE_REGISTER_REQUEST })

    const { data } = await axios.post('/api/tipostareas', taskType)

    dispatch({ type: TASK_TYPE_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_TYPE_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTaskTypes = () => async (dispatch) => {
  try {
    dispatch({ type: TASK_TYPE_LIST_REQUEST })

    const { data } = await axios.get('/api/tipostareas')

    dispatch({ type: TASK_TYPE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_TYPE_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const taskTypeUpdateInfo = (taskType) => async (dispatch) => {
  try {
    dispatch({ type: TASK_TYPE_UPDATE_REQUEST })

    const { data } = await axios.put(`/api/tipostareas/${taskType.id_tipos_tarea}`, taskType)

    dispatch({ type: TASK_TYPE_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_TYPE_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteTaskType = (id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_TYPE_DELETE_REQUEST })

    await axios.delete(`/api/tipostareas/${id}`)

    dispatch({ type: TASK_TYPE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TASK_TYPE_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
