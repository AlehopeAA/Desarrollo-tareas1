import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { departamentUpdateInfo, getDepartaments } from 'redux/actions/departamentActions'

import { DEPARTAMENT_UPDATE_RESET } from 'redux/constants/departamentConstants'
import styles from '../styles/updateDepartamentModalStyles'

const useStyles = makeStyles(styles)

const UpdateDepartamentModal = ({ handleCloseModal, updateDepartamentModal, showUpdateDepartament }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoDepartament, setInfoDepartament] = useState(showUpdateDepartament)

  const { loadingDepartamentUpdate, errorDepartamentUpdate, successDepartamentUpdate } = useSelector(
    (state) => state.departamentUpdate
  )

  useEffect(() => {
    if (successDepartamentUpdate) {
      dispatch(getDepartaments())
      setTimeout(() => {
        dispatch({ type: DEPARTAMENT_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [dispatch, successDepartamentUpdate])

  const updateDepartamentHandler = (e) => {
    e.preventDefault()
    dispatch(departamentUpdateInfo(infoDepartament))
  }
  return (
    <Dialog
      open={updateDepartamentModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateDepartamentHandler} autoComplete='false'>
        <DialogTitle id='notice-modal-slide-title' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={handleCloseModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>{`Editar Departamento`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12} md={6}>
              <CustomInput
                labelText={'COD. DEPARTAMENTO'}
                id='codeDepartament'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoDepartament.codigo_departamento,
                  onChange: (e) => setInfoDepartament({ ...infoDepartament, codigo_departamento: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} md={6}>
              <CustomInput
                labelText={'DESCRIPCION'}
                id='description'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoDepartament.descripcion_departamento,
                  onChange: (e) => setInfoDepartament({ ...infoDepartament, descripcion_departamento: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' color={successDepartamentUpdate ? 'success' : 'primary'} block>
                {loadingDepartamentUpdate
                  ? 'Actualizando...'
                  : successDepartamentUpdate
                  ? 'Departamento Actualizado'
                  : 'Actualizar Departamento'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorDepartamentUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorDepartamentUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <GridContainer></GridContainer>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UpdateDepartamentModal
