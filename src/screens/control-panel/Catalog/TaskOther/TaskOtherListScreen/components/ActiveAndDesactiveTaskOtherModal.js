import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { taskOtherUpdateInfo } from 'redux/actions/taskOtherActions'
import { TASK_OTHER_LIST_RESET } from 'redux/constants/taskOtherConstants'
import { TASK_OTHER_UPDATE_RESET } from 'redux/constants/taskOtherConstants'

const ActiveAndDesactiveTaskModal = ({ activeModal, closeActiveModal, info, active }) => { 
  const dispatch = useDispatch()

  const { loadingTaskOtherUpdate, errorTaskOtherUpdate, successTaskOtherUpdate } = useSelector((state) => state.taskOtherUpdate)

  useEffect(() => {
    if (successTaskOtherUpdate) {
      dispatch({ type: TASK_OTHER_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: TASK_OTHER_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successTaskOtherUpdate])
  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(taskOtherUpdateInfo({ ...info, activo: 'SI' }))
      return
    }
    dispatch(taskOtherUpdateInfo({ ...info, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
  }
  return (
    <ActiveAndDesactiveActionModal
      open={activeModal}
      handleCloseModal={closeActiveModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          Va a {active ? 'activar' : 'desactivar'} la tarea <strong>{info.descripcion_tarea}</strong>
        </>
      }
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Tarea`}
      error={errorTaskOtherUpdate}
      success={successTaskOtherUpdate}
      loading={loadingTaskOtherUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveTaskModal
