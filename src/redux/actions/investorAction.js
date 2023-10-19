import axios from 'axios'
import {
  INVESTOR_REGISTER_FAIL,
  INVESTOR_REGISTER_REQUEST,
  INVESTOR_REGISTER_SUCCESS,
  INVESTOR_LIST_REQUEST,
  INVESTOR_LIST_SUCCESS,
  INVESTOR_LIST_FAIL,
  INVESTOR_USER_REQUEST,
  INVESTOR_USER_SUCCESS,
  INVESTOR_USER_FAIL,
  INVESTOR_UPDATE_REQUEST,
  INVESTOR_UPDATE_SUCCESS,
  INVESTOR_UPDATE_FAIL,
} from '../constants/investorConstant'

import { USER_LOGOUT } from '../constants/userConstants'

export const registerUserInvestor = (userInvestorData) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTOR_REGISTER_REQUEST })

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

    const { data } = await axios.post('/api/investors', userInvestorData, config)

    dispatch({ type: INVESTOR_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTOR_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAllUsersInvestors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTOR_LIST_REQUEST })

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

    const { data } = await axios.get('/api/investors', config)

    dispatch({ type: INVESTOR_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTOR_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getUserInvestor = (investorId) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTOR_USER_REQUEST })

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

    const { data } = await axios.get(`/api/investors/${investorId}`, config)

    dispatch({ type: INVESTOR_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTOR_USER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateInvestor = (investor) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTOR_UPDATE_REQUEST })

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

    const { data } = await axios.put(`/api/investors/update`, investor, config)

    dispatch({ type: INVESTOR_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTOR_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

