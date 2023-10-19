import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import { deleteDificulty } from 'redux/actions/dificultiesActions'
import { DIFICULTIES_DELETE_RESET, DIFICULTIES_LIST_RESET } from 'redux/constants/dificultiesConstants'
import styles from '../styles/validationDificultyModalStyles'

const useStyles = makeStyles(styles)

const DeleteDificultyModal = ({ closeDeleteDificultyModal, deleteDificultyModal, deleteDificultyInfo }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { loadingDificultiesDelete, successDificultiesDelete, errorDificultiesDelete } = useSelector(
    (state) => state.dificultiesDelete
  )
  useEffect(() => {
    let timeOut = ''
    if (successDificultiesDelete) {
      timeOut = setTimeout(() => {
        dispatch({ type: DIFICULTIES_DELETE_RESET })
        dispatch({ type: DIFICULTIES_LIST_RESET })
        closeDeleteDificultyModal()
      }, 1000)
    }
    return () => clearTimeout(timeOut)
  }, [successDificultiesDelete])

  useEffect(() => {
    return () => dispatch({ type: DIFICULTIES_DELETE_RESET })
  }, [dispatch])

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteDificulty(deleteDificultyInfo.id_dificultad))
  }

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={deleteDificultyModal}
      keepMounted
      onClose={closeDeleteDificultyModal}
      aria-labelledby='delete-dificulty'
      aria-describedby='delete-dificulty-modal'
    >
      <form onSubmit={handleDelete}>
        <DialogTitle id='delete-dificulty' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={closeDeleteDificultyModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Eliminar Dificultad</h4>
        </DialogTitle>

        <DialogContent id='delete-dificulty-modal' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <Typography variant='body1' gutterBottom>
                ¿Está seguro de eliminar la dificultad <strong>{deleteDificultyInfo.dificultad}</strong> de <strong>{deleteDificultyInfo.codigo_trazabilidad}</strong>?
              </Typography>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button type='submit' color='primary' block disabled={loadingDificultiesDelete}>
            {loadingDificultiesDelete ? 'Eliminando..' : successDificultiesDelete ? 'Dificultad Eliminada' : 'Aceptar'}
          </Button>
          <Button type='submit' color='danger' block onClick={closeDeleteDificultyModal}>
            cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DeleteDificultyModal
