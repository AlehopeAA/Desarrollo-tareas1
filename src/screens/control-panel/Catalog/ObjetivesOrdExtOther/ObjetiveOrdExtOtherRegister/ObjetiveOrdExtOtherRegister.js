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
import OrdExtOtherTaskSelect from './components/OrdExtOtherTaskSelect'
import ObjetiveDificultySelect from 'components/ObjetiveDificultySelect/ObjetiveDificultySelect'
import { registerObjetiveOrdExtOther } from 'redux/actions/objetivesOrdExtOtherAction'
import { OBJETIVES_ORD_EXT_OTHER_REGISTER_RESET } from 'redux/constants/objetivesOrdExtOtherConstants'
import { InputLabel, MenuItem, Select as Selectable } from '@material-ui/core'

const ObjetiveOrdExtOtherRegisterScreen = () => {
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

  const [objetiveOrdExtOther, setObjetiveOrdExtOther] = useState(initialState)
  const [errorTask, setErrorTask] = useState('')
  const [alert, setAlert] = useState(null)
  const [hasDifficulty, toggleHasDifficulty] = useState(false)
  const {
    loadingObjetiveOrdExtOtherRegister,
    successObjetiveOrdExtOtherRegister,
    errorObjetiveOrdExtOtherRegister,
  } = useSelector((state) => state.objetiveOrdExtOtherRegister)

  useEffect(() => {
    if (successObjetiveOrdExtOtherRegister) {
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
  }, [successObjetiveOrdExtOtherRegister])

  useEffect(() => {
    if (objetiveOrdExtOther.unit_min || objetiveOrdExtOther.unit_mid || objetiveOrdExtOther.unit_max) {
      setObjetiveOrdExtOther({ ...objetiveOrdExtOther, magnitud_temporal: 'Dia' })
    } else setObjetiveOrdExtOther({ ...objetiveOrdExtOther, magnitud_temporal: '' })
  }, [objetiveOrdExtOther.unit_min, objetiveOrdExtOther.unit_mid, objetiveOrdExtOther.unit_max])

  useEffect(() => {
    return () => dispatch({ type: OBJETIVES_ORD_EXT_OTHER_REGISTER_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setObjetiveOrdExtOther(initialState)
    setAlert(null)
    setErrorTask('')
    dispatch({ type: OBJETIVES_ORD_EXT_OTHER_REGISTER_RESET })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!objetiveOrdExtOther.task) {
      return setErrorTask('Debe seleccionar una tarea')
    }
    dispatch(registerObjetiveOrdExtOther(objetiveOrdExtOther))
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={10} style={{ margin: '0 auto' }}>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <GridContainer>
                <GridContainer style={{ margin: '0', marginBottom: '21px' }}>
                  <OrdExtOtherTaskSelect
                    toggleHasDifficulty={toggleHasDifficulty}
                    objetiveOrdExtOther={objetiveOrdExtOther}
                    setObjetiveOrdExtOther={setObjetiveOrdExtOther}
                  />
                  <ObjetiveDificultySelect
                    disabled={!hasDifficulty}
                    dificultySelect={objetiveOrdExtOther}
                    setDificultySelect={setObjetiveOrdExtOther}
                  />
                </GridContainer>
                <GridItem xs={12} sm={objetiveOrdExtOther.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades mínimo'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveOrdExtOther.unit_min,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, unit_min: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={objetiveOrdExtOther.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades Medio'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveOrdExtOther.unit_mid,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, unit_mid: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={objetiveOrdExtOther.magnitud_temporal ? 3 : 4}>
                  <CustomInput
                    labelText={'Unidades Máximo'}
                    id='min-unit'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: objetiveOrdExtOther.unit_max,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, unit_max: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
                {objetiveOrdExtOther.magnitud_temporal && (
                  <GridItem xs={12} sm={3}>
                    <InputLabel>Magnitud temporal</InputLabel>
                    <Selectable
                      value={objetiveOrdExtOther.magnitud_temporal}
                      style={{ width: '100%', height: '44px' }}
                      onChange={(e) =>
                        setObjetiveOrdExtOther({ ...objetiveOrdExtOther, magnitud_temporal: e.target.value })
                      }
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
                      value: objetiveOrdExtOther.entry_min,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, entry_min: e.target.value }),
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
                      value: objetiveOrdExtOther.entry_mid,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, entry_mid: e.target.value }),
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
                      value: objetiveOrdExtOther.entry_max,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, entry_max: e.target.value }),
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
                      value: objetiveOrdExtOther.time_min,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, time_min: e.target.value }),
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
                      value: objetiveOrdExtOther.time_mid,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, time_mid: e.target.value }),
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
                      value: objetiveOrdExtOther.time_max,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, time_max: e.target.value }),
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
                      value: objetiveOrdExtOther.working_min,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, working_min: e.target.value }),
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
                      value: objetiveOrdExtOther.working_mid,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, working_mid: e.target.value }),
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
                      value: objetiveOrdExtOther.working_max,
                      onChange: (e) => setObjetiveOrdExtOther({ ...objetiveOrdExtOther, working_max: e.target.value }),
                      type: 'number',
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            {errorTask && !objetiveOrdExtOther.task && (
              <GridItem xs={12}>
                <SnackbarContent message={errorTask} color='danger' />
              </GridItem>
            )}
            {errorObjetiveOrdExtOtherRegister && (
              <GridItem xs={12}>
                <SnackbarContent message={errorObjetiveOrdExtOtherRegister} color='danger' />
              </GridItem>
            )}
            <CardActions>
              <Button type='submit' color={successObjetiveOrdExtOtherRegister ? 'success' : 'primary'} block>
                {loadingObjetiveOrdExtOtherRegister
                  ? 'Registrando Objetivo....'
                  : successObjetiveOrdExtOtherRegister
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

export default ObjetiveOrdExtOtherRegisterScreen
