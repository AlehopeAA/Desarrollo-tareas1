import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import Clearfix from 'components/Clearfix/Clearfix'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardAvatar from 'components/Card/CardAvatar'
import UserProfileInputs from './components/UserProfileInputs'
import { getProfileInfo } from 'redux/actions/userActions'
import { getCurrentEvaluacion } from 'redux/actions/evaluacionActions'
import styles from 'assets/jss/material-ui-react/views/userProfileStyles'
import { EVALUACION_CURRENT_RESET } from 'redux/constants/evaluacionConstants'

const useStyles = makeStyles(styles)

const UserProfileScreen = ({ history }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { userInfo } = useSelector((state) => state.userLogin)
  const [userInformation, setUserInfo] = useState(userInfo)
  const [favoriteTasks, setFavoriteTasks] = useState(false)

  const { loadingUserProfileInfo, profileInfo } = useSelector((state) => state.userProfileInfo)
  const {
    successEvaluacionCurrent,
    evaluacionCurrentData,
  } = useSelector((state) => state.evaluacionCurrent)

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
  }, [userInfo])

  useEffect(() => {
    dispatch(getProfileInfo())
    dispatch(getCurrentEvaluacion(true))
  }, [dispatch])

  useEffect(() => {
    if (profileInfo) {
      setUserInfo({ ...userInformation, profileInfo })
    }
  }, [profileInfo])

  const handleVerEvaluacion = (e) => {
     dispatch({ type: EVALUACION_CURRENT_RESET })
  }

  return (
    <div>
      {loadingUserProfileInfo ? (
        <>Cargando información del usuario</>
      ) : (
        <>
          <GridContainer>
            <GridItem xs={12} sm={6} style={{ margin: 'auto' }}>
              <Card profile>
                <CardAvatar profile round={true}>
                  <a href='#user' onClick={(e) => e.preventDefault()}>
                    <img src={`${axios.defaults.baseURL}/public/assets/img/avatars/avatar.jpg`} alt='...' />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  {userInfo?.permiso?.map((p) => (
                    <h6 key={p}>{`${p}`}</h6>
                  ))}

                  <h4 className={classes.cardTitle}>
                    {userInfo?.nombre} {userInfo?.apellido1} {userInfo?.apellido2 || ''}
                  </h4>
                  <p className={classes.description}>Codigo AYRE · {userInfo?.cod_ayre}</p>
                  <p className={classes.description}>Puesto · {userInfo?.denominacion_puesto || 'Sin Denominación'}</p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} md={10} style={{ margin: 'auto' }}>
              <Card>
                <CardBody>
                  <GridContainer>
                    <UserProfileInputs setUserInfo={setUserInfo} userInformation={userInformation} />
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} md={4} style={{textAlign: "center"}}>
                      <NavLink to={'/admin/assignFavorites'} >
                        <Button color='primary' >
                          Asignar Tareas Favoritas
                        </Button>
                      </NavLink>
                    </GridItem>
                    {userInformation.ver_objetivos == 'SI' && (
                      <GridItem xs={12} md={4} style={{textAlign: "center"}}>
                        <NavLink to={'/admin/viewObjectives'} >
                          <Button color='primary'>
                            Ver objetivos de desempeño
                          </Button>
                        </NavLink>
                      </GridItem>
                    )}
                    {userInformation.ver_objetivos == 'SI' && successEvaluacionCurrent && 
                    evaluacionCurrentData.tiene_actual &&
                    (
                      <GridItem xs={12} md={4} style={{textAlign: "center"}}>
                        <NavLink to={'/admin/viewLevelWork'} >
                          <Button color='primary' onClick={handleVerEvaluacion}>
                            Ver desempeño
                          </Button>
                        </NavLink>
                      </GridItem>
                    )}
                    
                  </GridContainer>
                  <Clearfix />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </>
      )}
    </div>
  )
}

export default UserProfileScreen
