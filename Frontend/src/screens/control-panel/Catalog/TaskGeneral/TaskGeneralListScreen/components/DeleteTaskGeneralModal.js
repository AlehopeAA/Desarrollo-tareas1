import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { deleteTaskGeneral } from 'redux/actions/taskGeneralActions'
import { TASK_GENERAL_LIST_RESET, TASK_GENERAL_DELETE_RESET } from 'redux/constants/taskGeneralConstants'
import styles from '../styles/deleteTaskGeneralModalStyles'

const useStyles = makeStyles(styles)

const DeleteTaskModal = ({
  handleCloseDeleteTaskModal,
  deleteTaskModal,
  showDeleteTaskInfo,
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { successTaskGeneralDelete, errorTaskGeneralDelete, loadingTaskGeneralDelete } = useSelector(
    (state) => state.taskGeneralDelete
  )

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteTaskGeneral(showDeleteTaskInfo.id_tarea))
  }

  useEffect(() => {
    if (successTaskGeneralDelete) {
      setTimeout(() => {
        dispatch({ type: TASK_GENERAL_LIST_RESET })
        dispatch({ type: TASK_GENERAL_DELETE_RESET })
        handleCloseDeleteTaskModal()
      }, 1000)
    }
  }, [successTaskGeneralDelete])

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
            <h4>Eliminar Tarea General</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>
                  Va a eliminar la tarea general <strong>{showDeleteTaskInfo?.descripcion_tarea}</strong>
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
                <Button type='onSubmit' color={successTaskGeneralDelete ? 'success' : 'primary'} block>
                  {loadingTaskGeneralDelete ? 'Eliminando...' : successTaskGeneralDelete ? 'Eliminado' : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorTaskGeneralDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorTaskGeneralDelete} color='danger' />
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
