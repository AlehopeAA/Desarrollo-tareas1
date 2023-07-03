import PropTypes from 'prop-types'
import cx from 'classnames'
import { AppBar, Toolbar, Hidden, makeStyles } from '@material-ui/core'
import { Menu, MoreVert, ViewList } from '@material-ui/icons'
import AdminNavbarLinks from './AdminNavbarLinks'
import Button from 'components/CustomButtons/Button'
import styles from 'assets/jss/material-ui-react/components/adminNavbarStyle'

const useStyles = makeStyles(styles)

const AdminNavbar = (props) => {
  const classes = useStyles()
  const { color, rtlActive, brandText } = props
  const appBarClasses = cx({
    [' ' + classes[color]]: color,
  })
  const sidebarMinimize =
    classes.sidebarMinimize +
    ' ' +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive,
    })
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation='css'>
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button justIcon round color='white' onClick={props.sidebarMinimize}>
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button justIcon round color='white' onClick={props.sidebarMinimize}>
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href='#' className={classes.title} color='transparent'>
            {brandText}
          </Button>
        </div>
        <Hidden smDown implementation='css'>
          <AdminNavbarLinks rtlActive={rtlActive} />
        </Hidden>
        <Hidden mdUp implementation='css'>
          <Button
            className={classes.appResponsive}
            color='transparent'
            justIcon
            aria-label='open drawer'
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
}
export default AdminNavbar
