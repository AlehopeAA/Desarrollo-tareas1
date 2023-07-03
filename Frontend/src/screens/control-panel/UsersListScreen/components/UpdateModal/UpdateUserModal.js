import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UpdateActionModal from 'components/ReactTableActions/Update/UpdateActionModal'
import Inputs from './Inputs'
import { userUpdateInfo } from 'redux/actions/userActions'
import { USER_LIST_RESET, USER_UPDATE_RESET } from 'redux/constants/userConstants'

const UserUpdateModal = ({ handleCloseModal, updateUserModal, showUpdateUser }) => {
  const dispatch = useDispatch()

  const [infoModalData, setModalData] = useState(showUpdateUser)

  const { loadingUserUpdate, userInvestorUpdateError, successUserUpdate } = useSelector((state) => state.userUpdate)

  useEffect(() => {
    if (successUserUpdate) {
      dispatch({ type: USER_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successUserUpdate])

  const updateUserHandler = (e) => {
    e.preventDefault()
    dispatch(userUpdateInfo(infoModalData))
  }

  return (
    <UpdateActionModal
      handleSubmit={updateUserHandler}
      handleCloseModal={handleCloseModal}
      open={updateUserModal}
      modalTitle='Editar Puesto de Trabajo'
      errorUpdate={userInvestorUpdateError}
      succesUpdate={successUserUpdate}
      loadingUpdate={loadingUserUpdate}
      children={<Inputs infoModalData={infoModalData} setModalData={setModalData} />}
    ></UpdateActionModal>
  )
}

export default UserUpdateModal
