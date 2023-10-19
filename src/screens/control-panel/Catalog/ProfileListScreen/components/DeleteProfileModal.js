import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import styles from '../styles/deleteProfileModalStyles'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import DesactiveProfileModal from './DesactiveProfileModal.js'

const useStyles = makeStyles(styles)
const DeleteProfileModal = ({
  handleCloseDeleteProfileModal,
  deleteProfileModal,
  showDeleteProfileInfo,
  setIsDelete,
}) => {
  const classes = useStyles()
  const [desactiveProfileModal, setDesactiveProfileModal] = useState(false)

  const handleProfileTeam = (e) => {
    e.preventDefault()
    setDesactiveProfileModal(true)
    //setIsDelete(true)
  }

  const handleCloseDesactiveProfileModal = () => {
    setDesactiveProfileModal(false)
    handleCloseDeleteProfileModal()
  }
  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteProfileModal}
        keepMounted
        onClose={handleCloseDeleteProfileModal}
        aria-labelledby='team-modal-delete-title'
        aria-describedby='team-modal-delete-description'
      >
        <form onSubmit={handleProfileTeam}>
          <DialogTitle id='team-modal-delete-title' disableTypography className={classes.modalHeader}>
            <Button
              justIcon
              className={classes.modalCloseButton}
              key='close'
              aria-label='Close'
              color='transparent'
              onClick={handleCloseDeleteProfileModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Perfil</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>Va a eliminar el perfil {showDeleteProfileInfo?.codeProfile}</Typography>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <GridContainer>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteProfileModal} block>
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
      {desactiveProfileModal && (
        <DesactiveProfileModal
          handleCloseDesactiveProfileModal={handleCloseDesactiveProfileModal}
          desactiveProfileModal={desactiveProfileModal}
          showDesactiveProfileInfo={showDeleteProfileInfo}
        />
      )}
    </>
  )
}

export default DeleteProfileModal
