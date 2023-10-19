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
import ObjetiveDificultySelect from 'components/ObjetiveDificultySelect/ObjetiveDificultySelect'
import CustomInput from 'components/CustomInput/CustomInput'
import TasksAbsencesSelect from './components/TasksAbsencesSelect'
import { registerObjetiveAbsence } from 'redux/actions/objetivesAbsencesActions'
import { OBJETIVES_ABSENCES_REGISTER_RESET } from 'redux/constants/objetivesAbsenceConstants'
import { InputLabel, MenuItem, Select as Selectable } from '@material-ui/core'

const ObjetiveAbsenceRegister = () => {
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

  const [objetiveAbsence, setObjetiveAbsence] = useState(initialState)
  const [errorTask, setErrorTask] = useState('')
  const [alert, setAlert] = useState(null)
  const [hasDifficulty, toggleHasDifficulty] = useState(false)
  const { loadingObjetiveAbsenceRegister, successObjetiveAbsenceRegister, errorObjetiveAbsenceRegister } = useSelector(
    (state) => state.objetiveAbsenceRegister
  )

  useEffect(() => {
    if (successObjetiveAbsenceRegister) {
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
  }, [successObjetiveAbsenceRegister])

  useEffect(() => {
    if (objetiveAbsence.unit_min || objetiveAbsence.unit_mid || objetiveAbsence.unit_max) {
      setObjetiveAbsence({ ...objetiveAbsence, magnitud_temporal: 'Dia' })
    } else setObjetiveAbsence({ ...objetiveAbsence, magnitud_temporal: '' })
  }, [objetiveAbsence.unit_min, objetiveAbsence.unit_mid, objetiveAbsence.unit_max])

  useEffect(() => {
    return () => dispatch({ type: OBJETIVES_ABSENCES_REGISTER_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setObjetiveAbsence(initialState)
    setAlert(null)
    setErrorTask('')
    dispatch({ type: OBJETIVES_ABSENCES_REGISTER_RESET })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!objetiveAbsence.task) {
      return setErrorTask('Debe seleccionar una tarea')
    }
    dispatch(registerObjetiveAbsence(objetiveAbsence))
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={10} style={{ margin: '0 auto' }}>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <GridContainer>
                <GridContainer style={{ margin: '0', marginBottom: '21px' }}>
                  <TasksAbsencesSelect
                    toggleHasDifficulty={toggleHasDifficulty}
                    objetiveAbsence={objetiveAbsence}
                    setObjetiveAbsence={setObjetiveAbsence}
                  />
                  <ObjetiveDificultySelect
                    disabled={!hasDifficulty}
                    dificultySelect={objetiveAbsence}
                    setDificultySelect={setObjetiveAbsence}
                  />
                </GridContainer>
                <GridItem xs={12} sm={objetiveAbsence.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades mínimo'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveAbsence.unit_min,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, unit_min: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={objetiveAbsence.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades Medio'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveAbsence.unit_mid,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, unit_mid: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>                
                <GridItem xs={12} sm={objetiveAbsence.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades Máximo'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveAbsence.unit_max,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, unit_max: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                {objetiveAbsence.magnitud_temporal && (
                  <GridItem xs={12} sm={3}>
                    <InputLabel>Magnitud temporal</InputLabel>
                    <Selectable
                      value={objetiveAbsence.magnitud_temporal}
                      style={{ width: '100%', height: '44px' }}
                      onChange={(e) => setObjetiveAbsence({ ...objetiveAbsence, magnitud_temporal: e.target.value })}
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
                      value: objetiveAbsence.entry_min,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, entry_min: e.target.value }),
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
                      value: objetiveAbsence.entry_mid,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, entry_mid: e.target.value }),
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
                      value: objetiveAbsence.entry_max,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, entry_max: e.target.value }),
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
                      value: objetiveAbsence.time_min,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, time_min: e.target.value }),
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
                      value: objetiveAbsence.time_mid,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, time_mid: e.target.value }),
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
                      value: objetiveAbsence.time_max,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, time_max: e.target.value }),
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
                      value: objetiveAbsence.working_min,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, working_min: e.target.value }),
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
                      value: objetiveAbsence.working_mid,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, working_mid: e.target.value }),
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
                      value: objetiveAbsence.working_max,
                      onChange: (e) => setObjetiveAbsence({ ...objetiveAbsence, working_max: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            {errorTask && !objetiveAbsence.task && (
              <GridItem xs={12}>
                <SnackbarContent message={errorTask} color='danger' />
              </GridItem>
            )}
            {errorObjetiveAbsenceRegister && (
              <GridItem xs={12}>
                <SnackbarContent message={errorObjetiveAbsenceRegister} color='danger' />
              </GridItem>
            )}
            <CardActions>
              <Button type='submit' color={successObjetiveAbsenceRegister ? 'success' : 'primary'} block>
                {loadingObjetiveAbsenceRegister
                  ? 'Registrando Objetivo....'
                  : successObjetiveAbsenceRegister
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

export default ObjetiveAbsenceRegister
