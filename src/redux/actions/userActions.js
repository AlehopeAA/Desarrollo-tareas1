import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_AVISOS_REQUEST,
  USER_AVISOS_SUCCESS,
  USER_AVISOS_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_REFRESH_TOKEN_REQUEST,
  USER_REFRESH_TOKEN_SUCCESS,
  USER_REFRESH_TOKEN_FAIL,
  USER_LIST_BY_ROLE_NAME_REQUEST,
  USER_LIST_BY_ROLE_NAME_SUCCESS,
  USER_LIST_BY_ROLE_NAME_FAIL,
  USER_PROFILE_INFO_REQUEST,
  USER_PROFILE_INFO_SUCCESS,
  USER_PROFILE_INFO_FAIL,
  USER_RESPONSIBLES_LIST_REQUEST,
  USER_RESPONSIBLES_LIST_SUCCESS,
  USER_RESPONSIBLES_LIST_FAIL,
  USER_VALIDATORS_LIST_REQUEST,
  USER_VALIDATORS_LIST_SUCCESS,
  USER_VALIDATORS_LIST_FAIL,
  USER_LIST_BY_PROFILE_ID_REQUEST,
  USER_LIST_BY_PROFILE_ID_SUCCESS,
  USER_LIST_BY_PROFILE_ID_FAIL,
  USER_GET_FAVORITES_REQUEST,
  USER_GET_FAVORITES_SUCCESS,
  USER_GET_FAVORITES_FAIL,
  USER_REGISTER_FAVORITES_REQUEST,
  USER_REGISTER_FAVORITES_SUCCESS,
  USER_REGISTER_FAVORITES_FAIL,
} from '../constants/userConstants'
import parseJwt from 'shared/middlewares/parseJwt'

export const login = (infoObject) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const {
      data: { validadores, responsables, tareas, favorites, objetivos, token },
    } = await axios.post('/api/users/login', infoObject, config)
    const decoded = parseJwt(token)
    const userSession = {
      ...decoded,
      token: token,
      responsables,
      validadores,
      tareas,
      favorites,
      objetivos,
    }

    dispatch({ type: USER_LOGIN_SUCCESS, payload: userSession })

    localStorage.setItem('setADA', JSON.stringify(token))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAvisosUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_AVISOS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post(`/api/users/avisos`, {}, config)

    dispatch({ type: USER_AVISOS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_AVISOS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const registerUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post('/api/puestostrabajo', user, config)

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/puestostrabajo/${id}`, config)

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/puestostrabajo`, config)

    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const refreshToken = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REFRESH_TOKEN_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    await axios.get(`/api/users/refreshtoken`, config)

    dispatch({ type: USER_REFRESH_TOKEN_SUCCESS })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      dispatch({
        type: USER_LOGOUT,
      })
    }
    dispatch({
      type: USER_REFRESH_TOKEN_FAIL,
      payload: message,
    })
  }
}

export const userUpdateMyInfo = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST })

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

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    const decoded = parseJwt(data.token)
    const userSession = {
      ...decoded,
      token: data.token,
    }

    dispatch({ type: USER_UPDATE_SUCCESS, payload: userSession })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: userSession })
    localStorage.setItem('setCHGG', JSON.stringify(data.token))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const getProfileInfo = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_INFO_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.get(`/api/users/info-profile/${userInfo.id_puesto}`)

    dispatch({ type: USER_PROFILE_INFO_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_PROFILE_INFO_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const userUpdateInfo = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST })

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

    const { data } = await axios.put(`/api/puestostrabajo/${user.id_puesto}`, user, config)

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })

    await axios.delete(`/api/puestostrabajo/${id}`)

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/logout`, { withCredentials: true })

    dispatch({ type: USER_LOGOUT })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
  })
}
  
}

export const getUsersByRoleName = (roleName) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_BY_ROLE_NAME_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/puestostrabajo/roles/${roleName}`, config)

    dispatch({ type: USER_LIST_BY_ROLE_NAME_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_BY_ROLE_NAME_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getUsersByProfileId = (profileId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_BY_PROFILE_ID_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/puestostrabajo/perfiles/${profileId}`, config)

    dispatch({ type: USER_LIST_BY_PROFILE_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_BY_PROFILE_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getUsersResponsibles = (roleName) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_RESPONSIBLES_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/puestostrabajo/roles/${roleName}`, config)

    dispatch({ type: USER_RESPONSIBLES_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_RESPONSIBLES_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getUsersValidators = (roleName) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_VALIDATORS_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/puestostrabajo/roles/${roleName}`, config)

    dispatch({ type: USER_VALIDATORS_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_VALIDATORS_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getUsersInforme = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/puestostrabajo/informe`, config)

    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getUsersValidacion = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post(`/api/puestostrabajo/validacion`, filter, config)

    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getUsersSupervision = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post(`/api/puestostrabajo/supervision`, filter, config)

    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getFavoritesTasks = (idJobPosition) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_GET_FAVORITES_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get(`/api/users/tareasfavoritas/${idJobPosition}`, config)

    dispatch({ type: USER_GET_FAVORITES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_GET_FAVORITES_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const registerFavoritesTasks = (favorites) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REGISTER_FAVORITES_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post(`/api/users/tareasfavoritas`, favorites, config)

    dispatch({ type: USER_REGISTER_FAVORITES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAVORITES_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
