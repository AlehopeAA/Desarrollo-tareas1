import axios from 'axios'
import { INCOME_UPDATE_REQUEST, INCOME_UPDATE_SUCCESS, INCOME_UPDATE_FAIL } from '../constants/incomeConstants'

export const updateIncome = (investment) => async (dispatch, getState) => {
  try {
    dispatch({ type: INCOME_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Cache-Control': 'no-cache',
      },
    }
    const { data } = await axios.put(`/api/incomes`, investment, config)

    dispatch({ type: INCOME_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INCOME_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
