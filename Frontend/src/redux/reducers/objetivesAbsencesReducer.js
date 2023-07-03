import {
  OBJETIVES_ABSENCES_REGISTER_REQUEST,
  OBJETIVES_ABSENCES_REGISTER_SUCCESS,
  OBJETIVES_ABSENCES_REGISTER_RESET,
  OBJETIVES_ABSENCES_REGISTER_FAIL,
  OBJETIVES_ABSENCES_LIST_REQUEST,
  OBJETIVES_ABSENCES_LIST_SUCCESS,
  OBJETIVES_ABSENCES_LIST_FAIL,
  OBJETIVES_ABSENCES_LIST_RESET,
  OBJETIVES_ABSENCES_UPDATE_REQUEST,
  OBJETIVES_ABSENCES_UPDATE_SUCCESS,
  OBJETIVES_ABSENCES_UPDATE_FAIL,
  OBJETIVES_ABSENCES_DELETE_REQUEST,
  OBJETIVES_ABSENCES_DELETE_SUCCESS,
  OBJETIVES_ABSENCES_DELETE_FAIL,
  OBJETIVES_ABSENCES_UPDATE_RESET,
  OBJETIVES_ABSENCES_DELETE_RESET,
} from '../constants/objetivesAbsenceConstants'

export const objetiveAbsenceRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_ABSENCES_REGISTER_REQUEST:
      return { loadingObjetiveAbsenceRegister: true }
    case OBJETIVES_ABSENCES_REGISTER_SUCCESS:
      return {
        loadingObjetiveAbsenceRegister: false,
        successObjetiveAbsenceRegister: true,
        objetiveAbsenceRegisterData: action.payload,
      }
    case OBJETIVES_ABSENCES_REGISTER_FAIL:
      return {
        loadingObjetiveAbsenceRegister: false,
        errorObjetiveAbsenceRegister: action.payload,
      }
    case OBJETIVES_ABSENCES_REGISTER_RESET:
      return {}
    default:
      return state
  }
}
export const objetivesAbsencesListReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_ABSENCES_LIST_REQUEST:
      return { loadingObjetiveAbsenceList: true }
    case OBJETIVES_ABSENCES_LIST_SUCCESS:
      return {
        loadingObjetiveAbsenceList: false,
        successObjetiveAbsenceList: true,
        objetiveAbsenceListData: action.payload,
      }
    case OBJETIVES_ABSENCES_LIST_FAIL:
      return {
        loadingObjetiveAbsenceList: false,
        errorObjetiveAbsenceList: action.payload,
      }
    case OBJETIVES_ABSENCES_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const objetivesAbsencesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_ABSENCES_UPDATE_REQUEST:
      return { loadingObjetiveAbsenceUpdate: true }
    case OBJETIVES_ABSENCES_UPDATE_SUCCESS:
      return {
        loadingObjetiveAbsenceUpdate: false,
        successObjetiveAbsenceUpdate: true,
        objetiveAbsenceUpdateData: action.payload,
      }
    case OBJETIVES_ABSENCES_UPDATE_FAIL:
      return {
        loadingObjetiveAbsenceUpdate: false,
        errorObjetiveAbsenceUpdate: action.payload,
      }
    case OBJETIVES_ABSENCES_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const objetivesAbsencesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case OBJETIVES_ABSENCES_DELETE_REQUEST:
      return { loadingObjetiveAbsenceDelete: true }
    case OBJETIVES_ABSENCES_DELETE_SUCCESS:
      return {
        loadingObjetiveAbsenceDelete: false,
        successObjetiveAbsenceDelete: true,
        objetiveAbsenceDeleteData: action.payload,
      }
    case OBJETIVES_ABSENCES_DELETE_FAIL:
      return {
        loadingObjetiveAbsenceDelete: false,
        errorObjetiveAbsenceDelete: action.payload,
      }
    case OBJETIVES_ABSENCES_DELETE_RESET:
      return {}
    default:
      return state
  }
}
