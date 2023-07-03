import axios from 'axios'
import {
  PERMISSION_REGISTER_REQUEST,
  PERMISSION_REGISTER_SUCCESS,
  PERMISSION_REGISTER_FAIL,
  PERMISSION_LIST_REQUEST,
  PERMISSION_LIST_SUCCESS,
  PERMISSION_LIST_FAIL,
  PERMISSION_UPDATE_SUCCESS,
  PERMISSION_UPDATE_REQUEST,
  PERMISSION_UPDATE_FAIL,
  PERMISSION_DELETE_FAIL,
  PERMISSION_DELETE_REQUEST,
  PERMISSION_DELETE_SUCCESS,
} from '../constants/permissionConstants.js'

export const registerPermission = (permission) => async (dispatch) => {
  try {
    dispatch({ type: PERMISSION_REGISTER_REQUEST })

    const { data } = await axios.post('/api/permisos', permission)

    dispatch({ type: PERMISSION_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PERMISSION_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getPermissions = () => async (dispatch) => {
  try {
    dispatch({ type: PERMISSION_LIST_REQUEST })

    const { data } = await axios.get('/api/permisos')

    dispatch({ type: PERMISSION_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PERMISSION_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const permissionUpdateInfo = (permission) => async (dispatch) => {
  try {
    dispatch({ type: PERMISSION_UPDATE_REQUEST })

    const { data } = await axios.put(`/api/permisos/${permission.id_permiso}`, permission)

    dispatch({ type: PERMISSION_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PERMISSION_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deletePermission = (id) => async (dispatch) => {
  try {
    dispatch({ type: PERMISSION_DELETE_REQUEST })

    await axios.delete(`/api/permisos/${id}`)

    dispatch({ type: PERMISSION_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PERMISSION_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
