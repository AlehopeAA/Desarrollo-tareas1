import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, Typography, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import DesactiveProfileModal from './DesactiveProfileModal'
import { deleteProfile, getProfiles } from 'redux/actions/profileActions'
import { PROFILE_DELETE_RESET } from 'redux/constants/profileConstants'
import styles from '../styles/deleteProfileModalStyles'

const useStyles = makeStyles(styles)

const DeleteProfileModal = ({ handleCloseDeleteProfileModal, deleteProfileModal, showDeleteProfileInfo }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [desactiveProfileModal, setDesactiveProfileModal] = useState(false)

  const { successProfileDelete, errorProfileDelete, loadingProfileDelete } = useSelector((state) => state.profileDelete)

  useEffect(() => {
    if (successProfileDelete) {
      dispatch(getProfiles())
      setTimeout(() => {
        dispatch({ type: PROFILE_DELETE_RESET })
        handleCloseDeleteProfileModal()
      }, 1000)
    }
  }, [dispatch, successProfileDelete])

  const handleProfileTeam = (e) => {
    e.preventDefault()
    dispatch(deleteProfile(showDeleteProfileInfo.id_perfil))
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
                <Typography>
                  Va a eliminar el perfil con codigo <strong>{showDeleteProfileInfo?.codigo_perfil}</strong>
                </Typography>
              </GridItem>
              <GridItem xs={12} style={{ margin: '0 0 20px' }}>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteProfileModal} block>
                  Cancelar
                </Button>
              </GridItem>
              <GridItem xs={6}>
                <Button type='onSubmit' color={successProfileDelete ? 'success' : 'primary'} block>
                  {loadingProfileDelete ? 'Eliminando...' : successProfileDelete ? 'Eliminado' : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorProfileDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorProfileDelete} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
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
