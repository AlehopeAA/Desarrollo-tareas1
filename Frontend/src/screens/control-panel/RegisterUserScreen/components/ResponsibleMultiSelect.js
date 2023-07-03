import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import roles from 'config/roles/roles'
import GridItem from 'components/Grid/GridItem'
import MultiSelectJobPosition from 'components/MultiSelectJobPosition/MultiSelectJobPosition'
import { USER_RESPONSIBLES_LIST_RESET } from 'redux/constants/userConstants'
import { getUsersResponsibles } from 'redux/actions/userActions'

const ResponsibleMultiSelect = ({ responsibles, setResponsibles }) => {
  const dispatch = useDispatch()

  const [data, setData] = useState([])

  const { successUserResponsiblesList, loadingUserResponsiblesList, userResponsiblesListData } = useSelector(
    (state) => state.userListResponsibles
  )

  useEffect(() => {
    return () => dispatch({ type: USER_RESPONSIBLES_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successUserResponsiblesList) {
      dispatch(getUsersResponsibles(roles.RESPONSABLE_ROLE))
    } else {
      const filteredProfiles = userResponsiblesListData.filter((p) => p.activo === 'SI')
      setData(filteredProfiles)
    }
  }, [successUserResponsiblesList])

  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (responsibles.map((responsible) => responsible.id_puesto).indexOf(value[value.length - 1].id_puesto) === -1) {
      setResponsibles(value)
    } else {
      setResponsibles(
        responsibles.filter((responsible) => responsible.id_puesto !== value[value.length - 1]?.id_puesto)
      )
    }
  }

  return (
    <GridItem xs={12}>
      {loadingUserResponsiblesList ? (
        <>Cargando Responsables</>
      ) : (
        <MultiSelectJobPosition
          label={'Responsables'}
          data={data}
          multiData={responsibles}
          handleChangeMultiData={handleChangeMultiData}
        />
      )}
    </GridItem>
  )
}

export default ResponsibleMultiSelect
