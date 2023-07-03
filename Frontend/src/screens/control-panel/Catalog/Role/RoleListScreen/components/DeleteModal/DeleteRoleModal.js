import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteActionModal from 'components/ReactTableActions/Delete/DeleteActionModal'
import { deleteRole } from 'redux/actions/roleActions'
import { ROLE_LIST_RESET, ROLE_DELETE_RESET } from 'redux/constants/roleConstants'

const DeleteRoleModal = ({ deleteRoleModal, handleCloseDeleteRoleModal, showDeleteRoleInfo }) => {
  const dispatch = useDispatch()

  const { successRoleDelete, errorRoleDelete, loadingRoleDelete } = useSelector((state) => state.roleDelete)

  useEffect(() => {
    if (successRoleDelete) {
      setTimeout(() => {
        dispatch({ type: ROLE_LIST_RESET })
        dispatch({ type: ROLE_DELETE_RESET })
        handleCloseDeleteRoleModal()
      }, 1000)
    }
  }, [successRoleDelete])

  const handleDeleteRole = (e) => {
    e.preventDefault()
    dispatch(deleteRole(showDeleteRoleInfo?.id_rol))
  }
  return (
    <DeleteActionModal
      open={deleteRoleModal}
      handleCloseModal={handleCloseDeleteRoleModal}
      handleSubmit={handleDeleteRole}
      modalTitle='Eliminar Rol'
      showDeleteInfo={showDeleteRoleInfo?.codigo_rol}
      loadingDelete={loadingRoleDelete}
      successDelete={successRoleDelete}
      errorDelete={errorRoleDelete}
    />
  )
}

export default DeleteRoleModal
