import axios from 'axios'
import {
  DIFICULTIES_LIST_REQUEST,
  DIFICULTIES_LIST_SUCCESS,
  DIFICULTIES_LIST_FAIL,
  DIFICULTIES_DELETE_REQUEST,
  DIFICULTIES_DELETE_SUCCESS,
  DIFICULTIES_DELETE_FAIL,
  DIFICULTIES_LIST_BY_MANAGER_ID_REQUEST,
  DIFICULTIES_LIST_BY_MANAGER_ID_SUCCESS,
  DIFICULTIES_LIST_BY_MANAGER_ID_FAIL,
  DIFICULTIES_LIST_BY_TASK_ID_REQUEST,
  DIFICULTIES_LIST_BY_TASK_ID_SUCCESS,
  DIFICULTIES_LIST_BY_TASK_ID_FAIL,
  DIFICULTIES_REGISTER_REQUEST,
  DIFICULTIES_REGISTER_SUCCESS,
  DIFICULTIES_REGISTER_FAIL,
  DIFICULTIES_UPDATE_REQUEST,
  DIFICULTIES_UPDATE_SUCCESS,
  DIFICULTIES_UPDATE_FAIL,
} from '../constants/dificultiesConstants'

export const getDificulties = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFICULTIES_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/dificultades/gestores-datos`, config)

    dispatch({ type: DIFICULTIES_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIFICULTIES_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const registerDificulties = (newDificulty) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFICULTIES_REGISTER_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post(`/api/dificultades/lista-tarea/${newDificulty.id_tarea}`, newDificulty, config)

    dispatch({ type: DIFICULTIES_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIFICULTIES_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const updateDificulties = (dificulty) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFICULTIES_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/dificultades/lista-tarea/${dificulty.id_dificultad}`, dificulty, config)

    dispatch({ type: DIFICULTIES_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIFICULTIES_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getDificultiesByManagerId = (managerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFICULTIES_LIST_BY_MANAGER_ID_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/dificultades/lista-gestor/${managerId}`, config)

    dispatch({ type: DIFICULTIES_LIST_BY_MANAGER_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIFICULTIES_LIST_BY_MANAGER_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getDificultiesByTaskId = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFICULTIES_LIST_BY_TASK_ID_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/dificultades/lista-tarea/${taskId}`, config)

    dispatch({ type: DIFICULTIES_LIST_BY_TASK_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIFICULTIES_LIST_BY_TASK_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const deleteDificulty = (dificultyId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFICULTIES_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    await axios.delete(`/api/dificultades/lista-tarea/${dificultyId}`, config)

    dispatch({ type: DIFICULTIES_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: DIFICULTIES_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
