import { SEND_MAIL_REQUEST, SEND_MAIL_SUCCESS, SEND_MAIL_FAIL, SEND_MAIL_RESET } from '../constants/sendMailConstants'

export const sendEMailReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MAIL_REQUEST:
      return { loadingSendMail: true }
    case SEND_MAIL_SUCCESS:
      return {
        loadingSendMail: false,
        successSendMail: true,
        data: action.payload,
      }
    case SEND_MAIL_FAIL:
      return { loadingSendMail: false, errorSendMail: action.payload }
    case SEND_MAIL_RESET:
      return {}
    default:
      return state
  }
}
