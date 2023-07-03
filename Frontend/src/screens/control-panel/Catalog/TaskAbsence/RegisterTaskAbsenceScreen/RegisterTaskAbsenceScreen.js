import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Card, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { registerTaskAbsence } from 'redux/actions/taskAbsenceActions'
import { TASK_ABSENCE_REGISTER_RESET } from 'redux/constants/taskAbsenceConstants'

const RegisterTaskAbsenceScreen = () => {
  const dispatch = useDispatch()
  const initialState = {
    descripcion_tarea: '',
    id_tipo_tarea: '5',
    cuantificable: 'NO',
    indicador: 'NO',
    entrada: 'NO',
    compartida: 'NO',
    dificultad: 'NO',
    acumulativa: 'NO',
    codigo_trazabilidad: 'NO',
    fecha_alta: format(new Date(), 'yyyy-MM-dd'),
  }
  const [taskAbsence, setTaskAbsence] = useState(initialState)
  const [alert, setAlert] = useState(null)
  const [codTrazability, setCodTrazability] = useState('NO')

  const { loadingTaskAbsenceRegister, successTaskAbsenceRegister, errorTaskAbsenceRegister } = useSelector(
    (state) => state.taskAbsenceRegister
  )

  useEffect(() => {
    if (successTaskAbsenceRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
        >
          Tarea Ausencia guardada correctamente
        </SweetAlert>
      )
    }
  }, [successTaskAbsenceRegister])

  const handleSelector = (e) => {
    const {
      target: { value },
    } = e
    setCodTrazability(value)
    setTaskAbsence({ ...taskAbsence, codigo_trazabilidad: e.target.value })
  }
  
  const confirmSuccess = () => {
    setAlert(null)
    setTaskAbsence(initialState)
    dispatch({ type: TASK_ABSENCE_REGISTER_RESET })
  }
  
  const hideAlert = () => {
    setAlert(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerTaskAbsence({ ...taskAbsence }))
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} md={8} style={{ margin: 'auto' }}>
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <GridContainer>
                  <GridItem style={{ marginBottom: '20px' }} xs={12}>
                    <CustomInput
                      labelText={'DESCRIPCION'}
                      id='description'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: taskAbsence.descripcion_tarea,
                        onChange: (e) => setTaskAbsence({ ...taskAbsence, descripcion_tarea: e.target.value }),
                        type: 'text',
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
                          value={taskAbsence.indicador}
                          label='Indicador'
                          onChange={(e) => setTaskAbsence({ ...taskAbsence, indicador: e.target.value })}
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
                          value={taskAbsence.cuantificable}
                          label='Cuantificable'
                          onChange={(e) => setTaskAbsence({ ...taskAbsence, cuantificable: e.target.value })}
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
                          name='entrada'
                          value={taskAbsence.entrada}
                          label='Entrada'
                          onChange={(e) => setTaskAbsence({ ...taskAbsence, entrada: e.target.value })}
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
                          value={taskAbsence.compartida}
                          label='Compartida'
                          onChange={(e) => setTaskAbsence({ ...taskAbsence, compartida: e.target.value })}
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
                          value={taskAbsence.dificultad}
                          label='Dificultad'
                          onChange={(e) => setTaskAbsence({ ...taskAbsence, dificultad: e.target.value })}
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
                          value={taskAbsence.acumulativa}
                          label='Acumulativa'
                          onChange={(e) => setTaskAbsence({ ...taskAbsence, acumulativa: e.target.value })}
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
                            onChange: (e) => setTaskAbsence({ ...taskAbsence, codigo_trazabilidad: e.target.value }),
                            type: 'text',
                            required: true,
                          }}
                        />
                      </FormControl>
                    )}{' '}
                  </GridItem>
                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingTaskAbsenceRegister ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorTaskAbsenceRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorTaskAbsenceRegister} color='danger' />
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

export default RegisterTaskAbsenceScreen
