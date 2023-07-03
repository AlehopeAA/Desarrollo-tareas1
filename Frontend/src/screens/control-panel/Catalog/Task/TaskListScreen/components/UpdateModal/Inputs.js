import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import { getTaskTypes } from 'redux/actions/taskTypeActions'

const Inputs = ({ infoTask, setInfoTask }) => {
  const dispatch = useDispatch()

  const { taskTypes, successTaskTypeList } = useSelector((state) => state.taskTypeList)

  useEffect(() => {
    dispatch(getTaskTypes())
  }, [])

  return (
    <GridContainer>
      <GridItem xs={12}>
        <CustomInput
          labelText={'DESCRIPCION'}
          id='description'
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: infoTask.descripcion_tarea,
            onChange: (e) => setInfoTask({ ...infoTask, descripcion_tarea: e.target.value }),
            type: 'text',
            required: true,
          }}
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='Cuantificable'>Cuantificable</InputLabel>
          <Select
            labelId='Cuantificable'
            id='Cuantificable'
            value={infoTask.cuantificable}
            label='Cuantificable'
            onChange={(e) => setInfoTask({ ...infoTask, cuantificable: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='taskType'>Tipo de Tarea</InputLabel>
          <Select
            labelId='taskType'
            id='taskType'
            value={infoTask.id_tipo_tarea}
            label='Tipo de Tarea'
            onChange={(e) => setInfoTask({ ...infoTask, id_tipo_tarea: e.target.value })}
          >
            {successTaskTypeList &&
              taskTypes.map((type, index) => (
                <MenuItem key={index} value={type.id_tipo_tarea}>
                  {type.tipo_tarea}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='indicador'>Indicador</InputLabel>
          <Select
            labelId='indicador'
            id='indicador'
            value={infoTask.indicador}
            label='Indicador'
            onChange={(e) => setInfoTask({ ...infoTask, indicador: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='entrada'>Entrada</InputLabel>
          <Select
            labelId='entrada'
            id='entrada'
            value={infoTask.entrada}
            label='Entrada'
            onChange={(e) => setInfoTask({ ...infoTask, entrada: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='compartida'>Compartida</InputLabel>
          <Select
            labelId='compartida'
            id='compartida'
            value={infoTask.compartida}
            label='Compartida'
            onChange={(e) => setInfoTask({ ...infoTask, compartida: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='dificultad'>Dificultad</InputLabel>
          <Select
            labelId='dificultad'
            id='dificultad'
            value={infoTask.dificultad}
            label='Dificultad'
            onChange={(e) => setInfoTask({ ...infoTask, dificultad: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='acumulativa'>Acumulativa</InputLabel>
          <Select
            labelId='acumulativa'
            id='acumulativa'
            value={infoTask.acumulativa}
            label='Acumulativa'
            onChange={(e) => setInfoTask({ ...infoTask, acumulativa: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='activo'>Activo</InputLabel>
          <Select
            labelId='activo'
            id='activo'
            value={infoTask.activo}
            label='Activo'
            onChange={(e) => setInfoTask({ ...infoTask, activo: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
    </GridContainer>
  )
}

export default Inputs
