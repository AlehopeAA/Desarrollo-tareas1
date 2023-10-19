import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { deleteService, getServices } from 'redux/actions/serviceActions'
import { SERVICE_DELETE_RESET } from 'redux/constants/serviceConstants'
import styles from '../styles/deleteServiceModalStyles.js'

const useStyles = makeStyles(styles)

const DeleteServiceModal = ({ handleCloseDeleteServiceModal, deleteServiceModal, showDeleteServiceInfo }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { successServiceDelete, errorServiceDelete, loadingServiceDelete } = useSelector((state) => state.serviceDelete)

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteService(showDeleteServiceInfo.id_servicio))
  }

  useEffect(() => {
    if (successServiceDelete) {
      dispatch(getServices())
      setTimeout(() => {
        dispatch({ type: SERVICE_DELETE_RESET })
        handleCloseDeleteServiceModal()
      }, 1000)
    }
  }, [successServiceDelete])

  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteServiceModal}
        keepMounted
        onClose={handleCloseDeleteServiceModal}
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
              onClick={handleCloseDeleteServiceModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Servicio</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>Va a eliminar la servicio {showDeleteServiceInfo?.codigo_servicio}</Typography>
              </GridItem>
              <GridItem xs={12} style={{ margin: '0 0 20px' }}>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteServiceModal} block>
                  Cancelar
                </Button>
              </GridItem>
              <GridItem xs={6}>
                <Button type='onSubmit' color={successServiceDelete ? 'success' : 'primary'} block>
                  {loadingServiceDelete ? 'Eliminando...' : successServiceDelete ? 'Eliminado' : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorServiceDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorServiceDelete} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default DeleteServiceModal
