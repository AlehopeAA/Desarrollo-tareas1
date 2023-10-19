import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { profileUpdateInfo } from 'redux/actions/profileActions'
import { PROFILE_LIST_RESET } from 'redux/constants/profileConstants'
import { PROFILE_UPDATE_RESET } from 'redux/constants/profileConstants'

const ActiveAndDesactiveProfileModal = ({ activeModal, closeActiveModal, info, active }) => {
  const dispatch = useDispatch()

  const { loadingProfileUpdate, errorProfileUpdate, successProfileUpdate } = useSelector((state) => state.profileUpdate)

  useEffect(() => {
    if (successProfileUpdate) {
      dispatch({ type: PROFILE_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: PROFILE_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successProfileUpdate])
  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(profileUpdateInfo({ ...info, activo: 'SI' }))
      return
    }
    dispatch(profileUpdateInfo({ ...info, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
  }
  return (
    <ActiveAndDesactiveActionModal
      open={activeModal}
      handleCloseModal={closeActiveModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          Va a {active ? 'activar' : 'desactivar'} el Perfil <strong>{info.codigo_perfil}</strong>
        </>
      }
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Perfil`}
      error={errorProfileUpdate}
      success={successProfileUpdate}
      loading={loadingProfileUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveProfileModal
