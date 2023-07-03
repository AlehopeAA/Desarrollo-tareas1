import axios from 'axios'
import {
  USER_PERMISSION_REGISTER_REQUEST,
  USER_PERMISSION_REGISTER_SUCCESS,
  USER_PERMISSION_REGISTER_FAIL,
  USER_PERMISSION_LIST_REQUEST,
  USER_PERMISSION_LIST_SUCCESS,
  USER_PERMISSION_LIST_FAIL,
  USER_PERMISSION_UPDATE_SUCCESS,
  USER_PERMISSION_UPDATE_REQUEST,
  USER_PERMISSION_UPDATE_FAIL,
  USER_PERMISSION_DELETE_FAIL,
  USER_PERMISSION_DELETE_REQUEST,
  USER_PERMISSION_DELETE_SUCCESS,
} from '../constants/userPermissionConstants.js'

export const registerUserPermission = (userPermission) => async (dispatch) => {
  try {
    dispatch({ type: USER_PERMISSION_REGISTER_REQUEST })

    const { data } = await axios.post('/api/permisospuesto', userPermission)

    dispatch({ type: USER_PERMISSION_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_PERMISSION_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getUserPermissions = () => async (dispatch) => {
  try {
    dispatch({ type: USER_PERMISSION_LIST_REQUEST })

    const { data } = await axios.get('/api/permisospuesto')

    dispatch({ type: USER_PERMISSION_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_PERMISSION_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const userPermissionUpdateInfo = (userPermission) => async (dispatch) => {
  try {
    dispatch({ type: USER_PERMISSION_UPDATE_REQUEST })

    const { data } = await axios.put(`/api/permisospuesto/${userPermission.id_permiso_puesto}`, userPermission)

    dispatch({ type: USER_PERMISSION_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_PERMISSION_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteUserPermission = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_PERMISSION_DELETE_REQUEST })

    await axios.delete(`/api/permisospuesto/${id}`)

    dispatch({ type: USER_PERMISSION_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: USER_PERMISSION_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
