import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Typography,
  makeStyles,
  MenuItem,
  Select as Selectable,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Clearfix from 'components/Clearfix/Clearfix'
import SweetAlert from 'react-bootstrap-sweetalert'
import styles from '../../styles/updateCorreccionModalStyles'
import { correccionGlobalUpdateInfo } from 'redux/actions/evaluacionActions'
import { EVALUACION_CORRECCION_GLOBAL_UPDATE_RESET } from 'redux/constants/evaluacionConstants'

const useStyles = makeStyles(styles)

const UpdateCorreccionNivelGlobalModal = ({ handleUpdateModal, handleCloseModal, updateInfoModal, info }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { loadingCorreccionGlobalUpdate, errorCorreccionGlobalUpdate, successCorreccionGlobalUpdate, correccionGlobalUpdated } = useSelector((state) => state.evaluacionCorreccionGlobalUpdate)
  const valores = ['INSATISFACTORIO', 'SATISFACTORIO', 'ALTO', 'EXCELENTE']
  const [alert, setAlert] = useState(null)
  const [infoCorreccion, setInfoCorreccion] = useState(info)
  
  useEffect(() => {
    if (successCorreccionGlobalUpdate) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='HECHO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Corrección global actualizada correctamente.
        </SweetAlert>
      )
    }
  }, [successCorreccionGlobalUpdate])

  const updateCorreccionHandler = (e) => {
    e.preventDefault()
    
    if (infoCorreccion.nivel_global_corregido) {
      const data = {
        id_evaluacion: infoCorreccion.id_evaluacion,
        nivel_global_corregido: infoCorreccion.nivel_global_corregido,
      }
      dispatch(correccionGlobalUpdateInfo(data))
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
          Dede informar algún valor de corrección.
        </SweetAlert>
      )
    }
  }

  const closeAlert = () => {
    setAlert(null)
  }

  const confirmSuccess = () => {
    handleUpdateModal(correccionGlobalUpdated)
    dispatch({ type: EVALUACION_CORRECCION_GLOBAL_UPDATE_RESET })
    handleCloseModal()
    setAlert(null)
  }

  const confirmClose = () => {
    dispatch({ type: EVALUACION_CORRECCION_GLOBAL_UPDATE_RESET })
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
        fullWidth = 'true'
        maxWidth = 'sm'
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
              <GridItem xs={6}>
                <Typography variant='body1' gutterBottom>
                  Nivel Original: <span className={infoCorreccion.nivel_global == 'EXCELENTE'? classes.evaluacion_excelente : infoCorreccion.nivel_global == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : infoCorreccion.nivel_global == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{infoCorreccion.nivel_global}</span>
                </Typography>
              </GridItem>
              <GridItem xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='select-nivel-corregido'>Nivel Corregido</InputLabel>
                  <Selectable
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    className={infoCorreccion.nivel_global_corregido == 'EXCELENTE'? classes.evaluacion_excelente : infoCorreccion.nivel_global_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : infoCorreccion.nivel_global_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }
                    value={infoCorreccion.nivel_global_corregido}
                    onChange={(e) => {                    
                      setInfoCorreccion({ ...infoCorreccion, nivel_global_corregido: e.target.value })
                    }}
                    inputProps={{
                      name: 'select-nivel-corregido',
                      id: 'select-nivel-corregido',
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
            </GridContainer>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <GridContainer>
              <GridItem xs={12}>
                <Button type='submit' color='primary' block>
                  {loadingCorreccionGlobalUpdate ? 'Actualizando...' : 'Actualizar Corrección'}
                </Button>
                <Clearfix />
              </GridItem>
              {errorCorreccionGlobalUpdate && (
                <GridItem xs={12}>
                  <SnackbarContent message={errorCorreccionGlobalUpdate} color='danger' />
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

export default UpdateCorreccionNivelGlobalModal
