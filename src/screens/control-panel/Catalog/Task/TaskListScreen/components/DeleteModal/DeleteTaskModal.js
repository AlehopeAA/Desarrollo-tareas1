import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteActionModal from 'components/ReactTableActions/Delete/DeleteActionModal'
import { deleteTask } from 'redux/actions/taskActions'
import { TASK_LIST_RESET, TASK_DELETE_RESET } from 'redux/constants/taskConstants'

const DeleteTaskModal = ({ handleCloseDeleteTaskModal, deleteTaskModal, showDeleteTaskInfo }) => {
  const dispatch = useDispatch()

  const { successTaskDelete, errorTaskDelete, loadingTaskDelete } = useSelector((state) => state.taskDelete)

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteTask(showDeleteTaskInfo.id_tarea))
  }

  useEffect(() => {
    if (successTaskDelete) {
      setTimeout(() => {
        dispatch({ type: TASK_LIST_RESET })
        dispatch({ type: TASK_DELETE_RESET })
        handleCloseDeleteTaskModal()
      }, 1000)
    }
  }, [successTaskDelete])

  return (
    <DeleteActionModal
      open={deleteTaskModal}
      handleCloseModal={handleCloseDeleteTaskModal}
      handleSubmit={handleSumit}
      modalTitle='Eliminar Tarea'
      showDeleteInfo={showDeleteTaskInfo?.descripcion_tarea}
      loadingDelete={loadingTaskDelete}
      successDelete={successTaskDelete}
      errorDelete={errorTaskDelete}
    />
  )
}

export default DeleteTaskModal
