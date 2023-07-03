import cx from 'classnames'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, makeStyles } from '@material-ui/core'
import Button from 'components/CustomButtons/Button'
import logo from 'assets/img/logo-agencia-actividades.jpg'
import styles from './styles/authNavbarStyle'

const useStyles = makeStyles(styles)

const AuthNavbar = ({ color, brandText }) => {
  const classes = useStyles()

  const appBarClasses = cx({
    [' ' + classes[color]]: color,
  })

  return (
    <AppBar position='static' className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button href='/auth/login' className={classes.title} color='transparent'>
            <img src={logo} width='200px' alt='Logo Agencia de Actividades' />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  brandText: PropTypes.string,
}

export default AuthNavbar
