import {
  UI_MULTI_TASK_PUSH,
  UI_MULTI_TASK_FILTER,
  UI_MULTI_TASK_ACTION_BUTTON,
  UI_MULTI_TASK_EDIT,
  UI_MULTI_TASK_RESET,
  UI_MULTI_EDITED_TASK_PUSH,
} from '../constants/uiMultiTaskConstant'

const initialState = {
  addTask: false,
  updateTask: false,
  tasks: [],
  taskToEdit: {},
}
export const uiMultiTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_MULTI_TASK_ACTION_BUTTON:
      return (state = { ...state, addTask: !state.addTask, taskToEdit: {} })
    case UI_MULTI_TASK_PUSH:
      const existingTasks = [...state.tasks]
      return (state = { ...state, tasks: [...action.payload, ...existingTasks] })
    case UI_MULTI_EDITED_TASK_PUSH:
      return (state = {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id_tarea !== action.payload.id_tarea), action.payload],
      })
    case UI_MULTI_TASK_FILTER:
      return (state = { ...state, tasks: state.tasks.filter((task) => task.id_tarea !== action.payload) })
    case UI_MULTI_TASK_EDIT:
      return (state = {
        ...state,
        addTask: true,
        taskToEdit: state.tasks.filter((task) => task.id_tarea === action.payload)[0],
      })
    case UI_MULTI_TASK_RESET:
      return (state = initialState)
    default:
      return state
  }
}
