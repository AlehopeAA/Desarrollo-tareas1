import axios from 'axios'
import {
  OBJETIVES_ABSENCES_REGISTER_REQUEST,
  OBJETIVES_ABSENCES_REGISTER_SUCCESS,
  OBJETIVES_ABSENCES_REGISTER_FAIL,
  OBJETIVES_ABSENCES_LIST_REQUEST,
  OBJETIVES_ABSENCES_LIST_SUCCESS,
  OBJETIVES_ABSENCES_LIST_FAIL,
  OBJETIVES_ABSENCES_UPDATE_REQUEST,
  OBJETIVES_ABSENCES_UPDATE_SUCCESS,
  OBJETIVES_ABSENCES_UPDATE_FAIL,
  OBJETIVES_ABSENCES_DELETE_REQUEST,
  OBJETIVES_ABSENCES_DELETE_SUCCESS,
  OBJETIVES_ABSENCES_DELETE_FAIL,
} from '../constants/objetivesAbsenceConstants'

export const registerObjetiveAbsence = (objetiveAbsence) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_ABSENCES_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { id_tarea } = objetiveAbsence.task
    objetiveAbsence.task = id_tarea
    const { data } = await axios.post('/api/objetivosausencias', objetiveAbsence, config)

    dispatch({ type: OBJETIVES_ABSENCES_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_ABSENCES_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getObjetivesAbsenses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_ABSENCES_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get('/api/objetivosausencias', config)

    dispatch({ type: OBJETIVES_ABSENCES_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_ABSENCES_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const objetivesAbsensesUpdateInfo = (objetiveAbsence) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_ABSENCES_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/objetivosausencias/${objetiveAbsence.id_objetivo}`, objetiveAbsence, config)

    dispatch({ type: OBJETIVES_ABSENCES_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OBJETIVES_ABSENCES_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteObjetivesAbsenses = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: OBJETIVES_ABSENCES_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    await axios.delete(`/api/objetivosausencias/${id}`, config)

    dispatch({ type: OBJETIVES_ABSENCES_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: OBJETIVES_ABSENCES_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
