import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import {
  Dialog,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select as Selectable,
} from '@material-ui/core'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { getSubdirections } from 'redux/actions/subdirectionActions'
import { getServices } from 'redux/actions/serviceActions'
import { getDepartaments } from 'redux/actions/departamentActions'
import { getUnits } from 'redux/actions/unitActions'
import { getRoles } from 'redux/actions/roleActions'
import { profileUpdateInfo, getProfiles } from 'redux/actions/profileActions'
import { PROFILE_UPDATE_RESET } from 'redux/constants/profileConstants'
import styles from '../styles/updateTeamModalStyles'

const useStyles = makeStyles(styles)

const UpdateProfileModal = ({ handleCloseModal, updateProfileModal, showUpdateProfile }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [automaticCodProfile, setAutomaticCodProfile] = useState('manual')
  const [profileInfo, setProfileInfo] = useState(showUpdateProfile)
  const [codProfile, setCodProfile] = useState(profileInfo.codigo_perfil)
  const [codProfileError, setCodProfileError] = useState('')
  const [description, setDescription] = useState(profileInfo.descripcion_perfil)

  const [departament, setDepartament] = useState(profileInfo.codigo_departamento || '')
  const [role, setRole] = useState(profileInfo.codigo_rol || '')
  const [service, setService] = useState(profileInfo.codigo_servicio || '')
  const [subdirection, setSubdirection] = useState(profileInfo.codigo_subdireccion || '')
  const [unit, setUnit] = useState(profileInfo.codigo_unidad || '')

  const [alert, setAlert] = useState(null)
  const { loadingProfileUpdate, errorProfileUpdate, successProfileUpdate } = useSelector((state) => state.profileUpdate)

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
    if (departaments && profileInfo.id_departamento) {
      const departamento = departaments.find((el) => el.id_departamento === profileInfo.id_departamento)
      setDepartament(departamento?.codigo_departamento)
    }
    if (services && profileInfo.id_servicio) {
      const servicio = services.find((el) => el.id_servicio === profileInfo.id_servicio)
      setService(servicio?.codigo_servicio)
    }
    if (subdirections && profileInfo.id_subdireccion) {
      const subdireccion = subdirections.find((el) => el.id_subdireccion === profileInfo.id_subdireccion)
      setSubdirection(subdireccion?.codigo_subdireccion)
    }
    if (roles && profileInfo.id_rol) {
      const rol = roles.find((el) => el.id_rol === profileInfo.id_rol)
      setRole(rol?.codigo_rol)
    }
    if (units && profileInfo.id_unidad) {
      const unidad = units.find((el) => el.id_unidad === profileInfo.id_unidad)
      setUnit(unidad?.codigo_unidad)
    }
  }, [departaments, services, subdirections, roles, units])
  useEffect(() => {
    if (automaticCodProfile === 'auto') {
      setCodProfile(buildCodProfile())
    }
  }, [departament, role, service, subdirection, unit])

  useEffect(() => {
    if (successProfileUpdate) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='HECHO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Perfil actualizado correctamente
        </SweetAlert>
      )
    }
  }, [successProfileUpdate])

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
    const profile = {
      id_perfil: profileInfo.id_perfil,
      codigo_perfil: codProfile,
      descripcion_perfil: description,
      id_departamento: profileInfo.id_departamento,
      id_rol: profileInfo.id_rol,
      id_servicio: profileInfo.id_servicio,
      id_subdireccion: profileInfo.id_subdireccion,
      id_unidad: profileInfo.id_unidad,
    }
    dispatch(profileUpdateInfo(profile))
  }
  const confirmSuccess = () => {
    dispatch(getProfiles())
    dispatch({ type: PROFILE_UPDATE_RESET })
    handleCloseModal()
    setAlert(null)
  }

  return (
    <>
      <Dialog
        open={updateProfileModal}
        keepMounted
        onClose={handleCloseModal}
        aria-labelledby='notice-modal-slide-title'
        aria-describedby='notice-modal-slide-description'
      >
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
                              setCodProfile(profileInfo.codigo_perfil)
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
                          required: true,
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
                          value: description || '',
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
                        renderValue={(selected) => selected}
                        inputProps={{
                          value: profileInfo.descripcion_subdireccion || '',
                          name: 'profile-update-type',
                          id: 'profile-update-type',
                        }}
                      >
                        <MenuItem disabled>Selecciona una Opción</MenuItem>
                        {successSubdirectionList &&
                          subdirections.map((subdirection, index) => (
                            <MenuItem
                              classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                              value={subdirection.descripcion_subdireccion}
                              id={subdirection.codigo_subdireccion}
                              key={index}
                              onClick={() => {
                                setSubdirection(subdirection.codigo_subdireccion)
                                setProfileInfo({
                                  ...profileInfo,
                                  descripcion_subdireccion: subdirection.descripcion_subdireccion,
                                  id_subdireccion: subdirection.id_subdireccion,
                                })
                              }}
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
                        renderValue={(selected) => selected}
                        inputProps={{
                          value: profileInfo.descripcion_servicio || '',
                          name: 'profile-update-type',
                          id: 'profile-update-type',
                        }}
                      >
                        <MenuItem disabled>Selecciona una Opción</MenuItem>
                        {successServiceList &&
                          services.map((service, index) => (
                            <MenuItem
                              classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                              value={service.descripcion_servicio}
                              key={index}
                              onClick={() => {
                                setService(service.codigo_servicio)
                                setProfileInfo({
                                  ...profileInfo,
                                  descripcion_servicio: service.descripcion_servicio,
                                  id_servicio: service.id_servicio,
                                })
                              }}
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
                        renderValue={(selected) => selected}
                        inputProps={{
                          value: profileInfo.descripcion_departamento || '',
                          name: 'profile-update-type',
                          id: 'profile-update-type',
                        }}
                      >
                        <MenuItem disabled>Selecciona una Opción</MenuItem>
                        {successDepartamentList &&
                          departaments.map((departament, index) => (
                            <MenuItem
                              classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                              value={departament.descripcion_departamento}
                              key={index}
                              onClick={() => {
                                setDepartament(departament.codigo_departamento)
                                setProfileInfo({
                                  ...profileInfo,
                                  descripcion_departamento: departament.descripcion_departamento,
                                  id_departamento: departament.id_departamento,
                                })
                              }}
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
                        renderValue={(selected) => selected}
                        inputProps={{
                          value: profileInfo.descripcion_unidad || '',
                          name: 'profile-update-type',
                          id: 'profile-update-type',
                        }}
                      >
                        <MenuItem disabled>Selecciona una Opción</MenuItem>
                        {successUnitList &&
                          units.map((unit, index) => (
                            <MenuItem
                              classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                              value={unit.descripcion_unidad || ''}
                              key={index}
                              onClick={() => {
                                setUnit(unit.codigo_unidad)
                                setProfileInfo({
                                  ...profileInfo,
                                  descripcion_unit: unit.descripcion_unidad,
                                  id_unidad: unit.id_unidad,
                                })
                              }}
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
                        renderValue={(selected) => selected}
                        inputProps={{
                          value: profileInfo.descripcion_rol || '',
                          name: 'profile-update-type',
                          id: 'profile-update-type',
                        }}
                      >
                        <MenuItem disabled>Selecciona una Opción</MenuItem>
                        {successRoleList &&
                          roles.map((role, index) => (
                            <MenuItem
                              classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                              value={role.descripcion_rol}
                              key={index}
                              onClick={(e) => {
                                setRole(role.codigo_rol)
                                setProfileInfo({
                                  ...profileInfo,
                                  descripcion_rol: role.descripcion_rol,
                                  id_rol: role.id_rol,
                                })
                              }}
                            >
                              {role.descripcion_rol}
                            </MenuItem>
                          ))}
                      </Selectable>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'space-around' }}>
                  <Button color='secondary' onClick={handleCloseModal}>
                    Cerrar
                  </Button>
                  <Button type='submit' color='primary'>
                    {loadingProfileUpdate ? 'Actualizando...' : 'Actualizar Perfil'}
                  </Button>
                </GridItem>
                {errorProfileUpdate && (
                  <GridItem xs={12}>
                    <SnackbarContent message={errorProfileUpdate} color='danger' />
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
      </Dialog>
      {alert}
    </>
  )
}

export default UpdateProfileModal
