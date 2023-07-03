import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteActionModal from 'components/ReactTableActions/Delete/DeleteActionModal'
import { deleteUser } from 'redux/actions/userActions'
import { USER_LIST_RESET, USER_DELETE_RESET } from 'redux/constants/userConstants'

const DeleteUserModal = ({ handleCloseDeleteUserModal, deleteUserModal, showDeleteUserInfo }) => {
  const dispatch = useDispatch()

  const { successUserDelete, errorUserDelete, loadingUserDelete } = useSelector((state) => state.userDelete)

  useEffect(() => {
    if (successUserDelete) {
      setTimeout(() => {
        dispatch({ type: USER_LIST_RESET })
        dispatch({ type: USER_DELETE_RESET })
        handleCloseDeleteUserModal()
      }, 1000)
    }
  }, [successUserDelete])

  useEffect(() => {
    dispatch({ type: USER_DELETE_RESET })
  }, [])

  const handleDeleteUser = (e) => {
    e.preventDefault()
    dispatch(deleteUser(showDeleteUserInfo?.id_puesto))
  }

  return (
    <DeleteActionModal
      open={deleteUserModal}
      handleCloseModal={handleCloseDeleteUserModal}
      handleSubmit={handleDeleteUser}
      modalTitle='Eliminar Puesto de Trabajo'
      showDeleteInfo={showDeleteUserInfo?.nombre}
      loadingDelete={loadingUserDelete}
      successDelete={successUserDelete}
      errorDelete={errorUserDelete}
    />
  )
}

export default DeleteUserModal
