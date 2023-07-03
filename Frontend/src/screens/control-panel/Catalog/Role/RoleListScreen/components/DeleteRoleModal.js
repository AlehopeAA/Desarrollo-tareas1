import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import styles from '../styles/deleteRoleModalStyles'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import { deleteRole, getRoles } from 'redux/actions/roleActions'
import { ROLE_DELETE_RESET } from 'redux/constants/roleConstants'
import SnackbarContent from 'components/Snackbar/SnackbarContent'

const useStyles = makeStyles(styles)

const DeleteRoleModal = ({ handleCloseDeleteRoleModal, deleteRoleModal, showDeleteRoleInfo }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { successRoleDelete, errorRoleDelete, loadingRoleDelete } = useSelector((state) => state.roleDelete)

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteRole(showDeleteRoleInfo.id_rol))
  }

  useEffect(() => {
    if (successRoleDelete) {
      dispatch(getRoles())
      setTimeout(() => {
        dispatch({ type: ROLE_DELETE_RESET })
        handleCloseDeleteRoleModal()
      }, 1000)
    }
  }, [successRoleDelete])

  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteRoleModal}
        keepMounted
        onClose={handleCloseDeleteRoleModal}
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
              onClick={handleCloseDeleteRoleModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Rol</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>Va a eliminar la rol {showDeleteRoleInfo?.codigo_rol}</Typography>
              </GridItem>
              <GridItem xs={12} style={{ margin: '0 0 20px' }}>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteRoleModal} block>
                  Cancelar
                </Button>
              </GridItem>
              <GridItem xs={6}>
                <Button type='onSubmit' color={successRoleDelete ? 'success' : 'primary'} block>
                  {loadingRoleDelete ? 'Eliminando...' : successRoleDelete ? 'Eliminado' : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorRoleDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorRoleDelete} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default DeleteRoleModal
