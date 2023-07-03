import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import DeleteActionModal from 'components/ReactTableActions/Delete/DeleteActionModal'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { deleteProfile, profileUpdateInfo } from 'redux/actions/profileActions'
import { USER_LIST_BY_PROFILE_ID_RESET } from 'redux/constants/userConstants'
import { PROFILE_LIST_RESET, PROFILE_DELETE_RESET, PROFILE_UPDATE_RESET } from 'redux/constants/profileConstants'
import { getUsersByProfileId } from 'redux/actions/userActions'

const DeleteProfileModal = ({ handleCloseDeleteProfileModal, deleteProfileModal, showDeleteProfileInfo }) => {
  const dispatch = useDispatch()
  const active = showDeleteProfileInfo.activo !== 'SI'

  const { successProfileDelete, errorProfileDelete, loadingProfileDelete } = useSelector((state) => state.profileDelete)
  const { loadingUserListByProfileId, userListByProfileIdData } = useSelector((state) => state.userListByProfileId)
  const { loadingProfileUpdate, errorProfileUpdate, successProfileUpdate } = useSelector((state) => state.profileUpdate)

  useEffect(() => {
    let timeOut = ''
    if (successProfileUpdate) {
      dispatch({ type: PROFILE_LIST_RESET })
      timeOut = setTimeout(() => {
        dispatch({ type: PROFILE_UPDATE_RESET })
        handleCloseDeleteProfileModal()
      }, 1000)
    }

    return () => clearTimeout(timeOut)
  }, [successProfileUpdate])

  useEffect(() => {
    dispatch(getUsersByProfileId(showDeleteProfileInfo.id_perfil))
  }, [])

  useEffect(() => {
    let timeOut = ''
    if (successProfileDelete) {
      timeOut = setTimeout(() => {
        dispatch({ type: PROFILE_LIST_RESET })
        dispatch({ type: PROFILE_DELETE_RESET })
        handleCloseDeleteProfileModal()
      }, 1000)
    }
    return () => clearTimeout(timeOut)
  }, [successProfileDelete])

  useEffect(() => {
    return () => dispatch({ type: PROFILE_DELETE_RESET })
  }, [dispatch])
  useEffect(() => {
    return () => dispatch({ type: PROFILE_UPDATE_RESET })
  }, [dispatch])
  useEffect(() => {
    return () => dispatch({ type: USER_LIST_BY_PROFILE_ID_RESET })
  }, [dispatch])

  const handleDeleteProfile = (e) => {
    e.preventDefault()
    dispatch(deleteProfile(showDeleteProfileInfo?.id_perfil))
  }

  const Desactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(profileUpdateInfo({ ...showDeleteProfileInfo, activo: 'SI' }))
      return
    }
    dispatch(
      profileUpdateInfo({ ...showDeleteProfileInfo, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') })
    )
  }

  return (
    <>
      {loadingUserListByProfileId ? (
        <>Cargando Perfil</>
      ) : userListByProfileIdData && userListByProfileIdData.length > 0 ? (
        <ActiveAndDesactiveActionModal
          open={deleteProfileModal}
          handleCloseModal={handleCloseDeleteProfileModal}
          handleSubmit={Desactive}
          message={
            <>
              El perfil <strong>{showDeleteProfileInfo.codigo_perfil}</strong> tiene asociados puestos de trabajo o gestores y solo
              puede {active ? 'activar' : 'desactivar'}
            </>
          }
          modalTitle={`${active ? 'Activar' : 'Desactivar'} Perfil`}
          error={errorProfileUpdate}
          success={successProfileUpdate}
          loading={loadingProfileUpdate}
          loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
          succesMessageButton={active ? 'Activar' : 'Desactivar'}
        />
      ) : (
        <DeleteActionModal
          open={deleteProfileModal}
          handleCloseModal={handleCloseDeleteProfileModal}
          handleSubmit={handleDeleteProfile}
          modalTitle='Eliminar Perfil'
          showDeleteInfo={showDeleteProfileInfo?.codigo_perfil}
          loadingDelete={loadingProfileDelete}
          successDelete={successProfileDelete}
          errorDelete={errorProfileDelete}
        />
      )}
    </>
  )
}

export default DeleteProfileModal
