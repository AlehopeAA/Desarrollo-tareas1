import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { SERVICE_UPDATE_RESET } from 'redux/constants/serviceConstants'
import { serviceUpdateInfo, getServices } from 'redux/actions/serviceActions'
import styles from '../styles/updateServiceModalStyles'

const useStyles = makeStyles(styles)

const UpdateServiceModal = ({ handleCloseModal, updateServiceModal, showUpdateService }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoService, setInfoService] = useState(showUpdateService)

  const { loadingServiceUpdate, errorServiceUpdate, successServiceUpdate } = useSelector((state) => state.serviceUpdate)

  useEffect(() => {
    if (successServiceUpdate) {
      dispatch(getServices())
      setTimeout(() => {
        dispatch({ type: SERVICE_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successServiceUpdate])

  const updateServiceHandler = (e) => {
    e.preventDefault()
    dispatch(serviceUpdateInfo(infoService))
  }
  return (
    <Dialog
      open={updateServiceModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateServiceHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Servicio`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12} md={6}>
              <CustomInput
                labelText={'COD. SERVICIO'}
                id='codeService'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoService.codigo_servicio,
                  onChange: (e) => setInfoService({ ...infoService, codigo_servicio: e.target.value }),
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
                  value: infoService.descripcion_servicio,
                  onChange: (e) => setInfoService({ ...infoService, descripcion_servicio: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' color={successServiceUpdate ? 'success' : 'primary'} block>
                {loadingServiceUpdate
                  ? 'Actualizando...'
                  : successServiceUpdate
                  ? 'Servicio Actualizado'
                  : 'Actualizar Servicio'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorServiceUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorServiceUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateServiceModal
