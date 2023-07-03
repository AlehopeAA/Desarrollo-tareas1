import axios from 'axios'
import {
  INVESTMENT_REGISTER_FAIL,
  INVESTMENT_REGISTER_REQUEST,
  INVESTMENT_REGISTER_SUCCESS,
  INVESTMENT_MY_LIST_REQUEST,
  INVESTMENT_MY_LIST_SUCCESS,
  INVESTMENT_MY_LIST_FAIL,
  INVESTMENT_ANNULATION_REQUEST_REQUEST,
  INVESTMENT_ANNULATION_REQUEST_SUCCESS,
  INVESTMENT_ANNULATION_REQUEST_FAIL,
  INVESTMENT_ADMIN_DECLINE_REQUEST,
  INVESTMENT_ADMIN_DECLINE_SUCCESS,
  INVESTMENT_ADMIN_DECLINE_FAIL,
  INVESTMENTS_BY_PROJECT_REQUEST,
  INVESTMENTS_BY_PROJECT_SUCCESS,
  INVESTMENTS_BY_PROJECT_FAIL,
  INVESTMENT_CANCELLATION_LIST_REQUEST,
  INVESTMENT_CANCELLATION_LIST_SUCCESS,
  INVESTMENT_CANCELLATION_LIST_FAIL,
  INVESTMENT_LIST_REQUEST,
  INVESTMENT_LIST_SUCCESS,
  INVESTMENT_LIST_FAIL,
  INVESTMENT_HISTORY_REQUEST,
  INVESTMENT_HISTORY_SUCCESS,
  INVESTMENT_HISTORY_FAIL,
  INVESTMENTS_BY_PROFILE_AND_PROJECT_REQUEST,
  INVESTMENTS_BY_PROFILE_AND_PROJECT_SUCCESS,
  INVESTMENTS_BY_PROFILE_AND_PROJECT_FAIL,
  INVESTMENTS_BY_PROFILE_REQUEST,
  INVESTMENTS_BY_PROFILE_SUCCESS,
  INVESTMENTS_BY_PROFILE_FAIL,
  INVESTMENT_INCOME_RECIVED_REQUEST,
  INVESTMENT_INCOME_RECIVED_SUCCESS,
  INVESTMENT_INCOME_RECIVED_FAIL,
  INVESTMENT_INCOME_RECIVED_RESET,
} from '../constants/investmentConstants'

export const registerInvestment = (investmentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTMENT_REGISTER_REQUEST })

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

    const { data } = await axios.post('/api/investments', investmentData, config)

    dispatch({ type: INVESTMENT_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTMENT_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const myInvestmentList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTMENT_MY_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get('/api/investments/my', config)
    dispatch({ type: INVESTMENT_MY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTMENT_MY_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const investmentAnnulationRequest = (investment) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTMENT_ANNULATION_REQUEST_REQUEST })

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
    const { data } = await axios.put(`/api/investments/update/${investment._id}`, investment, config)

    dispatch({ type: INVESTMENT_ANNULATION_REQUEST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTMENT_ANNULATION_REQUEST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const declineInvestment = (investment) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTMENT_ADMIN_DECLINE_REQUEST })

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
    const { data } = await axios.put(`/api/investments/delete`, investment, config)

    dispatch({ type: INVESTMENT_ADMIN_DECLINE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTMENT_ADMIN_DECLINE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getInvestmentsByProject = (projectId) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTMENTS_BY_PROJECT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/investments/project/${projectId}`, config)

    dispatch({ type: INVESTMENTS_BY_PROJECT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTMENTS_BY_PROJECT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getInvestmentsByProfile = (profileId) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTMENTS_BY_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/investments/list/${profileId}`, config)

    dispatch({ type: INVESTMENTS_BY_PROFILE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTMENTS_BY_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getInvestmentsByProfileAndProject = (projectId, profileId) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTMENTS_BY_PROFILE_AND_PROJECT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/investments/project/${projectId}/${profileId}`, config)

    dispatch({ type: INVESTMENTS_BY_PROFILE_AND_PROJECT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTMENTS_BY_PROFILE_AND_PROJECT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getInvestmentCancellationList = (projectId) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTMENT_CANCELLATION_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/investments/cancellations`, config)

    dispatch({ type: INVESTMENT_CANCELLATION_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTMENT_CANCELLATION_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getInvestmentsList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTMENT_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/investments/list`, config)

    dispatch({ type: INVESTMENT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTMENT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getInvestmentsHistory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTMENT_HISTORY_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/investments/history`, config)

    dispatch({ type: INVESTMENT_HISTORY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTMENT_HISTORY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
