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
import { registerTaskGeneral } from 'redux/actions/taskGeneralActions'
import { TASK_GENERAL_REGISTER_RESET } from 'redux/constants/taskGeneralConstants'

const RegisterTaskGeneralScreen = () => {
  const dispatch = useDispatch()
  const initialState = {
    descripcion_tarea: '',
    id_tipo_tarea: '4',
    cuantificable: 'NO',
    indicador: 'NO',
    entrada: 'NO',
    compartida: 'NO',
    dificultad: 'NO',
    acumulativa: 'NO',
    codigo_trazabilidad: 'NO',
    fecha_alta: format(new Date(), 'yyyy-MM-dd'),
  }

  const [taskGeneral, setTaskGeneral] = useState(initialState)
  const [alert, setAlert] = useState(null)
  const [codTrazability, setCodTrazability] = useState('NO')

  const { loadingTaskGeneralRegister, successTaskGeneralRegister, errorTaskGeneralRegister } = useSelector(
    (state) => state.taskGeneralRegister
  )

  useEffect(() => {
    if (successTaskGeneralRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
        >
          Tarea General guardada correctamente
        </SweetAlert>
      )
      dispatch({ type: TASK_GENERAL_REGISTER_RESET })
      setTaskGeneral(initialState)
      setCodTrazability('NO')
    }
  }, [successTaskGeneralRegister])

  const handleSelector = (e) => {
    const {
      target: { value },
    } = e
    setCodTrazability(value)
    setTaskGeneral({ ...taskGeneral, codigo_trazabilidad: e.target.value })
  }

  const confirmSuccess = () => {
    setAlert(null)
    setTaskGeneral(initialState)
    dispatch({ type: TASK_GENERAL_REGISTER_RESET })
  }
  const hideAlert = () => {
    setAlert(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerTaskGeneral({ ...taskGeneral }))
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
                        value: taskGeneral.descripcion_tarea,
                        onChange: (e) => setTaskGeneral({ ...taskGeneral, descripcion_tarea: e.target.value }),
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
                        id='indicador'
                        name='indicador'
                        value={taskGeneral.indicador}
                        label='Indicador'
                        onChange={(e) => setTaskGeneral({ ...taskGeneral, indicador: e.target.value })}
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
                        value={taskGeneral.cuantificable}
                        label='Cuantificable'
                        onChange={(e) => setTaskGeneral({ ...taskGeneral, cuantificable: e.target.value })}
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
                        value={taskGeneral.entrada}
                        label='Entrada'
                        onChange={(e) => setTaskGeneral({ ...taskGeneral, entrada: e.target.value })}
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
                        value={taskGeneral.compartida}
                        label='Compartida'
                        onChange={(e) => setTaskGeneral({ ...taskGeneral, compartida: e.target.value })}
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
                        value={taskGeneral.dificultad}
                        label='Dificultad'
                        onChange={(e) => setTaskGeneral({ ...taskGeneral, dificultad: e.target.value })}
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
                        value={taskGeneral.acumulativa}
                        label='Acumulativa'
                        onChange={(e) => setTaskGeneral({ ...taskGeneral, acumulativa: e.target.value })}
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
                            onChange: (e) => setTaskGeneral({ ...taskGeneral, codigo_trazabilidad: e.target.value }),
                            type: 'text',
                            required: true,
                          }}
                        />
                      </FormControl>
                    )}{' '}
                  </GridItem>         
                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingTaskGeneralRegister ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </GridItem>                  
                </GridContainer>                
              </form>
              {errorTaskGeneralRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorTaskGeneralRegister} color='danger' />
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

export default RegisterTaskGeneralScreen
