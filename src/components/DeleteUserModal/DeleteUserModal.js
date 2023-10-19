import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core'
import Typography from '@mui/material/Typography'

import { Close } from '@material-ui/icons'

import Button from '../CustomButtons/Button'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import SnackbarContent from '../Snackbar/SnackbarContent'

import { deleteUser } from 'redux/actions/userActions'
import { USER_LIST_RESET, USER_DELETE_RESET } from 'redux/constants/userConstants'

import styles from './styles/deleteUserModalStyles'

const useStyles = makeStyles(styles)

const DeleteUserModal = ({ handleCloseDeleteUserModal, deleteUserModal, showDeleteUserInfo }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { successUserDelete, errorUserDelete, loadingUserDelete } = useSelector((state) => state.userDelete)

  useEffect(() => {
    if (successUserDelete) {
      setTimeout(() => {
        dispatch({ type: USER_LIST_RESET })
        dispatch({ type: USER_DELETE_RESET })
        handleCloseDeleteUserModal()
      }, 1000)
    }
  }, [successUserDelete])

  useEffect(() => {
    dispatch({ type: USER_DELETE_RESET })
  }, [])

  const handleDeleteUser = (e) => {
    e.preventDefault()
    dispatch(deleteUser(showDeleteUserInfo?.id_puesto))
  }

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={deleteUserModal}
      keepMounted
      onClose={handleCloseDeleteUserModal}
      aria-labelledby='user-modal-delete-title'
      aria-describedby='user-modal-delete-description'
    >
      <form onSubmit={handleDeleteUser}>
        <DialogTitle id='user-modal-delete-title' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={handleCloseDeleteUserModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4>Eliminar Puesto de Trabajo</h4>
        </DialogTitle>

        <DialogContent id='user-modal-delete-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <Typography>
                ¿Está seguro que quieres a <strong>{showDeleteUserInfo?.nombre}</strong>?
              </Typography>
            </GridItem>
          </GridContainer>

          {errorUserDelete && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorUserDelete} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <GridContainer>
            <GridItem xs={6}>
              <Button onClick={handleCloseDeleteUserModal} block>
                Cancelar
              </Button>
            </GridItem>
            <GridItem xs={6}>
              <Button type='onSubmit' color={successUserDelete ? 'success' : 'primary'} block>
                {loadingUserDelete ? 'Eliminando...' : successUserDelete ? 'Eliminado' : 'Eliminar'}
              </Button>
            </GridItem>
          </GridContainer>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DeleteUserModal
