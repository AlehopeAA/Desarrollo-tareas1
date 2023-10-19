import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardActions } from '@mui/material'
import SweetAlert from 'react-bootstrap-sweetalert'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import Card from 'components/Card/Card'
import Button from 'components/CustomButtons/Button'
import CardBody from 'components/Card/CardBody'
import CustomInput from 'components/CustomInput/CustomInput'
import SpecificTaskSelect from './components/SpecificTaskSelect'
import ObjetiveDificultySelect from 'components/ObjetiveDificultySelect/ObjetiveDificultySelect'
import { registerObjetiveSpecific } from 'redux/actions/objetivesSpecificActions'
import { OBJETIVES_SPECIFIC_REGISTER_RESET } from 'redux/constants/objetivesSpecificConstants'
import { InputLabel, MenuItem, Select as Selectable } from '@material-ui/core'

const ObjetiveSpecificRegisterScreen = () => {
  const dispatch = useDispatch()
  const classes = {}
  const initialState = {
    task: '',
    dificulty: 'MEDIA',
    unit_min: '',
    unit_mid: '',
    unit_max: '',
    entry_min: '',
    entry_mid: '',
    entry_max: '',
    time_min: '',
    time_mid: '',
    time_max: '',
    working_min: '',
    working_mid: '',
    working_max: '',
  }

  const [objetiveSpecific, setObjetiveSpecific] = useState(initialState)
  const [errorTask, setErrorTask] = useState('')
  const [alert, setAlert] = useState(null)
  const [hasDifficulty, toggleHasDifficulty] = useState(false)
  const {
    loadingObjetiveSpecificRegister,
    successObjetiveSpecificRegister,
    errorObjetiveSpecificRegister,
  } = useSelector((state) => state.objetiveSpecificRegister)

  useEffect(() => {
    if (successObjetiveSpecificRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Objetivo guardado correctamente
        </SweetAlert>
      )
    }
  }, [successObjetiveSpecificRegister])

  useEffect(() => {
    if (objetiveSpecific.unit_min || objetiveSpecific.unit_mid || objetiveSpecific.unit_max) {
      setObjetiveSpecific({ ...objetiveSpecific, magnitud_temporal: 'Dia' })
    } else setObjetiveSpecific({ ...objetiveSpecific, magnitud_temporal: '' })
  }, [objetiveSpecific.unit_min, objetiveSpecific.unit_mid, objetiveSpecific.unit_max])

  useEffect(() => {
    return () => dispatch({ type: OBJETIVES_SPECIFIC_REGISTER_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setObjetiveSpecific(initialState)
    setAlert(null)
    setErrorTask('')
    dispatch({ type: OBJETIVES_SPECIFIC_REGISTER_RESET })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!objetiveSpecific.task) {
      return setErrorTask('Debe seleccionar una tarea')
    }
    dispatch(registerObjetiveSpecific(objetiveSpecific))
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={10} style={{ margin: '0 auto' }}>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <GridContainer>
                <GridContainer style={{ margin: '0', marginBottom: '21px' }}>
                  <SpecificTaskSelect
                    toggleHasDifficulty={toggleHasDifficulty}
                    objetiveSpecific={objetiveSpecific}
                    setObjetiveSpecific={setObjetiveSpecific}
                  />
                  <ObjetiveDificultySelect
                    disabled={!hasDifficulty}
                    dificultySelect={objetiveSpecific}
                    setDificultySelect={setObjetiveSpecific}
                  />
                </GridContainer>
                <GridItem xs={12} sm={objetiveSpecific.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades mínimo'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.unit_min,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, unit_min: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={objetiveSpecific.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades Medio'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.unit_mid,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, unit_mid: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={objetiveSpecific.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades Máximo'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.unit_max,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, unit_max: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                {objetiveSpecific.magnitud_temporal && (
                  <GridItem xs={12} sm={3}>
                    <InputLabel>Magnitud temporal</InputLabel>
                    <Selectable
                      value={objetiveSpecific.magnitud_temporal}
                      style={{ width: '100%', height: '44px' }}
                      onChange={(e) => setObjetiveSpecific({ ...objetiveSpecific, magnitud_temporal: e.target.value })}
                      inputProps={{
                        name: 'magnitud_temporal',
                        id: 'magnitud_temporal',
                      }}
                    >
                      {['Dia', 'Semana', 'Mes'].map((time, index) => (
                        <MenuItem
                          classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                          value={time}
                          key={index}
                        >
                          {time}
                        </MenuItem>
                      ))}
                    </Selectable>
                  </GridItem>
                )}                
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'% con respecto a la entrada. Mínimo'}
                    id='percetaje-min'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.entry_min,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, entry_min: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'% con respecto a la entrada. Medio'}
                    id='percetaje-mid'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.entry_mid,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, entry_mid: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'% con respecto a la entrada. Máximo'}
                    id='percetaje-max'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.entry_max,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, entry_max: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'Tiempo (min/ud) mínimo'}
                    id='time-min'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.time_min,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, time_min: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'Tiempo (min/ud) medio'}
                    id='time-mid'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.time_mid,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, time_mid: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'Tiempo (min/ud) máximo'}
                    id='time-max'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.time_max,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, time_max: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'% con respecto a la jornada. Mínimo'}
                    id='minimum-working-day'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.working_min,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, working_min: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'% con respecto a la jornada. Medio'}
                    id='midium-working-day'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.working_mid,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, working_mid: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'% con respecto a la jornada. Máximo'}
                    id='max-working-day'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveSpecific.working_max,
                      onChange: (e) => setObjetiveSpecific({ ...objetiveSpecific, working_max: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            {errorTask && !objetiveSpecific.task && (
              <GridItem xs={12}>
                <SnackbarContent message={errorTask} color='danger' />
              </GridItem>
            )}
            {errorObjetiveSpecificRegister && (
              <GridItem xs={12}>
                <SnackbarContent message={errorObjetiveSpecificRegister} color='danger' />
              </GridItem>
            )}
            <CardActions>
              <Button type='submit' color={successObjetiveSpecificRegister ? 'success' : 'primary'} block>
                {loadingObjetiveSpecificRegister
                  ? 'Registrando Objetivo....'
                  : successObjetiveSpecificRegister
                  ? 'Nuevo Objetivo Registrado'
                  : 'Registrar Nuevo Objetivo'}
              </Button>
            </CardActions>
          </form>
        </Card>
      </GridItem>
      {alert}
    </GridContainer>
  )
}

export default ObjetiveSpecificRegisterScreen
