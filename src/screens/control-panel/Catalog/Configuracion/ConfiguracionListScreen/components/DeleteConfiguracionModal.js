import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { deleteConfiguracion, getConfiguracions } from 'redux/actions/configuracionActions'
import { CONFIGURACION_DELETE_RESET } from 'redux/constants/configuracionConstants'
import styles from '../styles/deleteConfiguracionModalStyles'

const useStyles = makeStyles(styles)

const DeleteConfiguracionModal = ({ handleCloseDeleteConfiguracionModal, deleteConfiguracionModal, showDeleteConfiguracionInfo }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { successConfiguracionDelete, errorConfiguracionDelete, loadingConfiguracionDelete } = useSelector((state) => state.configuracionDelete)

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteConfiguracion(showDeleteConfiguracionInfo.id_configuracion))
  }

  useEffect(() => {
    if (successConfiguracionDelete) {
      dispatch(getConfiguracions())
      setTimeout(() => {
        dispatch({ type: CONFIGURACION_DELETE_RESET })
        handleCloseDeleteConfiguracionModal()
      }, 1000)
    }
  }, [successConfiguracionDelete])

  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteConfiguracionModal}
        keepMounted
        onClose={handleCloseDeleteConfiguracionModal}
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
              onClick={handleCloseDeleteConfiguracionModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Parámetro</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>
                  Va a eliminar el parámetro <strong>{showDeleteConfiguracionInfo?.parametro}</strong>
                </Typography>
              </GridItem>
              <GridItem xs={12} style={{ margin: '0 0 20px' }}>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteConfiguracionModal} block>
                  Cancelar
                </Button>
              </GridItem>
              <GridItem xs={6}>
                <Button type='onSubmit' color={successConfiguracionDelete ? 'success' : 'primary'} block>
                  {loadingConfiguracionDelete ? 'Eliminando...' : successConfiguracionDelete ? 'Eliminado' : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorConfiguracionDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorConfiguracionDelete} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default DeleteConfiguracionModal
