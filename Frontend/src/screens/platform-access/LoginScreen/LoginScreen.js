import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import { logout, login } from 'redux/actions/userActions'
import styles from './styles/loginScreenStyles'
import axios from 'axios';

const useStyles = makeStyles(styles)

const LoginScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [cardAnimaton, setCardAnimation] = useState('cardHidden')

  const { loadingUserInfo, errorUserInfo, userInfo } = useSelector((state) => state.userLogin)

  const redirectToLogin = () => {
      window.location.replace(process.env.REACT_APP_API + '/login');
  }
  
  const redirect = location.search ? location.search.split('=')[1] : '/admin/user-page'

  useEffect(() => {
    if (userInfo) {
      //Chequamos si el token es valido, sino se tiene que autenticar.
      const tokenToVerify = localStorage.getItem('setADA') ? JSON.parse(localStorage.getItem('setADA')) : null
      axios({
        method: 'POST',
        url: '/api/users/verifyToken',
        headers:  {
                    Authorization: `Bearer ${tokenToVerify}`,
                    'Cache-Control': 'no-cache',
                  },
        withCredentials: true
      }).then(response => {
        history.push(redirect)
      })
      .catch(error => {
        //Borramos la informacion ya que esta expirada Haciendo logout.
        dispatch(logout())
      
        return function cleanup(id) {
          window.clearTimeout(id)
        }
      })
    }
    else {
      if(!loadingUserInfo) {
        axios({
          method: 'GET',
          url: '/whoami',
          withCredentials: true
        })
        .then(response => {
          if (response.data.codAyre)
          {
            dispatch(login(response.data))
          }
          else
          {
            return function cleanup(id) {
              window.clearTimeout(id)
            }
          }
        })
        .catch(error => {
          return function cleanup(id) {
            window.clearTimeout(id)
          }
        })
      }
    }
  }, [history, userInfo, redirect])

  useEffect(() => {
    let id = setTimeout(function () {
      setCardAnimation('')
    }, 200)

    return function cleanup() {
      window.clearTimeout(id)
    }
  })

  const loginHandler = (e) => {
    e.preventDefault()
    redirectToLogin()
  }

  return (
    <div className={classes.container}>
      <GridContainer justifyContent='center'>
        <GridItem xs={12} sm={10} md={4}>
          <Card loginRegister className={`${classes[cardAnimaton]} ${classes.cardRoot}`}>
            <CardHeader className={classes.cardHeader} color='primary'>
              <h4 className={classes.cardTitle}>Accede con tu cuenta</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12}>
                  <Button color='primary' size='lg' block onClick={loginHandler}>
                    {loadingUserInfo ? 'Iniciando...' : 'Conectar'}
                  </Button>
                </GridItem>
                {errorUserInfo && (
                  <GridItem xs={12}>
                    <div className={classes.messageError}>{errorUserInfo}</div>
                  </GridItem>
                )}
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default LoginScreen
