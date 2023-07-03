import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { buttonActionMultiTask, pushEditedTask, pushMultiTask } from 'redux/actions/uiAddMultiTaskAction'

const MultiSpecificsTaskForm = () => {
  const dispatch = useDispatch()
  const classes = {}

  const { taskToEdit } = useSelector((state) => state.uiMultiTask)

  const initialState = {
    id_tarea: Date.now(),
    descripcion_tarea: '',
    cuantificable: 'NO',
    indicador: 'NO',
    entrada: 'NO',
    compartida: 'NO',
    dificultad: 'NO',
    acumulativa: 'NO',
  }

  const [task, setTask] = useState(taskToEdit.id_tarea ? taskToEdit : initialState)
  const [errorTaskForm, setErrorTaskForm] = useState('')

  const statePropagation = (e) => {
    const {
      target: { value, name },
    } = e
    if (value === 'NO') {
      if (name === 'indicador')
        setTask({
          ...task,
          [name]: value,
          cuantificable: 'NO',
          dificultad: 'NO',
          acumulativa: 'NO',
          entrada: 'NO',
          compartida: 'NO',
        })
      if (name === 'entrada') setTask({ ...task, [name]: value, compartida: 'NO' })
    } else setTask({ ...task, [name]: value })
  }

  const addNewTask = () => {
    for (const property in task) {
      if (!task[property]) {
        return setErrorTaskForm('Por favor complete todos los campos ')
      }
    }

    const pushTask = [
      {
        ...task,
      },
    ]
    setTask(initialState)
    dispatch(buttonActionMultiTask())
    setErrorTaskForm('')
    dispatch(pushMultiTask(pushTask))
  }
  const updateTask = () => {
    for (const property in task) {
      if (!task[property] && property !== 'fecha_baja') {
        return setErrorTaskForm('Por favor complete todos los campos ')
      }
    }
    dispatch(buttonActionMultiTask())
    setErrorTaskForm('')
    dispatch(pushEditedTask(task))
  }

  const cancelAdd = () => {
    setErrorTaskForm('')
    setTask(initialState)
    dispatch(buttonActionMultiTask())
  }

  return (
    <GridContainer style={{ marginTop: '15px' }}>
      <GridItem xs={12}>
        {' '}
        <Typography variant='body1'>Tarea Especifica</Typography>{' '}
      </GridItem>

      <GridItem xs={12}>
        <CustomInput
          labelText={'DESCRIPCION'}
          id='description'
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: task.descripcion_tarea,
            onChange: (e) => setTask({ ...task, descripcion_tarea: e.target.value }),
            type: 'text',
            required: true,
          }}
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='indicador'>Indicador</InputLabel>
          <Select
            labelId='indicador'
            className={classes.selectableInput}
            id='indicador'
            value={task.indicador}
            name='indicador'
            label='Indicador'
            onChange={(e) => statePropagation(e)}
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
            className={classes.selectableInput}
            id='cuantificable'
            value={task.cuantificable}
            disabled={task.indicador !== 'SI'}
            label='Cuantificable'
            onChange={(e) => setTask({ ...task, cuantificable: e.target.value })}
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
            className={classes.selectableInput}
            id='entrada'
            value={task.entrada}
            name='entrada'
            label='Entrada'
            disabled={task.indicador !== 'SI'}
            onChange={(e) => statePropagation(e)}
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
            className={classes.selectableInput}
            id='compartida'
            value={task.compartida}
            disabled={task.entrada !== 'SI'}
            label='Compartida'
            onChange={(e) => setTask({ ...task, compartida: e.target.value })}
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
            className={classes.selectableInput}
            id='dificultad'
            value={task.dificultad}
            label='Dificultad'
            disabled={task.indicador !== 'SI'}
            onChange={(e) => setTask({ ...task, dificultad: e.target.value })}
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
            className={classes.selectableInput}
            id='acumulativa'
            value={task.acumulativa}
            label='Acumulativa'
            disabled={task.indicador !== 'SI'}
            onChange={(e) => setTask({ ...task, acumulativa: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>      
      {errorTaskForm && (
        <GridItem xs={12}>
          <SnackbarContent message={errorTaskForm} color='danger' />
        </GridItem>
      )}

      <GridItem xs={12} style={{ marginTop: '10px' }}>
        <GridContainer>
          <GridItem xs={12} sm={6}>
            {!taskToEdit.id_tarea ? (
              <Button block onClick={addNewTask}>
                Agregar
              </Button>
            ) : (
              <Button block onClick={updateTask}>
                Editar
              </Button>
            )}
          </GridItem>
          <GridItem xs={12} sm={6}>
            <Button block onClick={cancelAdd}>
              Cancelar
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}

export default MultiSpecificsTaskForm
