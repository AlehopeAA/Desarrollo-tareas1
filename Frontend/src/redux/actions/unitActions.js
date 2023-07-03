import axios from 'axios'
import {
   UNIT_REGISTER_REQUEST,
   UNIT_REGISTER_SUCCESS,
   UNIT_REGISTER_FAIL,
   UNIT_LIST_REQUEST,
   UNIT_LIST_SUCCESS,
   UNIT_LIST_FAIL,
   UNIT_UPDATE_SUCCESS,
   UNIT_UPDATE_REQUEST,
   UNIT_UPDATE_FAIL,
   UNIT_DELETE_FAIL,
   UNIT_DELETE_REQUEST,
   UNIT_DELETE_SUCCESS,
   UNIT_RELATED_LIST_REQUEST,
   UNIT_RELATED_LIST_SUCCESS,
   UNIT_RELATED_LIST_FAIL,
} from '../constants/unitConstants.js'

export const registerUnit = (unit) => async (dispatch) => {
   try {
      dispatch({ type: UNIT_REGISTER_REQUEST })

      const { data } = await axios.post('/api/perfilunidades', unit)

      dispatch({ type: UNIT_REGISTER_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: UNIT_REGISTER_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const getUnits = () => async (dispatch) => {
   try {
      dispatch({ type: UNIT_LIST_REQUEST })

      const { data } = await axios.get('/api/perfilunidades')

      dispatch({ type: UNIT_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: UNIT_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const unitUpdateInfo = (unit) => async (dispatch) => {
   try {
      dispatch({ type: UNIT_UPDATE_REQUEST })

      const { data } = await axios.put(`/api/perfilunidades/${unit.id_unidad}`, unit)

      dispatch({ type: UNIT_UPDATE_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: UNIT_UPDATE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const deleteUnit = (id) => async (dispatch) => {
   try {
      dispatch({ type: UNIT_DELETE_REQUEST })

      await axios.delete(`/api/perfilunidades/${id}`)

      dispatch({ type: UNIT_DELETE_SUCCESS })
   } catch (error) {
      dispatch({
         type: UNIT_DELETE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}
export const getUnitsRelated = () => async (dispatch, getState) => {
   try {
      dispatch({ type: UNIT_RELATED_LIST_REQUEST })

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

      const { data } = await axios.post('/api/perfilunidades/relacionados', {}, config)

      dispatch({ type: UNIT_RELATED_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: UNIT_RELATED_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}
