import axios from 'axios'
import {
  ENTRIES_TO_MANAGER_LIST_REQUEST,
  ENTRIES_TO_MANAGER_LIST_SUCCESS,
  ENTRIES_TO_MANAGER_LIST_FAIL,
  ENTRIES_TO_MANAGER_REGISTER_REQUEST,
  ENTRIES_TO_MANAGER_REGISTER_SUCCESS,
  ENTRIES_TO_MANAGER_REGISTER_FAIL,
} from '../constants/entriesManagerConstants'

export const getEntriesToManager = (managerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTRIES_TO_MANAGER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/entradas/gestores-datos/${managerId}`, config)

    dispatch({ type: ENTRIES_TO_MANAGER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ENTRIES_TO_MANAGER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const assignEntriesToManager = (entries, currentJobPositionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTRIES_TO_MANAGER_REGISTER_REQUEST })
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
      '/api/entradas/gestores-datos',
      { assigned: entries, id_puesto: currentJobPositionId },
      config
    )

    dispatch({ type: ENTRIES_TO_MANAGER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ENTRIES_TO_MANAGER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
