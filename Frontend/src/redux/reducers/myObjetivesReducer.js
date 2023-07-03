import {
  MY_OBJETIVES_LIST_REQUEST,
  MY_OBJETIVES_LIST_SUCCESS,
  MY_OBJETIVES_LIST_FAIL,
  MY_OBJETIVES_LIST_RESET,
} from '../constants/myObjetivesConstants'

export const myObjetiveListReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_OBJETIVES_LIST_REQUEST:
      return { loadingMyObjetiveList: true }
    case MY_OBJETIVES_LIST_SUCCESS:
      return {
        loadingMyObjetiveList: false,
        successMyObjetiveList: true,
        myObjetiveListData: action.payload,
      }
    case MY_OBJETIVES_LIST_FAIL:
      return {
        loadingMyObjetiveList: false,
        errorMyObjetiveList: action.payload,
      }
    case MY_OBJETIVES_LIST_RESET:
      return {}
    default:
      return state
  }
}
