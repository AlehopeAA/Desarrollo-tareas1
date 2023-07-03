import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { format } from 'date-fns'
import SweetAlert from 'react-bootstrap-sweetalert'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CustomInput from 'components/CustomInput/CustomInput'
import Button from 'components/CustomButtons/Button'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import { USER_VALIDATORS_LIST_RESET } from 'redux/constants/userConstants'
import styles from '../styles/validatorsMultiSelectStyles'
import roles from 'config/roles/roles'
import MultiSelectJobPosition from 'components/MultiSelectJobPosition/MultiSelectJobPosition'
import { getUsersValidators } from 'redux/actions/userActions'

const useStyles = makeStyles(styles)

const ValidatorsMultiSelect = ({ validators, setValidators }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    successUserValidatorsList,
    loadingUserValidatorsList,
    userValidatorsListData,
    errorUserValidatorsList,
  } = useSelector((state) => state.userListValidators)

  useEffect(() => {
    return () => dispatch({ type: USER_VALIDATORS_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successUserValidatorsList) {
      dispatch(getUsersValidators(roles.VALIDADOR_ROLE))
    }
  }, [successUserValidatorsList])

  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (validators.map((validator) => validator.id_puesto).indexOf(value[value.length - 1].id_puesto) === -1) {
      setValidators(value)
    } else {
      setValidators(validators.filter((validator) => validator.id_puesto !== value[value.length - 1]?.id_puesto))
    }
  }

  return (
    <GridItem xs={12} sm={6}>
      <MultiSelectJobPosition
        label={'Validadores'}
        data={userValidatorsListData}
        multiData={validators}
        handleChangeMultiData={handleChangeMultiData}
      />
    </GridItem>
  )
}

export default ValidatorsMultiSelect
