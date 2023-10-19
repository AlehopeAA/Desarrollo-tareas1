const verifyEmail = (value) => {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (emailRex.test(value)) {
    return true
  }
  return false
}
const verifyLength = (value, length) => {
  if (value.length >= length) {
    return true
  }
  return false
}

const complexPasswordValidation = (pass) => {
  const passRegex = /^(?=(.*\d){1})(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  if (passRegex.test(pass)) {
    return true
  }
  return false
}

export { verifyEmail, verifyLength, complexPasswordValidation }
