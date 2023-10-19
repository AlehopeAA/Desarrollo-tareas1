function Units(num) {
  switch (num) {
    case 1:
      return 'UN'
    case 2:
      return 'DOS'
    case 3:
      return 'TRES'
    case 4:
      return 'CUATRO'
    case 5:
      return 'CINCO'
    case 6:
      return 'SEIS'
    case 7:
      return 'SIETE'
    case 8:
      return 'OCHO'
    case 9:
      return 'NUEVE'
  }

  return ''
} //Units()

function Tens(num) {
  ten = Math.floor(num / 10)
  unit = num - ten * 10

  switch (ten) {
    case 1:
      switch (unit) {
        case 0:
          return 'DIEZ'
        case 1:
          return 'ONCE'
        case 2:
          return 'DOCE'
        case 3:
          return 'TRECE'
        case 4:
          return 'CATORCE'
        case 5:
          return 'QUINCE'
        default:
          return 'DIECI' + Units(unit)
      }
    case 2:
      switch (unit) {
        case 0:
          return 'VEINTE'
        default:
          return 'VEINTI' + Units(unit)
      }
    case 3:
      return TensAnd('TREINTA', unit)
    case 4:
      return TensAnd('CUARENTA', unit)
    case 5:
      return TensAnd('CINCUENTA', unit)
    case 6:
      return TensAnd('SESENTA', unit)
    case 7:
      return TensAnd('SETENTA', unit)
    case 8:
      return TensAnd('OCHENTA', unit)
    case 9:
      return TensAnd('NOVENTA', unit)
    case 0:
      return Units(unit)
  }
} //Units()

function TensAnd(strSin, unitNumber) {
  if (unitNumber > 0) return strSin + ' Y ' + Units(unitNumber)

  return strSin
} //TensAnd()

function Hundreds(num) {
  hundreds = Math.floor(num / 100)
  tens = num - hundreds * 100

  switch (hundreds) {
    case 1:
      if (tens > 0) return 'CIENTO ' + Tens(tens)
      return 'CIEN'
    case 2:
      return 'DOSCIENTOS ' + Tens(tens)
    case 3:
      return 'TRESCIENTOS ' + Tens(tens)
    case 4:
      return 'CUATROCIENTOS ' + Tens(tens)
    case 5:
      return 'QUINIENTOS ' + Tens(tens)
    case 6:
      return 'SEISCIENTOS ' + Tens(tens)
    case 7:
      return 'SETECIENTOS ' + Tens(tens)
    case 8:
      return 'OCHOCIENTOS ' + Tens(tens)
    case 9:
      return 'NOVECIENTOS ' + Tens(tens)
  }

  return Tens(tens)
} //Hundreds()

function Section(num, divisor, strSingular, strPlural) {
  hundreds = Math.floor(num / divisor)
  rest = num - hundreds * divisor

  letters = ''

  if (hundreds > 0)
    if (hundreds > 1) letters = Hundreds(hundreds) + ' ' + strPlural
    else letters = strSingular

  if (rest > 0) letters += ''

  return letters
} //Section()

function Thousands(num) {
  divisor = 1000
  hundreds = Math.floor(num / divisor)
  rest = num - hundreds * divisor

  strThousands = Section(num, divisor, 'UN MIL', 'MIL')
  strHundreds = Hundreds(rest)

  if (strThousands == '') return strHundreds

  return strThousands + ' ' + strHundreds
} //Thousands()

function Millions(num) {
  divisor = 1000000
  hundreds = Math.floor(num / divisor)
  rest = num - hundreds * divisor

  strMillions = Section(num, divisor, 'UN MILLON DE', 'MILLONES DE')
  strThousands = Thousands(rest)

  if (strMillions == '') return strThousands

  return strMillions + ' ' + strThousands
} //Millions()

function amountInWords(num, moneyType) {
  var data = {
    number: num,
    integer: Math.floor(num),
    cents: Math.round(num * 100) - Math.floor(num) * 100,
    centLetters: '',
    moneyPluralLetter: `${moneyType}`, //"plural type money", 'Dólares', 'Bolívares', 'etcs'
    moneySingularLetter: `${moneyType}`, //"singular type money ", 'Dólar', 'Bolivar', 'etc'

    centPluralWord: 'CENTIMOS',
    centSingularWord: 'CENTIMO',
  }

  if (data.cents > 0) {
    data.centLetters =
      'CON ' +
      (function () {
        if (data.cents == 1) return Millions(data.cents) + ' ' + data.centSingularWord
        else return Millions(data.cents) + ' ' + data.centPluralWord
      })()
  }

  if (data.integer == 0) return 'CERO ' + data.moneyPluralLetter + ' ' + data.centLetters
  if (data.integer == 1) return Millions(data.integer) + ' ' + data.moneySingularLetter + ' ' + data.centLetters
  else return Millions(data.integer) + ' ' + data.moneyPluralLetter + ' ' + data.centLetters
} //amountInWords()

module.exports = amountInWords
