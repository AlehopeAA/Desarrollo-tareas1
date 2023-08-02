import axios from 'axios'
import {
  TASK_REGISTER_REQUEST,
  TASK_REGISTER_SUCCESS,
  TASK_REGISTER_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_BY_ID_REQUEST,
  TASK_BY_ID_SUCCESS,
  TASK_BY_ID_FAIL,
  TASK_BY_ID_RESET,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_REQUEST,
  TASK_DUPLICATED_REFUSED,
  TASK_UPDATE_FAIL,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_LIST_BY_PROFILE_ID_REQUEST,
  TASK_LIST_BY_PROFILE_ID_SUCCESS,
  TASK_LIST_BY_PROFILE_ID_FAIL,
  TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_ALL_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_CREATE_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_FILTER_CREATE_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_DUPLICATE_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_FILTER_DUPLICATE_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_MODIFY_TASK,
} from '../constants/taskConstants.js'
import { AirportShuttle } from '@material-ui/icons'

export const registerTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
//Implementación nueva:
const { data: taskByProfile } = await axios.get(`/api/tareas/perfiles/${task.id_perfil}`, config);
const isTaskAsigned = taskByProfile.some((existingTask) => existingTask.id_tarea === task.id_tarea);
if(isTaskAsigned){
  dispatch({ type: TASK_REGISTER_FAIL, payload: "La tarea ya está asignada a este perfil"});
  return;
}

    const { data } = await axios.post('/api/tareas', task, config)

    dispatch({ type: TASK_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTasks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/api/tareas', config)

    dispatch({ type: TASK_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAllTasks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/api/tareas/all', config)

    dispatch({ type: TASK_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTaskById = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_BY_ID_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/tareas/${taskId}`, config)

    dispatch({ type: TASK_BY_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_BY_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTasksByProfileId = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_LIST_BY_PROFILE_ID_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/tareas/perfiles/${id}`, config)

    dispatch({ type: TASK_LIST_BY_PROFILE_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_LIST_BY_PROFILE_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const taskUpdateInfo = (task) => async (dispatch) => {
  try {
    dispatch({ type: TASK_UPDATE_REQUEST })

    const { data } = await axios.put(`/api/tareas/${task.id_tarea}`, task)

    dispatch({ type: TASK_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TASK_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_DELETE_REQUEST })

    await axios.delete(`/api/tareas/${id}`)

    dispatch({ type: TASK_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const fillAllTaskHandle = (data) => async (dispatch) => {
  dispatch({ type: TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_ALL_TASK, payload: data })
}
export const fillDuplicateTaskHandle = (data) => async (dispatch) => {
  dispatch({ type: TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_DUPLICATE_TASK, payload: data })
}
export const fillCreateTaskHandle = (task) => async (dispatch) => {
  dispatch({ type: TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_CREATE_TASK, payload: task })
}
export const filterCreateTaskHandle = (taskId) => async (dispatch) => {
  dispatch({ type: TASK_LIST_DUPLICATE_BY_PROFILE_FILTER_CREATE_TASK, payload: taskId })
}
export const filterDuplicateTaskHandle = (taskId) => async (dispatch) => {
  dispatch({ type: TASK_LIST_DUPLICATE_BY_PROFILE_FILTER_DUPLICATE_TASK, payload: taskId })
}
export const modifyTaskHandle = (taskUpdate) => async (dispatch) => {
  dispatch({ type: TASK_LIST_DUPLICATE_BY_PROFILE_MODIFY_TASK, payload: taskUpdate })
}
