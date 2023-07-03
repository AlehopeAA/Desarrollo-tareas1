import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { Box, MenuItem, MenuList, ClickAwayListener, Paper, Grow, Hidden, Popper, makeStyles } from '@material-ui/core'
import { Notifications, Assignment } from '@material-ui/icons'
import { PowerSettingsNew } from '@mui/icons-material'
import CustomModal from 'components/Modal/CustomModal'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'

import { logout } from 'redux/actions/userActions'
import styles from './styles/adminNavbarLinksStyle'
import { getAvisosUser } from 'redux/actions/userActions'

const useStyles = makeStyles(styles)

const HeaderLinks = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [openNotification, setOpenNotification] = useState(null)
  const [openLogoutAlert, setOpenLogoutAlert] = useState(false)

  const {
    successUserAvisos,
    avisos,
  } = useSelector((state) => state.userAvisos)

  useEffect(() => {
    if (!successUserAvisos) {
      dispatch(getAvisosUser())
    }
  }, [dispatch, successUserAvisos])
  
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null)
    } else {
      setOpenNotification(event.currentTarget)
    }
  }
  const handleCloseNotification = () => {
    setOpenNotification(null)
  }
  const handleLogout = () => {
    setOpenLogoutAlert(false)
    dispatch(logout())
  }

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover)

  return (
    <>
      {successUserAvisos && avisos.mostrar && (
        <div className={classes.managerClasses}>
          <Button
            color='transparent'
            justIcon
            aria-label='Notifications'
            aria-owns={openNotification ? 'notification-menu-list' : null}
            aria-haspopup='true'
            onClick={handleClickNotification}
            className={classes.buttonLink}
            muiClasses={{
              label: '',
            }}
          >
            <Notifications className={classes.headerLinksSvg + ' ' + classes.links} />
            <span className={classes.notifications}>{avisos.avisos.usuario.length + avisos.avisos.validador.length + avisos.avisos.responsable.length + avisos.avisos.gestor.length }</span>
            <Hidden mdUp implementation='css'>
              <span onClick={handleClickNotification} className={classes.linkText}>
                Avisos
              </span>
            </Hidden>
          </Button>
          <Popper
            open={Boolean(openNotification)}
            anchorEl={openNotification}
            transition
            disablePortal
            placement='bottom'
            className={classNames({
              [classes.popperClose]: !openNotification,
              [classes.popperResponsive]: true,
              [classes.popperNav]: true,
            })}
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} id='notification-menu-list' style={{ transformOrigin: '0 0 0' }}>
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={handleCloseNotification}>
                    <MenuList role='menu'>
                      {avisos.avisos.usuario && avisos.avisos.usuario.length > 0 && (
                        <Box style={{width: '100%', maxHeight: '100%', background: '#F9F9F9', borderRadius: '10px', padding: '5px',}} >
                          <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Avisos de Usuario</h4>
                          {avisos.avisos.usuario.map((aviso, index) =>
                            <MenuItem onClick={handleCloseNotification}  className={dropdownItem}>{aviso}</MenuItem>
                          )}
                        </Box>    
                      )}
                      {avisos.avisos.validador && avisos.avisos.validador.length > 0 && (
                        <Box style={{width: '100%', maxHeight: '100%', background: '#F9F9F9', borderRadius: '10px', padding: '5px',}} >
                          <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Avisos de Validador</h4>
                          {avisos.avisos.validador.map((aviso, index) =>
                            <MenuItem onClick={handleCloseNotification}  className={dropdownItem}>{aviso}</MenuItem>
                          )}
                        </Box>    
                      )}
                      {avisos.avisos.responsable && avisos.avisos.responsable.length > 0 && (
                        <Box style={{width: '100%', maxHeight: '100%', background: '#F9F9F9', borderRadius: '10px', padding: '5px',}} >
                          <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Avisos de Responsable</h4>
                          {avisos.avisos.responsable.map((aviso, index) =>
                            <MenuItem onClick={handleCloseNotification}  className={dropdownItem}>{aviso}</MenuItem>
                          )}
                        </Box>    
                      )}
                      {avisos.avisos.gestor && avisos.avisos.gestor.length > 0 && (
                        <Box style={{width: '100%', maxHeight: '100%', background: '#F9F9F9', borderRadius: '10px', padding: '5px',}} >
                          <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Avisos de Gestor</h4>
                          {avisos.avisos.gestor.map((aviso, index) =>
                            <MenuItem onClick={handleCloseNotification}  className={dropdownItem}>{aviso}</MenuItem>
                          )}
                        </Box>    
                      )}
                                        
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      )}
      
      <div className={classes.managerClasses}>
        <Button
          color='transparent'
          aria-label='Logout'
          justIcon
          onClick={() => setOpenLogoutAlert(true)}
          className={classes.buttonLink}
        >
          <PowerSettingsNew className={classes.headerLinksSvg + ' ' + classes.links} />
        </Button>
      </div>
      <CustomModal
        title='Cerrar Sesión'
        open={openLogoutAlert}
        setOpen={setOpenLogoutAlert}
        acceptHandler={handleLogout}
        acceptText='Sí'
      >
        <GridContainer>
          <GridItem xs={12}>
            <h4>¿Esta seguro que quiere salir de la aplicación?</h4>
          </GridItem>
        </GridContainer>
      </CustomModal>
    </>
  )
}

export default HeaderLinks
