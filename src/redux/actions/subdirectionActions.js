import axios from 'axios'
import {
   SUBDIRECTION_REGISTER_REQUEST,
   SUBDIRECTION_REGISTER_SUCCESS,
   SUBDIRECTION_REGISTER_FAIL,
   SUBDIRECTION_LIST_REQUEST,
   SUBDIRECTION_LIST_SUCCESS,
   SUBDIRECTION_LIST_FAIL,
   SUBDIRECTION_UPDATE_SUCCESS,
   SUBDIRECTION_UPDATE_REQUEST,
   SUBDIRECTION_UPDATE_FAIL,
   SUBDIRECTION_DELETE_FAIL,
   SUBDIRECTION_DELETE_REQUEST,
   SUBDIRECTION_DELETE_SUCCESS,
   SUBDIRECTION_RELATED_LIST_REQUEST,
   SUBDIRECTION_RELATED_LIST_SUCCESS,
   SUBDIRECTION_RELATED_LIST_FAIL,
} from '../constants/subdirectionConstants.js'

export const registerSubdirection = (subdirection) => async (dispatch) => {
   try {
      dispatch({ type: SUBDIRECTION_REGISTER_REQUEST })

      const { data } = await axios.post('/api/perfilsubdirecciones', subdirection)

      dispatch({ type: SUBDIRECTION_REGISTER_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: SUBDIRECTION_REGISTER_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const getSubdirections = () => async (dispatch) => {
   try {
      dispatch({ type: SUBDIRECTION_LIST_REQUEST })

      const { data } = await axios.get('/api/perfilsubdirecciones')

      dispatch({ type: SUBDIRECTION_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: SUBDIRECTION_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const getSubdirectionsRelated = () => async (dispatch, getState) => {
   try {
      dispatch({ type: SUBDIRECTION_RELATED_LIST_REQUEST })

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

      const { data } = await axios.post('/api/perfilsubdirecciones/relacionados', {}, config)

      dispatch({ type: SUBDIRECTION_RELATED_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: SUBDIRECTION_RELATED_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const subdirectionUpdateInfo = (subdireccion) => async (dispatch) => {
   try {
      dispatch({ type: SUBDIRECTION_UPDATE_REQUEST })

      const { data } = await axios.put(`/api/perfilsubdirecciones/${subdireccion.id_subdireccion}`, subdireccion)

      dispatch({ type: SUBDIRECTION_UPDATE_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: SUBDIRECTION_UPDATE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const deleteSubdirection = (id) => async (dispatch) => {
   try {
      dispatch({ type: SUBDIRECTION_DELETE_REQUEST })

      await axios.delete(`/api/perfilsubdirecciones/${id}`)

      dispatch({ type: SUBDIRECTION_DELETE_SUCCESS })
   } catch (error) {
      dispatch({
         type: SUBDIRECTION_DELETE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}
