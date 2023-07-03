import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import UpdateActionModal from 'components/ReactTableActions/Update/UpdateActionModal'
import CustomInput from 'components/CustomInput/CustomInput'
import { updateEntries } from 'redux/actions/entriesActions'
import { ENTRIES_UPDATE_RESET, ENTRIES_LIST_RESET } from 'redux/constants/entriesConstants'

const UpdateEntryModal = ({ updateEntryModal, closeUpdateEntryModal, info }) => {
  const classes = {}
  const dispatch = useDispatch()
  const [updateInfo, setUpdateInfo] = useState({
    ...info,
    id_entrada: info.id_entrada,
    entrada: info?.entrada || '0',
    tipo: info.tipo,
    descripcion_tarea: info.descripcion_tarea,
    puesto: `${info.nombre} ${info.apellido1} ${info?.apellido2 || '-'}`,
    anio: info.anio,
    mes: info.mes,
    codigo_perfil: info.codigo_perfil,
  })
  
  const { loadingEntriesUpdate, successEntriesUpdate, errorEntriesUpdate } = useSelector(
    (state) => state.entriesUpdate
  )
  useEffect(() => {
    if (successEntriesUpdate) {
      dispatch({ type: ENTRIES_LIST_RESET })
      dispatch({ type: ENTRIES_UPDATE_RESET })
      closeUpdateEntryModal()
    }
  }, [successEntriesUpdate])

  useEffect(() => {
    return () => dispatch({ type: ENTRIES_UPDATE_RESET })
  }, [dispatch])

  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateEntries({ ...updateInfo, entrada: updateInfo.entrada, tipo: updateInfo.tipo }))
  }

  return (
    <UpdateActionModal
      open={updateEntryModal}
      handleCloseModal={closeUpdateEntryModal}
      errorUpdate={errorEntriesUpdate}
      succesUpdate={successEntriesUpdate}
      loadingUpdate={loadingEntriesUpdate}
      modalTitle={`Editar de Entrada`}
      handleSubmit={handleUpdate}
      children={
        <GridContainer>
          <GridItem xs={12} md={6}>
          <Typography variant='body1' gutterBottom>
            Tarea: <strong>{updateInfo.descripcion_tarea}</strong>
          </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
          <Typography variant='body1' gutterBottom>
            Perfiles: <strong>{updateInfo.codigo_perfil}</strong>
          </Typography>
          </GridItem>          
          <GridItem xs={12} md={6}>
          <Typography variant='body1' gutterBottom>
            Año: <strong>{updateInfo.anio}</strong>
          </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
          <Typography variant='body1' gutterBottom>
            Mes: <strong>{updateInfo.mes}</strong>
          </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
          <Typography variant='body1' gutterBottom>
            Puesto: <strong>{updateInfo.puesto}</strong>
          </Typography>
          </GridItem>
          <GridItem xs={12}>
            <CustomInput
              labelText={'Entrada'}
              id='entrada'
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: updateInfo.entrada,
                onChange: (e) => setUpdateInfo({ ...updateInfo, entrada: e.target.value }),
                maxLength: 3,
                type: 'number',
                required: 'true',
              }}
            />
          </GridItem>
        </GridContainer>
      }
    />
  )
}

export default UpdateEntryModal
