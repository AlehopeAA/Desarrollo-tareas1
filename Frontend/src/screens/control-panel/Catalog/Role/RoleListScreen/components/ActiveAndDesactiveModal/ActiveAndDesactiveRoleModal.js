import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { roleUpdateInfo } from 'redux/actions/roleActions'
import { ROLE_LIST_RESET, ROLE_UPDATE_RESET } from 'redux/constants/roleConstants'

const ActiveAndDesactiveRoleModal = ({ activeModal, closeActiveModal, info, active }) => {
  const dispatch = useDispatch()

  const { loadingRoleUpdate, errorRoleUpdate, successRoleUpdate } = useSelector((state) => state.roleUpdate)

  useEffect(() => {
    if (successRoleUpdate) {
      dispatch({ type: ROLE_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: ROLE_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successRoleUpdate])
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
      open={activeModal}
      handleCloseModal={closeActiveModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          Va a {active ? 'activar' : 'desactivar'} el rol <strong>{info.codigo_rol}</strong>
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

export default ActiveAndDesactiveRoleModal
