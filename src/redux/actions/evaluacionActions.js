import axios from 'axios'
import {
  EVALUACION_INFO_REQUEST,
  EVALUACION_INFO_SUCCESS,
  EVALUACION_INFO_FAIL,
  EVALUACION_CURRENT_REQUEST,
  EVALUACION_CURRENT_SUCCESS,
  EVALUACION_CURRENT_FAIL,
  EVALUACION_AGREGADO_REQUEST,
  EVALUACION_AGREGADO_SUCCESS,
  EVALUACION_AGREGADO_FAIL,
  EVALUACION_RESUMEN_REQUEST,
  EVALUACION_RESUMEN_SUCCESS,
  EVALUACION_RESUMEN_FAIL,
  EVALUACION_CALCULO_REQUEST,
  EVALUACION_CALCULO_SUCCESS,
  EVALUACION_CALCULO_FAIL,
  EVALUACION_CORRECCION_UPDATE_REQUEST,
  EVALUACION_CORRECCION_UPDATE_SUCCESS,
  EVALUACION_CORRECCION_UPDATE_FAIL,
  EVALUACION_CORRECCION_DELETE_REQUEST,
  EVALUACION_CORRECCION_DELETE_SUCCESS,
  EVALUACION_CORRECCION_DELETE_FAIL,
  EVALUACION_CORRECCION_GLOBAL_UPDATE_REQUEST,
  EVALUACION_CORRECCION_GLOBAL_UPDATE_SUCCESS,
  EVALUACION_CORRECCION_GLOBAL_UPDATE_FAIL,
  EVALUACION_CORRECCION_GLOBAL_DELETE_REQUEST,
  EVALUACION_CORRECCION_GLOBAL_DELETE_SUCCESS,
  EVALUACION_CORRECCION_GLOBAL_DELETE_FAIL,
  EVALUACION_VALIDACION_UPDATE_REQUEST,
  EVALUACION_VALIDACION_UPDATE_SUCCESS,
  EVALUACION_VALIDACION_UPDATE_FAIL,
  EVALUACION_SUPERVISION_UPDATE_REQUEST,
  EVALUACION_SUPERVISION_UPDATE_SUCCESS,
  EVALUACION_SUPERVISION_UPDATE_FAIL,
  EVALUACION_SUPERVISION_MASIVA_REQUEST,
  EVALUACION_SUPERVISION_MASIVA_SUCCESS,
  EVALUACION_SUPERVISION_MASIVA_FAIL,
  EVALUACION_VALIDACION_MASIVA_REQUEST,
  EVALUACION_VALIDACION_MASIVA_SUCCESS,
  EVALUACION_VALIDACION_MASIVA_FAIL,
  EVALUACION_FINALIZAR_SUPERVISION_REQUEST,
  EVALUACION_FINALIZAR_SUPERVISION_SUCCESS,
  EVALUACION_FINALIZAR_SUPERVISION_FAIL,
  EVALUACION_FINALIZAR_VALIDACION_REQUEST,
  EVALUACION_FINALIZAR_VALIDACION_SUCCESS,
  EVALUACION_FINALIZAR_VALIDACION_FAIL,
  EVALUACION_INFO_INFORME_REQUEST,
  EVALUACION_INFO_INFORME_SUCCESS,
  EVALUACION_INFO_INFORME_FAIL,
  EVALUACION_RESUMEN_INFORME_REQUEST,
  EVALUACION_RESUMEN_INFORME_SUCCESS,
  EVALUACION_RESUMEN_INFORME_FAIL,
} from '../constants/evaluacionConstants'

export const getCurrentEvaluacion = (chequear) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_CURRENT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.post('/api/evaluaciones/current', {check: chequear}, config)

    dispatch({ type: EVALUACION_CURRENT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_CURRENT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getEvaluacion = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_INFO_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post('/api/evaluaciones/info', filter, config)

    dispatch({ type: EVALUACION_INFO_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_INFO_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAgregado = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_AGREGADO_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post('/api/evaluaciones/agregado', filter, config)

    dispatch({ type: EVALUACION_AGREGADO_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_AGREGADO_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getResumen = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_RESUMEN_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post('/api/evaluaciones/resumen', filter, config)

    dispatch({ type: EVALUACION_RESUMEN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_RESUMEN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getCalculo = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_CALCULO_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post('/api/evaluaciones/calculo', filter, config)

    dispatch({ type: EVALUACION_CALCULO_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_CALCULO_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const correccionUpdateInfo = (correccion) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_CORRECCION_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/evaluaciones/correccion/${correccion.id_detalle_evaluacion}`, correccion, config)

    correccion['nivel_global_corregido'] = data.nivel_global_corregido

    dispatch({ type: EVALUACION_CORRECCION_UPDATE_SUCCESS, payload: correccion })
  } catch (error) {
    dispatch({
      type: EVALUACION_CORRECCION_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const correccionDeleteInfo = (correccion) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_CORRECCION_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.delete(`/api/evaluaciones/correccion/${correccion.id_detalle_evaluacion}`, config)

    dispatch({ type: EVALUACION_CORRECCION_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_CORRECCION_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const correccionGlobalUpdateInfo = (correccion) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_CORRECCION_GLOBAL_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/evaluaciones/correccionglobal/${correccion.id_evaluacion}`, correccion, config)

    correccion['nivel_global_corregido'] = data.nivel_global_corregido

    dispatch({ type: EVALUACION_CORRECCION_GLOBAL_UPDATE_SUCCESS, payload: correccion })
  } catch (error) {
    dispatch({
      type: EVALUACION_CORRECCION_GLOBAL_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const correccionGlobalDeleteInfo = (correccion) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_CORRECCION_GLOBAL_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.delete(`/api/evaluaciones/correccionglobal/${correccion.id_evaluacion}`, config)

    dispatch({ type: EVALUACION_CORRECCION_GLOBAL_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_CORRECCION_GLOBAL_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const validacionUpdateInfo = (validacion) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_VALIDACION_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    await axios.put(`/api/evaluaciones/validacion/${validacion.id_detalle_evaluacion}`, validacion, config)

    dispatch({ type: EVALUACION_VALIDACION_UPDATE_SUCCESS, payload: validacion })
  } catch (error) {
    dispatch({
      type: EVALUACION_VALIDACION_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const supervisionUpdateInfo = (supervision) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_SUPERVISION_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    await axios.put(`/api/evaluaciones/supervision/${supervision.id_detalle_evaluacion}`, supervision, config)

    dispatch({ type: EVALUACION_SUPERVISION_UPDATE_SUCCESS, payload: supervision })
  } catch (error) {
    dispatch({
      type: EVALUACION_SUPERVISION_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const supervisionMasiva = (masiva) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_SUPERVISION_MASIVA_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/evaluaciones/supervisionmasiva/${masiva.id_evaluacion}`, masiva, config)

    dispatch({ type: EVALUACION_SUPERVISION_MASIVA_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_SUPERVISION_MASIVA_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const validacionMasiva = (masiva) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_VALIDACION_MASIVA_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/evaluaciones/validacionmasiva/${masiva.id_evaluacion}`, masiva, config)

    dispatch({ type: EVALUACION_VALIDACION_MASIVA_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_VALIDACION_MASIVA_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const finalizarSupervision = (supervision) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_FINALIZAR_SUPERVISION_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/evaluaciones/finalizarsupervision/${supervision.id_evaluacion}`, supervision, config)

    dispatch({ type: EVALUACION_FINALIZAR_SUPERVISION_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_FINALIZAR_SUPERVISION_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const finalizarValidacion = (validacion) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_FINALIZAR_VALIDACION_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/evaluaciones/finalizarvalidacion/${validacion.id_evaluacion}`, validacion, config)

    dispatch({ type: EVALUACION_FINALIZAR_VALIDACION_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_FINALIZAR_VALIDACION_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getEvaluacionInforme = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_INFO_INFORME_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post('/api/evaluaciones/infoinforme', filter, config)

    dispatch({ type: EVALUACION_INFO_INFORME_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_INFO_INFORME_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getResumenInforme = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUACION_RESUMEN_INFORME_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post('/api/evaluaciones/resumeninforme', filter, config)

    dispatch({ type: EVALUACION_RESUMEN_INFORME_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVALUACION_RESUMEN_INFORME_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}