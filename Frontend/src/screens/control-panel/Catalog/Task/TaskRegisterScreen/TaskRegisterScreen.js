import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Card, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { getTaskTypes } from 'redux/actions/taskTypeActions'
import { registerTask } from 'redux/actions/taskActions'
import { TASK_REGISTER_RESET } from 'redux/constants/taskConstants'
import { getTasks } from 'redux/actions/taskActions'
import styles from './styles/taskRegisterScreenStyles'

const useStyles = makeStyles(styles)

const TaskRegisterScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [task, setTask] = useState({})
  const [alert, setAlert] = useState(null)

  const { loadingTaskRegister, successTaskRegister, errorTaskRegister } = useSelector((state) => state.taskRegister)
  const { taskTypes, successTaskTypeList } = useSelector((state) => state.taskTypeList)

  useEffect(() => {
    dispatch(getTaskTypes())
    return () => {
      dispatch(getTasks())
    }
  }, [])

  useEffect(() => {
    if (successTaskRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          //confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Tarea guardada correctamente
        </SweetAlert>
      )
    }
  }, [successTaskRegister])

  const confirmSuccess = () => {
    setAlert(null)
    setTask({
      descripcion_tarea: '',
      cuantificable: '',
      id_tipo_tarea: '',
      indicador: '',
      entrada: '',
      compartida: '',
      dificultad: '',
      acumulativa: '',
    })
    dispatch({ type: TASK_REGISTER_RESET })
  }
  const hideAlert = () => {
    setAlert(null)
  }

  const handleSubmit = (e) => {
    console.log('testsepsep')
    e.preventDefault()
    dispatch(registerTask({ ...task, activo: 'si', id_puesto: 1 }))
  }
  return (
    <>
      <GridContainer>
        
        <GridItem xs={12} md={8} style={{ margin: 'auto' }}>
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <GridContainer>
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
                  <GridItem xs={12}>
                    <CustomInput
                      labelText={'CUANTIFICABLE'}
                      id='cuantificable'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: task.cuantificable,
                        onChange: (e) => setTask({ ...task, cuantificable: e.target.value }),
                        type: 'text',
                        required: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id='taskType'>Tipo de Tarea</InputLabel>
                      <Select
                        labelId='taskType'
                        className={classes.selectableInput}
                        id='taskType'
                        value={task.id_tipo_tarea}
                        label='Tipo de Tarea'
                        onChange={(e) => setTask({ ...task, id_tipo_tarea: e.target.value })}
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
                        className={classes.selectableInput}
                        id='indicador'
                        value={task.indicador}
                        label='Indicador'
                        onChange={(e) => setTask({ ...task, indicador: e.target.value })}
                      >
                        <MenuItem value={'si'}>si</MenuItem>
                        <MenuItem value={'no'}>no</MenuItem>
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
                        label='Entrada'
                        onChange={(e) => setTask({ ...task, entrada: e.target.value })}
                      >
                        <MenuItem value={'si'}>si</MenuItem>
                        <MenuItem value={'no'}>no</MenuItem>
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
                        label='Compartida'
                        onChange={(e) => setTask({ ...task, compartida: e.target.value })}
                      >
                        <MenuItem value={'si'}>si</MenuItem>
                        <MenuItem value={'no'}>no</MenuItem>
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
                        onChange={(e) => setTask({ ...task, dificultad: e.target.value })}
                      >
                        <MenuItem value={'si'}>si</MenuItem>
                        <MenuItem value={'no'}>no</MenuItem>
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
                        onChange={(e) => setTask({ ...task, acumulativa: e.target.value })}
                      >
                        <MenuItem value={'si'}>si</MenuItem>
                        <MenuItem value={'no'}>no</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingTaskRegister ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorTaskRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorTaskRegister} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {alert}
    </>
  )
}

export default TaskRegisterScreen
