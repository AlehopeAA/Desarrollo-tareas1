import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { subdirectionUpdateInfo } from 'redux/actions/subdirectionActions'
import { SUBDIRECTION_UPDATE_RESET, SUBDIRECTION_LIST_RESET } from 'redux/constants/subdirectionConstants'

const DesactivateVerificationModal = ({
  desactiveVerificationModal,
  closeDesactiveVerificationModal,
  info,
  active,
}) => {
  const dispatch = useDispatch()

  const { loadingSubdirectionUpdate, errorSubdirectionUpdate, successSubdirectionUpdate } = useSelector(
    (state) => state.subdirectionUpdate
  )

  useEffect(() => {
    if (successSubdirectionUpdate) {
      dispatch({ type: SUBDIRECTION_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: SUBDIRECTION_UPDATE_RESET })
        closeDesactiveVerificationModal()
      }, 1000)
    }
  }, [successSubdirectionUpdate])

  useEffect(() => {
    return () => dispatch({ type: SUBDIRECTION_UPDATE_RESET })
  }, [dispatch])

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
      open={desactiveVerificationModal}
      handleCloseModal={closeDesactiveVerificationModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          {
            'Esta subdirección tiene perfiles relacionados y no puede ser eliminada.Solamente puedes desactivar la subdirección.'
          }
        </>
      }
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Subdirección`}
      error={errorSubdirectionUpdate}
      success={successSubdirectionUpdate}
      loading={loadingSubdirectionUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default DesactivateVerificationModal
