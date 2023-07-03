import { createRef, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import AuthNavbar from 'components/Navbars/AuthNavbar'
import Footer from 'components/Footer/Footer'
import authRoutes from 'routes/authRoutes'
import { brandName } from 'variables/general'
import styles from './styles/authStyle'

const useStyles = makeStyles(styles)

const AuthLayout = ({ ...rest }) => {
  const wrapper = createRef()
  const classes = useStyles()

  useEffect(() => {
    document.body.style.overflow = 'unset'

    return function cleanup() {}
  })

  const getRoutes = (authRoutes) => {
    return authRoutes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />
      } else {
        return null
      }
    })
  }
  const getActiveRoute = (authRoutes) => {
    let activeRoute = brandName
    for (let i = 0; i < authRoutes.length; i++) {
      if (window.location.href.indexOf(authRoutes[i].layout + authRoutes[i].path) !== -1) {
        return authRoutes[i].name
      }
    }
    return activeRoute
  }
  return (
    <div>
      <AuthNavbar brandText={getActiveRoute(authRoutes)} {...rest} />
      <div className={classes.wrapper} ref={wrapper}>
        <div className={classes.fullPage}>
          <Switch>
            {getRoutes(authRoutes)}
            <Redirect from='/auth' to='/auth/login' />
          </Switch>
          <Footer white />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
