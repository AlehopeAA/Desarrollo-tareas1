import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { deleteUnit } from 'redux/actions/unitActions'
import { UNIT_LIST_RESET, UNIT_DELETE_RESET } from 'redux/constants/unitConstants'
import styles from '../styles/deleteUnitModalStyles'

const useStyles = makeStyles(styles)

const DeleteUnitModal = ({ handleCloseDeleteUnitModal, deleteUnitModal, showDeleteUnitInfo }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { successUnitDelete, errorUnitDelete, loadingUnitDelete } = useSelector((state) => state.unitDelete)

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteUnit(showDeleteUnitInfo.id_unidad))
  }

  useEffect(() => {
    if (successUnitDelete) {
      setTimeout(() => {
        dispatch({ type: UNIT_LIST_RESET })
        dispatch({ type: UNIT_DELETE_RESET })
        handleCloseDeleteUnitModal()
      }, 1000)
    }
  }, [successUnitDelete])

  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteUnitModal}
        keepMounted
        onClose={handleCloseDeleteUnitModal}
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
              onClick={handleCloseDeleteUnitModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Unidad</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>
                  Va a eliminar la unidad <strong>{showDeleteUnitInfo?.codigo_unidad}</strong>
                </Typography>
              </GridItem>
              <GridItem xs={12} style={{ margin: '0 0 20px' }}>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteUnitModal} block>
                  Cancelar
                </Button>
              </GridItem>
              <GridItem xs={6}>
                <Button type='onSubmit' color={successUnitDelete ? 'success' : 'primary'} block>
                  {loadingUnitDelete ? 'Eliminando...' : successUnitDelete ? 'Eliminado' : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorUnitDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorUnitDelete} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default DeleteUnitModal
