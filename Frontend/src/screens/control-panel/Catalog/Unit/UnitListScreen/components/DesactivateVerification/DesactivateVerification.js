import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import { unitUpdateInfo } from 'redux/actions/unitActions'
import { UNIT_LIST_RESET, UNIT_UPDATE_RESET } from 'redux/constants/unitConstants'

const DesactivateVerificationModal = ({
  desactiveVerificationModal,
  closeDesactiveVerificationModal,
  info,
  active,
}) => {
  const dispatch = useDispatch()

  const { loadingUnitUpdate, errorUnitUpdate, successUnitUpdate } = useSelector((state) => state.unitUpdate)

  console.log(info)
  useEffect(() => {
    if (successUnitUpdate) {
      dispatch({ type: UNIT_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: UNIT_UPDATE_RESET })
        closeDesactiveVerificationModal()
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
      open={desactiveVerificationModal}
      handleCloseModal={closeDesactiveVerificationModal}
      handleSubmit={activeOrDesactive}
      message={
        <>{'Esta unidad tiene perfiles relacionados y no puede ser eliminada.Solamente puedes desactivar la unidad.'}</>
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

export default DesactivateVerificationModal
