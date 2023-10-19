import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import MultiSelectProfile from 'components/MultiSelectProfiles/MultiSelectProfiles'
import { PROFILE_LIST_RESET } from 'redux/constants/profileConstants'
import { getProfiles } from 'redux/actions/profileActions'
import { getTaskProfiles } from 'redux/actions/taskOtherActions'
import { taskOtherUpdateInfo } from 'redux/actions/taskOtherActions'
import { TASK_OTHER_LIST_RESET, TASK_OTHER_UPDATE_RESET, TASK_PROFILES_RESET } from 'redux/constants/taskOtherConstants'
import styles from '../styles/updateTaskOtherModalStyles'

const useStyles = makeStyles(styles)

const UpdateTaskModal = ({ handleCloseModal, updateTaskModal, showUpdateTask }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoTaskOther, setInfoTaskOther] = useState(showUpdateTask)
  const [codTrazability, setCodTrazability] = useState(showUpdateTask.codigo_trazabilidad || 'NO')
  const [codTipoTarea, setCodTipoTarea] = useState(showUpdateTask.id_tipo_tarea === 2 ? 'ORDINARIA' : 'EXTRAORDINARIA')
  const [profilesDataError, setProfileError] = useState('')
  const [profilesData, setProfilesData] = useState([])
  const { successProfileList, loadingProfileList, profiles } = useSelector((state) => state.profileList)

  const { loadingTaskProfiles, taskProfilesData } = useSelector((state) => state.taskProfiles)

  const { loadingTaskOtherUpdate, errorTaskOtherUpdate, successTaskOtherUpdate } = useSelector(
    (state) => state.taskOtherUpdate
  )

  useEffect(() => {
    dispatch(getTaskProfiles(showUpdateTask.id_tarea))
  }, [])

  useEffect(() => {
    if (taskProfilesData) {
      setProfilesData(taskProfilesData.perfiles)
    }
  }, [taskProfilesData])

  useEffect(() => {
    return () => {
      dispatch({ type: TASK_PROFILES_RESET })
    }
  }, [dispatch])

  useEffect(() => {
    return () => dispatch({ type: PROFILE_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (successTaskOtherUpdate) {
      setProfileError([])
      setProfileError('')
      dispatch({ type: TASK_OTHER_LIST_RESET })
      dispatch({ type: PROFILE_LIST_RESET })
      setTimeout(() => {
         dispatch({ type: TASK_OTHER_UPDATE_RESET })
         handleCloseModal()
        }, 1000)
    }
  }, [successTaskOtherUpdate])

  useEffect(() => {
    return () => dispatch({ type: TASK_OTHER_UPDATE_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successProfileList) {
      dispatch(getProfiles())
    }
  }, [successProfileList])

  const updateTaskHandler = (e) => {
    e.preventDefault()
    if (profilesData.length === 0) {
      return setProfileError('Por favor seleccione un Perfil.')
    }
    const data = {
      ...infoTaskOther,
      profilesData,
    }
    dispatch(taskOtherUpdateInfo(data))
  }

  const handleSelector = (e) => {
    const {
      target: { value },
    } = e
    setCodTrazability(value)
    setInfoTaskOther({ ...infoTaskOther, codigo_trazabilidad: e.target.value })
  }

  const handlerTipoTarea = (e) => {
    const {
      target: { value },
    } = e
    
    setCodTipoTarea(value) 
    value === 'ORDINARIA' ?      
      setInfoTaskOther({ ...infoTaskOther, id_tipo_tarea: '2' })
    :
      setInfoTaskOther({ ...infoTaskOther, id_tipo_tarea: '3' })
  }

  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (profilesData.map((profile) => profile.id_perfil).indexOf(value[value.length - 1].id_perfil) === -1) {
      setProfilesData(value)
    } else {
      setProfilesData(profilesData.filter((profile) => profile.id_perfil !== value[value.length - 1]?.id_perfil))
    }
  }

  return (
    <Dialog
      open={updateTaskModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateTaskHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Tarea`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <CustomInput
                labelText={'DESCRIPCION *'}
                id='description'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoTaskOther.descripcion_tarea,
                  onChange: (e) => setInfoTaskOther({ ...infoTaskOther, descripcion_tarea: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} style={{ marginTop: '10px' }}>
              <FormControl fullWidth>
                <InputLabel id='task-type'>Tipo de Tarea *</InputLabel>
                <Select
                  labelId='task-type'
                  id='task-type'
                  value={codTipoTarea}
                  label='task-type'
                  onChange={(e) => handlerTipoTarea(e)}
                  required= 'true'
                >
                  <MenuItem value={'EXTRAORDINARIA'}>EXTRAORDINARIA</MenuItem>
                  <MenuItem value={'ORDINARIA'}>ORDINARIA</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='indicador'>Indicador</InputLabel>
                <Select
                  labelId='indicador'
                  id='indicador'
                  value={infoTaskOther.indicador}
                  label='Indicador'
                  onChange={(e) => setInfoTaskOther({ ...infoTaskOther, indicador: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='cuantificable'>Cuantificable</InputLabel>
                <Select
                  labelId='cuantificable'
                  id='cuantificable'
                  value={infoTaskOther.cuantificable}
                  label='Cuantificable'
                  onChange={(e) => setInfoTaskOther({ ...infoTaskOther, cuantificable: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>            
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='entrada'>Entrada</InputLabel>
                <Select
                  labelId='entrada'
                  id='entrada'
                  value={infoTaskOther.entrada}
                  label='Entrada'
                  onChange={(e) => setInfoTaskOther({ ...infoTaskOther, entrada: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='compartida'>Compartida</InputLabel>
                <Select
                  labelId='compartida'
                  id='compartida'
                  value={infoTaskOther.compartida}
                  label='Compartida'
                  onChange={(e) => setInfoTaskOther({ ...infoTaskOther, compartida: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='dificultad'>Dificultad</InputLabel>
                <Select
                  labelId='dificultad'
                  id='dificultad'
                  value={infoTaskOther.dificultad}
                  label='Dificultad'
                  onChange={(e) => setInfoTaskOther({ ...infoTaskOther, dificultad: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='acumulativa'>Acumulativa</InputLabel>
                <Select
                  labelId='acumulativa'
                  id='acumulativa'
                  value={infoTaskOther.acumulativa}
                  label='Acumulativa'
                  onChange={(e) => setInfoTaskOther({ ...infoTaskOther, acumulativa: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem style={{ margin: '20px 0' }} xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id='codigo_trazabilidad'>COD. TRAZABILIDAD</InputLabel>
                <Select
                  labelId='codigo_trazabilidad'
                  id='codigo_trazabilidad'
                  name='codigo_trazabilidad'
                  renderValue={(selected) => selected}
                  value={codTrazability}
                  label='codigo_trazabilidad'
                  onChange={(e) => handleSelector(e)}
                >
                  {[
                    'NO',
                    'Nº Expediente',
                    'Nombre de fichero',
                    'Nº comunicación',
                    'Nº de relación',
                    'Nº de lote',
                    'Otro',
                  ].map((cod) => (
                    <MenuItem value={cod}>{cod} </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {codTrazability === 'Otro' && (
                <FormControl fullWidth>
                  <CustomInput
                    id='codigo_trazabilidad'
                    labelText={'Ingrese código de trazabilidad'}
                    inputProps={{
                      onChange: (e) => setInfoTaskOther({ ...infoTaskOther, codigo_trazabilidad: e.target.value }),
                      type: 'text',
                      required: true,
                    }}
                  />
                </FormControl>
              )}{' '}
            </GridItem>
            <GridItem xs={12} style={{ marginTop: '16px' }}>
               {loadingProfileList ? (
                 <>Cargando lista de perfiles</>
               ) : (
                 profiles && (
                   <MultiSelectProfile
                     label={'Perfiles'}
                     data={profiles}
                     multiData={profilesData}
                     handleChangeMultiData={handleChangeMultiData}
                  />
                )
               )}
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successTaskOtherUpdate ? 'success' : 'primary'} block>
                {loadingTaskOtherUpdate
                  ? 'Actualizando...'
                  : successTaskOtherUpdate
                  ? 'Tarea Actualizada'
                  : 'Actualizar Tarea'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorTaskOtherUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorTaskOtherUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
          {profilesDataError && profilesData.length === 0 && (
          <GridContainer>
            <GridItem xs={12}>
              <SnackbarContent message={profilesDataError} color='danger' />
            </GridItem>
          </GridContainer>
        )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateTaskModal
