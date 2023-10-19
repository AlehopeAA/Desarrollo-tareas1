import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { FormControl, InputLabel, ListItemText, makeStyles, MenuItem, Select } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import UpdateActionModal from 'components/ReactTableActions/Update/UpdateActionModal'
import CustomInput from 'components/CustomInput/CustomInput'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import TasksSelect from '../ActivitiesRegisterScreen/components/TasksSelect'
import { updateActivity } from 'redux/actions/activitiesActions'
import { ACTIVITIES_UPDATE_RESET, ACTIVITIES_LIST_RESET } from 'redux/constants/activitiesConstants'
import styles from '../styles/activitiesScreenStyles'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { getConfiguracions } from 'redux/actions/configuracionActions'

const useStyles = makeStyles(styles)

const UpdateActivityModal = ({ updateActivityModal, closeUpdateActivityModal, info }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [limiteFechas, setLimiteFechas] = useState('')
  const { configuracions, successConfiguracionList } = useSelector((state) => state.configuracionList)

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

  const [updateInfo, setUpdateInfo] = useState({
    ...info,
    fecha_actividad: new Date(info.fecha_actividad),
    fecha_modificacion: format(new Date(), 'yyyy-MM-dd'),
    tarea: [],
    //unidades: info?.unidades || '',
  })
  const [task, setTask] = useState(info.id_tarea)
  const [componenteCodigoTrazabilidad, setComponenteCodigoTrazabilidad] = useState(<></>)
  const [errorCodigosTrazabilidad, setErrorCodigosTrazabilidad] = useState('')

  const cambioTareaSeleccionada = (tarea_seleccionada) => {
    setTask(tarea_seleccionada.id_tarea)
    if(tarea_seleccionada?.cuantificable === 'NO') {
      //reseteamos las unidades.
      updateInfo.unidades = ''
      updateInfo.codigos_trazabilidad = []
    }
    else {
      if (tarea_seleccionada?.codigo_trazabilidad == 'NO') {
        //No lleva codigos de trazabilidad lo reseteamos.
        updateInfo.codigos_trazabilidad = []
      }
    }
    setUpdateInfo({...updateInfo, tarea: [tarea_seleccionada]})
    construirCodigoTrazabilidad(tarea_seleccionada, updateInfo.unidades)
  }

  const construirCodigoTrazabilidad = (tarea_seleccionada, unidades) => {
    if (tarea_seleccionada?.cuantificable === 'SI' && 
        tarea_seleccionada?.codigo_trazabilidad != 'NO'  && unidades > 0) {
      var listado = []
      const expRegNumExp = /^[0-9]{3}\/[0-9]{4}\/[0-9]{5}$/;
      for(let i = 0; i < unidades; i++) {
          let incorrecto_formato = false

          if(tarea_seleccionada?.codigo_trazabilidad == 'Nº Expediente') {
            incorrecto_formato = !expRegNumExp.test(updateInfo.codigos_trazabilidad[i]);
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
                    value: updateInfo.codigos_trazabilidad[i],
                    onChange: (e) => { updateInfo.codigos_trazabilidad[i] = e.target.value; construirCodigoTrazabilidad(tarea_seleccionada, unidades)},
                    type: 'text',
                    maxLength: 50,
                    disabled: tarea_seleccionada?.cuantificable === 'SI' ? false : true,
                    required: tarea_seleccionada?.codigo_trazabilidad !== 'NO' ? true : false,
                  }}
                />
                {incorrecto_formato &&
                  (<GridItem xs={12}>
                    <span className={classes.incorrect_format}>El formato es incorrecto tiene que ser:  nnn/nnnn/nnnnn (n: Código númerico)</span>
                  </GridItem>
                )}
              </GridItem>
            </>
          )
      }
      setComponenteCodigoTrazabilidad(listado)
    }
    else {
      setComponenteCodigoTrazabilidad(<></>)
    }
  }


  const { loadingActivitiesUpdate, successActivitiesUpdate, errorActivitiesUpdate } = useSelector(
    (state) => state.activitiesUpdate
  )
  useEffect(() => {
    if (successActivitiesUpdate) {
      dispatch({ type: ACTIVITIES_LIST_RESET })
      dispatch({ type: ACTIVITIES_UPDATE_RESET })
      setErrorCodigosTrazabilidad('')
      closeUpdateActivityModal()
    }
  }, [successActivitiesUpdate])

  useEffect(() => {
    return () => dispatch({ type: ACTIVITIES_UPDATE_RESET })
  }, [dispatch])

  const handleUpdate = (e) => {
    e.preventDefault()

    //Validamos los codigos de trazabilidad si son de nº de expediente.
    if(updateInfo.tarea[0].codigo_trazabilidad == 'Nº Expediente') {
      const expRegNumExp = /^[0-9]{3}\/[0-9]{4}\/[0-9]{5}$/;
      for(let i = 0; i < updateInfo.codigos_trazabilidad.length; i++) {
        if(!expRegNumExp.test(updateInfo.codigos_trazabilidad[i])) {
          return setErrorCodigosTrazabilidad('Tiene códigos de trazabilidad incorrectos.')
        }
      }
    }

    dispatch(updateActivity({ ...updateInfo,  fecha_actividad: format(updateInfo.fecha_actividad, 'yyyy-MM-dd'), codigos_trazabilidad: updateInfo.codigos_trazabilidad.slice(0, updateInfo.unidades) }))
  }

  return (
    <UpdateActionModal
      open={updateActivityModal}
      handleCloseModal={closeUpdateActivityModal}
      errorUpdate={errorActivitiesUpdate}
      succesUpdate={successActivitiesUpdate}
      loadingUpdate={loadingActivitiesUpdate}
      modalTitle={`Editar de Actividad`}
      handleSubmit={handleUpdate}
      children={
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
                value={updateInfo.fecha_actividad}
                onChange={(e) => setUpdateInfo({ ...updateInfo, fecha_actividad: e })}
                required={true}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </GridItem>
          </MuiPickersUtilsProvider>
          <TasksSelect activityInfo={updateInfo} setActivityInfo={setUpdateInfo} task={task} setTask={cambioTareaSeleccionada} />
          <GridItem xs={12}>
            <FormControl fullWidth>
              <InputLabel id='modalidad'>Modalidad</InputLabel>
              <Select
                labelId='modalidad'
                id='modalidad'
                className={classes.select}
                value={updateInfo.modalidad}
                required={true}
                onChange={(e) => setUpdateInfo({ ...updateInfo, modalidad: e.target.value })}
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
                value: updateInfo.horas,
                onChange: (e) => setUpdateInfo({ ...updateInfo, horas: e.target.value }),
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
                value: updateInfo.unidades,
                onChange: (e) => {setUpdateInfo({ ...updateInfo, unidades: e.target.value }); construirCodigoTrazabilidad(updateInfo?.tarea[0], e.target.value)},
                type: 'number',
                disabled: updateInfo?.tarea[0]?.cuantificable === 'SI' ? false : true,
                required: updateInfo?.tarea[0]?.cuantificable === 'SI' ? true : false,
              }}
            />
          </GridItem>
          {updateInfo?.tarea[0]?.codigo_trazabilidad != 'NO' && updateInfo?.unidades > 0 && (                                    
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
                value: updateInfo.observaciones,
                onChange: (e) => setUpdateInfo({ ...updateInfo, observaciones: e.target.value }),
                type: 'text',
                maxLength: 200,
              }}
            />
          </GridItem>

          {errorCodigosTrazabilidad && (
            <GridItem xs={12}>
              <SnackbarContent message={errorCodigosTrazabilidad} color='danger' />
            </GridItem>
          )}
        </GridContainer>
      }
    />
  )
}

export default UpdateActivityModal
