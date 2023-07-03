import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  Typography,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select as Selectable,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Clearfix from 'components/Clearfix/Clearfix'
import SweetAlert from 'react-bootstrap-sweetalert'
import styles from '../../styles/updateCorreccionModalStyles'
import { correccionUpdateInfo } from 'redux/actions/evaluacionActions'
import { EVALUACION_CORRECCION_UPDATE_RESET } from 'redux/constants/evaluacionConstants'

const useStyles = makeStyles(styles)

const UpdateCorreccionNivelModal = ({ handleUpdateModal, handleCloseModal, updateInfoModal, info }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { loadingCorreccionUpdate, errorCorreccionUpdate, successCorreccionUpdate, correccionUpdated } = useSelector((state) => state.evaluacionCorreccionUpdate)
  const valores = ['INSATISFACTORIO', 'SATISFACTORIO', 'ALTO', 'EXCELENTE']
  const [alert, setAlert] = useState(null)
  const [infoCorreccion, setInfoCorreccion] = useState(info)
  
  useEffect(() => {
    if (successCorreccionUpdate) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='HECHO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Corrección actualizada correctamente.
        </SweetAlert>
      )
    }
  }, [successCorreccionUpdate])

  const updateCorreccionHandler = (e) => {
    e.preventDefault()
    
    if (infoCorreccion.nivel_unidades_corregido || infoCorreccion.nivel_tiempo_corregido || infoCorreccion.nivel_porcentaje_jornada_corregido || infoCorreccion.nivel_porcentaje_entrada_corregido || infoCorreccion.observaciones) {
      const data = {
        id_detalle_evaluacion: infoCorreccion.id_detalle_evaluacion,
        nivel_unidades_corregido: infoCorreccion.nivel_unidades_corregido,
        nivel_tiempo_corregido: infoCorreccion.nivel_tiempo_corregido,
        nivel_porcentaje_jornada_corregido: infoCorreccion.nivel_porcentaje_jornada_corregido,
        nivel_porcentaje_entrada_corregido: infoCorreccion.nivel_porcentaje_entrada_corregido,
        observaciones: infoCorreccion.observaciones,
        es_supervision: true,
      }
      dispatch(correccionUpdateInfo(data))
    }
    else {
      setAlert(
        <SweetAlert
          warning
          style={{ display: 'block', marginTop: '-100px' }}
          title='Aviso!'
          onConfirm={() => closeAlert()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.warningBtnCssClass}
        >
          Dede informar algún valor de corrección u observaciones.
        </SweetAlert>
      )
    }
  }

  const closeAlert = () => {
    setAlert(null)
  }

  const confirmSuccess = () => {
    handleUpdateModal(correccionUpdated)
    dispatch({ type: EVALUACION_CORRECCION_UPDATE_RESET })
    handleCloseModal()
    setAlert(null)
  }

  const confirmClose = () => {
    dispatch({ type: EVALUACION_CORRECCION_UPDATE_RESET })
    handleCloseModal()
    setAlert(null)
  }

  return (
    <>
      <Dialog
        open={updateInfoModal}
        keepMounted
        onClose={confirmClose}
        aria-labelledby='notice-modal-slide-title'
        aria-describedby='notice-modal-slide-description'
      >
        <form onSubmit={updateCorreccionHandler} autoComplete='false'>
          <DialogTitle id='notice-modal-slide-title' disableTypography className={classes.modalHeader}>
            <Button
              justIcon
              className={classes.modalCloseButton}
              key='close'
              aria-label='Close'
              color='transparent'
              onClick={confirmClose}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>{`Editar Corrección`}</h4>
          </DialogTitle>
          <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography variant='body1' gutterBottom>
                  Tipo tarea: <strong>{infoCorreccion.tipo_tarea}</strong>
                </Typography>
              </GridItem>
              <GridItem xs={12}>
                <Typography variant='body1' gutterBottom>
                  Descripción: <strong>{infoCorreccion.descripcion_tarea}</strong>
                </Typography>
              </GridItem>
              <GridItem xs={12} md={6}>
                <Typography variant='body1' gutterBottom>
                  Horas dedicadas: <strong>{infoCorreccion.horas}</strong>
                </Typography>
              </GridItem>
              <GridItem xs={12} md={6}>
                <Typography variant='body1' gutterBottom>
                  Total unidades: <strong>{infoCorreccion.unidades}</strong>
                </Typography>
              </GridItem>
              <GridItem xs={6}>
                <Typography variant='body1' gutterBottom>
                  D. Unidades (Original): <span className={infoCorreccion.nivel_unidades == 'EXCELENTE'? classes.evaluacion_excelente : infoCorreccion.nivel_unidades == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : infoCorreccion.nivel_unidades == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{infoCorreccion.nivel_unidades}</span>
                </Typography>
              </GridItem>
              <GridItem xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='select-unidades-corregido'>D. Unidades (Corregido)</InputLabel>
                  <Selectable
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    className={infoCorreccion.nivel_unidades_corregido == 'EXCELENTE'? classes.evaluacion_excelente : infoCorreccion.nivel_unidades_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : infoCorreccion.nivel_unidades_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }
                    value={infoCorreccion.nivel_unidades_corregido}
                    onChange={(e) => {                    
                      setInfoCorreccion({ ...infoCorreccion, nivel_unidades_corregido: e.target.value })
                    }}
                    inputProps={{
                      name: 'select-unidades-corregido',
                      id: 'select-unidades-corregido',
                      required: false,
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Selecciona uno
                    </MenuItem>
                    {valores.map((valor, index) => (
                      <MenuItem
                        value={valor}
                        key={index}
                        classes={{ root: valor == 'EXCELENTE'? classes.evaluacion_excelente : valor == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : valor == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto, selected: classes.selectMenuItemSelected}}
                      >
                        {`${valor}`}
                      </MenuItem>
                    ))}
                  </Selectable>
                </FormControl>
              </GridItem>
              <GridItem xs={6}>
                <Typography variant='body1' gutterBottom>
                  D. Tiempo (Original): <span className={infoCorreccion.nivel_tiempo == 'EXCELENTE'? classes.evaluacion_excelente : infoCorreccion.nivel_tiempo == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : infoCorreccion.nivel_tiempo == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{infoCorreccion.nivel_tiempo}</span>
                </Typography>
              </GridItem>
              <GridItem xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='select-tiempo-corregido'>D. Tiempo (Corregido)</InputLabel>
                  <Selectable
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    className={infoCorreccion.nivel_tiempo_corregido == 'EXCELENTE'? classes.evaluacion_excelente : infoCorreccion.nivel_tiempo_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : infoCorreccion.nivel_tiempo_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }
                    value={infoCorreccion.nivel_tiempo_corregido}
                    onChange={(e) => {                    
                      setInfoCorreccion({ ...infoCorreccion, nivel_tiempo_corregido: e.target.value })
                    }}
                    inputProps={{
                      name: 'select-tiempo-corregido',
                      id: 'select-tiempo-corregido',
                      required: false,
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Selecciona uno
                    </MenuItem>
                    {valores.map((valor, index) => (
                      <MenuItem
                        value={valor}
                        key={index}
                        classes={{ root: valor == 'EXCELENTE'? classes.evaluacion_excelente : valor == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : valor == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto, selected: classes.selectMenuItemSelected}}
                      >
                        {`${valor}`}
                      </MenuItem>
                    ))}
                  </Selectable>
                </FormControl>
              </GridItem>
              <GridItem xs={6}>
                <Typography variant='body1' gutterBottom>
                  D. % Entrada (Original): <span className={infoCorreccion.nivel_porcentaje_entrada == 'EXCELENTE'? classes.evaluacion_excelente : infoCorreccion.nivel_porcentaje_entrada == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : infoCorreccion.nivel_porcentaje_entrada == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{infoCorreccion.nivel_porcentaje_entrada}</span>
                </Typography>
              </GridItem>
              <GridItem xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='select-porcentaje-entrada-corregido'>D. % Entrada (Corregido)</InputLabel>
                  <Selectable
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    className={infoCorreccion.nivel_porcentaje_entrada_corregido == 'EXCELENTE'? classes.evaluacion_excelente : infoCorreccion.nivel_porcentaje_entrada_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : infoCorreccion.nivel_porcentaje_entrada_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }
                    value={infoCorreccion.nivel_porcentaje_entrada_corregido}
                    onChange={(e) => {                    
                      setInfoCorreccion({ ...infoCorreccion, nivel_porcentaje_entrada_corregido: e.target.value })
                    }}
                    inputProps={{
                      name: 'select-porcentaje-entrada-corregido',
                      id: 'select-porcentaje-entrada-corregido',
                      required: false,
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Selecciona uno
                    </MenuItem>
                    {valores.map((valor, index) => (
                      <MenuItem
                        value={valor}
                        key={index}
                        classes={{ root: valor == 'EXCELENTE'? classes.evaluacion_excelente : valor == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : valor == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto, selected: classes.selectMenuItemSelected}}
                      >
                        {`${valor}`}
                      </MenuItem>
                    ))}
                  </Selectable>
                </FormControl>
              </GridItem>
              <GridItem xs={6}>
                <Typography variant='body1' gutterBottom>
                  D. % Jornada (Original): <span className={infoCorreccion.nivel_porcentaje_jornada == 'EXCELENTE'? classes.evaluacion_excelente : infoCorreccion.nivel_porcentaje_jornada == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : infoCorreccion.nivel_porcentaje_jornada == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{infoCorreccion.nivel_porcentaje_jornada}</span>
                </Typography>
              </GridItem>
              <GridItem xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='select-porcentaje-jornada-corregido'>D. % Jornada (Corregido)</InputLabel>
                  <Selectable
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    className={infoCorreccion.nivel_porcentaje_jornada_corregido == 'EXCELENTE'? classes.evaluacion_excelente : infoCorreccion.nivel_porcentaje_jornada_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : infoCorreccion.nivel_porcentaje_jornada_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }
                    value={infoCorreccion.nivel_porcentaje_jornada_corregido}
                    onChange={(e) => {                    
                      setInfoCorreccion({ ...infoCorreccion, nivel_porcentaje_jornada_corregido: e.target.value })
                    }}
                    inputProps={{
                      name: 'select-porcentaje-jornada-corregido',
                      id: 'select-porcentaje-jornada-corregido',
                      required: false,
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Selecciona uno
                    </MenuItem>
                    {valores.map((valor, index) => (
                      <MenuItem
                        value={valor}
                        key={index}
                        classes={{ root: valor == 'EXCELENTE'? classes.evaluacion_excelente : valor == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : valor == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto, selected: classes.selectMenuItemSelected}}
                      >
                        {`${valor}`}
                      </MenuItem>
                    ))}
                  </Selectable>
                </FormControl>
              </GridItem>
              <GridItem xs={12}>
                <CustomInput
                    labelText={'Observaciones'}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: infoCorreccion.observaciones,
                      onChange: (e) => setInfoCorreccion({ ...infoCorreccion, observaciones: e.target.value }),
                      type: 'text',
                    }}
                />
              </GridItem>
            </GridContainer>
              
                
              
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <GridContainer>
              <GridItem xs={12}>
                <Button type='submit' color='primary' block>
                  {loadingCorreccionUpdate ? 'Actualizando...' : 'Actualizar Corrección'}
                </Button>
                <Clearfix />
              </GridItem>
              {errorCorreccionUpdate && (
                <GridItem xs={12}>
                  <SnackbarContent message={errorCorreccionUpdate} color='danger' />
                </GridItem>
              )}
            </GridContainer>
          </DialogActions>
        </form>
      </Dialog>
      {alert}
    </>
  )
}

export default UpdateCorreccionNivelModal
