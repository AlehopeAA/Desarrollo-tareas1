import {
  TASK_REGISTER_REQUEST,
  TASK_REGISTER_SUCCESS,
  TASK_REGISTER_FAIL,
  TASK_REGISTER_RESET,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_RESET,
  TASK_BY_ID_REQUEST,
  TASK_BY_ID_SUCCESS,
  TASK_BY_ID_RESET,
  TASK_BY_ID_FAIL,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_RESET,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_RESET,
  TASK_LIST_BY_PROFILE_ID_REQUEST,
  TASK_LIST_BY_PROFILE_ID_SUCCESS,
  TASK_LIST_BY_PROFILE_ID_FAIL,
  TASK_LIST_BY_PROFILE_ID_RESET,
  TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_ALL_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_CREATE_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_FILTER_CREATE_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_FILTER_DUPLICATE_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_DUPLICATE_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_MODIFY_TASK,
  TASK_LIST_DUPLICATE_BY_PROFILE_CLEAN,
} from '../constants/taskConstants.js'

export const taskRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_REGISTER_REQUEST:
      return { loadingTaskRegister: true }
    case TASK_REGISTER_SUCCESS:
      return {
        loadingTaskRegister: false,
        successTaskRegister: true,
        task: action.payload,
      }
    case TASK_REGISTER_FAIL:
      return {
        loadingTaskRegister: false,
        errorTaskRegister: action.payload,
      }
    case TASK_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const taskListReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loadingTaskList: true }
    case TASK_LIST_SUCCESS:
      return {
        loadingTaskList: false,
        successTaskList: true,
        tasksData: action.payload,
      }
    case TASK_LIST_FAIL:
      return { loadingTaskList: false, errorTaskList: action.payload }
    case TASK_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const taskByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_BY_ID_REQUEST:
      return { loadingTaskById: true }
    case TASK_BY_ID_SUCCESS:
      return {
        loadingTaskById: false,
        successTaskById: true,
        taskByIdData: action.payload,
      }
    case TASK_BY_ID_FAIL:
      return { loadingTaskById: false, errorTaskById: action.payload }
    case TASK_BY_ID_RESET:
      return {}
    default:
      return state
  }
}

export const taskListByProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_LIST_BY_PROFILE_ID_REQUEST:
      return { loadingTaskListByProfile: true }
    case TASK_LIST_BY_PROFILE_ID_SUCCESS:
      return {
        loadingTaskListByProfile: false,
        successTaskListByProfile: true,
        taskListByProfileData: action.payload,
      }
    case TASK_LIST_BY_PROFILE_ID_FAIL:
      return { loadingTaskListByProfile: false, errorTaskListByProfile: action.payload }
    case TASK_LIST_BY_PROFILE_ID_RESET:
      return {}
    default:
      return state
  }
}

export const taskUpdateReducer = (state = { taskUpdated: {} }, action) => {
  switch (action.type) {
    case TASK_UPDATE_REQUEST:
      return { loadingTaskUpdate: true }
    case TASK_UPDATE_SUCCESS:
      return {
        loadingTaskUpdate: false,
        successTaskUpdate: true,
        taskUpdated: action.payload,
      }
    case TASK_UPDATE_FAIL:
      return { loadingTaskUpdate: false, errorTaskUpdate: action.payload }
    case TASK_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { loadingTaskDelete: true }
    case TASK_DELETE_SUCCESS:
      return { loadingTaskDelete: false, successTaskDelete: true }
    case TASK_DELETE_FAIL:
      return { loadingTaskDelete: false, errorTaskDelete: action.payload }
    case TASK_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const handleDuplicateTaskReducer = (
  state = {
    allTasks: [],
    createTask: [],
    sameTask: [],
  },
  action
) => {
  switch (action.type) {
    case TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_ALL_TASK:
      return (state = { ...state, allTasks: action.payload })
    case TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_CREATE_TASK:
      return (state = { ...state, createTask: [...state.createTask, action.payload] })
    case TASK_LIST_DUPLICATE_BY_PROFILE_FILTER_CREATE_TASK:
      return (state = { ...state, createTask: state.createTask.filter((task) => task.id_tarea !== action.payload) })
    case TASK_LIST_DUPLICATE_BY_PROFILE_PUSH_DUPLICATE_TASK:
      return (state = { ...state, sameTask: [...state.sameTask, action.payload] })
    case TASK_LIST_DUPLICATE_BY_PROFILE_FILTER_DUPLICATE_TASK:
      return (state = { ...state, sameTask: state.sameTask.filter((task) => task.id_tarea !== action.payload) })
    case TASK_LIST_DUPLICATE_BY_PROFILE_MODIFY_TASK:
      return (state = {
        ...state,
        createTask: state.createTask.map((item) => {
          if (item.id_tarea === action.payload.id_tarea) {
            item.activo = action.payload.activo
            item.acumulativa = action.payload.acumulativa
            item.codigo_trazabilidad = action.payload.codigo_trazabilidad
            item.compartida = action.payload.compartida
            item.copyTaskChecked = action.payload.copyTaskChecked
            item.cuantificable = action.payload.cuantificable
            item.descripcion_tarea = action.payload.descripcion_tarea
            item.dificultad = action.payload.dificultad
            item.entrada = action.payload.entrada
            item.indicador = action.payload.indicador
            item.newTaskChecked = action.payload.newTaskChecked
            item.tipo_tarea = action.payload.tipo_tarea
            item.id_tipo_tarea = action.payload.id_tipo_tarea
          }
          return item
        }),
      })
    case TASK_LIST_DUPLICATE_BY_PROFILE_CLEAN:
      return (state = {
        allTasks: [],
        createTask: [],
        sameTask: [],
      })
    default:
      return state
  }
}
