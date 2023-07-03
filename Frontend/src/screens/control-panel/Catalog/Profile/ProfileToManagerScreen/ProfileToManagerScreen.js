import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import TransferList from 'components/TransferList/TransferList'
import Button from 'components/CustomButtons/Button'
import ProfileManagerSelect from './components/ProfileManagerSelect'
import { PROFILE_TO_MANAGER_LIST_RESET, PROFILE_TO_MANAGER_REGISTER_RESET } from 'redux/constants/profileToManagerConstants'
import { getProfileToManagers, registerProfileToManager } from 'redux/actions/profileToManagerActions'

const ProfileToManagerScreen = () => {
  const classes = {}
  const dispatch = useDispatch()

  const [dataLeft, setDataLeft] = useState([])
  const [dataRight, setDataRight] = useState([])
  const [alert, setAlert] = useState(null)
  const [currentJobPositionId, setCurrentJobPositionId] = useState('')

  const { loadingProfileToManagerList, successProfileToManagerList, profileToManagers } = useSelector(
    (state) => state.profileToManagerList
  )

  const {
    loadingProfileToManagerRegister,
    successProfileToManagerRegister,
    errorProfileToManagerRegister,
  } = useSelector((state) => state.profileToManagerRegister)


  useEffect(() => {
    if (successProfileToManagerList) {
      const profilesRigth = []
      const profilesLeft = []

      profileToManagers?.assigned?.map((profile) => {
        profilesRigth.push({
          id: profile.id_perfil,
          fullName: `${profile.codigo_perfil}`,
        })
      })
      profileToManagers?.pendings?.map((profile) => {
        profilesLeft.push({
          id: profile.id_perfil,
          fullName: `${profile.codigo_perfil}`,
        })
      })
      setDataRight(profilesRigth)
      setDataLeft(profilesLeft)
    }
  }, [successProfileToManagerList])

  useEffect(() => {
    if (successProfileToManagerRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          La asignacion de perfiles ha sido guardada correctamente
        </SweetAlert>
      )
      setDataLeft([])
      setDataRight([])
      setCurrentJobPositionId('')
      dispatch({ type: PROFILE_TO_MANAGER_LIST_RESET })
      dispatch({ type: PROFILE_TO_MANAGER_REGISTER_RESET })
    }
  }, [successProfileToManagerRegister])

  useEffect(() => {
    return () => dispatch({ type: PROFILE_TO_MANAGER_LIST_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setAlert(null)
  }
  const hideAlert = () => {
    setAlert(null)
  }

  const cancelAction = () => {
    dispatch({ type: PROFILE_TO_MANAGER_LIST_RESET })
    dispatch({ type: PROFILE_TO_MANAGER_REGISTER_RESET })
    setDataLeft([])
    setDataRight([])
    setCurrentJobPositionId('')
  }

  const handleProfilesByManager = (e) => {
    e.preventDefault()
    const profiles = {
      pending: dataLeft,
      assigned: dataRight,
      managerId: currentJobPositionId,
    }

    dispatch(registerProfileToManager(profiles))
  }

  return (
    <>
      <form onSubmit={handleProfilesByManager}>
        <GridContainer style={{ marginBottom: '16px' }}>
          <ProfileManagerSelect
            currentJobPositionId={currentJobPositionId}
            setCurrentJobPositionId={setCurrentJobPositionId}
          />
          <GridItem xs={4}>
            <Button
              disabled={successProfileToManagerList || !currentJobPositionId}
              color='primary'
              onClick={() => dispatch(getProfileToManagers(currentJobPositionId))}
            >
              Buscar asignaciones
            </Button>
          </GridItem>
        </GridContainer>
        <TransferList
          titleRigth='ASIGNADOS'
          titleLeft='PENDIENTES DE ASIGNAR'
          dataLeft={dataLeft}
          dataRight={dataRight}
          setDataLeft={setDataLeft}
          setDataRight={setDataRight}
        />

        <GridContainer xs={12} style={{ marginTop: '20px', justifyContent: 'center' }}>
          <GridItem>
            <Button style={{ marginRight: '20px' }} color='primary' type='submit'>
              Guardar
            </Button>
            <Button color='primary' onClick={cancelAction}>
              Cancelar
            </Button>
          </GridItem>
        </GridContainer>
      </form>
      {alert}
    </>
  )
}

export default ProfileToManagerScreen
