const matchProjectStatus = (status) => {
  switch (status) {
    case 'startSoon':
      return 'Inicia Pronto'
    case 'workInProgress':
      return 'Obras en Curso'
    case 'onSale':
      return 'En Venta'
    case 'reserved':
      return 'Reservado'
    case 'finished':
      return 'Finalizado'
    default:
      return status
  }
}

const matchPersonType = (personType) => {
  switch (personType) {
    case 'legal':
      return 'Persona Jurídica'
    case 'physical':
      return 'Persona Física'
    default:
      return ''
  }
}
const matchPersonToEnglish = (person) => {
  switch (person) {
    case 'Persona jurídica':
      return 'legal'
    case 'Persona física':
      return 'physical'
    default:
      return ''
  }
}

const matchStatusDecline = (declineStatus) => {
  switch (declineStatus) {
    case 'resolved':
      return 'Retiro Exitoso'
    case 'reject':
      return 'Contactanos'
    case 'pending':
      return 'Anulación Solicitada'
    case 'none':
      return 'none'
    default:
      return ''
  }
}

const matchRoleName = (role) => {
  switch (role) {
    case 'superadministrator':
      return 'Super Admin'
    case 'administrator':
      return 'Administrador'
    case 'editor':
      return 'Editor'
    default:
      return ''
  }
}

const matchStatusUser = (status, eng) => {
  if (!eng) {
    switch (status) {
      case 'active':
        return 'Activo'
      case 'inactive':
        return 'Inactivo'
    }
  }
  return status
}

const matchDate = (date, eng) => {
  if (date && eng) {
    return date?.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1')
  } else if (!date) {
    return ''
  }
  return new Date(date).toLocaleDateString()
}

const matchGender = (gender, eng) => {
  if (eng) {
    switch (gender) {
      case 'male':
        return 'Masculino'
      case 'female':
        return 'Femenino'
      default:
        return gender
    }
  } else {
    switch (gender) {
      case 'Masculino':
        return 'male'
      case 'Femenino':
        return 'female'
      default:
        return gender
    }
  }
}

const matchStatusInvestmentConfirmation = (confirmationRecived) => {
  switch (confirmationRecived) {
    case 'resolved':
      return 'Retiro Exitoso'
    case 'reject':
      return 'Contactanos'
    case 'pending':
      return 'Anulación Solicitada'
    case 'none':
      return 'none'
    default:
      return ''
  }
}

module.exports = {
  matchProjectStatus,
  matchPersonType,
  matchStatusDecline,
  matchRoleName,
  matchStatusUser,
  matchPersonToEnglish,
  matchDate,
  matchGender,
}
