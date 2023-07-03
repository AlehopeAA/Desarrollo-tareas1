import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Card, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import JobSelect from './components/JobSelect'
import { TASK_SPECIFIC_REGISTER_RESET } from 'redux/constants/taskSpecificConstants'
import { TEAM_WORK_LIST_RESET } from 'redux/constants/teamWorkConstants'
import { registerTaskSpecific } from 'redux/actions/taskSpecificActions'
import styles from './styles/taskRegisterScreenStyles'

const useStyles = makeStyles(styles)

const RegisterTaskSpecificScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const initialState = {
    descripcion_tarea: '',
    id_tipo_tarea: '1',
    indicador: 'NO',
    cuantificable: 'NO',
    dificultad: 'NO',
    acumulativa: 'NO',
    entrada: 'NO',
    compartida: 'NO',
    codigo_trazabilidad: 'NO',
    fecha_alta: format(new Date(), 'yyyy-MM-dd'),
  }

  const [taskSpecific, setTaskSpecific] = useState(initialState)
  const [alert, setAlert] = useState(null)
  const [currentJobPosition, setCurrentJobPosition] = useState('')
  const [errorJobPosition, setErrorJobPosition] = useState('')
  const [codTrazability, setCodTrazability] = useState('NO')

  const { loadingTaskSpecificRegister, successTaskSpecificRegister, errorTaskSpecificRegister } = useSelector(
    (state) => state.taskSpecificRegister
  )

  useEffect(() => {
    if (successTaskSpecificRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          //confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Tarea especifica guardada correctamente
        </SweetAlert>
      )
      dispatch({ type: TASK_SPECIFIC_REGISTER_RESET })
      setTaskSpecific(initialState)
      setCodTrazability('NO')
    }
  }, [successTaskSpecificRegister])

  useEffect(() => {
    return () => dispatch({ type: TASK_SPECIFIC_REGISTER_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setAlert(null)
    setTaskSpecific(initialState)
    dispatch({ type: TASK_SPECIFIC_REGISTER_RESET })
    dispatch({ type: TEAM_WORK_LIST_RESET })
    setErrorJobPosition('')
    setCurrentJobPosition('')
  }
  const hideAlert = () => {
    setAlert(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentJobPosition) {
      return setErrorJobPosition('El puesto de trabajo es obligatorio para registrar la tarea.')
    }

    dispatch(registerTaskSpecific({ ...taskSpecific, id_puesto: currentJobPosition }))
  }
  const handleSelector = (e) => {
    const {
      target: { value },
    } = e
    setCodTrazability(value)
    setTaskSpecific({ ...taskSpecific, codigo_trazabilidad: e.target.value })
  }
  return (
    <>
      <GridContainer>
        <GridItem xs={12} md={8} style={{ margin: 'auto' }}>
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <GridContainer>
                  <JobSelect
                    currentJobPositionId={currentJobPosition}
                    setCurrentJobPositionId={setCurrentJobPosition}
                  />
                  <GridItem style={{ marginBottom: '20px' }} xs={12}>
                    <CustomInput
                      labelText={'DESCRIPCION'}
                      id='description'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: taskSpecific.descripcion_tarea,
                        onChange: (e) => setTaskSpecific({ ...taskSpecific, descripcion_tarea: e.target.value }),
                        type: 'text',
                        maxLength: 200,
                        required: true,
                      }}
                    />
                  </GridItem>                  
                  <GridContainer style={{ margin: '20px 2px' }}>
                    <GridItem xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id='indicador'>Indicador</InputLabel>
                        <Select
                          labelId='indicador'
                          id='indicador'
                          name='indicador'
                          value={taskSpecific.indicador}
                          label='Indicador'
                          onChange={(e) => setTaskSpecific({ ...taskSpecific, indicador: e.target.value })}
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
                          value={taskSpecific.cuantificable}
                          label='Cuantificable'
                          onChange={(e) => setTaskSpecific({ ...taskSpecific, cuantificable: e.target.value })}
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
                          value={taskSpecific.entrada}
                          name='entrada'
                          label='Entrada'
                          onChange={(e) => setTaskSpecific({ ...taskSpecific, entrada: e.target.value })}
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
                          value={taskSpecific.compartida}
                          label='Compartida'
                          onChange={(e) => setTaskSpecific({ ...taskSpecific, compartida: e.target.value })}
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
                          value={taskSpecific.dificultad}
                          label='Dificultad'
                          onChange={(e) => setTaskSpecific({ ...taskSpecific, dificultad: e.target.value })}
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
                          value={taskSpecific.acumulativa}
                          label='Acumulativa'
                          onChange={(e) => setTaskSpecific({ ...taskSpecific, acumulativa: e.target.value })}
                        >
                          <MenuItem value={'SI'}>SI</MenuItem>
                          <MenuItem value={'NO'}>NO</MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>                    
                  </GridContainer>
				          <GridItem xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel id='codigo_trazabilidad'>COD. TRAZABILIDAD</InputLabel>
                      <Select
                        labelId='codigo_trazabilidad'
                        id='codigo_trazabilidad'
                        name='codigo_trazabilidad'
                        value={codTrazability}
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
                            onChange: (e) => setTaskSpecific({ ...taskSpecific, codigo_trazabilidad: e.target.value }),
                            type: 'text',
                            required: true,
                          }}
                        />
                      </FormControl>
                    )}{' '}
                  </GridItem>
                  {errorTaskSpecificRegister && (
                    <GridItem xs={12}>
                      <SnackbarContent message={errorTaskSpecificRegister} color='danger' />
                    </GridItem>
                  )}
                  {errorJobPosition && !currentJobPosition && (
                    <GridItem xs={12}>
                      <SnackbarContent message={errorJobPosition} color='danger' />
                    </GridItem>
                  )}
                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingTaskSpecificRegister ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {alert}
    </>
  )
}

export default RegisterTaskSpecificScreen
