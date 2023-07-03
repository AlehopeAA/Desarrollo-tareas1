import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { permissionUpdateInfo } from 'redux/actions/permissionActions'
import { PERMISSION_LIST_RESET, PERMISSION_UPDATE_RESET } from 'redux/constants/permissionConstants'
import styles from '../styles/updatePermissionModalStyles'

const useStyles = makeStyles(styles)

const UpdatePermissionModal = ({ handleCloseModal, updatePermissionModal, showUpdatePermission }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoPermission, setInfoPermission] = useState(showUpdatePermission)

  const { loadingPermissionUpdate, errorPermissionUpdate, successPermissionUpdate } = useSelector(
    (state) => state.permissionUpdate
  )

  useEffect(() => {
    if (successPermissionUpdate) {
      dispatch({ type: PERMISSION_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: PERMISSION_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successPermissionUpdate])
  useEffect(() => {
    dispatch({ type: PERMISSION_UPDATE_RESET })
  }, [dispatch])

  const updatePermissionHandler = (e) => {
    e.preventDefault()
    dispatch(permissionUpdateInfo(infoPermission))
  }
  return (
    <Dialog
      open={updatePermissionModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updatePermissionHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Permiso`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <CustomInput
                labelText={'DESCRIPCION'}
                id='description'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoPermission.permiso,
                  onChange: (e) => setInfoPermission({ ...infoPermission, permiso: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successPermissionUpdate ? 'success' : 'primary'} block>
                {loadingPermissionUpdate
                  ? 'Actualizando...'
                  : successPermissionUpdate
                  ? 'Permiso Actualizado'
                  : 'Actualizar Permiso'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorPermissionUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorPermissionUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdatePermissionModal
