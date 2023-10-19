import {
  UI_MULTI_TASK_PUSH,
  UI_MULTI_TASK_FILTER,
  UI_MULTI_TASK_ACTION_BUTTON,
  UI_MULTI_TASK_EDIT,
  UI_MULTI_EDITED_TASK_PUSH,
} from '../constants/uiMultiTaskConstant'

export const pushMultiTask = (tasks) => async (dispatch) => {
  dispatch({ type: UI_MULTI_TASK_PUSH, payload: tasks })
}
export const pushEditedTask = (editedTask) => async (dispatch) => {
  dispatch({ type: UI_MULTI_EDITED_TASK_PUSH, payload: editedTask })
}
export const filterMultiTask = (taskId) => async (dispatch) => {
  dispatch({ type: UI_MULTI_TASK_FILTER, payload: taskId })
}
export const editMultiTask = (task) => async (dispatch) => {
  dispatch({ type: UI_MULTI_TASK_EDIT, payload: task })
}
export const buttonActionMultiTask = () => async (dispatch) => {
  dispatch({ type: UI_MULTI_TASK_ACTION_BUTTON })
}
