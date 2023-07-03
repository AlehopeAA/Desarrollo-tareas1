import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import styles from '../styles/deleteTeamModalStyles'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import DesactiveTeamModal from './DesactiveTeamModal'
import { deleteTeamWork } from 'redux/actions/teamWorkActions'

const useStyles = makeStyles(styles)

const DeleteTeamModal = ({ handleCloseDeleteTeamModal, deleteTeamModal, showDeleteTeamInfo, alert }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [desactiveTeamModal, setDesactiveTeamModal] = useState(false)

  const { successTeamWorkDelete } = useSelector((state) => state.teamWorkDelete)
  useEffect(() => {
    if (successTeamWorkDelete) {
      handleCloseDeleteTeamModal()
    }
  }, [successTeamWorkDelete])
  const handleDeleteTeam = (e) => {
    e.preventDefault()
    dispatch(deleteTeamWork(showDeleteTeamInfo.id_puesto))
  }

  const handleCloseDesactiveTeamModal = () => {
    setDesactiveTeamModal(false)
    handleCloseDeleteTeamModal()
  }
  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteTeamModal}
        keepMounted
        onClose={handleCloseDeleteTeamModal}
        aria-labelledby='team-modal-delete-title'
        aria-describedby='team-modal-delete-description'
      >
        <form onSubmit={handleDeleteTeam}>
          <DialogTitle id='team-modal-delete-title' disableTypography className={classes.modalHeader}>
            <Button
              justIcon
              className={classes.modalCloseButton}
              key='close'
              aria-label='Close'
              color='transparent'
              onClick={handleCloseDeleteTeamModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Puesto de Trabajo</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>Va a eliminar el puesto de trabajo {showDeleteTeamInfo?.cod_ayre}</Typography>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <GridContainer>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteTeamModal} block>
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
      {desactiveTeamModal && (
        <DesactiveTeamModal
          handleCloseDesactiveTeamModal={handleCloseDesactiveTeamModal}
          desactiveTeamModal={desactiveTeamModal}
          showDesactiveTeamInfo={showDeleteTeamInfo}
        />
      )}
    </>
  )
}

export default DeleteTeamModal
