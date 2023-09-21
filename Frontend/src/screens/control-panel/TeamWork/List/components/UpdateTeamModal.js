import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Select as Selectable,
  FormControl,
  InputLabel,
  MenuItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import Clearfix from 'components/Clearfix/Clearfix'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import ResponsibleMultiSelect from './ResponsibleMultiSelect'
import ValidatorsMultiSelect from './ValidatorsMultiSelect'
import ProfileMultiSelect from './ProfileMultiSelect'
import { USER_DETAILS_RESET } from 'redux/constants/userConstants'
import { getUserById } from 'redux/actions/userActions'
import { teamWorkUpdateInfo } from 'redux/actions/teamWorkActions'
import { TEAM_WORK_UPDATE_RESET } from 'redux/constants/teamWorkConstants'
import styles from '../styles/updateTeamModalStyles'
import { TEAM_WORK_LIST_RESET } from 'redux/constants/teamWorkConstants'
import { PROFILE_LIST_RESET } from 'redux/constants/profileConstants'
import { USER_VALIDATORS_LIST_RESET } from 'redux/constants/userConstants'
import { USER_RESPONSIBLES_LIST_RESET } from 'redux/constants/userConstants'

const useStyles = makeStyles(styles)

const UpdateTeamModal = ({ handleCloseModal, updateTeamModal, showUpdateTeam, alert }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [selectInput, setInput] = useState(false)
  const [user, setUser] = useState({})
  const [profilesData, setProfilesData] = useState([])
  const [profilesDataError, setProfileError] = useState('')
  const [validators, setValidators] = useState([])
  const [responsibles, setResponsibles] = useState([])
  const { loadingUserDetails, userDetailData } = useSelector((state) => state.userDetails)
  const { loadingTeamWorkUpdate, successTeamWorkUpdate, errorTeamWorkUpdate } = useSelector(
    (state) => state.teamWorkUpdate
  )

 

  const [mensajeAlertaActiviadesCompartidasBorradas, setMensajeAlertaActiviadesCompartidasBorradas] = useState('')
  const [mensajeAlertaActiviadesCompartidasNuevas, setMensajeAlertaActiviadesCompartidasNuevas] = useState('')

  const [codigosPerfilIniciales , setCodigosPerfilIniciales] = useState([])

  const [tareasCompartidasEliminadasBool, setTareasCompartidasEliminadasBool] = useState(false)
  const [tareasCompartidasAñadidasBool, setTareasCompartidasAñadidasBool] = useState(false)


  // const [result, setResult] = useState([])

  useEffect(() => {
    dispatch(getUserById(showUpdateTeam.id_puesto))
  }, [])

  useEffect(() => {
    if (userDetailData) {
      setUser(userDetailData.user)
      setProfilesData(userDetailData.perfiles)
      setResponsibles(userDetailData.responsables)
      setValidators(userDetailData.validadores)
      
      const perfilesTareasCompartidas = userDetailData.perfiles.filter(profile => profile.count_tareas_compartidas > 0 )
      const codigosPerfil = perfilesTareasCompartidas.map(profile => profile.codigo_perfil)

      setCodigosPerfilIniciales(codigosPerfil)
      console.log("Códigos perfil con tareas compartidas inicialmente : \n" + codigosPerfil)
    }
  }, [userDetailData])

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET })
    }
  }, [dispatch])

  useEffect(() => {
    if (successTeamWorkUpdate) {
      handleCloseModal()
      alert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Guardado!'
          onConfirm={() => hideAlert()}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          El puesto de trabajo se ha editado correctamente
        </SweetAlert>
      )
      dispatch({ type: TEAM_WORK_UPDATE_RESET })
      dispatch({ type: TEAM_WORK_LIST_RESET })
      dispatch({ type: PROFILE_LIST_RESET })
      dispatch({ type: USER_VALIDATORS_LIST_RESET })
      dispatch({ type: USER_RESPONSIBLES_LIST_RESET })
    }
  }, [successTeamWorkUpdate])

  const hideAlert = () => {
    alert(null)
    if(tareasCompartidasEliminadasBool){
      alert(
        <SweetAlert
          info
          style={{ display: 'block', marginTop: '-100px' }}
          title='Aviso!'
          onConfirm={() => alert(null)}        
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
        {mensajeAlertaActiviadesCompartidasBorradas}
        </SweetAlert>
      )
    }if(tareasCompartidasAñadidasBool){
      alert(
        <SweetAlert
          info
          style={{ display: 'block', marginTop: '-100px' }}
          title='Aviso!'
          onConfirm={() => alert(null)}        
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
        {mensajeAlertaActiviadesCompartidasNuevas}
        </SweetAlert>
      )
    }
  }

  const updateTeamHandler = (e) => {
    e.preventDefault()
    if (!profilesData.length > 0) {
      return setProfileError('El puesto de trabajo debe tener al menos un perfil')
    }
    const data = {
      ...user,
      profilesData,
      responsibles,
      validators,
    }
    console.log(JSON.stringify(profilesData))
    const codigosPerfilTareaCompartidaEliminada = codigosPerfilIniciales.filter(codigo => !profilesData.some(profile => profile.codigo_perfil === codigo))
    
    const newSharedTaskProfiles = profilesData.filter(profile => profile.count_tareas_compartidas > 0 && !codigosPerfilIniciales.includes(profile.codigo_perfil))  
    const newSharedTaskProfileCodes = newSharedTaskProfiles.map(profile => profile.codigo_perfil)

    console.log(newSharedTaskProfileCodes)
    console.log(' nuevas : '  + JSON.stringify(newSharedTaskProfileCodes))
    // setResult(codigosPerfilTareaCompartidaEliminada)

    var messageTareasCompartidasEliminadas = "";
    var perfilesTareasCompartidasEliminadas = ""
    
    var messageTareasCompartidasNuevas = "";
    var perfilesTareasCompartidasNuevas = ""

    if(codigosPerfilTareaCompartidaEliminada.length > 0){
      codigosPerfilTareaCompartidaEliminada.forEach((profile)=>
      {
        perfilesTareasCompartidasEliminadas += ` ${profile},`
      });
    }
    messageTareasCompartidasEliminadas = `El perfil${perfilesTareasCompartidasEliminadas} del trabajador modificado incluía alguna tarea compartida,
     por favor revise el reparto de % de responsabilidad de sus trabajadores, considerando a este nuevo trabajador.` 
    console.log(messageTareasCompartidasEliminadas)
    setMensajeAlertaActiviadesCompartidasBorradas(messageTareasCompartidasEliminadas)

    if(newSharedTaskProfileCodes.length > 0){
      newSharedTaskProfileCodes.forEach((profile) =>{
        perfilesTareasCompartidasNuevas += ` ${profile},`
      })
    }

    messageTareasCompartidasNuevas = `Algunas tareas del perfil${perfilesTareasCompartidasNuevas} es una tarea compartida por favor revise el reparto de % de responsabilidad
    de sus trabajadores, considerando a este trabajador.\n`
    console.log(messageTareasCompartidasNuevas)
    setMensajeAlertaActiviadesCompartidasNuevas(messageTareasCompartidasNuevas)

    if(perfilesTareasCompartidasEliminadas === ''){
      setTareasCompartidasEliminadasBool(false)
    }else {
      setTareasCompartidasEliminadasBool(true)
    }

    if(perfilesTareasCompartidasNuevas === ''){
      setTareasCompartidasAñadidasBool(false)
    }else {
      setTareasCompartidasAñadidasBool(true)
    }
    
    dispatch(teamWorkUpdateInfo(data))
  }

  const handleSelectChange = (e) => {
    const {
      target: { value, name },
    } = e
    value === 'Otro' ? setInput(true) : setInput(false)
    setUser({ ...user, [name]: value })
  }

  return (
    <Dialog
      open={updateTeamModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateTeamHandler} autoComplete='false'>
        <DialogTitle id='notice-modal-slide-title' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={handleCloseModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>{`Editar Puesto de Trabajo`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          {loadingUserDetails ? (
            <>Cargando Puesto de Trabajo</>
          ) : (
            userDetailData && (
              <>
                <GridItem xs={12}>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        labelText={'Código Ayre *'}
                        id='codayre'
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: user?.cod_ayre || '',
                          onChange: (e) => setUser({ ...user, cod_ayre: e.target.value }),
                          type: 'text',
                          required: true,
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        labelText={'Código de puesto *'}
                        id='jobcode'
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: user?.codigo_puesto || '',
                          onChange: (e) => setUser({ ...user, codigo_puesto: e.target.value }),
                          type: 'number',
                          maxLength: 8,
                          required: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        labelText='Denominación del Puesto'
                        id='denominacion'
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: user?.denominacion_puesto || '',
                          onChange: (e) => setUser({ ...user, denominacion_puesto: e.target.value }),
                          type: 'text',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        labelText='Nombre *'
                        id='name'
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: user?.nombre || '',
                          onChange: (e) => setUser({ ...user, nombre: e.target.value }),
                          type: 'text',
                          required: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        labelText='Primer apellido *'
                        id='last-name1'
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: user?.apellido1 || '',
                          onChange: (e) => setUser({ ...user, apellido1: e.target.value }),
                          type: 'text',
                          required: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        labelText='Segundo apellido'
                        id='last-name2'
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: user?.apellido2 || '',
                          onChange: (e) => setUser({ ...user, apellido2: e.target.value }),
                          type: 'text',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} md={selectInput ? 4 : 6}>
                      <FormControl className={classes.selectForm} fullWidth>
                        <InputLabel id='modalidad'>Jornada laboral</InputLabel>
                        <Selectable
                          className={classes.select}
                          value={user?.jornada_laboral || ''}
                          onChange={(e) => handleSelectChange(e)}
                          name='jornada_laboral'
                          required='true'
                        >
                          {['35', '37.5', 'Otro'].map((modalidad, index) => (
                            <MenuItem key={index} value={modalidad}>
                              <ListItemText primary={modalidad} selected={modalidad === user.jornada_laboral} />                              
                            </MenuItem>
                          ))}
                        </Selectable>
                      </FormControl>
                    </GridItem>
                    {selectInput && (
                      <GridItem xs={12} md={2}>
                        <CustomInput
                          id='workday'
                          labelText={'Ingrese horas'}
                          className={classes.selectInput}
                          inputProps={{
                            value: user?.jornada_laboral || '',
                            onChange: (e) => setUser({ ...user, jornada_laboral: e.target.value }),
                            type: 'number',
                            required: true,
                          }}
                        />
                      </GridItem>
                    )}
                    <GridItem
                      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}
                      xs={12}
                      sm={6}
                    >
                      {' '}
                      <Typography variant='subtitle2'> Puede ver sus objetivos</Typography>{' '}
                      <Checkbox
                        checked={user.ver_objetivos === 'SI'}
                        onChange={(e) => setUser({ ...user, ver_objetivos: user.ver_objetivos === 'SI' ? 'NO' : 'SI' })}
                      />
                    </GridItem>
                    <hr style={{ marginTop: '55px' }} />
                    <ProfileMultiSelect profilesData={profilesData} setProfilesData={setProfilesData} />
                    <ResponsibleMultiSelect responsibles={responsibles} setResponsibles={setResponsibles} />
                    <ValidatorsMultiSelect validators={validators} setValidators={setValidators} />
                  </GridContainer>
                  {errorTeamWorkUpdate && (
                  <GridContainer>
                    <GridItem xs={12}>
                      <SnackbarContent message={errorTeamWorkUpdate} color='danger' />
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
                </GridItem>
              </>
            )
          )}
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <GridItem xs={12}>
            <Button type='submit' color='primary' block>
              Actualizar Puesto de Trabajo
            </Button>
            <Clearfix />
          </GridItem>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UpdateTeamModal