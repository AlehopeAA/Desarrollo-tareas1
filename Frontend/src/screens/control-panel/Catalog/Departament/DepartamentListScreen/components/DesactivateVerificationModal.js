import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { departamentUpdateInfo } from 'redux/actions/departamentActions'
import { DEPARTAMENT_LIST_RESET, DEPARTAMENT_UPDATE_RESET } from 'redux/constants/departamentConstants'

const DesactivateVerificationModal = ({
  desactiveVerificationModal,
  closeDesactiveVerificationModal,
  info,
  active,
}) => {
  const dispatch = useDispatch()
  const { loadingDepartamentUpdate, errorDepartamentUpdate, successDepartamentUpdate } = useSelector(
    (state) => state.departamentUpdate
  )

  useEffect(() => {
    if (successDepartamentUpdate) {
      dispatch({ type: DEPARTAMENT_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: DEPARTAMENT_UPDATE_RESET })
        closeDesactiveVerificationModal()
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
      open={desactiveVerificationModal}
      handleCloseModal={closeDesactiveVerificationModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          {
            'Este departamento tiene perfiles relacionados y no puede ser eliminada.Solamente puedes desactivar el departamento.'
          }
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

export default DesactivateVerificationModal
