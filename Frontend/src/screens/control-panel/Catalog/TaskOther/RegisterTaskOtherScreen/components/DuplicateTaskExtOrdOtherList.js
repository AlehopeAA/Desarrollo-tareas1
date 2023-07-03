import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import GridItem from 'components/Grid/GridItem'
import TaskProfileForm from './TaskProfileForm'
import Button from 'components/CustomButtons/Button'
import { PROFILE_LIST_RESET } from 'redux/constants/profileConstants'
import { TASK_REGISTER_RESET, TASK_LIST_DUPLICATE_BY_PROFILE_CLEAN, TASK_LIST_BY_PROFILE_ID_RESET } from 'redux/constants/taskConstants'
import { getTasksByProfileId, registerTask } from 'redux/actions/taskActions'
import { fillAllTaskHandle } from 'redux/actions/taskActions'
import MultiSelectProfile from 'components/MultiSelectProfiles/MultiSelectProfiles'
import { getProfiles } from 'redux/actions/profileActions'

const DuplicateTaskExtOrdOtherList = ({ id, setTaskType }) => {
  const dispatch = useDispatch()

  const [profilesData, setProfilesData] = useState([])

  const { successProfileList, loadingProfileList, profiles } = useSelector((state) => state.profileList)
  const { createTask, sameTask } = useSelector((state) => state.handleDuplicateTask)
  const [alert, setAlert] = useState(null)
  const { loadingTaskListByProfile, successTaskListByProfile, taskListByProfileData } = useSelector(
    (state) => state.taskListByProfile
  )
  const { loadingTaskRegister, successTaskRegister, errorTaskRegister } = useSelector((state) => state.taskRegister)

  useEffect(() => {
    if (!successTaskListByProfile) {
      dispatch(getTasksByProfileId(id))
    }
  }, [successTaskListByProfile])

  useEffect(() => {
    return () => dispatch({ type: TASK_LIST_BY_PROFILE_ID_RESET })
  }, [dispatch])

  useEffect(() => {
    if (taskListByProfileData) {
      dispatch(fillAllTaskHandle(taskListByProfileData))
    }
  }, [taskListByProfileData])

  useEffect(() => {
    if (!successProfileList) {
      dispatch(getProfiles())
    }
  }, [successProfileList])

  useEffect(() => {
    if (successTaskRegister) {
      setAlert(        
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'          
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
        >
          Tarea/s guardada/s correctamente
        </SweetAlert>
      )
    }
  }, [successTaskRegister])

  const confirmSuccess = () => {
    setAlert(null)
    dispatch({ type: PROFILE_LIST_RESET })
    dispatch({ type: TASK_REGISTER_RESET })
    setTaskType('')
    dispatch({ type: TASK_LIST_BY_PROFILE_ID_RESET })
    dispatch({ type: TASK_LIST_DUPLICATE_BY_PROFILE_CLEAN })    
  }

  const hideAlert = () => {
    setAlert(null)
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

  const handleData = (e) => {
    e.preventDefault()
    const data = {
      profilesData,
      createTask,
      sameTask,
    }
    dispatch(registerTask(data))
  }

  return (
    <>
      {loadingTaskListByProfile ? (
        <>Cargando tareas de perfil</>
      ) : (
        <form onSubmit={handleData}>
          <GridItem xs={12} style={{ marginTop: '15px' }}>
            <Typography>
               Si marcas "Crear tarea" ésta se copiará en los perfiles seleccionados abajo, pero no tendrá relación con la tarea del perfil a duplicar. Si marcas "Misma tarea" éstá será la misma en el perfil a duplicar y en los seleccionados abajo y por tanto compartirán la descripción y los atributos
            </Typography>

            {taskListByProfileData &&
              taskListByProfileData.map((taskProfile) => (
                <TaskProfileForm key={taskProfile.id_tarea} taskByProfile={taskProfile} />
              ))}
          </GridItem>
          <GridItem xs={12} style={{ marginTop: '15px' }}>
            {loadingProfileList ? (
              <>Cargando perfiles</>
            ) : (              
              <MultiSelectProfile
                label={'Perfiles'}
                data={profiles?.filter((item) => item.id_perfil !== id)}
                multiData={profilesData}
                handleChangeMultiData={handleChangeMultiData}
              />
            )}
          </GridItem>
          {errorTaskRegister && (
            <GridItem xs={12}>
              <SnackbarContent message={errorTaskRegister} color='danger' />
            </GridItem>
          )}
          <GridItem xs={12} style={{ textAlign: 'end' }}>
            <NavLink to={'/admin/tasks-ord-ext-register'} >
              <Button color='primary' onClick={confirmSuccess}>
                 Cancelar
              </Button>
            </NavLink>
                      
            <Button color={successTaskRegister ? 'success' : 'primary'} type='submit'>
              {loadingTaskRegister ? 'Guardando' : successTaskRegister ? 'Guardado' : 'Guardar'}
            </Button>            
          </GridItem>
          {alert}
        </form>
      )}
    </>
  )
}

export default DuplicateTaskExtOrdOtherList
