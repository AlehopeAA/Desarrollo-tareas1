import axios from 'axios'
import {
  DIFFICULTIES_LIST_REQUEST,
  DIFFICULTIES_LIST_SUCCESS,
  DIFFICULTIES_LIST_FAIL,
  DIFFICULTIES_DELETE_REQUEST,
  DIFFICULTIES_DELETE_SUCCESS,
  DIFFICULTIES_DELETE_FAIL,
} from '../constants/difficultiesConstants'

export const getDifficulties = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFFICULTIES_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/dificultades/gestores-datos`, config)

    dispatch({ type: DIFFICULTIES_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIFFICULTIES_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteDifficulty = (difficultiesId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIFFICULTIES_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    await axios.delete(`/api/dificultades/gestores-datos/${difficultiesId}`, config)

    dispatch({ type: DIFFICULTIES_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: DIFFICULTIES_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
