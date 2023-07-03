import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { festivosUpdateInfo, getFestivos } from 'redux/actions/festivosActions'
import { FESTIVOS_UPDATE_RESET } from 'redux/constants/festivosConstants'
import styles from '../styles/updateFestivosModalStyles'

const useStyles = makeStyles(styles)

const UpdateFestivosModal = ({ handleCloseModal, updateFestivosModal, showUpdateFestivos }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoFestivos, setInfoFestivos] = useState(showUpdateFestivos)

  const { loadingFestivosUpdate, errorFestivosUpdate, successFestivosUpdate } = useSelector((state) => state.festivosUpdate)

  useEffect(() => {
    if (successFestivosUpdate) {
      dispatch(getFestivos())
      setTimeout(() => {
        dispatch({ type: FESTIVOS_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successFestivosUpdate])

  const updateFestivosHandler = (e) => {
    e.preventDefault()
    infoFestivos.dia = infoFestivos.fecha_seleccionada.getDate() 
    infoFestivos.mes = infoFestivos.fecha_seleccionada.getMonth() + 1
    infoFestivos.anio = infoFestivos.fecha_seleccionada.getFullYear()
    dispatch(festivosUpdateInfo(infoFestivos))
  }
  return (
    <Dialog
      open={updateFestivosModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateFestivosHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Festivo`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12} md={6}>
              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Día Festivo"
                  value={infoFestivos.fecha_seleccionada}
                  onChange={(e) => setInfoFestivos({ ...infoFestivos, fecha_seleccionada: e })}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  style={{width:"100%"}}
                />
              </MuiPickersUtilsProvider>
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successFestivosUpdate ? 'success' : 'primary'} block>
                {loadingFestivosUpdate ? 'Actualizando...' : successFestivosUpdate ? 'Festivo Actualizado' : 'Actualizar Festivo'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorFestivosUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorFestivosUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateFestivosModal
