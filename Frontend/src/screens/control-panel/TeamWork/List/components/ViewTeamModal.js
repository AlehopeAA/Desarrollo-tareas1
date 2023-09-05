import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItemText,
  makeStyles,
  Box,
  List,
  ListItemIcon,
  ListItem,
  Typography,
} from '@material-ui/core'
import ListItemButton from '@mui/material/ListItemButton'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import { USER_DETAILS_RESET } from 'redux/constants/userConstants'
import { getUserById } from 'redux/actions/userActions'
import styles from '../styles/viewTeamWorkModalStyles'

const useStyles = makeStyles(styles)

const ViewTeamModal = ({ handleCloseModal, viewTeamModal, showViewTeam }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { loadingUserDetails, successUserDetails, userDetailData } = useSelector((state) => state.userDetails)

  useEffect(() => {
    dispatch(getUserById(showViewTeam.id_puesto))
    console.log(userDetailData)
  }, [])

  useEffect(() => {
    return () => dispatch({ type: USER_DETAILS_RESET })
  }, [dispatch])

  return (
    <Dialog
      open={viewTeamModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
      maxWidth={'lg'}
    >
      <DialogTitle id='notice-modal-slide-title' disableTypography className={classes.modalHeader}>
        <Button
          justIcon
          className={classes.modalCloseButton}
          key='close'
          aria-label='Close'
          color='transparent'
          onClick={handleCloseModal}
        >
          <Close className={classes.modalClose} />
        </Button>
        <h4 className={classes.modalTitle}>{`Información Puesto de Trabajo`}</h4>
      </DialogTitle>
      {loadingUserDetails ? (
        <>Cargando datos del puesto</>
      ) : (
        userDetailData && (
          <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
            <GridItem xs={12}>
              <GridContainer>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'CÓDIGO AYRE'}
                    id='codayre'
                    disabled
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userDetailData.user.cod_ayre,
                      type: 'text',
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText={'CÓDIGO DE PUESTO'}
                    id='jobcode'
                    disabled
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userDetailData.user.codigo_puesto,
                      type: 'number',
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText='Denominación del Puesto'
                    id='denominacion'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userDetailData?.user.denominacion_puesto || '',
                      type: 'text',
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText='Nombre'
                    id='name'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: `${userDetailData.user.nombre} ${userDetailData.user.apellido1} ${
                        userDetailData.user?.apellido2 || ''
                      }`,
                      type: 'text',
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText='Jornada laboral'
                    id='workday'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userDetailData?.user.jornada_laboral || '',
                      type: 'text',
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '20px 0' }}
                  xs={12}
                  sm={4}
                >
                  <Typography variant='subtitle2'> Puede ver sus objetivos</Typography>{' '}
                  <Checkbox checked={userDetailData.user.ver_objetivos === 'SI'} disableFocusRipple />
                </GridItem>
                <GridItem xs={12} md={4} style={{ marginTop: '10px' }}>
                  <Box className={classes.boxContainerLittles}>
                    <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Perfiles</h4>
                    <List>
                      {userDetailData.perfiles && userDetailData.perfiles.length > 0 ? (
                        userDetailData.perfiles?.map((perfil) => (
                          <ListItem key={perfil.id_perfil}>
                            <ListItemText primary={perfil.codigo_perfil} />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText primary='Aun no tiene Perfiles asignados' />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                </GridItem>
                <GridItem xs={12} md={4} style={{ marginTop: '10px' }}>
                  <Box className={classes.boxContainerLittles}>
                    <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Responsables</h4>
                    <List>
                      {userDetailData.responsables && userDetailData.responsables.length > 0 ? (
                        userDetailData.responsables.map((responsable) => (
                          <ListItem key={responsable.id_responsable}>
                            <ListItemText
                              primary={`${responsable.nombre} ${responsable.apellido1} ${responsable?.apellido2 || ''}`}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText primary='Aun no tiene responsables asignados' />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                </GridItem>
                <GridItem xs={12} md={4} style={{ marginTop: '10px' }}>
                  <Box className={classes.boxContainerLittles}>
                    <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Validadores</h4>
                    <List>
                      {userDetailData.validadores && userDetailData.validadores.length > 0 ? (
                        userDetailData.validadores.map((validador) => (
                          <ListItem key={validador.id_validador}>
                            <ListItemText
                              primary={`${validador.nombre} ${validador.apellido1} ${validador?.apellido2 || ''}`}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText primary='Aun no tiene validadores asignados' />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                </GridItem>
                <GridItem xs={12} style={{ marginTop: '10px' }}>
                  <Box className={classes.boxContainerbigs}>
                    <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Tareas</h4>
                    <List>
                      {userDetailData.tareas && userDetailData.tareas.length > 0 ? ( //doit
                        userDetailData.tareas.map((tarea) => (
                          <ListItem key={tarea.id_tarea}>
                            <ListItemButton dense>
                              <ListItemIcon>
                                <Checkbox edge='start'  checked={tarea.favorita === "SI"}  disableRipple />
                              </ListItemIcon>
                              <ListItemText primary={`${tarea.descripcion_tarea}`} secondary ={`${tarea.tipo_tarea}`}/>
                            </ListItemButton>
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText primary='Aun no tiene tareas asignados' />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                </GridItem>
              </GridContainer>
            </GridItem>
          </DialogContent>
        )
      )}
    </Dialog>
  )
}

export default ViewTeamModal
