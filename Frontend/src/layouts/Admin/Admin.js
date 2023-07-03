import { useState, createRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'
import { Switch, Route, Redirect } from 'react-router-dom'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import { makeStyles } from '@material-ui/core'
import AdminNavbar from 'components/Navbars/AdminNavbar'
import Footer from 'components/Footer/Footer'
import Sidebar from 'components/Sidebar/Sidebar'
import routes from 'routes/routes'
import role from 'config/roles/roles'
import { refreshToken } from 'redux/actions/userActions'
import styles from './styles/adminStyle'

var ps

const useStyles = makeStyles(styles)

const DashboardLayout = ({ ...rest }) => {
  const classes = useStyles()
  const history = useHistory()
  const mainPanel = createRef()
  const dispatch = useDispatch()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [miniActive, setMiniActive] = useState(false)
  const [logo, setLogo] = useState(require('assets/img/logo-agencia-actividades-corto.jpg').default)

  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (!userInfo) {
      history.push('/auth/login')
    }
  }, [userInfo, history])

  useEffect(() => {
    //dispatch(refreshToken())
  }, [])

  const mainPanelClasses =
    classes.mainPanel +
    ' ' +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
    })

  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
      document.body.style.overflow = 'hidden'
    }
    window.addEventListener('resize', resizeFunction)

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
      window.removeEventListener('resize', resizeFunction)
    }
  })
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const getActiveRoute = (routes) => {
    let activeRoute = 'Agencia de Actividades'
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].name
        }
      }
    }
    return activeRoute
  }
  const getRoutes = (routes) => {
    let filteredRoutes = getRoutesByRole(routes)
    return filteredRoutes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/admin') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />
      } else {
        return null
      }
    })
  }
  const sidebarMinimize = () => {
    setMiniActive(!miniActive)
  }
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false)
    }
  }

  const getRoutesByRole = (routes) => {
    return routes
  }
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={getRoutesByRole(routes)}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color='white'
        bgColor='white'
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from='/admin' to='/admin/user-page' />
            </Switch>
          </div>
        </div>
        <Footer fluid />
      </div>
    </div>
  )
}

export default DashboardLayout
