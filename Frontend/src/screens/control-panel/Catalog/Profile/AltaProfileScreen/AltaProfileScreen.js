import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { format } from 'date-fns'
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  SnackbarContent,
  Select as Selectable,
  makeStyles,
} from '@material-ui/core'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CustomInput from 'components/CustomInput/CustomInput'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import { registerProfile } from 'redux/actions/profileActions'
import { getDepartaments } from 'redux/actions/departamentActions'
import { getRoles } from 'redux/actions/roleActions'
import { getServices } from 'redux/actions/serviceActions'
import { getSubdirections } from 'redux/actions/subdirectionActions'
import { getUnits } from 'redux/actions/unitActions'
import { PROFILE_REGISTER_RESET } from 'redux/constants/profileConstants'
import styles from './styles/registerProfileScreenStyles'

const useStyles = makeStyles(styles)

const AltaProfileScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [automaticCodProfile, setAutomaticCodProfile] = useState('auto')
  const [codProfileError, setCodProfileError] = useState('')
  const [profileInfo, setProfileInfo] = useState({})
  const [codProfile, setCodProfile] = useState('')
  const [description, setDescription] = useState('')
  const [departament, setDepartament] = useState('')
  const [role, setRole] = useState('')
  const [service, setService] = useState('')
  const [subdirection, setSubdirection] = useState('')
  const [unit, setUnit] = useState('')
  const [alert, setAlert] = useState(null)

  const { loadingProfileRegister, successProfileRegister, errorProfileRegister } = useSelector(
    (state) => state.profileRegister
  )
  const { subdirections, successSubdirectionList } = useSelector((state) => state.subdirectionList)
  const { services, successServiceList } = useSelector((state) => state.serviceList)
  const { departaments, successDepartamentList } = useSelector((state) => state.departamentList)
  const { units, successUnitList } = useSelector((state) => state.unitList)
  const { roles, successRoleList } = useSelector((state) => state.roleList)

  useEffect(() => {
    dispatch(getSubdirections())
    dispatch(getServices())
    dispatch(getDepartaments())
    dispatch(getUnits())
    dispatch(getRoles())
  }, [dispatch])
  useEffect(() => {
    if (automaticCodProfile === 'auto') {
      setCodProfile(buildCodProfile())
    }
  }, [subdirection, service, departament, unit, role])

  useEffect(() => {
    if (successProfileRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Perfil guardado correctamente
        </SweetAlert>
      )
    }
  }, [successProfileRegister])

  const buildCodProfile = () => {
    let codigoPerfil = `${subdirection ? subdirection : ''}${service && subdirection ? '-' + service : service}${
      departament && (subdirection || service) ? '-' + departament : departament
    }${unit && (subdirection || service || departament) ? '-' + unit : unit}${
      role && (subdirection || service || departament || unit) ? '-' + role : role
    }`
    return codigoPerfil
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!codProfile) {
      return setCodProfileError('Por favor ingrese un Cod Perfil')
    }
    dispatch(
      registerProfile({
        ...profileInfo,
        codProfile,
        description,
        registerDate: format(new Date(), 'yyyy-MM-dd'),
      })
    )
  }
  const confirmSuccess = () => {
    setAlert(null)
    setAutomaticCodProfile('auto')
    setCodProfile('')
    setDescription('')
    setSubdirection('')
    setService('')
    setDepartament('')
    setUnit('')
    setRole('')
    setProfileInfo({})
    setCodProfileError('')
    dispatch({ type: PROFILE_REGISTER_RESET })
  }

  return (
    <>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <GridContainer>
              <GridItem xs={12} md={6}>
                <GridContainer>
                  <GridItem xs={12}>
                    <FormControl component='fieldset'>
                      <RadioGroup
                        name='radio-buttons-group'
                        onChange={(e) => {
                          if (e.target.value === 'manual') {
                            setCodProfile('')
                          }
                          if (e.target.value === 'auto') {
                            setCodProfile(buildCodProfile())
                          }
                          setAutomaticCodProfile(e.target.value)
                        }}
                        value={automaticCodProfile}
                      >
                        <FormControlLabel value='manual' control={<Radio />} label='Codigo de Perfil Manual' />
                        <FormControlLabel value='auto' control={<Radio />} label='Codigo de Perfil Automatico' />
                      </RadioGroup>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText={'COD. PERFIL'}
                      id='codeprofile'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: codProfile,
                        onChange: (e) => setCodProfile(e.target.value),
                        type: 'text',
                        disabled: automaticCodProfile === 'auto',
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText={'Descripción'}
                      id='description'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: description,
                        onChange: (e) => setDescription(e.target.value),
                        type: 'text',
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} md={6}>
                <GridContainer>
                  <GridItem xs={12}>
                    <InputLabel htmlFor='profile-update-type' className={classes.selectLabel}>
                      Subdirección
                    </InputLabel>
                    <Selectable
                      className={classes.select}
                      value={subdirection}
                      onChange={(e) => setSubdirection(e.target.value)}
                      inputProps={{
                        name: 'profile-update-type',
                        id: 'profile-update-type',
                      }}
                    >
                      <MenuItem disabled>Selecciona una Opción</MenuItem>
                      {successSubdirectionList &&
                        subdirections.map((subdirection, index) => (
                          <MenuItem
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                            value={subdirection.codigo_subdireccion}
                            key={index}
                            onClick={() => setProfileInfo({ ...profileInfo, subdirection })}
                          >
                            {subdirection.descripcion_subdireccion}
                          </MenuItem>
                        ))}
                    </Selectable>
                  </GridItem>
                  <GridItem xs={12}>
                    <InputLabel htmlFor='profile-update-type' className={classes.selectLabel}>
                      Servicio
                    </InputLabel>
                    <Selectable
                      className={classes.select}
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      inputProps={{
                        name: 'profile-update-type',
                        id: 'profile-update-type',
                      }}
                    >
                      <MenuItem disabled>Selecciona una Opción</MenuItem>
                      {successServiceList &&
                        services.map((service, index) => (
                          <MenuItem
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                            value={service.codigo_servicio}
                            key={index}
                            onClick={() => setProfileInfo({ ...profileInfo, service })}
                          >
                            {service.descripcion_servicio}
                          </MenuItem>
                        ))}
                    </Selectable>
                  </GridItem>
                  <GridItem xs={12}>
                    <InputLabel htmlFor='profile-update-type' className={classes.selectLabel}>
                      Departamento
                    </InputLabel>
                    <Selectable
                      className={classes.select}
                      value={departament}
                      onChange={(e) => setDepartament(e.target.value)}
                      inputProps={{
                        name: 'profile-update-type',
                        id: 'profile-update-type',
                      }}
                    >
                      <MenuItem disabled>Selecciona una Opción</MenuItem>
                      {successDepartamentList &&
                        departaments.map((departament, index) => (
                          <MenuItem
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                            value={departament.codigo_departamento}
                            key={index}
                            onClick={() => setProfileInfo({ ...profileInfo, departament })}
                          >
                            {departament.descripcion_departamento}
                          </MenuItem>
                        ))}
                    </Selectable>
                  </GridItem>
                  <GridItem xs={12}>
                    <InputLabel htmlFor='profile-update-type' className={classes.selectLabel}>
                      Unidad
                    </InputLabel>
                    <Selectable
                      className={classes.select}
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      inputProps={{
                        name: 'profile-update-type',
                        id: 'profile-update-type',
                      }}
                    >
                      <MenuItem disabled>Selecciona una Opción</MenuItem>
                      {successUnitList &&
                        units.map((unit, index) => (
                          <MenuItem
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                            value={unit.codigo_unidad}
                            key={index}
                            onClick={() => setProfileInfo({ ...profileInfo, unit })}
                          >
                            {unit.descripcion_unidad}
                          </MenuItem>
                        ))}
                    </Selectable>
                  </GridItem>
                  <GridItem xs={12}>
                    <InputLabel htmlFor='profile-update-type' className={classes.selectLabel}>
                      Rol
                    </InputLabel>
                    <Selectable
                      className={classes.select}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      inputProps={{
                        name: 'profile-update-type',
                        id: 'profile-update-type',
                      }}
                    >
                      <MenuItem disabled>Selecciona una Opción</MenuItem>
                      {successRoleList &&
                        roles.map((role, index) => (
                          <MenuItem
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                            value={role.codigo_rol}
                            key={index}
                            onClick={() => setProfileInfo({ ...profileInfo, role })}
                          >
                            {role.descripcion_rol}
                          </MenuItem>
                        ))}
                    </Selectable>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='submit' color='primary'>
                  {loadingProfileRegister ? 'Guardando...' : 'Registrar Perfil'}
                </Button>
              </GridItem>
              {errorProfileRegister && (
                <GridItem xs={12}>
                  <SnackbarContent message={errorProfileRegister} color='danger' />
                </GridItem>
              )}
              {codProfileError && !codProfile && (
                <GridItem xs={12}>
                  <SnackbarContent message={codProfileError} color='danger' />
                </GridItem>
              )}
            </GridContainer>
          </form>
        </CardBody>
      </Card>
      {alert}
    </>
  )
}

export default AltaProfileScreen
