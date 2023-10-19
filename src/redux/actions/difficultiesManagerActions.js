import axios from 'axios'
import {
  DIFFICULTIES_TO_MANAGER_LIST_REQUEST,
  DIFFICULTIES_TO_MANAGER_LIST_SUCCESS,
  DIFFICULTIES_TO_MANAGER_LIST_FAIL,
  DIFFICULTIES_TO_MANAGER_REGISTER_REQUEST,
  DIFFICULTIES_TO_MANAGER_REGISTER_SUCCESS,
  DIFFICULTIES_TO_MANAGER_REGISTER_FAIL,
} from '../constants/difficultiesManagerConstants'

export const getTasksDificulties = (managerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFFICULTIES_TO_MANAGER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/dificultades/lista-tareas/${managerId}`, config)

    dispatch({ type: DIFFICULTIES_TO_MANAGER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIFFICULTIES_TO_MANAGER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getDifficultiesToManager = (managerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFFICULTIES_TO_MANAGER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/dificultades/gestores-datos/${managerId}`, config)

    dispatch({ type: DIFFICULTIES_TO_MANAGER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIFFICULTIES_TO_MANAGER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const assignDifficultiesToManager = (difficulties, currentJobPositionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFFICULTIES_TO_MANAGER_REGISTER_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post(
      '/api/dificultades/gestores-datos',
      { assigned: difficulties, id_puesto: currentJobPositionId },
      config
    )

    dispatch({ type: DIFFICULTIES_TO_MANAGER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIFFICULTIES_TO_MANAGER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
