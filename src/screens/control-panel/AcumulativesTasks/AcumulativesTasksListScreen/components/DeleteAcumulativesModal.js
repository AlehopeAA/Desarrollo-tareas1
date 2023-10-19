import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, DialogActions, makeStyles } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import styles from '../styles/deleteAcumulativesModalStyles.js'
import { deleteAcumulatives, getAcumulativesList } from 'redux/actions/acumulativesActions'
import { ACUMULATIVES_LIST_RESET, ACUMULATIVES_DELETE_RESET } from 'redux/constants/acumulativesConstants'

const useStyles = makeStyles(styles)

const DeleteAcumulativesModal = ({ handleCloseDeleteAcumulativesModal, deleteAcumulativesModal, showDeleteAcumulativesInfo }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { successAcumulativesDelete, errorAcumulativesDelete, loadingAcumulativesDelete } = useSelector((state) => state.acumulativesDelete)
  
  useEffect(() => {
    let timeOut = ''
    if (successAcumulativesDelete) {      
      timeOut = setTimeout(() => {
        dispatch(getAcumulativesList())
        dispatch({ type: ACUMULATIVES_LIST_RESET })
        dispatch({ type: ACUMULATIVES_DELETE_RESET })
        handleCloseDeleteAcumulativesModal()
      }, 1000)
    }
    return () => clearTimeout(timeOut)
  }, [successAcumulativesDelete])

  const handleDeleteAcumulatives = (e) => {
    e.preventDefault()
    dispatch(deleteAcumulatives(showDeleteAcumulativesInfo.id_acumulativa))
  }

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={deleteAcumulativesModal}
      keepMounted
      onClose={handleCloseDeleteAcumulativesModal}
      aria-labelledby='delete-acumulatives'
      aria-describedby='delete-acumulatives-modal'
    >
      <form onSubmit={handleDeleteAcumulatives}>
        <DialogTitle id='delete-acumulatives' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={handleCloseDeleteAcumulativesModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Eliminar relación entre tareas</h4>
        </DialogTitle>

        <DialogContent id='acumulatives-delete-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <Typography variant='body1' gutterBottom>
                ¿Está seguro de eliminar la relación entre tareas?
              </Typography>
            </GridItem>
            <GridItem xs={6}>
              <Button onClick={handleCloseDeleteAcumulativesModal} block>
                Cancelar
              </Button>
            </GridItem>
            <GridItem xs={6}>
              <Button type='onSubmit' color={successAcumulativesDelete ? 'success' : 'primary'} block>
                {loadingAcumulativesDelete ? 'Eliminando...' : successAcumulativesDelete ? 'Eliminado' : 'Eliminar'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorAcumulativesDelete && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorAcumulativesDelete} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default DeleteAcumulativesModal
