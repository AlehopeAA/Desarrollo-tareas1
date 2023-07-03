import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import { Close } from '@material-ui/icons'

import Button from '../../CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import styles from './styles/deleteActionModalStyles'
const useStyles = makeStyles(styles)

const DeleteActionModal = ({
  open,
  handleCloseModal,
  handleSubmit,
  modalTitle,
  showDeleteInfo,
  loadingDelete,
  successDelete,
  errorDelete,
}) => {
  const classes = useStyles()
  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={open}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='modal-delete-title'
      aria-describedby='modal-delete-description'
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id='modal-delete-title' disableTypography className={classes.modalHeader}>
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
          <h4>{modalTitle}</h4>
        </DialogTitle>

        <DialogContent id='modal-delete-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <Typography>
                ¿Está seguro que quieres eliminar <strong>{showDeleteInfo}</strong>?
              </Typography>
            </GridItem>
          </GridContainer>

          {errorDelete && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorDelete} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <GridContainer>
            <GridItem xs={6}>
              <Button onClick={handleCloseModal} block>
                Cancelar
              </Button>
            </GridItem>
            <GridItem xs={6}>
              <Button type='onSubmit' color={successDelete ? 'success' : 'primary'} block>
                {loadingDelete ? 'Eliminando...' : successDelete ? 'Eliminado' : 'Eliminar'}
              </Button>
            </GridItem>
          </GridContainer>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DeleteActionModal
