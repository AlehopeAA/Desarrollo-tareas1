import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { taskGeneralUpdateInfo } from 'redux/actions/taskGeneralActions'
import { TASK_GENERAL_LIST_RESET } from 'redux/constants/taskGeneralConstants'
import { TASK_GENERAL_UPDATE_RESET } from 'redux/constants/taskGeneralConstants'

const ActiveAndDesactiveTaskModal = ({ activeModal, closeActiveModal, info, active }) => {
  const dispatch = useDispatch()

  const { loadingTaskGeneralUpdate, errorTaskGeneralUpdate, successTaskGeneralUpdate } = useSelector((state) => state.taskGeneralUpdate)

  useEffect(() => {
    if (successTaskGeneralUpdate) {
      dispatch({ type: TASK_GENERAL_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: TASK_GENERAL_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successTaskGeneralUpdate])
  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(taskGeneralUpdateInfo({ ...info, activo: 'SI' }))
      return
    }
    dispatch(taskGeneralUpdateInfo({ ...info, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
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
      error={errorTaskGeneralUpdate}
      success={successTaskGeneralUpdate}
      loading={loadingTaskGeneralUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveTaskModal
