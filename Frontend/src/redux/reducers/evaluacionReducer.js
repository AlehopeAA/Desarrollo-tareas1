import {
  EVALUACION_INFO_REQUEST,
  EVALUACION_INFO_SUCCESS,
  EVALUACION_INFO_FAIL,
  EVALUACION_INFO_RESET,
  EVALUACION_CURRENT_REQUEST,
  EVALUACION_CURRENT_SUCCESS,
  EVALUACION_CURRENT_FAIL,
  EVALUACION_CURRENT_RESET,
  EVALUACION_AGREGADO_REQUEST,
  EVALUACION_AGREGADO_SUCCESS,
  EVALUACION_AGREGADO_FAIL,
  EVALUACION_AGREGADO_RESET,
  EVALUACION_RESUMEN_REQUEST,
  EVALUACION_RESUMEN_SUCCESS,
  EVALUACION_RESUMEN_FAIL,
  EVALUACION_RESUMEN_RESET,
  EVALUACION_CALCULO_REQUEST,
  EVALUACION_CALCULO_SUCCESS,
  EVALUACION_CALCULO_FAIL,
  EVALUACION_CALCULO_RESET,
  EVALUACION_CORRECCION_UPDATE_REQUEST,
  EVALUACION_CORRECCION_UPDATE_SUCCESS,
  EVALUACION_CORRECCION_UPDATE_FAIL,
  EVALUACION_CORRECCION_UPDATE_RESET,
  EVALUACION_CORRECCION_DELETE_REQUEST,
  EVALUACION_CORRECCION_DELETE_SUCCESS,
  EVALUACION_CORRECCION_DELETE_FAIL,
  EVALUACION_CORRECCION_DELETE_RESET,
  EVALUACION_CORRECCION_GLOBAL_UPDATE_REQUEST,
  EVALUACION_CORRECCION_GLOBAL_UPDATE_SUCCESS,
  EVALUACION_CORRECCION_GLOBAL_UPDATE_FAIL,
  EVALUACION_CORRECCION_GLOBAL_UPDATE_RESET,
  EVALUACION_CORRECCION_GLOBAL_DELETE_REQUEST,
  EVALUACION_CORRECCION_GLOBAL_DELETE_SUCCESS,
  EVALUACION_CORRECCION_GLOBAL_DELETE_FAIL,
  EVALUACION_CORRECCION_GLOBAL_DELETE_RESET,
  EVALUACION_VALIDACION_UPDATE_REQUEST,
  EVALUACION_VALIDACION_UPDATE_SUCCESS,
  EVALUACION_VALIDACION_UPDATE_FAIL,
  EVALUACION_VALIDACION_UPDATE_RESET,
  EVALUACION_SUPERVISION_UPDATE_REQUEST,
  EVALUACION_SUPERVISION_UPDATE_SUCCESS,
  EVALUACION_SUPERVISION_UPDATE_FAIL,
  EVALUACION_SUPERVISION_UPDATE_RESET,
  EVALUACION_SUPERVISION_MASIVA_REQUEST,
  EVALUACION_SUPERVISION_MASIVA_SUCCESS,
  EVALUACION_SUPERVISION_MASIVA_FAIL,
  EVALUACION_SUPERVISION_MASIVA_RESET,
  EVALUACION_VALIDACION_MASIVA_REQUEST,
  EVALUACION_VALIDACION_MASIVA_SUCCESS,
  EVALUACION_VALIDACION_MASIVA_FAIL,
  EVALUACION_VALIDACION_MASIVA_RESET,
  EVALUACION_FINALIZAR_SUPERVISION_REQUEST,
  EVALUACION_FINALIZAR_SUPERVISION_SUCCESS,
  EVALUACION_FINALIZAR_SUPERVISION_FAIL,
  EVALUACION_FINALIZAR_SUPERVISION_RESET,
  EVALUACION_FINALIZAR_VALIDACION_REQUEST,
  EVALUACION_FINALIZAR_VALIDACION_SUCCESS,
  EVALUACION_FINALIZAR_VALIDACION_FAIL,
  EVALUACION_FINALIZAR_VALIDACION_RESET,
  EVALUACION_INFO_INFORME_REQUEST,
  EVALUACION_INFO_INFORME_SUCCESS,
  EVALUACION_INFO_INFORME_FAIL,
  EVALUACION_INFO_INFORME_RESET,
  EVALUACION_RESUMEN_INFORME_REQUEST,
  EVALUACION_RESUMEN_INFORME_SUCCESS,
  EVALUACION_RESUMEN_INFORME_FAIL,
  EVALUACION_RESUMEN_INFORME_RESET,
} from '../constants/evaluacionConstants'

