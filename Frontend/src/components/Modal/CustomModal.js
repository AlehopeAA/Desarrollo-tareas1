import { forwardRef } from 'react'
import { Slide, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Button from '../Buttons/Button'
import styles from './styles/customModalStyles'

const useStyles = makeStyles(styles)

const Transition = forwardRef((props, ref) => {
  return <Slide direction='down' ref={ref} {...props} />
})
Transition.displayName = 'Transition'

const CustomModal = ({ title, setOpen, open, children, actions, acceptText, acceptHandler }) => {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-labelledby='general-modal-title'
      aria-describedby='general-modal-description'
      PaperProps={{
        className: classes.dialogRoot,
      }}
    >
      <DialogTitle id='general-modal-title' disableTypography className={classes.header}>
        <h4>{title}</h4>
        <Button justIcon round color='light' onClick={() => setOpen(false)}>
          <Close />
        </Button>
      </DialogTitle>
      <DialogContent id='general-modal-description' className={classes.content}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions className={classes.actions}>
          <Button color='primary' onClick={acceptHandler}>
            {acceptText}
          </Button>
          <Button color='info' onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}
CustomModal.defaultProps = {
  actions: true,
  acceptText: 'OK',
}

export default CustomModal
