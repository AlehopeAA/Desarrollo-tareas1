import axios from 'axios'
import {
   DEPARTAMENT_REGISTER_REQUEST,
   DEPARTAMENT_REGISTER_SUCCESS,
   DEPARTAMENT_REGISTER_FAIL,
   DEPARTAMENT_LIST_REQUEST,
   DEPARTAMENT_LIST_SUCCESS,
   DEPARTAMENT_LIST_FAIL,
   DEPARTAMENT_UPDATE_SUCCESS,
   DEPARTAMENT_UPDATE_REQUEST,
   DEPARTAMENT_UPDATE_FAIL,
   DEPARTAMENT_DELETE_FAIL,
   DEPARTAMENT_DELETE_REQUEST,
   DEPARTAMENT_DELETE_SUCCESS,
   DEPARTAMENT_RELATED_LIST_REQUEST,
   DEPARTAMENT_RELATED_LIST_SUCCESS,
   DEPARTAMENT_RELATED_LIST_FAIL,
} from '../constants/departamentConstants'

export const registerDepartament = (departament) => async (dispatch) => {
   try {
      dispatch({ type: DEPARTAMENT_REGISTER_REQUEST })

      const { data } = await axios.post('/api/perfildepartamentos', departament)

      dispatch({ type: DEPARTAMENT_REGISTER_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: DEPARTAMENT_REGISTER_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const getDepartaments = () => async (dispatch) => {
   try {
      dispatch({ type: DEPARTAMENT_LIST_REQUEST })

      const { data } = await axios.get('/api/perfildepartamentos')

      dispatch({ type: DEPARTAMENT_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: DEPARTAMENT_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const departamentUpdateInfo = (departament) => async (dispatch) => {
   try {
      dispatch({ type: DEPARTAMENT_UPDATE_REQUEST })

      const { data } = await axios.put(`/api/perfildepartamentos/${departament.id_departamento}`, departament)

      dispatch({ type: DEPARTAMENT_UPDATE_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: DEPARTAMENT_UPDATE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const deleteDepartament = (id) => async (dispatch) => {
   try {
      dispatch({ type: DEPARTAMENT_DELETE_REQUEST })

      await axios.delete(`/api/perfildepartamentos/${id}`)

      dispatch({ type: DEPARTAMENT_DELETE_SUCCESS })
   } catch (error) {
      dispatch({
         type: DEPARTAMENT_DELETE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}
export const getDepartamentsRelated = () => async (dispatch, getState) => {
   try {
      dispatch({ type: DEPARTAMENT_RELATED_LIST_REQUEST })

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

      const { data } = await axios.post('/api/perfildepartamentos/relacionados', {}, config)

      dispatch({ type: DEPARTAMENT_RELATED_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: DEPARTAMENT_RELATED_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
   }
}
