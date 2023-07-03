import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { unitUpdateInfo } from 'redux/actions/unitActions'
import { UNIT_LIST_RESET, UNIT_UPDATE_RESET } from 'redux/constants/unitConstants'

const ActiveAndDesactiveUnitModal = ({ activeModal, closeActiveModal, info, active }) => {
  const dispatch = useDispatch()

  const { loadingUnitUpdate, errorUnitUpdate, successUnitUpdate } = useSelector((state) => state.unitUpdate)

  useEffect(() => {
    if (successUnitUpdate) {
      dispatch({ type: UNIT_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: UNIT_UPDATE_RESET })
        closeActiveModal()
      }, 1000)
    }
  }, [successUnitUpdate])

  const activeOrDesactive = (e) => {
    e.preventDefault()
    if (active) {
      dispatch(unitUpdateInfo({ ...info, activo: 'SI' }))
    } else {
      dispatch(unitUpdateInfo({ ...info, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
    }
  }

  return (
    <ActiveAndDesactiveActionModal
      open={activeModal}
      handleCloseModal={closeActiveModal}
      handleSubmit={activeOrDesactive}
      message={
        <>
          Va a {active ? 'activar' : 'desactivar'} la unidad <strong>{info.codigo_unidad}</strong>
        </>
      }
      modalTitle={`${active ? 'Activar' : 'Desactivar'} Unidad`}
      error={errorUnitUpdate}
      success={successUnitUpdate}
      loading={loadingUnitUpdate}
      loadingMessageButton={active ? 'Activando...' : 'Desactivando'}
      succesMessageButton={active ? 'Activar' : 'Desactivar'}
    />
  )
}

export default ActiveAndDesactiveUnitModal
