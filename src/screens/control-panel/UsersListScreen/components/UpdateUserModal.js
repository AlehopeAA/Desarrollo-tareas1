import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl,
  Select as Selectable,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  FormControlLabel,
  Switch,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CustomInput from 'components/CustomInput/CustomInput'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import Clearfix from 'components/Clearfix/Clearfix'
import { matchStatusUser } from 'shared/matchData/matchData'
import { userUpdateInfo } from 'redux/actions/userActions'
import { USER_LIST_RESET, USER_UPDATE_RESET } from 'redux/constants/userConstants'
import styles from '../styles/updateUserModalStyles'

const useStyles = makeStyles(styles)

const UserUpdateModal = ({ handleCloseModal, updateUserModal, showUpdateUser }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [infoModalData, setModalData] = useState(showUpdateUser)

  const { loadingUserUpdate, userInvestorUpdateError, successUserUpdate } = useSelector((state) => state.userUpdate)

  useEffect(() => {
    if (successUserUpdate) {
      dispatch({ type: USER_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successUserUpdate])

  const updateUserHandler = (e) => {
    e.preventDefault()
    dispatch(userUpdateInfo(infoModalData))
  }

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={updateUserModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateUserHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Puesto de Trabajo`}</h4>
        </DialogTitle>

        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridItem xs={12}>
            <GridContainer>
              <GridItem xs={12} md={6}>
                <CustomInput
                  labelText={'Nombre'}
                  id='user-name'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: infoModalData.nombre,
                    onChange: (e) => setModalData({ ...infoModalData, nombre: e.target.value }),
                    type: 'text',
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  labelText={'Apellido Paterno'}
                  id='lastname1'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: infoModalData.apellido1,
                    onChange: (e) => setModalData({ ...infoModalData, apellido1: e.target.value }),
                    type: 'text',
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  labelText={'Apellido Materno'}
                  id='lastname2'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: infoModalData.apellido2,
                    onChange: (e) => setModalData({ ...infoModalData, apellido2: e.target.value }),
                    type: 'text',
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  labelText={'Jornada Laboral'}
                  id='joranda_laboral'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: infoModalData.jornada_laboral,
                    onChange: (e) => setModalData({ ...infoModalData, jornada_laboral: e.target.value }),
                    type: 'text',
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  labelText={'Denominacion del Puesto'}
                  id='denominacion_puesto'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: infoModalData.denominacion_puesto,
                    onChange: (e) => setModalData({ ...infoModalData, denominacion_puesto: e.target.value }),
                    type: 'text',
                    required: true,
                  }}
                />
              </GridItem>

              <GridItem xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='user-update-type'>Estado</InputLabel>
                  <Selectable
                    value={infoModalData.activo}
                    onChange={(e) => setModalData({ ...infoModalData, activo: e.target.value })}
                    inputProps={{
                      name: 'user-update-type',
                      id: 'user-update-type',
                    }}
                  >
                    <MenuItem disabled>Selecciona una Opción</MenuItem>
                    {['si', 'no'].map((entityType, index) => (
                      <MenuItem
                        classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                        value={entityType}
                        key={index}
                      >
                        {entityType}
                      </MenuItem>
                    ))}
                  </Selectable>
                </FormControl>
              </GridItem>
            </GridContainer>
          </GridItem>
          {userInvestorUpdateError && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={userInvestorUpdateError} color='danger' />
              </GridItem>
            </GridContainer>
          )}
          {/* Add error Snackbar to hire */}
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <GridContainer>
            <GridItem xs={12}>
              <Button type='submit' color={successUserUpdate ? 'success' : 'github'} block>
                {loadingUserUpdate ? 'Actualizando...' : successUserUpdate ? 'Listo' : 'Actualizar'}
              </Button>
              <Clearfix />
            </GridItem>
          </GridContainer>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UserUpdateModal
