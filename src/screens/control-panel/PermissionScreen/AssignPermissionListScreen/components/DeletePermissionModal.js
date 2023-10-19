import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { deleteUserPermission } from 'redux/actions/userPermissionActions'
import { USER_PERMISSION_LIST_RESET, USER_PERMISSION_DELETE_RESET } from 'redux/constants/userPermissionConstants'
import styles from '../styles/deletePermissionModalStyles'

const useStyles = makeStyles(styles)

const DeleteUserPermissionModal = ({
  handleCloseDeletePermissionModal,
  deleteUserPermissionModal,
  showDeleteUserPermissionInfo,
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { successUserPermissionDelete, errorUserPermissionDelete, loadingUserPermissionDelete } = useSelector(
    (state) => state.userPermissionDelete
  )

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteUserPermission(showDeleteUserPermissionInfo.id_permiso_puesto))
  }

  useEffect(() => {
    if (successUserPermissionDelete) {
      setTimeout(() => {
        dispatch({ type: USER_PERMISSION_LIST_RESET })
        dispatch({ type: USER_PERMISSION_DELETE_RESET })
        handleCloseDeletePermissionModal()
      }, 1000)
    }
  }, [successUserPermissionDelete])

  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteUserPermissionModal}
        keepMounted
        onClose={handleCloseDeletePermissionModal}
        aria-labelledby='team-modal-delete-title'
        aria-describedby='team-modal-delete-description'
      >
        <form onSubmit={handleSumit}>
          <DialogTitle id='team-modal-delete-title' disableTypography className={classes.modalHeader}>
            <Button
              justIcon
              className={classes.modalCloseButton}
              key='close'
              aria-label='Close'
              color='transparent'
              onClick={handleCloseDeletePermissionModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Permiso</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>
                  Va a eliminar el permiso <strong>{showDeleteUserPermissionInfo?.id_puesto}</strong>
                </Typography>
              </GridItem>
              <GridItem xs={12} style={{ margin: '0 0 20px' }}>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeletePermissionModal} block>
                  Cancelar
                </Button>
              </GridItem>
              <GridItem xs={6}>
                <Button type='onSubmit' color={successUserPermissionDelete ? 'success' : 'primary'} block>
                  {loadingUserPermissionDelete
                    ? 'Eliminando...'
                    : successUserPermissionDelete
                    ? 'Eliminado'
                    : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorUserPermissionDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorUserPermissionDelete} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default DeleteUserPermissionModal
