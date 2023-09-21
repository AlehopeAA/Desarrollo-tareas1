import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { taskAbsenceUpdateInfo } from 'redux/actions/taskAbsenceActions'
import { TASK_ABSENCE_LIST_RESET, TASK_ABSENCE_UPDATE_RESET } from 'redux/constants/taskAbsenceConstants'
import styles from '../styles/updateTaskAbsenceModalStyles'
import SweetAlert from 'react-bootstrap-sweetalert'
import { objetivesAbsensesUpdateInfo } from 'redux/actions/objetivesAbsencesActions'


const useStyles = makeStyles(styles)

const UpdateTaskModal = ({ handleCloseModal, updateTaskModal, showUpdateTask }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoTaskAbsence, setInfoTaskAbsence] = useState(showUpdateTask)
  const [codTrazability, setCodTrazability] = useState(showUpdateTask.codigo_trazabilidad || 'NO')

  const { loadingTaskAbsenceUpdate, errorTaskAbsenceUpdate, successTaskAbsenceUpdate } = useSelector(
    (state) => state.taskAbsenceUpdate
  )

  const {
    loadingObjetiveAbsenceUpdate,
    successObjetiveAbsenceUpdate,
    objetiveAbsenceUpdateData,
    errorObjetiveAbsenceUpdate,
  } = useSelector((state) => state.objetivesAbsencesUpdate)

  const [alertIndicador, setAlertupdateIndicador] = useState(null)
  const [indicadorAlert, setIndicadorAlert] = useState(false)


  useEffect(() => {
    if (successTaskAbsenceUpdate) {
      dispatch({ type: TASK_ABSENCE_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: TASK_ABSENCE_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successTaskAbsenceUpdate])

  useEffect(() => {
    if (indicadorAlert) {
      console.log("despues del alert")

      console.log(infoTaskAbsence)
      dispatch(taskAbsenceUpdateInfo(infoTaskAbsence))
      dispatch(objetivesAbsensesUpdateInfo(infoTaskAbsence))
    }
  }, [indicadorAlert]); // Este efecto se dispara cada vez que indicadorAlert cambia

  useEffect(() => {
    dispatch({ type: TASK_ABSENCE_UPDATE_RESET })
  }, [dispatch])

  const updateTaskAbsenceHandler = (e) => {
    e.preventDefault()
    if (infoTaskAbsence.indicador == "NO") {
      setAlertupdateIndicador(
        <SweetAlert
          info
          style={{ display: 'block', marginTop: '-100px' }}
          title='Aviso!'
          onConfirm={() => setIndicadorAlert(true)} // Aquí cambias indicadorAlert a true
          onCancel={() => setAlertupdateIndicador(null)}
          confirmBtnText='SI'
          cancelBtnText='NO'
          confirmBtnCssClass={classes.button + ' ' + classes.success}
          cancelBtnCssClass={classes.button + ' ' + classes.danger}
          showCancel
        >
          Si modifica el atributo de esta tarea a indicador=no, los valores de los objetivos asignados se borrarán, desea continuar?
        </SweetAlert>
      );
    } else {
      console.log(infoTaskAbsence)
      dispatch(taskAbsenceUpdateInfo(infoTaskAbsence))
    }
  };

  const handleSelector = (e) => {
    const {
      target: { value },
    } = e
    setCodTrazability(value)
    setInfoTaskAbsence({ ...infoTaskAbsence, codigo_trazabilidad: e.target.value })
  }
  return (
    <Dialog
      open={updateTaskModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <div>
        {alertIndicador}
      </div>
      <form onSubmit={updateTaskAbsenceHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Tarea Ausencia`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <CustomInput
                labelText={'DESCRIPCION'}
                id='description'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoTaskAbsence.descripcion_tarea,
                  onChange: (e) => setInfoTaskAbsence({ ...infoTaskAbsence, descripcion_tarea: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='indicador'>Indicador</InputLabel>
                <Select
                  labelId='indicador'
                  id='indicador'
                  value={infoTaskAbsence.indicador}
                  label='Indicador'
                  onChange={(e) => setInfoTaskAbsence({ ...infoTaskAbsence, indicador: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='cuantificable'>Cuantificable</InputLabel>
                <Select
                  labelId='cuantificable'
                  id='cuantificable'
                  value={infoTaskAbsence.cuantificable}
                  label='Cuantificable'
                  onChange={(e) => setInfoTaskAbsence({ ...infoTaskAbsence, cuantificable: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='entrada'>Entrada</InputLabel>
                <Select
                  labelId='entrada'
                  id='entrada'
                  value={infoTaskAbsence.entrada}
                  label='Entrada'
                  onChange={(e) => setInfoTaskAbsence({ ...infoTaskAbsence, entrada: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='compartida'>Compartida</InputLabel>
                <Select
                  labelId='compartida'
                  id='compartida'
                  value={infoTaskAbsence.compartida}
                  label='Compartida'
                  onChange={(e) => setInfoTaskAbsence({ ...infoTaskAbsence, compartida: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='dificultad'>Dificultad</InputLabel>
                <Select
                  labelId='dificultad'
                  id='dificultad'
                  value={infoTaskAbsence.dificultad}
                  label='Dificultad'
                  onChange={(e) => setInfoTaskAbsence({ ...infoTaskAbsence, dificultad: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='acumulativa'>Acumulativa</InputLabel>
                <Select
                  labelId='acumulativa'
                  id='acumulativa'
                  value={infoTaskAbsence.acumulativa}
                  label='Acumulativa'
                  onChange={(e) => setInfoTaskAbsence({ ...infoTaskAbsence, acumulativa: e.target.value })}
                >
                  <MenuItem value={'SI'}>SI</MenuItem>
                  <MenuItem value={'NO'}>NO</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem style={{ margin: '20px 0' }} xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id='codigo_trazabilidad'>COD. TRAZABILIDAD</InputLabel>
                <Select
                  labelId='codigo_trazabilidad'
                  id='codigo_trazabilidad'
                  name='codigo_trazabilidad'
                  renderValue={(selected) => selected}
                  value={codTrazability}
                  label='codigo_trazabilidad'
                  onChange={(e) => handleSelector(e)}
                >
                  {[
                    'NO',
                    'Nº Expediente',
                    'Nombre de fichero',
                    'Nº comunicación',
                    'Nº de relación',
                    'Nº de lote',
                    'Otro',
                  ].map((cod) => (
                    <MenuItem value={cod}>{cod} </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {codTrazability === 'Otro' && (
                <FormControl fullWidth>
                  <CustomInput
                    id='codigo_trazabilidad'
                    labelText={'Ingrese código de trazabilidad'}
                    inputProps={{
                      onChange: (e) => setInfoTaskAbsence({ ...infoTaskAbsence, codigo_trazabilidad: e.target.value }),
                      type: 'text',
                      required: true,
                    }}
                  />
                </FormControl>
              )}{' '}
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successTaskAbsenceUpdate ? 'success' : 'primary'} block>
                {loadingTaskAbsenceUpdate
                  ? 'Actualizando...'
                  : successTaskAbsenceUpdate
                    ? 'Tarea Ausencia Actualizada'
                    : 'Actualizar Tarea Ausencia'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorTaskAbsenceUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorTaskAbsenceUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateTaskModal
