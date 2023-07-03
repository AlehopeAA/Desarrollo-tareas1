import axios from 'axios'
import {
  ACTIVITIES_LIST_REQUEST,
  ACTIVITIES_LIST_SUCCESS,
  ACTIVITIES_LIST_FAIL,
  ACTIVITIES_INFO_REQUEST,
  ACTIVITIES_INFO_SUCCESS,
  ACTIVITIES_INFO_FAIL,
  ACTIVITIES_REGISTER_REQUEST,
  ACTIVITIES_REGISTER_SUCCESS,
  ACTIVITIES_REGISTER_FAIL,
  ACTIVITIES_UPDATE_REQUEST,
  ACTIVITIES_UPDATE_SUCCESS,
  ACTIVITIES_UPDATE_FAIL,
  ACTIVITIES_DELETE_REQUEST,
  ACTIVITIES_DELETE_SUCCESS,
  ACTIVITIES_DELETE_FAIL,
  ACTIVITIES_LIST_BY_JOB_POSITION_ID_REQUEST,
  ACTIVITIES_LIST_BY_JOB_POSITION_ID_SUCCESS,
  ACTIVITIES_LIST_BY_JOB_POSITION_ID_FAIL,
} from '../constants/activitiesConstants'

export const getActivities = (aplicar_roles) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTIVITIES_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    if (aplicar_roles) {
      const { data } = await axios.get('/api/actividades/roles', config)
      dispatch({ type: ACTIVITIES_LIST_SUCCESS, payload: data })
    }
    else {
      const { data } = await axios.get('/api/actividades', config)
      dispatch({ type: ACTIVITIES_LIST_SUCCESS, payload: data })
    }

  } catch (error) {
    dispatch({
      type: ACTIVITIES_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getActivityInfo = (activity) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTIVITIES_INFO_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/actividades/${activity.id_actividad}`, config)

    dispatch({ type: ACTIVITIES_INFO_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACTIVITIES_INFO_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const registerActivity = (activity) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTIVITIES_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post('/api/actividades', activity, config)

    dispatch({ type: ACTIVITIES_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACTIVITIES_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const updateActivity = (activity) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTIVITIES_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/actividades/${activity.id_actividad}`, activity, config)

    dispatch({ type: ACTIVITIES_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACTIVITIES_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteActivity = (activityId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTIVITIES_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.delete(`/api/actividades/${activityId}`, config)

    dispatch({ type: ACTIVITIES_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACTIVITIES_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getActivitiesByJobPositionId = (jobPositionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTIVITIES_LIST_BY_JOB_POSITION_ID_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/actividades/puestostrabajo/${jobPositionId}`, config)

    dispatch({ type: ACTIVITIES_LIST_BY_JOB_POSITION_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACTIVITIES_LIST_BY_JOB_POSITION_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
