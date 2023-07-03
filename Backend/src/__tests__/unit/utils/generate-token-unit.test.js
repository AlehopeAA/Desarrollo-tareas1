'use strict'

const jwt = require('jsonwebtoken')
const generateToken = require('../../../utils/generateToken')
const { USER_INFO } = require('../../config/common-requests')

describe('Unit Test - Generate Token', () => {
  test('should return token typeof string', () => {
    const token = generateToken(USER_INFO)

    expect(typeof token).toBe('string')
  })

  test('should return USER_INFO', () => {
    const token = generateToken(USER_INFO)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const { exp, iat, ...rest } = decodedToken

    expect(rest).toEqual(USER_INFO)
  })

  test('should faild the test', () => {
    expect(() => {
      generateToken().toThrow('payload is required')
    })
  })
})
