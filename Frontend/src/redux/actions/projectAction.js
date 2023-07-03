import axios from 'axios'
import {
  PROJECT_REGISTER_REQUEST,
  PROJECT_REGISTER_SUCCESS,
  PROJECT_REGISTER_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
} from '../constants/projectConstant'

export const registerProject = (projectData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const fieldsFiles = ['images']

    let formData = new FormData()

    for (let key in projectData) {
      if (!fieldsFiles.includes(key)) {
        formData.append(key, projectData[key])
      }
    }

    if (projectData.images) {
      projectData.images.forEach((elm) => {
        formData.append('images', elm)
      })
    }

    const { data } = await axios.post('/api/projects', formData, config)

    dispatch({ type: PROJECT_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROJECT_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAllProjects = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST })

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

    const { data } = await axios.get('/api/projects', config)

    dispatch({ type: PROJECT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateProject = (projectData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const imageStringType = typeof projectData.images === 'string' || projectData.images === ''
    const filePdfStringType = typeof projectData.simpleNoteFile === 'string' || projectData.simpleNoteFile === ''

    const contentType = imageStringType ? 'application/json' : 'multipart/form-data'

    const config = {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const fieldsFiles = ['simpleNoteFile', 'images']

    let formData = new FormData()

    for (let key in projectData) {
      if (!fieldsFiles.includes(key)) {
        formData.append(key, projectData[key])
      }
    }
    if (!imageStringType) {
      formData.append('images', projectData.images)
    }

    if (!filePdfStringType) {
      formData.append('simpleNoteFile', projectData.simpleNoteFile[0])
    }

    const allString = imageStringType && filePdfStringType

    const dataTosend = allString ? projectData : formData
    const { data } = await axios.put(`/api/projects/${projectData._id}`, dataTosend, config)

    dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteProject = (projectId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_DELETE_REQUEST })

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

    const { data } = await axios.delete(`/api/projects/${projectId}`, config)

    dispatch({ type: PROJECT_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
