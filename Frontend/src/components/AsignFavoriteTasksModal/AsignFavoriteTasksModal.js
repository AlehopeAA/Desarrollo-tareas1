import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import TransferList from 'components/TransferList/TransferList'
import Button from 'components/CustomButtons/Button'
import { getFavoritesTasks, registerFavoritesTasks } from 'redux/actions/userActions'
import { USER_REGISTER_FAVORITES_RESET } from 'redux/constants/userConstants'
import { USER_GET_FAVORITES_RESET } from 'redux/constants/userConstants'
import styles from './styles/asignFavoriteTaskStyles'

const useStyles = makeStyles(styles)

const AsignFavoriteTasksModal = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [dataLeft, setDataLeft] = useState([])
  const [dataRight, setDataRight] = useState([])
  const [alert, setAlert] = useState(null)
  const { userInfo } = useSelector((state) => state.userLogin)

  const { loadingUserRegisterFavorites, successUserRegisterFavorites } = useSelector(
    (state) => state.userRegisterFavorites
  )
  
  const { loadingUserGetFavorites, successUserGetFavorites, userGetFavorites } = useSelector(
    (state) => state.userGetFavorites
  )

  useEffect(() => {
    dispatch(getFavoritesTasks(userInfo.id_puesto))
  }, [])

  useEffect(() => {
    if (successUserGetFavorites) {
      const namesAndLastNamesRigth = []
      const namesAndLastNamesLeft = []

      userGetFavorites?.assigned?.map((task) => {
        namesAndLastNamesRigth.push({
          id: task.id_tarea,
          fullName: `${task?.descripcion_tarea}`,
        })
      })
      userGetFavorites?.pendings?.map((task) => {
        namesAndLastNamesLeft.push({
          id: task.id_tarea,
          fullName: `${task?.descripcion_tarea}`,
        })
      })
      setDataRight(namesAndLastNamesRigth)
      setDataLeft(namesAndLastNamesLeft)
    }
  }, [successUserGetFavorites])

  useEffect(() => {
    if (successUserRegisterFavorites) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          La asignacion de tareas favoritas ha sido guardada correctamente
        </SweetAlert>
      )
    }
  }, [successUserRegisterFavorites])

  useEffect(() => {
    return () => dispatch({ type: USER_GET_FAVORITES_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setAlert(null)
    dispatch({ type: USER_GET_FAVORITES_RESET })
    dispatch({ type: USER_REGISTER_FAVORITES_RESET })
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const handleUserFavorites = () => {    
    const teams = {
      pending: dataLeft,
      assigned: dataRight,
      jobPositionId: userInfo.id_puesto,
    }

    dispatch(registerFavoritesTasks(teams))    
  }

  const cancelAction = () => {
    dispatch({ type: USER_GET_FAVORITES_RESET })
    dispatch({ type: USER_REGISTER_FAVORITES_RESET })
    setDataLeft([])
    setDataRight([])
  }

  return (
    <GridContainer>
      <div style={{ marginTop: '50px', width: '100%' }}>
        {loadingUserGetFavorites ? (
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
            <GridContainer xs={12} style={{ marginTop: '20px', justifyContent: 'center' }}>
              <GridItem>
                <Button
                  style={{ marginRight: '20px' }}
                  color={successUserRegisterFavorites ? `success` : 'primary'}
                  onClick={() => handleUserFavorites()}
                >
                  {loadingUserRegisterFavorites
                    ? `Cargando`
                    : successUserRegisterFavorites
                    ? `Guardar`
                    : `Guardar`}
                </Button>
                <NavLink to={'/admin/user-page'} >
                <Button color='primary' onClick={() => cancelAction()}>
                  Volver
                </Button>
                </NavLink>
              </GridItem>
            </GridContainer>
          </>
        )}
      </div>
      {alert}
    </GridContainer>
  )
}

export default AsignFavoriteTasksModal
