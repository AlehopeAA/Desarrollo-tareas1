import axios from 'axios'
import {
  PROFILE_TO_MANAGER_REGISTER_REQUEST,
  PROFILE_TO_MANAGER_REGISTER_SUCCESS,
  PROFILE_TO_MANAGER_REGISTER_FAIL,
  PROFILE_TO_MANAGER_LIST_REQUEST,
  PROFILE_TO_MANAGER_LIST_SUCCESS,
  PROFILE_TO_MANAGER_LIST_FAIL,
  PROFILE_TO_MANAGER_UPDATE_SUCCESS,
  PROFILE_TO_MANAGER_UPDATE_REQUEST,
  PROFILE_TO_MANAGER_UPDATE_FAIL,
  PROFILE_TO_MANAGER_DELETE_FAIL,
  PROFILE_TO_MANAGER_DELETE_REQUEST,
  PROFILE_TO_MANAGER_DELETE_SUCCESS,
} from '../constants/profileToManagerConstants.js'

export const registerProfileToManager = (profileToManager) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_TO_MANAGER_REGISTER_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post('/api/perfiles/gestores', profileToManager, config)

    dispatch({ type: PROFILE_TO_MANAGER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROFILE_TO_MANAGER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getProfileToManagers = (managerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_TO_MANAGER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/perfiles/gestores/${managerId}`, config)

    dispatch({ type: PROFILE_TO_MANAGER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROFILE_TO_MANAGER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const profileToManagerUpdateInfo = (profileToManager) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_TO_MANAGER_UPDATE_REQUEST })

    const { data } = await axios.put(`/api/${profileToManager.id_}`, profileToManager)

    dispatch({ type: PROFILE_TO_MANAGER_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROFILE_TO_MANAGER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteProfileToManager = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_TO_MANAGER_DELETE_REQUEST })

    await axios.delete(`/api//${id}`)

    dispatch({ type: PROFILE_TO_MANAGER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PROFILE_TO_MANAGER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
