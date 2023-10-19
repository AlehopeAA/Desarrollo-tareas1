import { useState, useEffect } from 'react'

const usePasswordValidation = () => {
  const validation = [
    {
      name: '',
    },
  ]
  var hasNumber = new Regex('[0-9]+')
  var hasUpperChar = new Regex('[A-Z]+')
  var hasMiniMaxChars = new Regex('.{8,8}')
  var hasLowerChar = new Regex('[a-z]+')
  var hasSymbols = new Regex('[!@#$%^&*()_+=[{]};:<>|./?,-]')
  const allValidations = []

  useEffect(() => {}, [])

  return windowSize
}

export { usePasswordValidation }
