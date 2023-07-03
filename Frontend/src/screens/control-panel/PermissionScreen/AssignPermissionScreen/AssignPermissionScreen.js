import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import TransferList from 'components/TransferList/TransferList'
import PermissionSelector from './components/PermissionSelector'
import { registerTeamWorkByPermission } from 'redux/actions/teamWorkActions'
import { getTeamWorksByRole } from 'redux/actions/teamWorkActions'
import { TEAM_WORK_LIST_BY_ROLE_RESET } from 'redux/constants/teamWorkConstants'
import { TEAM_WORK_REGISTER_BY_PERMISSION_RESET } from 'redux/constants/teamWorkConstants'
import styles from './styles/registerPermissionStyles'
import { USER_PERMISSION_LIST_RESET } from 'redux/constants/userPermissionConstants'

const useStyles = makeStyles(styles)

const AssignPermissionScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [dataLeft, setDataLeft] = useState([])
  const [dataRight, setDataRight] = useState([])
  const [alert, setAlert] = useState(null)
  const [hasSearch, toggleHasSearch] = useState(false)
  const [permissionId, setPermissionId] = useState('')

  const {
    loadingTeamWorkListByRole,
    successTeamWorkListByRole,
    teamWorkListByRoleData,
    errorTeamWorkListByRole,
  } = useSelector((state) => state.teamWorkListByRole)

  const {
    loadingTeamWorkByPermissionRegister,
    successTeamWorkByPermissionRegister,
    errorTeamWorkByPermissionRegister,
  } = useSelector((state) => state.teamWorkRegisterByPermission)

  useEffect(() => {
    if (successTeamWorkListByRole && hasSearch) {
      const namesAndLastNamesRigth = teamWorkListByRoleData.assigned.map((user) => {
        const { id_puesto, nombre, apellido1, apellido2 } = user

        user.id = id_puesto
        user.fullName = `${nombre} ${apellido1} ${apellido2}`
        return user
      })

      const namesAndLastNamesLeft = teamWorkListByRoleData.pendings.map((user) => {
        const { id_puesto, nombre, apellido1, apellido2 } = user
        user.id = id_puesto
        user.fullName = `${nombre} ${apellido1} ${apellido2}`
        return user
      })

      setDataLeft(namesAndLastNamesLeft)
      setDataRight(namesAndLastNamesRigth)
    }
  }, [successTeamWorkListByRole])

  useEffect(() => {
    if (successTeamWorkByPermissionRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          La asignacion de permisos ha sido guardada correctamente
        </SweetAlert>
      )
      setDataLeft([])
      setDataRight([])
      setPermissionId('')
      toggleHasSearch(false)
      dispatch({ type: TEAM_WORK_REGISTER_BY_PERMISSION_RESET })
      dispatch({ type: TEAM_WORK_LIST_BY_ROLE_RESET })
      dispatch({ type: USER_PERMISSION_LIST_RESET })
    }
  }, [successTeamWorkByPermissionRegister])

  useEffect(() => {
    return () => {
      dispatch({ type: TEAM_WORK_REGISTER_BY_PERMISSION_RESET })
      dispatch({ type: TEAM_WORK_LIST_BY_ROLE_RESET })
    }
  }, [dispatch])

  const cancelOperation = () => {
    setDataLeft([])
    setDataRight([])
    toggleHasSearch(false)
    setPermissionId('')
    dispatch({ type: TEAM_WORK_REGISTER_BY_PERMISSION_RESET })
    dispatch({ type: TEAM_WORK_LIST_BY_ROLE_RESET })
  }

  const confirmSuccess = () => {
    setAlert(null)
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const handleTeamWorkByPermission = () => {
    const teams = {
      assigned: dataRight,
      id_permiso: permissionId,
    }

    dispatch(registerTeamWorkByPermission(teams))
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={8}>
          <GridContainer>
            <PermissionSelector
              disabled={successTeamWorkListByRole}
              permissionId={permissionId}
              setPermission={setPermissionId}
            ></PermissionSelector>
            <GridItem xs={4}>
              <Button
                color='primary'
                disabled={hasSearch || !permissionId}
                onClick={() => {
                  toggleHasSearch(true)
                  dispatch(getTeamWorksByRole(permissionId))
                }}
              >
                Buscar asignaciones
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
        <div style={{ marginTop: '50px', width: '100%' }}>
          {loadingTeamWorkListByRole ? (
            <>Cargando</>
          ) : (
            <>
              <TransferList
                titleRigth='ASIGNADOS'
                titleLeft='PENDIENTES DE ASIGNAR'
                dataLeft={dataLeft}
                dataRight={dataRight}
                setDataLeft={setDataLeft}
                setDataRight={setDataRight}
              />
              <GridContainer style={{ marginTop: '20px', justifyContent: 'center' }}>
                <GridItem>
                  <Button
                    style={{ marginRight: '20px' }}
                    color={successTeamWorkByPermissionRegister ? `success` : 'primary'}
                    onClick={() => handleTeamWorkByPermission()}
                  >
                    {loadingTeamWorkByPermissionRegister
                      ? `Cargando`
                      : successTeamWorkByPermissionRegister
                      ? `Hecho`
                      : `Guardar`}
                  </Button>
                  <Button color='primary' onClick={() => cancelOperation()}>
                    Cancelar
                  </Button>
                </GridItem>
              </GridContainer>
            </>
          )}
        </div>
        {alert}
      </GridContainer>
      {alert}
    </>
  )
}

export default AssignPermissionScreen
