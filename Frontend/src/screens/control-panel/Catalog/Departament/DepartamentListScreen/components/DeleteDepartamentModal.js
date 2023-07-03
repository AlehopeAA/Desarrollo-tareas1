import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import { deleteDepartament, getDepartaments } from 'redux/actions/departamentActions'
import { DEPARTAMENT_DELETE_RESET } from 'redux/constants/departamentConstants'

import styles from '../styles/deleteDepartamentModalStyles.js'

const useStyles = makeStyles(styles)
const DeleteDepartamentModal = ({
  handleCloseDeleteDepartamentModal,
  deleteDepartamentModal,
  showDeleteDepartamentInfo,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { successDepartamentDelete, errorDepartamentDelete, loadingDepartamentDelete } = useSelector(
    (state) => state.departamentDelete
  )

  const handleSumit = (e) => {
    e.preventDefault()
    dispatch(deleteDepartament(showDeleteDepartamentInfo.id_departamento))
  }

  useEffect(() => {
    if (successDepartamentDelete) {
      setTimeout(() => {
        dispatch(getDepartaments())
        dispatch({ type: DEPARTAMENT_DELETE_RESET })
        handleCloseDeleteDepartamentModal()
      }, 1000)
    }
  }, [successDepartamentDelete])

  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteDepartamentModal}
        keepMounted
        onClose={handleCloseDeleteDepartamentModal}
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
              onClick={handleCloseDeleteDepartamentModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Departamento</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>Va a eliminar la departamento {showDeleteDepartamentInfo?.codigo_departamento}</Typography>
              </GridItem>
              <GridItem xs={12} style={{ margin: '0 0 20px' }}>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
              <GridItem xs={12} md={6}>
                <Button onClick={handleCloseDeleteDepartamentModal} block>
                  Cancelar
                </Button>
              </GridItem>
              <GridItem xs={12} md={6}>
                <Button type='onSubmit' color={successDepartamentDelete ? 'success' : 'primary'} block>
                  {loadingDepartamentDelete ? 'Eliminando...' : successDepartamentDelete ? 'Eliminado' : 'Eliminar'}
                </Button>
              </GridItem>
            </GridContainer>
            {errorDepartamentDelete && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorDepartamentDelete} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default DeleteDepartamentModal
