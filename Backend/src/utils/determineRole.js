'use strict'

const { ADMIN_ROLE, EDITOR_ROLE, SUPER_ROLE } = require('../config/users/roles/roles')

/**
 * Validates the type of user logging in to the app
 * @param {boolean} isSuper
 * @param {boolean} isAdmin
 * @returns {String}
 */

const determineRole = (isSuper, isAdmin) => {
  if (isSuper && isAdmin) {
    return SUPER_ROLE
  } else if (isAdmin) {
    return ADMIN_ROLE
  } else {
    return EDITOR_ROLE
  }
}

module.exports = determineRole
