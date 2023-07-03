import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import { updateActivity } from 'redux/actions/activitiesActions'
import { ACTIVITIES_UPDATE_RESET, ACTIVITIES_LIST_RESET } from 'redux/constants/activitiesConstants'
import styles from '../styles/validationAcivityModalStyles'

const useStyles = makeStyles(styles)

const ValidationActivityModal = ({ closeUpdateValidateModal, validateActivityModal, validateActivityInfo }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    fecha_actividad,
    validada,
    modalidad,
    horas,
    unidades,
    codigo_trazabilidad,
    descripcion_tarea,
    observaciones,
  } = validateActivityInfo

  const { loadingActivitiesUpdate, successActivitiesUpdate, errorActivitiesUpdate } = useSelector(
    (state) => state.activitiesUpdate
  )
  useEffect(() => {
    if (successActivitiesUpdate) {
      dispatch({ type: ACTIVITIES_LIST_RESET })
      dispatch({ type: ACTIVITIES_UPDATE_RESET })
      closeUpdateValidateModal()
    }
  }, [successActivitiesUpdate])

  useEffect(() => {
    return () => dispatch({ type: ACTIVITIES_UPDATE_RESET })
  }, [dispatch])

  const handleValidation = (e) => {
    e.preventDefault()
    dispatch(updateActivity({ ...validateActivityInfo, validada: 'SI' }))
  }

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={validateActivityModal}
      keepMounted
      onClose={closeUpdateValidateModal}
      aria-labelledby='history-investment'
      aria-describedby='history-investment-modal'
    >
      <form onSubmit={handleValidation}>
        <DialogTitle id='history-investment' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={closeUpdateValidateModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Validar Actividad</h4>
        </DialogTitle>

        <DialogContent id='history-investment-modal' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12} md={6}>
              <Typography variant='body1' gutterBottom>
                Fecha de Actividad: <strong>{format(new Date(fecha_actividad), 'dd-MM-yyyy')}</strong>
              </Typography>
            </GridItem>
            <GridItem xs={6}>
              <Typography variant='body1' gutterBottom>
                Validada: <strong>{validada}</strong>
              </Typography>
            </GridItem>
            <GridItem xs={12} md={6}>
              <Typography variant='body1' gutterBottom>
                Modalidad: <strong>{modalidad}</strong>
              </Typography>
            </GridItem>
            <GridItem xs={12} md={6}>
              <Typography variant='body1' gutterBottom>
                Horas: <strong>{horas}</strong>
              </Typography>
            </GridItem>

            <GridItem xs={12} md={6}>
              <Typography variant='body1' gutterBottom>
                Unidades: <strong>{unidades ? unidades : '-'}</strong>
              </Typography>
            </GridItem>
            <GridItem xs={12} md={6}>
              <Typography variant='body1' gutterBottom>
                Cód.de trazabilidad: <strong>{codigo_trazabilidad ? codigo_trazabilidad : '-'}</strong>
              </Typography>
            </GridItem>
            <GridItem xs={12}>
              <Typography variant='body1' gutterBottom>
                Descripción de Tarea: <strong>{descripcion_tarea ? descripcion_tarea : '-'}</strong>
              </Typography>
            </GridItem>
            <GridItem xs={12}>
              <Typography variant='body1' gutterBottom>
                Observaciones: <strong>{observaciones ? observaciones : '-'}</strong>
              </Typography>
            </GridItem>
          </GridContainer>
        </DialogContent>
        {errorActivitiesUpdate && (
          <GridContainer>
            <GridItem xs={12}>
              <SnackbarContent message={errorActivitiesUpdate} color='danger' />
            </GridItem>
          </GridContainer>
        )}
        <DialogActions>
          <Button type='submit' color='primary' block disabled={validada === 'SI' ? true : false}>
            Validar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ValidationActivityModal
