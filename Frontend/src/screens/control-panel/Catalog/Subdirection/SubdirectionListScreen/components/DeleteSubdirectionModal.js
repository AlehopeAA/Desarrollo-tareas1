import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { deleteSubdirection, getSubdirections } from 'redux/actions/subdirectionActions'
import { SUBDIRECTION_DELETE_RESET } from 'redux/constants/subdirectionConstants'
import styles from '../styles/deleteSubdirectionModalStyles'

const useStyles = makeStyles(styles)

const DeleteSubdirectionModal = ({
  handleCloseDeleteSubdirectionModal,
  deleteSubdirectionModal,
  showDeleteSubdirectionInfo,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { successSubdirectionDelete, errorSubdirectionDelete, loadingSubdirectionDelete } = useSelector(
    (state) => state.subdirectionDelete
  )

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteSubdirection(showDeleteSubdirectionInfo.id_subdireccion))
  }

  useEffect(() => {
    if (successSubdirectionDelete) {
      dispatch(getSubdirections())
      setTimeout(() => {
        dispatch({ type: SUBDIRECTION_DELETE_RESET })
        handleCloseDeleteSubdirectionModal()
      }, 1000)
    }
  }, [successSubdirectionDelete])

  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteSubdirectionModal}
        keepMounted
        onClose={handleCloseDeleteSubdirectionModal}
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
              onClick={handleCloseDeleteSubdirectionModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Subdireccion</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>Va a eliminar la subdireccion {showDeleteSubdirectionInfo?.codigo_subdireccion}</Typography>
              </GridItem>
              <GridItem xs={12} style={{ margin: '0 0 20px' }}>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteSubdirectionModal} block>
                  Cancelar
                </Button>
              </GridItem>
              <GridItem xs={6}>
                <Button type='onSubmit' color={successSubdirectionDelete ? 'success' : 'primary'} block>
                  {loadingSubdirectionDelete ? 'Eliminando...' : successSubdirectionDelete ? 'Eliminado' : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorSubdirectionDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorSubdirectionDelete} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default DeleteSubdirectionModal
