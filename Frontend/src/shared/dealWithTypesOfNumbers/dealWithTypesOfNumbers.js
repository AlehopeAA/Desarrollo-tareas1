const matchCurrencyToDecimal = (currencyAmount) => {
  const num = currencyAmount?.replace(/[^0-9\,-]+/g, '')
  if (currencyAmount?.includes('€')) {
    return parseFloat(num.replace(',', '.')).toFixed(2)
  } else {
    return currencyAmount
  }
}

const matchNumberToCurrency =(number)=>{
  const defaultConfig = {
    style: 'currency',
    currency: 'EUR',
  }
  const defaultLenguajeCode = 'eu'
  const numberFormat = new Intl.NumberFormat(defaultLenguajeCode, defaultConfig)
  return `${numberFormat.format(number.toFixed(2)).replace('EUR', '').replace('€', '')}€`
}
const replaceAll = (text, search, replace) => {
  while (text.toString().indexOf(search) != -1) text = text.toString().replace(search, replace)
  return text
}

const replaceStringToNum = (numInString) => {
  const replaceAll = (text, search, replace) => {
    while (text.toString().indexOf(search) != -1) text = text.toString().replace(search, replace)
    return text
  }
  return Number(replaceAll(replaceAll(numInString.replace('€', ''), '.', ''), ',', '.'))
}

export { matchCurrencyToDecimal, replaceStringToNum, replaceAll , matchNumberToCurrency }
