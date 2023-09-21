import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { format } from 'date-fns'
import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import GridContainer from 'components/Grid/GridContainer'
import { fillCreateTaskHandle } from 'redux/actions/taskActions'
import { filterCreateTaskHandle } from 'redux/actions/taskActions'
import { fillDuplicateTaskHandle } from 'redux/actions/taskActions'
import { filterDuplicateTaskHandle } from 'redux/actions/taskActions'
import { modifyTaskHandle } from 'redux/actions/taskActions'

const TaskProfileForm = ({ taskByProfile }) => {
  const dispatch = useDispatch()

  const [taskOther, setTaskOther] = useState({
    ...taskByProfile,
    fecha_alta: format(new Date(), 'yyyy-MM-dd'),
    newTaskChecked: false,
    copyTaskChecked: false,
  })

  const [codTrazability, setCodTrazability] = useState(taskOther.codigo_trazabilidad || 'NO')

  useEffect(() => {
    dispatch(modifyTaskHandle(taskOther))
  }, [taskOther])

  const handleCreateTask = (e) => {
    dispatch(filterDuplicateTaskHandle(taskOther.id_tarea))
    if (e.target.checked && taskOther.copyTaskChecked) {
      if (taskOther.entrada === "SI" && taskOther.cuantificable === "NO") {
        return;
      } else {
        setTaskOther({ ...taskOther, newTaskChecked: e.target.checked, copyTaskChecked: !e.target.checked })
        dispatch(
          fillCreateTaskHandle({ ...taskOther, newTaskChecked: e.target.checked, copyTaskChecked: !e.target.checked })
        )
      }

    } else if (e.target.checked) {
      setTaskOther({ ...taskOther, newTaskChecked: e.target.checked })
      dispatch(
        fillCreateTaskHandle({ ...taskOther, newTaskChecked: e.target.checked, copyTaskChecked: !e.target.checked })
      )
    } else {
      setTaskOther({ ...taskOther, newTaskChecked: e.target.checked })
      dispatch(filterCreateTaskHandle(taskOther.id_tarea))
    }
  }
  const handleCopyTask = (e) => {
    dispatch(filterCreateTaskHandle(taskOther.id_tarea))
    if (taskOther.newTaskChecked && e.target.checked) {
      setTaskOther({ ...taskOther, copyTaskChecked: e.target.checked, newTaskChecked: !e.target.checked })
      dispatch(
        fillDuplicateTaskHandle({ ...taskOther, copyTaskChecked: e.target.checked, newTaskChecked: !e.target.checked })
      )
    } else if (e.target.checked) {
      dispatch(
        fillDuplicateTaskHandle({ ...taskOther, copyTaskChecked: e.target.checked, newTaskChecked: !e.target.checked })
      )
      setTaskOther({ ...taskOther, copyTaskChecked: e.target.checked })
    } else {
      setTaskOther({ ...taskOther, copyTaskChecked: e.target.checked })
      dispatch(filterDuplicateTaskHandle(taskOther.id_tarea))
    }
  }

  const handleSelector = (e) => {
    const {
      target: { value },
    } = e
    setCodTrazability(value)
    setTaskOther({ ...taskOther, codigo_trazabilidad: e.target.value })
  }

  if(taskByProfile.activo === 'SI'){
    console.log('RESULTADO' + taskByProfile.activo)
  
    return (
      <div style={{ width: '100%', marginTop: '30px' }}>
        <GridItem xs={12}>
          <FormGroup aria-label='position' row>
            <FormControlLabel
              value='create'
              control={<Checkbox checked={taskOther.newTaskChecked} onChange={handleCreateTask} />}
              label='Crear Tarea'
              labelPlacement='end'
            />
            <FormControlLabel
              value='duplicate'
              control={<Checkbox checked={taskOther.copyTaskChecked} onChange={handleCopyTask} />}
              label='Misma Tarea'
              labelPlacement='end'
            />
          </FormGroup>
        </GridItem>
        <GridItem xs={12}>
          <CustomInput
            labelText={'DESCRIPCION'}
            id='description'
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: taskOther.descripcion_tarea,
              onChange: (e) => setTaskOther({ ...taskOther, descripcion_tarea: e.target.value }),
              type: 'text',
              required: true,
              disabled: !taskOther.newTaskChecked,
            }}
          />
        </GridItem>
        <GridItem xs={12}>
          <FormControl fullWidth>
            <InputLabel id='task-type'>Tipo de Tarea *</InputLabel>
            <Select
              labelId='task-type'
              id='task-type'
              value={taskOther.tipo_tarea}
              disabled={!taskOther.newTaskChecked}
              label='task-type'
              onChange={(e) => setTaskOther({ ...taskOther, tipo_tarea: e.target.value })}
              required='true'
            >
              <MenuItem value={'ORDINARIA'}>ORDINARIA</MenuItem>
              <MenuItem value={'EXTRAORDINARIA'}>EXTRAORDINARIA</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12}>
          <GridContainer>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='indicador'>Indicador</InputLabel>
                <Select
                  labelId='indicador'
                  id='indicador'
                  disabled={!taskOther.newTaskChecked}
                  value={taskOther.indicador}
                  label='Indicador'
                  onChange={(e) => setTaskOther({ ...taskOther, indicador: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='cuantificable'>Cuantificable</InputLabel>
                <Select
                  labelId='cuantificable'
                  id='cuantificable'
                  disabled={!taskOther.newTaskChecked}
                  value={taskOther.cuantificable}
                  label='Cuantificable'
                  onChange={(e) => setTaskOther({ ...taskOther, cuantificable: e.target.value })}
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
                  value={taskOther.entrada}
                  label='Entrada'
                  disabled={!taskOther.newTaskChecked}
                  onChange={(e) => setTaskOther({ ...taskOther, entrada: e.target.value })}
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
                  value={taskOther.compartida}
                  disabled={!taskOther.newTaskChecked}
                  label='Compartida'
                  onChange={(e) => setTaskOther({ ...taskOther, compartida: e.target.value })}
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
                  value={taskOther.dificultad}
                  disabled={!taskOther.newTaskChecked}
                  label='Dificultad'
                  onChange={(e) => setTaskOther({ ...taskOther, dificultad: e.target.value })}
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
                  value={taskOther.acumulativa}
                  disabled={!taskOther.newTaskChecked}
                  label='Acumulativa'
                  onChange={(e) => setTaskOther({ ...taskOther, acumulativa: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id='codigo_trazabilidad'>COD. TRAZABILIDAD</InputLabel>
                <Select
                  labelId='codigo_trazabilidad'
                  id='codigo_trazabilidad'
                  name='codigo_trazabilidad'
                  value={codTrazability}
                  disabled={!taskOther.newTaskChecked}
                  label='codigo_trazabilidad'
                  onChange={(e) => handleSelector(e)}
                >
                  {[
                    'NO',
                    'Nº Expediente',
                    'Nombre de fichero',
                    'Nº comunicación',
                    'Nº de relación',
                    'Nº de lote',
                    'Otro',
                  ].map((cod) => (
                    <MenuItem value={cod}>{cod} </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {codTrazability === 'Otro' && (
                <FormControl fullWidth>
                  <CustomInput
                    id='codigo_trazabilidad'
                    labelText={'Ingrese código de trazabilidad'}
                    inputProps={{
                      onChange: (e) => setTaskOther({ ...taskOther, codigo_trazabilidad: e.target.value }),
                      type: 'text',
                      required: true,
                    }}
                  />
                </FormControl>
              )}{' '}
            </GridItem>
          </GridContainer>
        </GridItem>
      </div>
    )
  }else{
    return null;
  }
 
}

export default TaskProfileForm
