import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import styles from '../styles/deleteProfileModalStyles'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'

const useStyles = makeStyles(styles)
const DesactiveProfileModal = ({
  desactiveProfileModal,
  handleCloseDesactiveProfileModal,
  showDesactiveProfileInfo,
}) => {
  const classes = useStyles()

  const handleDesactiveProfile = (e) => {
    e.preventDefault()
    console.log('desactivar')
  }
  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={desactiveProfileModal}
      keepMounted
      onClose={handleCloseDesactiveProfileModal}
      aria-labelledby='team-modal-desactive-title'
      aria-describedby='team-modal-desactive-description'
    >
      <form onSubmit={handleDesactiveProfile}>
        <DialogTitle id='team-modal-desactive-title' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={handleCloseDesactiveProfileModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4>Eliminar Perfil</h4>
        </DialogTitle>
        <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <Typography>
                No se puede eliminar el perfil {showDesactiveProfileInfo?.codeProfile} porque esta asociado
              </Typography>
              <Typography>a uno o varios puestos de trabajo. Solo puede ser desactivado,</Typography>
              <Typography>¿Desea desactivar este Perfil?</Typography>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <GridContainer>
            <GridItem xs={6}>
              <Button onClick={handleCloseDesactiveProfileModal} block>
                No
              </Button>
            </GridItem>
            <GridItem xs={6}>
              <Button type='onSubmit' color='primary' block>
                Si
              </Button>
            </GridItem>
          </GridContainer>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DesactiveProfileModal
