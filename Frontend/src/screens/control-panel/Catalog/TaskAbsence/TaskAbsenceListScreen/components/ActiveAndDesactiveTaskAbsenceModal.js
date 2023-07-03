import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { taskAbsenceUpdateInfo } from 'redux/actions/taskAbsenceActions'
import { TASK_ABSENCE_LIST_RESET } from 'redux/constants/taskAbsenceConstants'
import { TASK_ABSENCE_UPDATE_RESET } from 'redux/constants/taskAbsenceConstants'

const ActiveAndDesactiveTaskModal = ({ activeModal, closeActiveModal, info, active }) => {
  const dispatch = useDispatch()

  const { loadingTaskAbsenceUpdate, errorTaskAbsenceUpdate, successTaskAbsenceUpdate } = useSelector((state) => state.taskAbsenceUpdate)

  useEffect(() => {
    if (successTaskAbsenceUpdate) {
      dispatch({ type: TASK_ABSENCE_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: TASK_ABSENCE_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successTaskAbsenceUpdate])
  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(taskAbsenceUpdateInfo({ ...info, activo: 'SI' }))
      return
    }
    dispatch(taskAbsenceUpdateInfo({ ...info, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
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
      error={errorTaskAbsenceUpdate}
      success={successTaskAbsenceUpdate}
      loading={loadingTaskAbsenceUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveTaskModal
