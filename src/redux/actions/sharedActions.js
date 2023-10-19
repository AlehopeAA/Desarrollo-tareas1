import axios from 'axios'
import { 
  SHARED_REGISTER_REQUEST,
  SHARED_REGISTER_SUCCESS,
  SHARED_REGISTER_FAIL,
  SHARED_LIST_REQUEST, 
  SHARED_LIST_SUCCESS, 
  SHARED_LIST_FAIL,
  SHARED_UPDATE_SUCCESS,
  SHARED_UPDATE_REQUEST,
  SHARED_UPDATE_FAIL,
  SHARED_DELETE_FAIL,
  SHARED_DELETE_REQUEST,
  SHARED_DELETE_SUCCESS,
  SHARED_LIST_BY_TASK_ID_REQUEST,
  SHARED_LIST_BY_TASK_ID_SUCCESS,
  SHARED_LIST_BY_TASK_ID_FAIL,
  SHARED_TO_MANAGER_LIST_REQUEST,
  SHARED_TO_MANAGER_LIST_SUCCESS,
  SHARED_TO_MANAGER_LIST_FAIL,
} from '../constants/sharedConstants'

export const registerShared = (shared) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHARED_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post('/api/compartidas', shared, config)

    dispatch({ type: SHARED_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHARED_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getSharedList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SHARED_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get('/api/compartidas', config)

    dispatch({ type: SHARED_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHARED_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const sharedUpdateInfo = (shared) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHARED_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.put(`/api/compartidas/${shared.id_compartida}`, shared, config)

    dispatch({ type: SHARED_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHARED_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteShared = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHARED_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    await axios.delete(`/api/compartidas/${id}`, config)

    dispatch({ type: SHARED_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: SHARED_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getSharedByTaskId = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHARED_LIST_BY_TASK_ID_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/compartidas/lista-tarea/${taskId}`, config)

    dispatch({ type: SHARED_LIST_BY_TASK_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHARED_LIST_BY_TASK_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTasksShared = (managerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHARED_TO_MANAGER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/compartidas/lista-tareas/${managerId}`, config)

    dispatch({ type: SHARED_TO_MANAGER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHARED_TO_MANAGER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}