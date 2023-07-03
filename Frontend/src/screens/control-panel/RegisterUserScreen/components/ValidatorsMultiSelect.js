import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import roles from 'config/roles/roles'
import GridItem from 'components/Grid/GridItem'
import MultiSelectJobPosition from 'components/MultiSelectJobPosition/MultiSelectJobPosition'
import { getUsersValidators } from 'redux/actions/userActions'
import { USER_VALIDATORS_LIST_RESET } from 'redux/constants/userConstants'

const ValidatorsMultiSelect = ({ validators, setValidators }) => {
  const dispatch = useDispatch()

  const [data, setData] = useState([])

  const { successUserValidatorsList, loadingUserValidatorsList, userValidatorsListData } = useSelector(
    (state) => state.userListValidators
  )

  useEffect(() => {
    return () => dispatch({ type: USER_VALIDATORS_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successUserValidatorsList) {
      dispatch(getUsersValidators(roles.VALIDADOR_ROLE))
    } else {
      const filteredProfiles = userValidatorsListData.filter((p) => p.activo === 'SI')
      setData(filteredProfiles)
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
    <GridItem xs={12}>
      {loadingUserValidatorsList ? (
        <>Cargando</>
      ) : (
        <MultiSelectJobPosition
          label={'Validadores'}
          data={data}
          multiData={validators}
          handleChangeMultiData={handleChangeMultiData}
        />
      )}
    </GridItem>
  )
}

export default ValidatorsMultiSelect
