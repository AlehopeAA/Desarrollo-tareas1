import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import styles from '../styles/deleteTeamModalStyles'

const useStyles = makeStyles(styles)
const DesactiveTeamModal = ({ desactiveTeamModal, handleCloseDesactiveTeamModal, showDesactiveTeamInfo }) => {
  const classes = useStyles()

  const handleDesactiveTeam = (e) => {
    e.preventDefault()
  }
  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={desactiveTeamModal}
      keepMounted
      onClose={handleCloseDesactiveTeamModal}
      aria-labelledby='team-modal-desactive-title'
      aria-describedby='team-modal-desactive-description'
    >
      <form onSubmit={handleDesactiveTeam}>
        <DialogTitle id='team-modal-desactive-title' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={handleCloseDesactiveTeamModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4>Eliminar Puesto de Trabajo</h4>
        </DialogTitle>
        <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <Typography>
                El puesto de trabajo {showDesactiveTeamInfo?.cod_ayre} tiene actividades registradas y
              </Typography>
              <Typography>no puede ser eliminado, solo puede ser desactivado,</Typography>
              <Typography>¿Desea desactivar este Puesto de Trabajo?</Typography>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <GridContainer>
            <GridItem xs={6}>
              <Button onClick={handleCloseDesactiveTeamModal} block>
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

export default DesactiveTeamModal