export const evaluacionCurrentReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_CURRENT_REQUEST:
      return { loadingEvaluacionCurrent: true }
    case EVALUACION_CURRENT_SUCCESS:
      return {
        loadingEvaluacionCurrent: false,
        successEvaluacionCurrent: true,
        evaluacionCurrentData: action.payload,
      }
    case EVALUACION_CURRENT_FAIL:
      return {
        loadingEvaluacionCurrent: false,
        errorEvaluacionCurrent: action.payload,
      }
    case EVALUACION_CURRENT_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_INFO_REQUEST:
      return { loadingEvaluacionInfo: true }
    case EVALUACION_INFO_SUCCESS:
      return {
        loadingEvaluacionInfo: false,
        successEvaluacionInfo: true,
        evaluacionInfoData: action.payload,
      }
    case EVALUACION_INFO_FAIL:
      return {
        loadingEvaluacionInfo: false,
        errorEvaluacionInfo: action.payload,
      }
    case EVALUACION_INFO_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionAgregadoReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_AGREGADO_REQUEST:
      return { loadingEvaluacionAgregado: true }
    case EVALUACION_AGREGADO_SUCCESS:
      return {
        loadingEvaluacionAgregado: false,
        successEvaluacionAgregado: true,
        evaluacionAgregadoData: action.payload,
      }
    case EVALUACION_AGREGADO_FAIL:
      return {
        loadingEvaluacionAgregado: false,
        errorEvaluacionAgregado: action.payload,
      }
    case EVALUACION_AGREGADO_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionResumenReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_RESUMEN_REQUEST:
      return { loadingEvaluacionResumen: true }
    case EVALUACION_RESUMEN_SUCCESS:
      return {
        loadingEvaluacionResumen: false,
        successEvaluacionResumen: true,
        evaluacionResumenData: action.payload,
      }
    case EVALUACION_RESUMEN_FAIL:
      return {
        loadingEvaluacionResumen: false,
        errorEvaluacionResumen: action.payload,
      }
    case EVALUACION_RESUMEN_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionCalculoReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_CALCULO_REQUEST:
      return { loadingEvaluacionCalculo: true }
    case EVALUACION_CALCULO_SUCCESS:
      return {
        loadingEvaluacionCalculo: false,
        successEvaluacionCalculo: true,
        evaluacionCalculoData: action.payload,
      }
    case EVALUACION_CALCULO_FAIL:
      return {
        loadingEvaluacionCalculo: false,
        errorEvaluacionCalculo: action.payload,
      }
    case EVALUACION_CALCULO_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionCorreccionUpdateReducer = (state = {correccionUpdated: {}}, action) => {
  switch (action.type) {
    case EVALUACION_CORRECCION_UPDATE_REQUEST:
      return { loadingCorreccionUpdate: true }
    case EVALUACION_CORRECCION_UPDATE_SUCCESS:
      return {
        loadingCorreccionUpdate: false,
        successCorreccionUpdate: true,
        correccionUpdated: action.payload,
      }
    case EVALUACION_CORRECCION_UPDATE_FAIL:
      return {
        loadingCorreccionUpdate: false,
        errorCorreccionUpdate: action.payload,
      }
    case EVALUACION_CORRECCION_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionCorreccionDeleteReducer = (state = {correccionDeleted: {}}, action) => {
  switch (action.type) {
    case EVALUACION_CORRECCION_DELETE_REQUEST:
      return { loadingCorreccionDelete: true }
    case EVALUACION_CORRECCION_DELETE_SUCCESS:
      return {
        loadingCorreccionDelete: false,
        successCorreccionDelete: true,
        correccionDeleted: action.payload,
      }
    case EVALUACION_CORRECCION_DELETE_FAIL:
      return {
        loadingCorreccionDelete: false,
        errorCorreccionDelete: action.payload,
      }
    case EVALUACION_CORRECCION_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionCorreccionGlobalUpdateReducer = (state = {correccionGlobalUpdated: {}}, action) => {
  switch (action.type) {
    case EVALUACION_CORRECCION_GLOBAL_UPDATE_REQUEST:
      return { loadingCorreccionGlobalUpdate: true }
    case EVALUACION_CORRECCION_GLOBAL_UPDATE_SUCCESS:
      return {
        loadingCorreccionGlobalUpdate: false,
        successCorreccionGlobalUpdate: true,
        correccionGlobalUpdated: action.payload,
      }
    case EVALUACION_CORRECCION_GLOBAL_UPDATE_FAIL:
      return {
        loadingCorreccionGlobalUpdate: false,
        errorCorreccionGlobalUpdate: action.payload,
      }
    case EVALUACION_CORRECCION_GLOBAL_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionCorreccionGlobalDeleteReducer = (state = {correccionGlobalDeleted: {}}, action) => {
  switch (action.type) {
    case EVALUACION_CORRECCION_GLOBAL_DELETE_REQUEST:
      return { loadingCorreccionGlobalDelete: true }
    case EVALUACION_CORRECCION_GLOBAL_DELETE_SUCCESS:
      return {
        loadingCorreccionGlobalDelete: false,
        successCorreccionGlobalDelete: true,
        correccionGlobalDeleted: action.payload,
      }
    case EVALUACION_CORRECCION_GLOBAL_DELETE_FAIL:
      return {
        loadingCorreccionGlobalDelete: false,
        errorCorreccionGlobalDelete: action.payload,
      }
    case EVALUACION_CORRECCION_GLOBAL_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionValidacionUpdateReducer = (state = {validacionUpdated: {}}, action) => {
  switch (action.type) {
    case EVALUACION_VALIDACION_UPDATE_REQUEST:
      return { loadingValidacionUpdate: true }
    case EVALUACION_VALIDACION_UPDATE_SUCCESS:
      return {
        loadingValidacionUpdate: false,
        successValidacionUpdate: true,
        validacionUpdated: action.payload,
      }
    case EVALUACION_VALIDACION_UPDATE_FAIL:
      return {
        loadingValidacionUpdate: false,
        errorValidacionUpdate: action.payload,
      }
    case EVALUACION_VALIDACION_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionSupervisionUpdateReducer = (state = {supervisionUpdated: {}}, action) => {
  switch (action.type) {
    case EVALUACION_SUPERVISION_UPDATE_REQUEST:
      return { loadingSupervisionUpdate: true }
    case EVALUACION_SUPERVISION_UPDATE_SUCCESS:
      return {
        loadingSupervisionUpdate: false,
        successSupervisionUpdate: true,
        supervisionUpdated: action.payload,
      }
    case EVALUACION_SUPERVISION_UPDATE_FAIL:
      return {
        loadingSupervisionUpdate: false,
        errorSupervisionUpdate: action.payload,
      }
    case EVALUACION_SUPERVISION_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionSupervisionMasivaReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_SUPERVISION_MASIVA_REQUEST:
      return { loadingSupervisionMasiva: true }
    case EVALUACION_SUPERVISION_MASIVA_SUCCESS:
      return {
        loadingSupervisionMasiva: false,
        successSupervisionMasiva: true,
        supervisionMasiva: action.payload,
      }
    case EVALUACION_SUPERVISION_MASIVA_FAIL:
      return {
        loadingSupervisionMasiva: false,
        errorSupervisionMasiva: action.payload,
      }
    case EVALUACION_SUPERVISION_MASIVA_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionValidacionMasivaReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_VALIDACION_MASIVA_REQUEST:
      return { loadingValidacionMasiva: true }
    case EVALUACION_VALIDACION_MASIVA_SUCCESS:
      return {
        loadingValidacionMasiva: false,
        successValidacionMasiva: true,
        validacionMasiva: action.payload,
      }
    case EVALUACION_VALIDACION_MASIVA_FAIL:
      return {
        loadingValidacionMasiva: false,
        errorValidacionMasiva: action.payload,
      }
    case EVALUACION_VALIDACION_MASIVA_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionFinalizarSupervisionReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_FINALIZAR_SUPERVISION_REQUEST:
      return { loadingFinalizarSupervision: true }
    case EVALUACION_FINALIZAR_SUPERVISION_SUCCESS:
      return {
        loadingFinalizarSupervision: false,
        successFinalizarSupervision: true,
        finalizarSupervision: action.payload,
      }
    case EVALUACION_FINALIZAR_SUPERVISION_FAIL:
      return {
        loadingFinalizarSupervision: false,
        errorFinalizarSupervision: action.payload,
      }
    case EVALUACION_FINALIZAR_SUPERVISION_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionFinalizarValidacionReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_FINALIZAR_VALIDACION_REQUEST:
      return { loadingFinalizarValidacion: true }
    case EVALUACION_FINALIZAR_VALIDACION_SUCCESS:
      return {
        loadingFinalizarValidacion: false,
        successFinalizarValidacion: true,
        finalizarValidacion: action.payload,
      }
    case EVALUACION_FINALIZAR_VALIDACION_FAIL:
      return {
        loadingFinalizarValidacion: false,
        errorFinalizarValidacion: action.payload,
      }
    case EVALUACION_FINALIZAR_VALIDACION_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionInfoInformeReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_INFO_INFORME_REQUEST:
      return { loadingEvaluacionInfoInforme: true }
    case EVALUACION_INFO_INFORME_SUCCESS:
      return {
        loadingEvaluacionInfoInforme: false,
        successEvaluacionInfoInforme: true,
        evaluacionInfoInformeData: action.payload,
      }
    case EVALUACION_INFO_INFORME_FAIL:
      return {
        loadingEvaluacionInfoInforme: false,
        errorEvaluacionInfoInforme: action.payload,
      }
    case EVALUACION_INFO_INFORME_RESET:
      return {}
    default:
      return state
  }
}

export const evaluacionResumenInformeReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUACION_RESUMEN_INFORME_REQUEST:
      return { loadingEvaluacionResumenInforme: true }
    case EVALUACION_RESUMEN_INFORME_SUCCESS:
      return {
        loadingEvaluacionResumenInforme: false,
        successEvaluacionResumenInforme: true,
        evaluacionResumenInformeData: action.payload,
      }
    case EVALUACION_RESUMEN_INFORME_FAIL:
      return {
        loadingEvaluacionResumenInforme: false,
        errorEvaluacionResumenInforme: action.payload,
      }
    case EVALUACION_RESUMEN_INFORME_RESET:
      return {}
    default:
      return state
  }
}