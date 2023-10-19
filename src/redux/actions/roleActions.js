import axios from 'axios'
import {
   ROLE_REGISTER_REQUEST,
   ROLE_REGISTER_SUCCESS,
   ROLE_REGISTER_FAIL,
   ROLE_LIST_REQUEST,
   ROLE_LIST_SUCCESS,
   ROLE_LIST_FAIL,
   ROLE_UPDATE_SUCCESS,
   ROLE_UPDATE_REQUEST,
   ROLE_UPDATE_FAIL,
   ROLE_DELETE_FAIL,
   ROLE_DELETE_REQUEST,
   ROLE_DELETE_SUCCESS,
   ROLE_RELATED_LIST_REQUEST,
   ROLE_RELATED_LIST_SUCCESS,
   ROLE_RELATED_LIST_FAIL,
} from '../constants/roleConstants'

export const registerRole = (role) => async (dispatch) => {
   try {
      dispatch({ type: ROLE_REGISTER_REQUEST })

      const { data } = await axios.post('/api/perfilroles', role)

      dispatch({ type: ROLE_REGISTER_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: ROLE_REGISTER_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const getRoles = () => async (dispatch) => {
   try {
      dispatch({ type: ROLE_LIST_REQUEST })

      const { data } = await axios.get('/api/perfilroles')

      dispatch({ type: ROLE_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: ROLE_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const roleUpdateInfo = (role) => async (dispatch) => {
   try {
      dispatch({ type: ROLE_UPDATE_REQUEST })

      const { data } = await axios.put(`/api/perfilroles/${role.id_rol}`, role)

      dispatch({ type: ROLE_UPDATE_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: ROLE_UPDATE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const deleteRole = (id) => async (dispatch) => {
   try {
      dispatch({ type: ROLE_DELETE_REQUEST })

      await axios.delete(`/api/perfilroles/${id}`)

      dispatch({ type: ROLE_DELETE_SUCCESS })
   } catch (error) {
      dispatch({
         type: ROLE_DELETE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const getRolesRelated = () => async (dispatch, getState) => {
   try {
      dispatch({ type: ROLE_RELATED_LIST_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post('/api/perfilroles/relacionados', {},  config)

      dispatch({ type: ROLE_RELATED_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: ROLE_RELATED_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}
