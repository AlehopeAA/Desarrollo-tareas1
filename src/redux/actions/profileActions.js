import axios from 'axios'
import {
   PROFILE_REGISTER_REQUEST,
   PROFILE_REGISTER_SUCCESS,
   PROFILE_REGISTER_FAIL,
   PROFILE_LIST_REQUEST,
   PROFILE_LIST_SUCCESS,
   PROFILE_LIST_FAIL,
   PROFILE_UPDATE_SUCCESS,
   PROFILE_UPDATE_REQUEST,
   PROFILE_UPDATE_FAIL,
   PROFILE_DELETE_FAIL,
   PROFILE_DELETE_REQUEST,
   PROFILE_DELETE_SUCCESS,
   PROFILE_BY_POSITION_LIST_REQUEST,
   PROFILE_BY_POSITION_LIST_SUCCESS,
   PROFILE_BY_POSITION_LIST_FAIL,
} from '../constants/profileConstants.js'

export const registerProfile = (profile) => async (dispatch) => {
   try {
      dispatch({ type: PROFILE_REGISTER_REQUEST })

      const { data } = await axios.post('/api/perfiles', profile)

      dispatch({ type: PROFILE_REGISTER_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: PROFILE_REGISTER_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
  }
}

export const getProfiles = () => async (dispatch, getState) => {
   try {
      dispatch({ type: PROFILE_LIST_REQUEST })

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

      const { data } = await axios.get('/api/perfiles', config)

      dispatch({ type: PROFILE_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: PROFILE_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const profileUpdateInfo = (profile) => async (dispatch) => {
   try {
      dispatch({ type: PROFILE_UPDATE_REQUEST })

      const { data } = await axios.put(`/api/perfiles/${profile.id_perfil}`, profile)

      dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: PROFILE_UPDATE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const deleteProfile = (id) => async (dispatch) => {
   try {
      dispatch({ type: PROFILE_DELETE_REQUEST })

      await axios.delete(`/api/perfiles/${id}`)

      dispatch({ type: PROFILE_DELETE_SUCCESS })
   } catch (error) {
      dispatch({
         type: PROFILE_DELETE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
  }
}

export const getProfilesByPosition = () => async (dispatch, getState) => {
   try {
      dispatch({ type: PROFILE_BY_POSITION_LIST_REQUEST })

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

      const { data } = await axios.post('/api/perfiles/puesto', {}, config)

      dispatch({ type: PROFILE_BY_POSITION_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: PROFILE_BY_POSITION_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}
