import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from '../../CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import styles from './styles/viewActionModalStyles'
const useStyles = makeStyles(styles)
const ViewInfoActionModal = ({ open, handleCloseModal, modalTitle, children, anchoPersonalizado, hideButtonClose }) => {
  const classes = useStyles()
  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: anchoPersonalizado ? '': classes.modal,
      }}
      maxWidth={anchoPersonalizado} 
      open={open}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='view-modal-slide-title'
      aria-describedby='view-modal-slide-description'
    >
      <DialogTitle id='view-modal-slide-title' disableTypography className={classes.modalHeader}>
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

      <DialogContent id='view-modal-slide-description' className={classes.modalBody}>
        <GridItem xs={12}>{children}</GridItem>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        {hideButtonClose ? <></>
          :
          <GridContainer>
            <GridItem xs={12}>
              <Button onClick={handleCloseModal} block color='primary'>
                Cerrar
              </Button>
            </GridItem>
          </GridContainer> 
        }
      </DialogActions>
    </Dialog>
  )
}

export default ViewInfoActionModal
