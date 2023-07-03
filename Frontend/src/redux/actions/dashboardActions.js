import axios from 'axios'
import {
  DASHBOARD_INFO_REQUEST,
  DASHBOARD_INFO_SUCCESS,
  DASHBOARD_INFO_FAIL,
} from '../constants/dashboardConstants'

export const getDashboard = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: DASHBOARD_INFO_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.post('/api/cuadromandos', filter, config)

    dispatch({ type: DASHBOARD_INFO_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DASHBOARD_INFO_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
