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
import { taskGeneralUpdateInfo } from 'redux/actions/taskGeneralActions'
import { TASK_GENERAL_LIST_RESET, TASK_GENERAL_UPDATE_RESET } from 'redux/constants/taskGeneralConstants'
import styles from '../styles/updateTaskGeneralModalStyles'

const useStyles = makeStyles(styles)

const UpdateTaskModal = ({ handleCloseModal, updateTaskModal, showUpdateTask }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoTaskGeneral, setInfoTaskGeneral] = useState(showUpdateTask)
  const [codTrazability, setCodTrazability] = useState(showUpdateTask.codigo_trazabilidad || 'NO')

  const { loadingTaskGeneralUpdate, errorTaskGeneralUpdate, successTaskGeneralUpdate } = useSelector(
    (state) => state.taskGeneralUpdate
  )

  useEffect(() => {
    if (successTaskGeneralUpdate) {
      dispatch({ type: TASK_GENERAL_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: TASK_GENERAL_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successTaskGeneralUpdate])

  useEffect(() => {
    dispatch({ type: TASK_GENERAL_UPDATE_RESET })
  }, [dispatch])

  const updateTaskGeneralHandler = (e) => {
    e.preventDefault()
    dispatch(taskGeneralUpdateInfo(infoTaskGeneral))
  }
  const handleSelector = (e) => {
    const {
      target: { value },
    } = e
    setCodTrazability(value)
    setInfoTaskGeneral({ ...infoTaskGeneral, codigo_trazabilidad: e.target.value })
  }
  return (
    <Dialog
      open={updateTaskModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateTaskGeneralHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Tarea General`}</h4>
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
                  value: infoTaskGeneral.descripcion_tarea,
                  onChange: (e) => setInfoTaskGeneral({ ...infoTaskGeneral, descripcion_tarea: e.target.value }),
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
                  value={infoTaskGeneral.indicador}
                  label='Indicador'
                  onChange={(e) => setInfoTaskGeneral({ ...infoTaskGeneral, indicador: e.target.value })}
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
                  value={infoTaskGeneral.cuantificable}
                  label='Cuantificable'
                  onChange={(e) => setInfoTaskGeneral({ ...infoTaskGeneral, cuantificable: e.target.value })}
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
                  value={infoTaskGeneral.entrada}
                  label='Entrada'
                  onChange={(e) => setInfoTaskGeneral({ ...infoTaskGeneral, entrada: e.target.value })}
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
                  value={infoTaskGeneral.compartida}
                  label='Compartida'
                  onChange={(e) => setInfoTaskGeneral({ ...infoTaskGeneral, compartida: e.target.value })}
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
                  value={infoTaskGeneral.dificultad}
                  label='Dificultad'
                  onChange={(e) => setInfoTaskGeneral({ ...infoTaskGeneral, dificultad: e.target.value })}
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
                  value={infoTaskGeneral.acumulativa}
                  label='Acumulativa'
                  onChange={(e) => setInfoTaskGeneral({ ...infoTaskGeneral, acumulativa: e.target.value })}
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
                  value={codTrazability}
                  renderValue={(selected) => selected}
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
                      onChange: (e) => setInfoTaskGeneral({ ...infoTaskGeneral, codigo_trazabilidad: e.target.value }),
                      type: 'text',
                      required: true,
                    }}
                  />
                </FormControl>
              )}{' '}
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successTaskGeneralUpdate ? 'success' : 'primary'} block>
                {loadingTaskGeneralUpdate
                  ? 'Actualizando...'
                  : successTaskGeneralUpdate
                  ? 'Tarea General Actualizada'
                  : 'Actualizar Tarea General'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorTaskGeneralUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorTaskGeneralUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateTaskModal
