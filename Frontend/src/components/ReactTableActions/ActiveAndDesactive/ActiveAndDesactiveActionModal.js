import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import { Close } from '@material-ui/icons'
import Button from '../../CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import styles from './styles/activeAndDesactiveModalStyles'

const useStyles = makeStyles(styles)

const ActiveAndDesactiveActionModal = ({
  open,
  handleCloseModal,
  handleSubmit,
  message,
  modalTitle,
  error,
  success,
  loading,
  loadingMessageButton,
  succesMessageButton,
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
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id='modal-title' disableTypography className={classes.modalHeader}>
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

        <DialogContent id='modal-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <Typography>{message}</Typography>
            </GridItem>
            <GridItem xs={12}>
              <Typography>¿Esta seguro que desea continuar?</Typography>
            </GridItem>
          </GridContainer>

          {error && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={error} color='danger' />
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
              <Button type='onSubmit' color={success ? 'success' : 'primary'} block>
                {loading ? loadingMessageButton : success ? 'Listo' : succesMessageButton}
              </Button>
            </GridItem>
          </GridContainer>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ActiveAndDesactiveActionModal
