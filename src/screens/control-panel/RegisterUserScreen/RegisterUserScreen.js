import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import SweetAlert from 'react-bootstrap-sweetalert'
import {
  makeStyles,
  Select as Selectable,
  FormControl,
  InputLabel,
  MenuItem,
  ListItemText,
  Checkbox,
  Typography,
} from '@material-ui/core'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CustomInput from 'components/CustomInput/CustomInput'
import Button from 'components/CustomButtons/Button'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import ResponsibleMultiSelect from './components/ResponsibleMultiSelect'
import ValidatorsMultiSelect from './components/ValidatorsMultiSelect'
import ProfileMultiSelect from './components/ProfileMultiSelect'
import { registerUser } from 'redux/actions/userActions'
import { USER_REGISTER_RESET } from 'redux/constants/userConstants'
import { UI_MULTI_TASK_RESET } from 'redux/constants/uiMultiTaskConstant'
import { PROFILE_LIST_RESET } from 'redux/constants/profileConstants'
import { USER_VALIDATORS_LIST_RESET } from 'redux/constants/userConstants'
import { USER_RESPONSIBLES_LIST_RESET } from 'redux/constants/userConstants'
import styles from './styles/registerUserScreenStyle'

const useStyles = makeStyles(styles)

const RegisterUserScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const initialState = {
    cod_ayre: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    jornada_laboral: '',
    denominacion_puesto: '',
    codigo_puesto: '',
    activo: 'SI',
    ver_objetivos: 'NO',
  }
  const [selectInput, setInput] = useState(false)
  const [userData, setUserData] = useState(initialState)
  const [responsibles, setResponsibles] = useState([])
  const [validators, setValidators] = useState([])
  const [profilesData, setProfilesData] = useState([])
  const [profilesDataError, setProfileError] = useState('')
  const [alert, setAlert] = useState(null)

  const { loadingUserRegister, successUserRegister, errorUserRegister } = useSelector((state) => state.userRegister)
  
  useEffect(() => {
    if (successUserRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Puesto de Trabajo Registrado Correctamente
        </SweetAlert>
      )
    }
  }, [successUserRegister])

  useEffect(() => {
    return () => {
      dispatch({ type: USER_VALIDATORS_LIST_RESET })
      dispatch({ type: USER_RESPONSIBLES_LIST_RESET })
      dispatch({ type: USER_REGISTER_RESET })
      dispatch({ type: PROFILE_LIST_RESET })
      setProfileError('')
    }
  }, [dispatch])

  const hideAlert = () => {
    setAlert(null)
  }

  const confirmSuccess = () => {
    dispatch({ type: USER_REGISTER_RESET })
    dispatch({ type: PROFILE_LIST_RESET })
    dispatch({ type: USER_VALIDATORS_LIST_RESET })
    dispatch({ type: USER_RESPONSIBLES_LIST_RESET })
    dispatch({ type: UI_MULTI_TASK_RESET })
    setProfilesData([])
    setValidators([])
    setResponsibles([])
    setAlert(null)
    setProfileError('')
    setUserData(initialState)
  }

  const registerUserHandler = (e) => {
    e.preventDefault()
    if (!profilesData.length > 0) {
      return setProfileError('El puesto de trabajo debe tener al menos un perfil')
    }
    const dataToSend = {
      ...userData,
      responsibles,
      profilesData,
      validators,
    }
    dispatch(registerUser({ ...dataToSend, fecha_alta: format(new Date(), 'yyyy-MM-dd') }))
  }
  const handleSelectChange = (e) => {
    const {
      target: { value, name },
    } = e
    value === 'Otro' ? setInput(true) : setInput(false)
    setUserData({ ...userData, [name]: value })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={10} style={{ margin: '0 auto' }}>
        <Card>
          <CardBody>
            <form onSubmit={registerUserHandler}>
              <GridContainer>
                <GridItem xs={12} md={6}>
                  <CustomInput
                    labelText={'Código Ayre *'}
                    id='cod'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userData.cod_ayre,
                      onChange: (e) => setUserData({ ...userData, cod_ayre: e.target.value }),
                      type: 'text',
                      required: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} md={6}>
                  <CustomInput
                    labelText={'Código de Puesto *'}
                    id='cod-position'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userData.codigo_puesto,
                      onChange: (e) => setUserData({ ...userData, codigo_puesto: e.target.value }),
                      type: 'text',
                      maxLength: 8,
                      required: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} md={6}>
                  <CustomInput
                    labelText={'Nombre *'}
                    id='user-name'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userData.nombre,
                      onChange: (e) => setUserData({ ...userData, nombre: e.target.value }),
                      type: 'text',
                      required: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} md={6}>
                  <CustomInput
                    labelText={'Primer apellido *'}
                    id='lastname1'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userData.apellido1,
                      onChange: (e) => setUserData({ ...userData, apellido1: e.target.value }),
                      type: 'text',
                      required: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} md={6}>
                  <CustomInput
                    labelText={'Segundo apellido'}
                    id='lastname2'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userData.apellido2,
                      onChange: (e) => setUserData({ ...userData, apellido2: e.target.value }),
                      type: 'text',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} md={selectInput ? 4 : 6}>
                  <FormControl className={classes.selectForm} fullWidth>
                    <InputLabel id='modalidad'>Jornada laboral</InputLabel>
                    <Selectable
                      className={classes.select}
                      value={selectInput ? 'Otro' : userData.jornada_laboral}
                      onChange={(e) => handleSelectChange(e)}
                      name='jornada_laboral'
                      required='true'
                    >
                      {['35', '37.5', 'Otro'].map((modalidad, index) => (
                        <MenuItem key={index} value={modalidad}>
                          <ListItemText primary={modalidad} />
                        </MenuItem>
                      ))}
                    </Selectable>
                  </FormControl>
                </GridItem>
                {selectInput && (
                  <GridItem xs={12} md={2}>
                    <CustomInput
                      id='jornada_laboral'
                      labelText={'Ingrese horas'}
                      className={classes.selectInput}
                      inputProps={{
                        onChange: (e) => setUserData({ ...userData, jornada_laboral: e.target.value }),
                        type: 'number',
                        required: true,
                      }}
                    />
                  </GridItem>
                )}
                <GridItem xs={12}>
                  <CustomInput
                    labelText={'Denominacion del Puesto'}
                    id='denominacion_puesto'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userData.denominacion_puesto,
                      onChange: (e) => setUserData({ ...userData, denominacion_puesto: e.target.value }),
                      type: 'text',
                    }}
                  />
                </GridItem>
                <GridItem style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} xs={10} md={10}>
                  {' '}
                  <Typography variant='subtitle2'> Puede ver sus objetivos</Typography>{' '}
                  <Checkbox
                    checked={userData.ver_objetivos === 'SI'}
                    onChange={(e) =>
                      setUserData({ ...userData, ver_objetivos: userData.ver_objetivos === 'SI' ? 'NO' : 'SI' })
                    }
                  />
                </GridItem>
                <hr style={{ marginTop: '55px' }} />
                <ProfileMultiSelect profilesData={profilesData} setProfilesData={setProfilesData} />
                <ResponsibleMultiSelect responsibles={responsibles} setResponsibles={setResponsibles} />
                <ValidatorsMultiSelect validators={validators} setValidators={setValidators} />
              </GridContainer>
              {errorUserRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorUserRegister} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
              {profilesDataError && !profilesData.length > 0 && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={profilesDataError} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
              <GridItem xs={12} className={classes.registerButton}>
                <Button type='submit' color='primary'>
                  {loadingUserRegister ? 'Creando Puesto de Trabajo...' : 'Registrar  Puesto de Trabajo'}
                </Button>
              </GridItem>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      {alert}
    </GridContainer>
  )
}

export default RegisterUserScreen
