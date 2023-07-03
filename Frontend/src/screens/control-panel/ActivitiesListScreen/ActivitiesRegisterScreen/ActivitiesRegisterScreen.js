import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { FormControl, InputLabel, ListItemText, makeStyles, MenuItem, Select, DatePickerField } from '@material-ui/core'
import SweetAlert from 'react-bootstrap-sweetalert'
import Card from 'components/Card/Card'
import Button from 'components/CustomButtons/Button'
import CardBody from 'components/Card/CardBody'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import TasksSelect from './components/TasksSelect'
import { registerActivity } from 'redux/actions/activitiesActions'
import { ACTIVITIES_REGISTER_RESET } from 'redux/constants/activitiesConstants'
import styles from '../styles/activitiesScreenStyles'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { getConfiguracions } from 'redux/actions/configuracionActions'

const useStyles = makeStyles(styles)

const ActivitiesRegisterScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const initialState = {
    fecha_actividad: new Date(),    
    descripcion_tarea: '',
    modalidad: '',
    horas: '',
    unidades: '',
    codigo_trazabilidad: [],
    observaciones: '',
    tarea: '',
    fecha_alta: format(new Date(), 'yyyy-MM-dd'),
  }

  
  const [limiteFechas, setLimiteFechas] = useState('')
  const { configuracions, successConfiguracionList } = useSelector((state) => state.configuracionList)

  const [componenteCodigoTrazabilidad, setComponenteCodigoTrazabilidad] = useState(<></>)
  const [activityInfo, setActivityInfo] = useState(initialState)
  const [task, setTask] = useState('')
  const [alert, setAlert] = useState(null)
  const [errorTask, setErrorTask] = useState('')
  const [errorCodigosTrazabilidad, setErrorCodigosTrazabilidad] = useState('')
  const { loadingActivitiesRegister, successActivitiesRegister, errorActivitiesRegister } = useSelector(
    (state) => state.activitiesRegister
  )

  useEffect(() => {
    if (successActivitiesRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Actividad Registrada Correctamente
        </SweetAlert>
      )
    }
  }, [successActivitiesRegister])


  useEffect(() => {
    if (successConfiguracionList) {
      const currentDate = new Date()
      const rangoFechas = {
        fecha_minima: currentDate,
        fecha_maxima: new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0)
      }

      const parametro_seleccionado = configuracions.filter((configuracion) => configuracion.parametro == 'registro_actividad' )[0];
      if(rangoFechas.fecha_minima.getDate() > parametro_seleccionado.valor) {
        //Es el 1 del mes actual
        rangoFechas.fecha_minima = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      }
      else {
        //Es el 1 del mes anterior
        rangoFechas.fecha_minima = new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1);
      }      
      setLimiteFechas(rangoFechas)
    }
    else {
      dispatch(getConfiguracions())
    }
    
  }, [successConfiguracionList])


  useEffect(() => {
    return () => dispatch({ type: ACTIVITIES_REGISTER_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setActivityInfo(initialState)
    dispatch({ type: ACTIVITIES_REGISTER_RESET })
    setTask('')
    setErrorTask('')
    setErrorCodigosTrazabilidad('')
    setAlert(null)
  }
  const hideAlert = () => {
    setAlert(null)
  }
  const handleRegisterActivity = (e) => {
    e.preventDefault()
    if (activityInfo.tarea.length === 0) {
      return setErrorTask('La tarea es obligatoria')
    }

    //Validamos los codigos de trazabilidad si son de nº de expediente.
    if(activityInfo.tarea[0].codigo_trazabilidad == 'Nº Expediente') {
      const expRegNumExp = /^[0-9]{3}\/[0-9]{4}\/[0-9]{5}$/;
      for(let i = 0; i < activityInfo.codigo_trazabilidad.length; i++) {
        if(!expRegNumExp.test(activityInfo.codigo_trazabilidad[i])) {
          return setErrorCodigosTrazabilidad('Tiene códigos de trazabilidad incorrectos.')
        }
      }
    }

    const activity = {
      ...activityInfo,
      tarea: activityInfo.tarea[0],
      fecha_actividad: format(activityInfo.fecha_actividad, 'yyyy-MM-dd'),
      codigo_trazabilidad: activityInfo.codigo_trazabilidad.slice(0, activityInfo.unidades)
    }
    dispatch(registerActivity(activity))
  }

  const cambioTareaSeleccionada = (tarea_seleccionada) => {
    setTask(tarea_seleccionada.id_tarea)
    if(tarea_seleccionada?.cuantificable === 'NO') {
      //reseteamos las unidades.
      activityInfo.unidades = ''
      activityInfo.codigo_trazabilidad = []
    }
    else {
      if (tarea_seleccionada?.codigo_trazabilidad == 'NO') {
        //No lleva codigos de trazabilidad lo reseteamos.
        activityInfo.codigo_trazabilidad = []
      }
    }
    construirCodigoTrazabilidad(tarea_seleccionada, activityInfo.unidades)
  }

  const construirCodigoTrazabilidad = (tarea_seleccionada, unidades) => {
    if (tarea_seleccionada?.cuantificable === 'SI' && 
        tarea_seleccionada?.codigo_trazabilidad != 'NO'  && unidades > 0) {
      var listado = []
      const expRegNumExp = /^[0-9]{3}\/[0-9]{4}\/[0-9]{5}$/;
      for(let i = 0; i < unidades; i++) {
          let incorrecto_formato = false

          if(tarea_seleccionada?.codigo_trazabilidad == 'Nº Expediente') {
            incorrecto_formato = !expRegNumExp.test(activityInfo.codigo_trazabilidad[i]);
          }

          listado.push(
          <>
            <GridItem xs={12}>
              <CustomInput                    
                labelText={tarea_seleccionada?.codigo_trazabilidad}                    
                id='codigo_trazabilidad'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: activityInfo.codigo_trazabilidad[i],
                  onChange: (e) => { activityInfo.codigo_trazabilidad[i] = e.target.value; construirCodigoTrazabilidad(tarea_seleccionada, unidades)},
                  type: 'text',
                  maxLength: 50,
                  disabled: tarea_seleccionada?.cuantificable === 'SI' ? false : true,
                  required: tarea_seleccionada?.codigo_trazabilidad !== 'NO' ? true : false,
                }}
              />
            </GridItem>
            {incorrecto_formato &&
              (<GridItem xs={12}>
                <span className={classes.incorrect_format}>El formato tiene que ser:  nnn/nnnn/nnnnn (n: Código númerico)</span>
              </GridItem>
            )}
          </>
          )
      }
      setComponenteCodigoTrazabilidad(listado)
    }
    else {
      setComponenteCodigoTrazabilidad(<></>)
    }
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={10} style={{ margin: '0 auto' }}>
        <Card>
          <CardBody>
            <form onSubmit={handleRegisterActivity}>
              <GridContainer>
                <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                  <GridItem xs={12} md={6}>
                    <KeyboardDatePicker
                      disableToolbar
                      format="dd/MM/yyyy"
                      margin="normal"
                      minDate={new Date('12/01/2021')}
                      maxDate={limiteFechas.fecha_maxima}
                      id="fecha_actividad"
                      label="Fecha de Actividad"
                      value={activityInfo.fecha_actividad}
                      onChange={(e) => setActivityInfo({ ...activityInfo, fecha_actividad: e })}
                      required={true}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </GridItem>
                </MuiPickersUtilsProvider>                
                <TasksSelect
                  activityInfo={activityInfo}
                  setActivityInfo={setActivityInfo}
                  task={task}
                  setTask={cambioTareaSeleccionada}
                />
                <GridItem xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='modalidad'>Modalidad</InputLabel>
                    <Select
                      labelId='modalidad'
                      id='modalidad'
                      className={classes.select}
                      value={activityInfo.modalidad}           
                      required= {true}           
                      onChange={(e) => setActivityInfo({ ...activityInfo, modalidad: e.target.value })}
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                    >
                      {['Oficina', 'Teletrabajo', 'N/A'].map((modalidad, index) => (
                        <MenuItem key={index} value={modalidad}>
                          <ListItemText primary={modalidad} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} md={6}>
                  <CustomInput
                    labelText={'Horas'}
                    id='horas'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: activityInfo.horas,
                      onChange: (e) => setActivityInfo({ ...activityInfo, horas: e.target.value }),
                      type: 'number',
                      required: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} md={6}>
                  <CustomInput
                    labelText={'Unidades'}
                    id='unidades'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: activityInfo.unidades,
                      onChange: (e) => {setActivityInfo({ ...activityInfo, unidades: e.target.value }); construirCodigoTrazabilidad(activityInfo?.tarea[0], e.target.value)},
                      type: 'number',
                      disabled: activityInfo?.tarea[0]?.cuantificable === 'SI' ? false : true,
                      required: activityInfo?.tarea[0]?.cuantificable === 'SI' ? true : false,
                    }}
                  />
                </GridItem>
                {activityInfo?.tarea[0]?.codigo_trazabilidad != 'NO' && activityInfo?.unidades > 0 && (                                    
                    componenteCodigoTrazabilidad
                )}
                <GridItem xs={12}>
                  <CustomInput
                    labelText={'Observaciones'}
                    id='observaciones'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: activityInfo.observaciones,
                      onChange: (e) => setActivityInfo({ ...activityInfo, observaciones: e.target.value }),
                      type: 'text',
                      maxLength: 200,                      
                    }}
                  />
                </GridItem>
              </GridContainer>
              {errorActivitiesRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorActivitiesRegister} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
              {errorTask && !activityInfo.tarea.length > 0 && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorTask} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
              {errorCodigosTrazabilidad && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorCodigosTrazabilidad} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
              <Button type='submit' color='primary' className={classes.registerButton}>
                {loadingActivitiesRegister ? 'Registrando Actividad...' : 'Registrar Actividad'}
              </Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      {alert}
    </GridContainer>
  )
}

export default ActivitiesRegisterScreen
