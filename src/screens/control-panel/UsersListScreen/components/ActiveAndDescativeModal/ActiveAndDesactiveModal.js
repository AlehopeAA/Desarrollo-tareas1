import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { USER_UPDATE_RESET } from 'redux/constants/userConstants'
import { USER_LIST_RESET } from 'redux/constants/userConstants'
import { userUpdateInfo } from 'redux/actions/userActions'

const ActiveAndDesactiveModal = ({ activeModal, closeActiveModal, info, active }) => {
  const dispatch = useDispatch()

  const { loadingUserUpdate, userInvestorUpdateError, successUserUpdate } = useSelector((state) => state.userUpdate)

  useEffect(() => {
    if (successUserUpdate) {
      dispatch({ type: USER_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successUserUpdate])
  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(userUpdateInfo({ ...info, activo: 'SI' }))
      return
    }
    dispatch(userUpdateInfo({ ...info, activo: 'NO' }))
  }
  return (
    <ActiveAndDesactiveActionModal
      open={activeModal}
      handleCloseModal={closeActiveModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          Va a {active ? 'activar' : 'desactivar'} el puesto de trabajo <strong>{info.nombre}</strong>
        </>
      }
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Puesto de Trabajo`}
      error={userInvestorUpdateError}
      success={successUserUpdate}
      loading={loadingUserUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveModal
