import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { departamentUpdateInfo } from 'redux/actions/departamentActions'
import { DEPARTAMENT_LIST_RESET, DEPARTAMENT_UPDATE_RESET } from 'redux/constants/departamentConstants'

const ActiveAndDesactiveDepartamentModal = ({ activeModal, closeActiveModal, info, active }) => {
  const dispatch = useDispatch()

  const { loadingDepartamentUpdate, errorDepartamentUpdate, successDepartamentUpdate } = useSelector(
    (state) => state.departamentUpdate
  )

  useEffect(() => {
    if (successDepartamentUpdate) {
      dispatch({ type: DEPARTAMENT_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: DEPARTAMENT_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successDepartamentUpdate])
  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(departamentUpdateInfo({ ...info, activo: 'SI' }))
    } else {
      dispatch(departamentUpdateInfo({ ...info, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
    }
  }
  return (
    <ActiveAndDesactiveActionModal
      open={activeModal}
      handleCloseModal={closeActiveModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          Va a {active ? 'activar' : 'desactivar'} el departamento <strong>{info.codigo_departamento}</strong>
        </>
      }
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Departamento`}
      error={errorDepartamentUpdate}
      success={successDepartamentUpdate}
      loading={loadingDepartamentUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveDepartamentModal
