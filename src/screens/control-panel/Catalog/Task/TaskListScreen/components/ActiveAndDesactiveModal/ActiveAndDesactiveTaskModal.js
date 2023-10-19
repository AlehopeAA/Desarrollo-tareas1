import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { taskUpdateInfo } from 'redux/actions/taskActions'
import { TASK_LIST_RESET } from 'redux/constants/taskConstants'
import { TASK_UPDATE_RESET } from 'redux/constants/taskConstants'

const ActiveAndDesactiveTaskModal = ({ activeModal, closeActiveModal, info, active }) => {
  const dispatch = useDispatch()

  const { loadingTaskUpdate, errorTaskUpdate, successTaskUpdate } = useSelector((state) => state.taskUpdate)

  useEffect(() => {
    if (successTaskUpdate) {
      dispatch({ type: TASK_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: TASK_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successTaskUpdate])
  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(taskUpdateInfo({ ...info, id_puesto: 1, activo: 'SI' }))
      return
    }
    dispatch(taskUpdateInfo({ ...info, id_puesto: 1, activo: 'NO' }))
  }
  return (
    <ActiveAndDesactiveActionModal
      open={activeModal}
      handleCloseModal={closeActiveModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          Va a {active ? 'activar' : 'desactivar'} la tarea <strong>{info.id_tarea}</strong>
        </>
      }
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Tarea`}
      error={errorTaskUpdate}
      success={successTaskUpdate}
      loading={loadingTaskUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveTaskModal
