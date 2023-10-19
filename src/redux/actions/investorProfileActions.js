import axios from 'axios'
import {
  INVESTOR_PROFILE_REGISTER_REQUEST,
  INVESTOR_PROFILE_REGISTER_SUCCESS,
  INVESTOR_PROFILE_REGISTER_FAIL,
  INVESTORS_PROFILE_BY_USER_REQUEST,
  INVESTORS_PROFILE_BY_USER_SUCCESS,
  INVESTORS_PROFILE_BY_USER_FAIL,
  INVESTOR_PROFILE_UPDATE_REQUEST,
  INVESTOR_PROFILE_UPDATE_SUCCESS,
  INVESTOR_PROFILE_UPDATE_FAIL,
} from '../constants/investorProfileConstants'

export const registerProfileInvestor = (profileInvestorData) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTOR_PROFILE_REGISTER_REQUEST })

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

    const { data } = await axios.post('/api/profiles', profileInvestorData, config)

    dispatch({ type: INVESTOR_PROFILE_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTOR_PROFILE_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getMyInvestorProfiles = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTORS_PROFILE_BY_USER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/profiles/${userId}`, config)

    dispatch({ type: INVESTORS_PROFILE_BY_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTORS_PROFILE_BY_USER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateInvestorProfile = (profileInfo) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTOR_PROFILE_UPDATE_REQUEST })

    const imageStringType = typeof profileInfo.images === 'string' || profileInfo.images === ''

    const contentType = imageStringType ? 'application/json' : 'multipart/form-data'

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const fieldsFiles = ['images']

    let formData = new FormData()

    for (let key in profileInfo) {
      if (!fieldsFiles.includes(key)) {
        formData.append(key, profileInfo[key])
      }
    }
    if (!imageStringType) {
      formData.append('images', profileInfo.images)
    }

    const dataTosend = imageStringType ? profileInfo : formData
    const { data } = await axios.put(`/api/profiles/${profileInfo._id}`, dataTosend, config)

    dispatch({ type: INVESTOR_PROFILE_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVESTOR_PROFILE_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

