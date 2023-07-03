import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { subdirectionUpdateInfo } from 'redux/actions/subdirectionActions'
import { SUBDIRECTION_UPDATE_RESET, SUBDIRECTION_LIST_RESET } from 'redux/constants/subdirectionConstants'

const ActiveAndDesactiveSubdirectionModal = ({ activeModal, closeActiveModal, info, active }) => {
  const dispatch = useDispatch()

  const { loadingSubdirectionUpdate, errorSubdirectionUpdate, successSubdirectionUpdate } = useSelector(
    (state) => state.subdirectionUpdate
  )

  useEffect(() => {
    if (successSubdirectionUpdate) {
      dispatch({ type: SUBDIRECTION_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: SUBDIRECTION_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successSubdirectionUpdate])
  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(subdirectionUpdateInfo({ ...info, activo: 'SI' }))
    } else {
      dispatch(subdirectionUpdateInfo({ ...info, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
    }
  }
  return (
    <ActiveAndDesactiveActionModal
      open={activeModal}
      handleCloseModal={closeActiveModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          Va a {active ? 'activar' : 'desactivar'} la subdireccion <strong>{info.codigo_subdireccion}</strong>
        </>
      }
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Subdireccion`}
      error={errorSubdirectionUpdate}
      success={successSubdirectionUpdate}
      loading={loadingSubdirectionUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveSubdirectionModal
