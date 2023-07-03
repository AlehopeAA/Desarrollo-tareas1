import axios from 'axios'
import { 
  ACUMULATIVES_REGISTER_REQUEST,
  ACUMULATIVES_REGISTER_SUCCESS,
  ACUMULATIVES_REGISTER_FAIL,
  ACUMULATIVES_LIST_REQUEST, 
  ACUMULATIVES_LIST_SUCCESS, 
  ACUMULATIVES_LIST_FAIL,
  ACUMULATIVES_DELETE_FAIL,
  ACUMULATIVES_DELETE_REQUEST,
  ACUMULATIVES_DELETE_SUCCESS,
  ACUMULATIVES_LIST_BY_TASK_ID_REQUEST,
  ACUMULATIVES_LIST_BY_TASK_ID_SUCCESS,
  ACUMULATIVES_LIST_BY_TASK_ID_FAIL,
  ACUMULATIVES_TO_MANAGER_LIST_REQUEST,
  ACUMULATIVES_TO_MANAGER_LIST_SUCCESS,
  ACUMULATIVES_TO_MANAGER_LIST_FAIL,
  ACUMULATIVES_HIJA_TO_MANAGER_LIST_REQUEST,
  ACUMULATIVES_HIJA_TO_MANAGER_LIST_SUCCESS,
  ACUMULATIVES_HIJA_TO_MANAGER_LIST_FAIL,
} from '../constants/acumulativesConstants'

export const registerAcumulatives = (acumulatives) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACUMULATIVES_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post('/api/acumulativas', acumulatives, config)

    dispatch({ type: ACUMULATIVES_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACUMULATIVES_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAcumulativesList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ACUMULATIVES_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get('/api/acumulativas', config)

    dispatch({ type: ACUMULATIVES_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACUMULATIVES_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteAcumulatives = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACUMULATIVES_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    await axios.delete(`/api/acumulativas/${id}`, config)

    dispatch({ type: ACUMULATIVES_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ACUMULATIVES_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAcumulativesByTaskId = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACUMULATIVES_LIST_BY_TASK_ID_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/acumulativas/lista-tarea/${taskId}`, config)

    dispatch({ type: ACUMULATIVES_LIST_BY_TASK_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACUMULATIVES_LIST_BY_TASK_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAcumulativesTasks = (managerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACUMULATIVES_TO_MANAGER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/acumulativas/lista-tareas/${managerId}`, config)

    dispatch({ type: ACUMULATIVES_TO_MANAGER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACUMULATIVES_TO_MANAGER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAcumulativesTasksHija = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACUMULATIVES_HIJA_TO_MANAGER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/acumulativas/lista-tareas-hija/${taskId}`, config)

    dispatch({ type: ACUMULATIVES_HIJA_TO_MANAGER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACUMULATIVES_HIJA_TO_MANAGER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
