import axios from 'axios'
import {
  ENTRIES_LIST_REQUEST,
  ENTRIES_LIST_SUCCESS,
  ENTRIES_LIST_FAIL,
  ENTRIES_DELETE_REQUEST,
  ENTRIES_DELETE_SUCCESS,
  ENTRIES_DELETE_FAIL,
  ENTRIES_LIST_BY_MANAGER_ID_REQUEST,
  ENTRIES_LIST_BY_MANAGER_ID_SUCCESS,
  ENTRIES_LIST_BY_MANAGER_ID_FAIL,
  ENTRIES_LIST_BY_TASK_ID_REQUEST,
  ENTRIES_LIST_BY_TASK_ID_SUCCESS,
  ENTRIES_LIST_BY_TASK_ID_FAIL,
  ENTRIES_REGISTER_REQUEST,
  ENTRIES_REGISTER_SUCCESS,
  ENTRIES_REGISTER_FAIL,
  ENTRIES_UPDATE_REQUEST,
  ENTRIES_UPDATE_SUCCESS,
  ENTRIES_UPDATE_FAIL,
} from '../constants/entriesConstants'

export const getEntries = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTRIES_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/entradas/gestores-datos`, config)

    dispatch({ type: ENTRIES_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ENTRIES_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const registerEntries = (newEntry) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTRIES_REGISTER_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post(`/api/entradas/lista-tarea/${newEntry.id_tarea}`, newEntry, config)

    dispatch({ type: ENTRIES_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ENTRIES_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const updateEntries = (entry) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTRIES_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/entradas/lista-tarea/${entry.id_entrada}`, entry, config)

    dispatch({ type: ENTRIES_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ENTRIES_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getEntriesByManagerId = (managerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTRIES_LIST_BY_MANAGER_ID_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/entradas/lista-gestor/${managerId}`, config)

    dispatch({ type: ENTRIES_LIST_BY_MANAGER_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ENTRIES_LIST_BY_MANAGER_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getEntriesByTaskId = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTRIES_LIST_BY_TASK_ID_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/entradas/lista-tarea/${taskId}`, config)

    dispatch({ type: ENTRIES_LIST_BY_TASK_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ENTRIES_LIST_BY_TASK_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const deleteEntry = (entryId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTRIES_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    await axios.delete(`/api/entradas/gestores-datos/${entryId}`, config)

    dispatch({ type: ENTRIES_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ENTRIES_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
