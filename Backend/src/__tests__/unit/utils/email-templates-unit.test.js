'use strict'

const { userRegisterEmail, contactFormEmail } = require('../../../utils/emailTemplates')
const { USER_INFO_EMAIL } = require('../../config/common-requests')

describe('Unit Test - Email templates', () => {
  test('should be string', () => {
    const registerEmail = userRegisterEmail(USER_INFO_EMAIL.email, USER_INFO_EMAIL.password)
    const contactEmail = contactFormEmail(USER_INFO_EMAIL)
    expect(typeof registerEmail).toBe('string')
    expect(typeof contactEmail).toBe('string')
  })

  test('should be USER_INFO_EMAIL an object', () => {
    expect(typeof USER_INFO_EMAIL).toBe('object')
  })
})
