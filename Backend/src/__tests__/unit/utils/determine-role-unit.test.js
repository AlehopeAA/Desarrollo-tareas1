'use strict'

const determineRole = require('../../../utils/determineRole')
const { ADMIN_ROLE, EDITOR_ROLE, SUPER_ROLE, ALL_USER_ROLES } = require('../../../config/users/roles/roles')

describe('Unit Test - Determine Role', () => {
  test('should be SUPER_ROLE', () => {
    const isSuper = true
    const isAdmin = true

    const role = determineRole(isSuper, isAdmin)

    expect(role).toBe(SUPER_ROLE)
  })

  test('should be ADMIN_ROLE', () => {
    const isSuper = false
    const isAdmin = true

    const role = determineRole(isSuper, isAdmin)

    expect(role).toBe(ADMIN_ROLE)
  })

  test('should be EDITOR_ROLE', () => {
    const isSuper = false
    const isAdmin = false

    const role = determineRole(isSuper, isAdmin)

    expect(role).toBe(EDITOR_ROLE)
  })

  test('user role does not exist', () => {
    const FAKE_ROLE = 'RH_ROLE'

    const response = ALL_USER_ROLES.includes(FAKE_ROLE)
    expect(response).toBe(false)
  })
})
