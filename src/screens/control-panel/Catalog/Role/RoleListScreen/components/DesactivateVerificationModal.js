import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { roleUpdateInfo } from 'redux/actions/roleActions'
import { ROLE_LIST_RESET, ROLE_UPDATE_RESET } from 'redux/constants/roleConstants'
const DesactivateVerificationModal = ({
  desactiveVerificationModal,
  closeDesactiveVerificationModal,
  info,
  active,
}) => {
  const dispatch = useDispatch()

  const { loadingRoleUpdate, errorRoleUpdate, successRoleUpdate } = useSelector((state) => state.roleUpdate)

  useEffect(() => {
    if (successRoleUpdate) {
      dispatch({ type: ROLE_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: ROLE_UPDATE_RESET })
        closeDesactiveVerificationModal()
      }, 1000)
    }
  }, [successRoleUpdate])

  useEffect(() => {
    return () => dispatch({ type: ROLE_UPDATE_RESET })
  }, [dispatch])

  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(roleUpdateInfo({ ...info, activo: 'SI' }))
    } else {
      dispatch(roleUpdateInfo({ ...info, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
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
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Rol`}
      error={errorRoleUpdate}
      success={successRoleUpdate}
      loading={loadingRoleUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default DesactivateVerificationModal
