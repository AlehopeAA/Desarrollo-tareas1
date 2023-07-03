import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { taskSpecificUpdateInfo } from 'redux/actions/taskSpecificActions'
import { TASK_SPECIFIC_LIST_RESET } from 'redux/constants/taskSpecificConstants'
import { TASK_SPECIFIC_UPDATE_RESET } from 'redux/constants/taskSpecificConstants'

const ActiveAndDesactiveTaskModal = ({ activeModal, closeActiveModal, info, active }) => { 
  const dispatch = useDispatch()

  const { loadingTaskSpecificUpdate, errorTaskSpecificUpdate, successTaskSpecificUpdate } = useSelector((state) => state.taskSpecificUpdate)

  useEffect(() => {
    if (successTaskSpecificUpdate) {
      dispatch({ type: TASK_SPECIFIC_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: TASK_SPECIFIC_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successTaskSpecificUpdate])
  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(taskSpecificUpdateInfo({ ...info, activo: 'SI' }))
      return
    }
    dispatch(taskSpecificUpdateInfo({ ...info, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
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
      error={errorTaskSpecificUpdate}
      success={successTaskSpecificUpdate}
      loading={loadingTaskSpecificUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveTaskModal
