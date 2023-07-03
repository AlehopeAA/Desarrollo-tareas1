import axios from 'axios'
import {
  MY_OBJETIVES_LIST_REQUEST,
  MY_OBJETIVES_LIST_SUCCESS,
  MY_OBJETIVES_LIST_FAIL,
} from '../constants/myObjetivesConstants'



export const getMyObjetives = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_OBJETIVES_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }

    const { data } = await axios.get('/api/misObjetivos', config)

    dispatch({ type: MY_OBJETIVES_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MY_OBJETIVES_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
