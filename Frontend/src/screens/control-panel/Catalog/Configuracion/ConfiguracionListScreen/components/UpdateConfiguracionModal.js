import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { configuracionUpdateInfo, getConfiguracions } from 'redux/actions/configuracionActions'
import { CONFIGURACION_UPDATE_RESET } from 'redux/constants/configuracionConstants'
import styles from '../styles/updateConfiguracionModalStyles'

const useStyles = makeStyles(styles)

const UpdateConfiguracionModal = ({ handleCloseModal, updateConfiguracionModal, showUpdateConfiguracion }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoConfiguracion, setInfoConfiguracion] = useState(showUpdateConfiguracion)

  const { loadingConfiguracionUpdate, errorConfiguracionUpdate, successConfiguracionUpdate } = useSelector((state) => state.configuracionUpdate)

  useEffect(() => {
    if (successConfiguracionUpdate) {
      dispatch(getConfiguracions())
      setTimeout(() => {
        dispatch({ type: CONFIGURACION_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successConfiguracionUpdate])

  const updateConfiguracionHandler = (e) => {
    e.preventDefault()
    dispatch(configuracionUpdateInfo(infoConfiguracion))
  }
  return (
    <Dialog
      open={updateConfiguracionModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateConfiguracionHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Parámetro`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12} sm={6}>
              <CustomInput
                labelText={'PARÁMETRO'}
                id='parametro'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoConfiguracion.parametro,
                  onChange: (e) => setInfoConfiguracion({ ...infoConfiguracion, parametro: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <CustomInput
                labelText={'VALOR'}
                id='valor'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoConfiguracion.valor,
                  onChange: (e) => setInfoConfiguracion({ ...infoConfiguracion, valor: e.target.value }),
                  type: 'number',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <CustomInput
                labelText={'DESCRIPCION'}
                id='description'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoConfiguracion.descripcion,
                  onChange: (e) => setInfoConfiguracion({ ...infoConfiguracion, descripcion: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successConfiguracionUpdate ? 'success' : 'primary'} block>
                {loadingConfiguracionUpdate ? 'Actualizando...' : successConfiguracionUpdate ? 'Parámetro Actualizado' : 'Actualizar Parámetro'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorConfiguracionUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorConfiguracionUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateConfiguracionModal
