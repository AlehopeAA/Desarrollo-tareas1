'use strict'

const request = require('supertest')
const app = require('../../../server')
const generateToken = require('../../../utils/generateToken')
const { USER_INFO } = require('../../config/common-requests')

describe('Unit Test - GET /refreshToken', () => {
  test('should respond with a 401 status code', async () => {
    const response = await request(app).get('/api/users/refreshtoken')
    expect(response.statusCode).toBe(401)
  })

  test('should respond with RefrescarToken messagge', async () => {
    const TOKEN = generateToken(USER_INFO)
    const response = await request(app).get('/api/users/refreshtoken').set('Authorization', `Bearer ${TOKEN}`)
    expect(response.statusCode).toBe(200)
    expect(response.body['msg']).toBe('RefrescarToken')
  })
})
