import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { FormControl, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import UpdateActionModal from 'components/ReactTableActions/Update/UpdateActionModal'
import CustomInput from 'components/CustomInput/CustomInput'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { updateDificulties } from 'redux/actions/dificultiesActions'
import { DIFICULTIES_UPDATE_RESET, DIFICULTIES_LIST_RESET } from 'redux/constants/dificultiesConstants'

const UpdateDificultyModal = ({ updateDificultyModal, closeUpdateDificultyModal, info }) => {
  const classes = {}
  const dispatch = useDispatch()
  const [updateInfo, setUpdateInfo] = useState({
    ...info,
    id_dificultad: info?.id_dificultad,
    descripcion_tarea: info?.descripcion_tarea || '',
    codigo_trazabilidad: info?.codigo_trazabilidad || '',
    dificultad: info?.dificultad || '',
  })
  
  const { loadingDificultiesUpdate, successDificultiesUpdate, errorDificultiesUpdate } = useSelector(
    (state) => state.dificultiesUpdate
  )
  useEffect(() => {
    if (successDificultiesUpdate) {
      dispatch({ type: DIFICULTIES_LIST_RESET })
      dispatch({ type: DIFICULTIES_UPDATE_RESET })
      closeUpdateDificultyModal()
    }
  }, [successDificultiesUpdate])

  useEffect(() => {
    return () => dispatch({ type: DIFICULTIES_UPDATE_RESET })
  }, [dispatch])

  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateDificulties({ ...updateInfo, codigo_trazabilidad: updateInfo.codigo_trazabilidad, dificultad: updateInfo.dificultad }))
  }

  return (
    <UpdateActionModal
      open={updateDificultyModal}
      handleCloseModal={closeUpdateDificultyModal}
      errorUpdate={errorDificultiesUpdate}
      succesUpdate={successDificultiesUpdate}
      loadingUpdate={loadingDificultiesUpdate}
      modalTitle={`Editar de Dificultad`}
      handleSubmit={handleUpdate}
      children={
        <GridContainer>
          <GridItem xs={12}>
            <CustomInput
              labelText={'Código de trazabilidad'}
              id='trazabilidad'
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: updateInfo.codigo_trazabilidad,
                onChange: (e) => setUpdateInfo({ ...updateInfo, codigo_trazabilidad: e.target.value }),
                type: 'text',
                maxLength: 50,
              }}
            />
          </GridItem>
          <GridItem xs={12}>             
                  <FormControl fullWidth>
                      <InputLabel id='dificultad'>Dificultad</InputLabel>
                      <Select
                        labelId='dificultad'
                        id='dificultad'
                        value={updateInfo.dificultad}
                        label='Dificultad'
                        onChange={(e) => setUpdateInfo({ ...updateInfo, dificultad: e.target.value })}
                      >
                        <MenuItem value={'ALTA'}>ALTA</MenuItem>
                        <MenuItem value={'BAJA'}>BAJA</MenuItem>
                      </Select>
                    </FormControl>
                </GridItem>
        </GridContainer>
      }
    />
  )
}

export default UpdateDificultyModal
