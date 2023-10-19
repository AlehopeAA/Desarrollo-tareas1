import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { CardActions } from '@mui/material'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import Card from 'components/Card/Card'
import Button from 'components/CustomButtons/Button'
import CardBody from 'components/Card/CardBody'
import CustomInput from 'components/CustomInput/CustomInput'
import GeneralTaskSelect from './components/GeneralTaskSelect'
import ObjetiveDificultySelect from 'components/ObjetiveDificultySelect/ObjetiveDificultySelect'
import { registerObjetiveGeneral } from 'redux/actions/objetivesGeneralsActions'
import { OBJETIVES_GENERAL_REGISTER_RESET } from 'redux/constants/objetivesGeneralsConstants'
import { InputLabel, MenuItem, Select as Selectable } from '@material-ui/core'

const ObjetiveGeneralRegisterScreen = () => {
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

  const [objetiveGeneral, setObjetiveGeneral] = useState(initialState)
  const [errorTask, setErrorTask] = useState('')
  const [alert, setAlert] = useState(null)
  const [hasDifficulty, toggleHasDifficulty] = useState(false)
  const { loadingObjetiveGeneralRegister, successObjetiveGeneralRegister, errorObjetiveGeneralRegister } = useSelector(
    (state) => state.objetiveGeneralRegister
  )

  useEffect(() => {
    if (successObjetiveGeneralRegister) {
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
  }, [successObjetiveGeneralRegister])

  useEffect(() => {
    if (objetiveGeneral.unit_min || objetiveGeneral.unit_mid || objetiveGeneral.unit_max) {
      setObjetiveGeneral({ ...objetiveGeneral, magnitud_temporal: 'Dia' })
    } else setObjetiveGeneral({ ...objetiveGeneral, magnitud_temporal: '' })
  }, [objetiveGeneral.unit_min, objetiveGeneral.unit_mid, objetiveGeneral.unit_max])

  useEffect(() => {
    return () => dispatch({ type: OBJETIVES_GENERAL_REGISTER_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setObjetiveGeneral(initialState)
    setAlert(null)
    setErrorTask('')
    dispatch({ type: OBJETIVES_GENERAL_REGISTER_RESET })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!objetiveGeneral.task) {
      return setErrorTask('Debe seleccionar una tarea')
    }
    dispatch(registerObjetiveGeneral(objetiveGeneral))
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={10} style={{ margin: '0 auto' }}>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <GridContainer>
                <GridContainer style={{ margin: '0', marginBottom: '21px' }}>
                  <GeneralTaskSelect
                    toggleHasDifficulty={toggleHasDifficulty}
                    objetiveGeneral={objetiveGeneral}
                    setObjetiveGeneral={setObjetiveGeneral}
                  />
                  <ObjetiveDificultySelect
                    disabled={!hasDifficulty}
                    dificultySelect={objetiveGeneral}
                    setDificultySelect={setObjetiveGeneral}
                  />
                </GridContainer>
                <GridItem xs={12} sm={objetiveGeneral.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades mínimo'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveGeneral.unit_min,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, unit_min: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={objetiveGeneral.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades Medio'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveGeneral.unit_mid,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, unit_mid: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>                
                <GridItem xs={12} sm={objetiveGeneral.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades Máximo'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveGeneral.unit_max,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, unit_max: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                {objetiveGeneral.magnitud_temporal && (
                  <GridItem xs={12} sm={3}>
                    <InputLabel>Magnitud temporal</InputLabel>
                    <Selectable
                      value={objetiveGeneral.magnitud_temporal}
                      style={{ width: '100%', height: '44px' }}
                      onChange={(e) => setObjetiveGeneral({ ...objetiveGeneral, magnitud_temporal: e.target.value })}
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
                      value: objetiveGeneral.entry_min,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, entry_min: e.target.value }),
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
                      value: objetiveGeneral.entry_mid,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, entry_mid: e.target.value }),
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
                      value: objetiveGeneral.entry_max,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, entry_max: e.target.value }),
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
                      value: objetiveGeneral.time_min,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, time_min: e.target.value }),
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
                      value: objetiveGeneral.time_mid,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, time_mid: e.target.value }),
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
                      value: objetiveGeneral.time_max,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, time_max: e.target.value }),
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
                      value: objetiveGeneral.working_min,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, working_min: e.target.value }),
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
                      value: objetiveGeneral.working_mid,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, working_mid: e.target.value }),
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
                      value: objetiveGeneral.working_max,
                      onChange: (e) => setObjetiveGeneral({ ...objetiveGeneral, working_max: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            {errorTask && !objetiveGeneral.task && (
              <GridItem xs={12}>
                <SnackbarContent message={errorTask} color='danger' />
              </GridItem>
            )}
            {errorObjetiveGeneralRegister && (
              <GridItem xs={12}>
                <SnackbarContent message={errorObjetiveGeneralRegister} color='danger' />
              </GridItem>
            )}
            <CardActions>
              <Button type='submit' color={successObjetiveGeneralRegister ? 'success' : 'primary'} block>
                {loadingObjetiveGeneralRegister
                  ? 'Registrando Objetivo....'
                  : successObjetiveGeneralRegister
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

export default ObjetiveGeneralRegisterScreen
