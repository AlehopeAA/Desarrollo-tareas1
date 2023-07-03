import axios from 'axios'
import { SEND_MAIL_REQUEST, SEND_MAIL_SUCCESS, SEND_MAIL_FAIL } from '../constants/sendMailConstants'

export const sendContactForm = (mailData) => async (dispatch) => {
  try {
    dispatch({ type: SEND_MAIL_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post('/api/sendmail/contact-form', mailData, config)

    dispatch({ type: SEND_MAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SEND_MAIL_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    })
  }
}

export const sendMail = (mailData) => async (dispatch) => {
  try {
    dispatch({ type: SEND_MAIL_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post('/api/sendmail', mailData, config)

    dispatch({ type: SEND_MAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SEND_MAIL_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    })
  }
}
