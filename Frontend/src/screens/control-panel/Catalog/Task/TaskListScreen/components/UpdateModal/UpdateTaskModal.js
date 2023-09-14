import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UpdateActionModal from 'components/ReactTableActions/Update/UpdateActionModal'
import Inputs from './Inputs'
import { taskUpdateInfo } from 'redux/actions/taskActions'
import { TASK_LIST_RESET, TASK_UPDATE_RESET } from 'redux/constants/taskConstants'

const UpdateTaskModal = ({ handleCloseModal, updateTaskModal, showUpdateTask }) => {
  console.log('test')
  const dispatch = useDispatch()

  const [infoTask, setInfoTask] = useState(showUpdateTask)

  const { loadingTaskUpdate, errorTaskUpdate, successTaskUpdate } = useSelector((state) => state.taskUpdate)

  useEffect(() => {
    if (successTaskUpdate) {
      dispatch({ type: TASK_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: TASK_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successTaskUpdate])

  const updateTaskHandler = (e) => {
    console.log('por favor ya')
    e.preventDefault()
    dispatch(taskUpdateInfo({ ...infoTask, id_puesto: 1 }))
  }
  return (
    <UpdateActionModal
      handleSubmit={updateTaskHandler}
      handleCloseModal={handleCloseModal}
      open={updateTaskModal}
      modalTitle='Editar Tarea'
      errorUpdate={errorTaskUpdate}
      succesUpdate={successTaskUpdate}
      loadingUpdate={loadingTaskUpdate}
      children={<Inputs infoTask={infoTask} setInfoTask={setInfoTask} />}
    />
  )
}

export default UpdateTaskModal
