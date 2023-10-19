import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import Clearfix from 'components/Clearfix/Clearfix'
import styles from './styles/updateActionModalStyles'

const useStyles = makeStyles(styles)

const UpdateActionModal = ({
  handleSubmit,
  handleCloseModal,
  open,
  modalTitle,
  errorUpdate,
  successUpdate,
  loadingUpdate,
  children,
}) => {
  const classes = useStyles(styles)

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={open}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='update-modal-slide-title'
      aria-describedby='update-modal-slide-description'
    >
      <form onSubmit={handleSubmit} autoComplete='false'>
        <DialogTitle id='update-modal-slide-title' disableTypography className={classes.modalHeader}>
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
          <h4 className={classes.modalTitle}>{modalTitle}</h4>
        </DialogTitle>

        <DialogContent id='update-modal-slide-description' className={classes.modalBody}>
          <GridItem xs={12}>{children}</GridItem>
          {errorUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
          {/* Add error Snackbar to hire */}
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <GridContainer>
            <GridItem xs={12}>
              <Button type='submit' color={successUpdate ? 'success' : 'primary'} block>
                {loadingUpdate ? 'Actualizando...' : successUpdate ? 'Listo' : 'Actualizar'}
              </Button>
              <Clearfix />
            </GridItem>
          </GridContainer>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UpdateActionModal
