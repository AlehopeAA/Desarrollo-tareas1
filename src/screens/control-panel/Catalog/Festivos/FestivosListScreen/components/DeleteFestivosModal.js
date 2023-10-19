import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { deleteFestivos, getFestivos } from 'redux/actions/festivosActions'
import { FESTIVOS_DELETE_RESET } from 'redux/constants/festivosConstants'
import styles from '../styles/deleteFestivosModalStyles'

const useStyles = makeStyles(styles)

const DeleteFestivosModal = ({ handleCloseDeleteFestivosModal, deleteFestivosModal, showDeleteFestivosInfo }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { successFestivosDelete, errorFestivosDelete, loadingFestivosDelete } = useSelector((state) => state.festivosDelete)

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteFestivos(showDeleteFestivosInfo.id_calendario))
  }

  useEffect(() => {
    if (successFestivosDelete) {
      dispatch(getFestivos())
      setTimeout(() => {
        dispatch({ type: FESTIVOS_DELETE_RESET })
        handleCloseDeleteFestivosModal()
      }, 1000)
    }
  }, [successFestivosDelete])

  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteFestivosModal}
        keepMounted
        onClose={handleCloseDeleteFestivosModal}
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
              onClick={handleCloseDeleteFestivosModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Festivo</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>
                  Va a eliminar el festivo <strong>{showDeleteFestivosInfo?.dia}/{showDeleteFestivosInfo?.mes}/{showDeleteFestivosInfo?.anio}</strong>
                </Typography>
              </GridItem>
              <GridItem xs={12} style={{ margin: '0 0 20px' }}>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteFestivosModal} block>
                  Cancelar
                </Button>
              </GridItem>
              <GridItem xs={6}>
                <Button type='onSubmit' color={successFestivosDelete ? 'success' : 'primary'} block>
                  {loadingFestivosDelete ? 'Eliminando...' : successFestivosDelete ? 'Eliminado' : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorFestivosDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorFestivosDelete} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default DeleteFestivosModal
