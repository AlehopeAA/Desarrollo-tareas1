import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { deleteTaskOther } from 'redux/actions/taskOtherActions'
import { TASK_OTHER_LIST_RESET, TASK_OTHER_DELETE_RESET } from 'redux/constants/taskOtherConstants'
import styles from '../styles/deleteTaskOtherModalStyles'

const useStyles = makeStyles(styles) 

const DeleteTaskModal = ({ handleCloseDeleteTaskModal, deleteTaskModal, showDeleteTaskInfo }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { successTaskOtherDelete, errorTaskOtherDelete, loadingTaskOtherDelete } = useSelector(
    (state) => state.taskOtherDelete
  )

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteTaskOther(showDeleteTaskInfo.id_tarea))
  }

  useEffect(() => {
    if (successTaskOtherDelete) {
      dispatch({ type: TASK_OTHER_LIST_RESET })
      dispatch({ type: TASK_OTHER_DELETE_RESET })
      handleCloseDeleteTaskModal()
    }
  }, [successTaskOtherDelete])

  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteTaskModal}
        keepMounted
        onClose={handleCloseDeleteTaskModal}
        aria-labelledby='team-modal-delete-title'
        aria-describedby='team-modal-delete-description'
      >
        <form onSubmit={handleSumit}>
          <DialogTitle id='team-modal-delete-title' disableTypography className={classes.modalHeader}>
            <Button
              justIcon
              className={classes.modalCloseButton}
              key='close'
              aria-label='Close'
              color='transparent'
              onClick={handleCloseDeleteTaskModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Tarea Ord/Ext</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>
                  Va a eliminar la tarea Ord/Ext <strong>{showDeleteTaskInfo?.descripcion_tarea}</strong>
                </Typography>
              </GridItem>
              <GridItem xs={12} style={{ margin: '0 0 20px' }}>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteTaskModal} block>
                  Cancelar
                </Button>
              </GridItem>
              <GridItem xs={6}>
                <Button type='onSubmit' color={successTaskOtherDelete ? 'success' : 'primary'} block>
                  {loadingTaskOtherDelete ? 'Eliminando...' : successTaskOtherDelete ? 'Eliminado' : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorTaskOtherDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorTaskOtherDelete} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default DeleteTaskModal
