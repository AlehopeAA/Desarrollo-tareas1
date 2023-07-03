import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import { deleteActivity } from 'redux/actions/activitiesActions'
import { ACTIVITIES_DELETE_RESET, ACTIVITIES_LIST_RESET } from 'redux/constants/activitiesConstants'
import styles from '../styles/validationAcivityModalStyles'

const useStyles = makeStyles(styles)

const DeleteActivityModal = ({ closeDeleteActivityModal, deleteActivityModal, deleteActivityInfo }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { loadingActivitiesDelete, successActivitiesDelete, errorActivitiesDelete } = useSelector(
    (state) => state.activitiesDelete
  )
  useEffect(() => {
    let timeOut = ''
    if (successActivitiesDelete) {
      dispatch({ type: ACTIVITIES_LIST_RESET })
      timeOut = setTimeout(() => {
        closeDeleteActivityModal()
        dispatch({ type: ACTIVITIES_DELETE_RESET })
      }, 1000)
    }
    return () => clearTimeout(timeOut)
  }, [successActivitiesDelete])

  useEffect(() => {
    return () => dispatch({ type: ACTIVITIES_DELETE_RESET })
  }, [dispatch])

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteActivity(deleteActivityInfo.id_actividad))
  }

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={deleteActivityModal}
      keepMounted
      onClose={closeDeleteActivityModal}
      aria-labelledby='delete-activity'
      aria-describedby='delete-activity-modal'
    >
      <form onSubmit={handleDelete}>
        <DialogTitle id='delete-activity' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={closeDeleteActivityModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Eliminar Actividad</h4>
        </DialogTitle>

        <DialogContent id='delete-activity-modal' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <Typography variant='body1' gutterBottom>
                ¿Está seguro de eliminar la actividad <strong>{deleteActivityInfo.descripcion_tarea}</strong>?
              </Typography>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button type='submit' color='primary' block disabled={loadingActivitiesDelete}>
            {loadingActivitiesDelete ? 'Eliminando..' : successActivitiesDelete ? 'Actividad Eliminada' : 'Aceptar'}
          </Button>
          <Button type='submit' color='danger' block onClick={closeDeleteActivityModal}>
            cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DeleteActivityModal
