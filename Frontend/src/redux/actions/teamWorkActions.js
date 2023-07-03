import axios from 'axios'
import {
  TEAM_WORK_REGISTER_BY_RESPONSIBLE_REQUEST,
  TEAM_WORK_REGISTER_BY_RESPONSIBLE_SUCCESS,
  TEAM_WORK_REGISTER_BY_RESPONSIBLE_FAIL,
  TEAM_WORK_REGISTER_BY_PERMISSION_REQUEST,
  TEAM_WORK_REGISTER_BY_PERMISSION_SUCCESS,
  TEAM_WORK_REGISTER_BY_PERMISSION_FAIL,
  TEAM_WORK_LIST_REQUEST,
  TEAM_WORK_LIST_SUCCESS,
  TEAM_WORK_LIST_FAIL,
  TEAM_WORK_UPDATE_SUCCESS,
  TEAM_WORK_UPDATE_REQUEST,
  TEAM_WORK_UPDATE_FAIL,
  TEAM_WORK_DELETE_FAIL,
  TEAM_WORK_DELETE_REQUEST,
  TEAM_WORK_DELETE_SUCCESS,
  TEAM_WORKS_BY_RESPONSIBLE_REQUEST,
  TEAM_WORKS_BY_RESPONSIBLE_SUCCESS,
  TEAM_WORKS_BY_RESPONSIBLE_FAIL,
  TEAM_WORKS_BY_VALIDATOR_REQUEST,
  TEAM_WORKS_BY_VALIDATOR_SUCCESS,
  TEAM_WORKS_BY_VALIDATOR_FAIL,
  TEAM_WORK_REGISTER_BY_VALIDATOR_REQUEST,
  TEAM_WORK_REGISTER_BY_VALIDATOR_SUCCESS,
  TEAM_WORK_REGISTER_BY_VALIDATOR_FAIL,
  TEAM_WORK_LIST_BY_ROLE_REQUEST,
  TEAM_WORK_LIST_BY_ROLE_SUCCESS,
  TEAM_WORK_LIST_BY_ROLE_FAIL,
  TEAM_WORK_HISTORICAL_REQUEST,
  TEAM_WORK_HISTORICAL_SUCCESS,
  TEAM_WORK_HISTORICAL_FAIL,
} from '../constants/teamWorkConstants'

export const registerTeamWorkByResponsible = (teamWork) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_WORK_REGISTER_BY_RESPONSIBLE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post('/api/equipostrabajo/responsables', teamWork, config)

    dispatch({ type: TEAM_WORK_REGISTER_BY_RESPONSIBLE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TEAM_WORK_REGISTER_BY_RESPONSIBLE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const registerTeamWorkByValidator = (teamWork) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_WORK_REGISTER_BY_VALIDATOR_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post('/api/equipostrabajo/validadores', teamWork, config)

    dispatch({ type: TEAM_WORK_REGISTER_BY_VALIDATOR_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TEAM_WORK_REGISTER_BY_VALIDATOR_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const registerTeamWorkByPermission = (teamWork) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_WORK_REGISTER_BY_PERMISSION_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post('/api/permisospuesto/asignar/permisos', teamWork, config)

    dispatch({ type: TEAM_WORK_REGISTER_BY_PERMISSION_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TEAM_WORK_REGISTER_BY_PERMISSION_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTeamWorksByRole = (permissionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_WORK_LIST_BY_ROLE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/puestostrabajo/permisos/${permissionId}`, config)

    dispatch({ type: TEAM_WORK_LIST_BY_ROLE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TEAM_WORK_LIST_BY_ROLE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTeamWorks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_WORK_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get('/api/equipostrabajo', config)

    dispatch({ type: TEAM_WORK_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TEAM_WORK_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getTeamWorksResponsible = (idJobPosition) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_WORKS_BY_RESPONSIBLE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/equipostrabajo/responsables/${idJobPosition}`, config)

    dispatch({ type: TEAM_WORKS_BY_RESPONSIBLE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TEAM_WORKS_BY_RESPONSIBLE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getTeamWorksValidator = (idJobPosition) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_WORKS_BY_VALIDATOR_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/equipostrabajo/validadores/${idJobPosition}`, config)

    dispatch({ type: TEAM_WORKS_BY_VALIDATOR_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TEAM_WORKS_BY_VALIDATOR_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteTeamWork = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEAM_WORK_DELETE_REQUEST })

    await axios.delete(`/api/puestostrabajo/${id}`)

    dispatch({ type: TEAM_WORK_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TEAM_WORK_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const teamWorkUpdateInfo = (teamWork) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_WORK_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/puestostrabajo/${teamWork.id_puesto}`, teamWork, config)

    dispatch({ type: TEAM_WORK_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TEAM_WORK_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getJobPositionHistorical = (jobPosition) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_WORK_HISTORICAL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.get(`/api/puestostrabajo/historicos/${jobPosition.id_puesto}`, config)

    dispatch({ type: TEAM_WORK_HISTORICAL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TEAM_WORK_HISTORICAL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
