import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { serviceUpdateInfo } from 'redux/actions/serviceActions'
import { SERVICE_LIST_RESET, SERVICE_UPDATE_RESET } from 'redux/constants/serviceConstants'

const DesactivateVerificationModal = ({
  desactiveVerificationModal,
  closeDesactiveVerificationModal,
  info,
  active,
}) => {
  const dispatch = useDispatch()

  const { loadingServiceUpdate, errorServiceUpdate, successServiceUpdate } = useSelector((state) => state.serviceUpdate)

  useEffect(() => {
    if (successServiceUpdate) {
      dispatch({ type: SERVICE_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: SERVICE_UPDATE_RESET })
        closeDesactiveVerificationModal()
      }, 1000)
    }
  }, [successServiceUpdate])

  useEffect(() => {
    return () => dispatch({ type: SERVICE_UPDATE_RESET })
  }, [dispatch])

  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(serviceUpdateInfo({ ...info, activo: 'SI' }))
    } else {
      dispatch(serviceUpdateInfo({ ...info, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
    }
  }

  return (
    <ActiveAndDesactiveActionModal
      open={desactiveVerificationModal}
      handleCloseModal={closeDesactiveVerificationModal}
      handleSubmit={activeOrDesactive}
      message={
        <>{'Este servicio tiene perfiles relacionados y no puede ser eliminada.Solamente puedes desactivarlo.'}</>
      }
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Servicio`}
      error={errorServiceUpdate}
      success={successServiceUpdate}
      loading={loadingServiceUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default DesactivateVerificationModal
