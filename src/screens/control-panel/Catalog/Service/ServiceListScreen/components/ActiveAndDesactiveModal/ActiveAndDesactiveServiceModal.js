import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { serviceUpdateInfo } from 'redux/actions/serviceActions'
import { SERVICE_LIST_RESET, SERVICE_UPDATE_RESET } from 'redux/constants/serviceConstants'

const ActiveAndDesactiveServiceModal = ({ activeModal, closeActiveModal, info, active }) => {
  const dispatch = useDispatch()

  const { loadingServiceUpdate, errorServiceUpdate, successServiceUpdate } = useSelector((state) => state.serviceUpdate)

  useEffect(() => {
    if (successServiceUpdate) {
      dispatch({ type: SERVICE_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: SERVICE_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successServiceUpdate])
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
      open={activeModal}
      handleCloseModal={closeActiveModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          Va a {active ? 'activar' : 'desactivar'} el servico <strong>{info.codigo_servicio}</strong>
        </>
      }
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Subdirección`}
      error={errorServiceUpdate}
      success={successServiceUpdate}
      loading={loadingServiceUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveServiceModal
