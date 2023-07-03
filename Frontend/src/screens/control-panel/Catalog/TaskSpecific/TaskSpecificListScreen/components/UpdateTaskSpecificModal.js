import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, FormControl, InputLabel, makeStyles, MenuItem, Select, } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { taskSpecificUpdateInfo } from 'redux/actions/taskSpecificActions'
import { TASK_SPECIFIC_LIST_RESET, TASK_SPECIFIC_UPDATE_RESET } from 'redux/constants/taskSpecificConstants'
import styles from '../styles/updateTaskSpecificModalStyles'

const useStyles = makeStyles(styles)

const UpdateTaskModal = ({ handleCloseModal, updateTaskModal, showUpdateTask }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoTask, setInfoTask] = useState(showUpdateTask)
  const [codTrazability, setCodTrazability] = useState(showUpdateTask.codigo_trazabilidad || 'NO')

  const { loadingTaskSpecificUpdate, errorTaskSpecificUpdate, successTaskSpecificUpdate } = useSelector(
    (state) => state.taskSpecificUpdate
  )

  useEffect(() => {
    if (successTaskSpecificUpdate) {
      dispatch({ type: TASK_SPECIFIC_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: TASK_SPECIFIC_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successTaskSpecificUpdate])

  useEffect(() => {
    dispatch({ type: TASK_SPECIFIC_UPDATE_RESET })
  }, [dispatch])

  const updateTaskHandler = (e) => {
    e.preventDefault()
    dispatch(taskSpecificUpdateInfo(infoTask))
  }
  const handleSelector = (e) => {
    const {
      target: { value },
    } = e
    setCodTrazability(value)
    setInfoTask({ ...infoTask, codigo_trazabilidad: e.target.value })
  }
  return (
    <Dialog
      open={updateTaskModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateTaskHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Tarea Específica`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <CustomInput
                labelText={'DESCRIPCION *'}
                id='description'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoTask.descripcion_tarea,
                  onChange: (e) => setInfoTask({ ...infoTask, descripcion_tarea: e.target.value }),
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
                  value={infoTask.indicador}
                  label='Indicador'
                  onChange={(e) => setInfoTask({ ...infoTask, indicador: e.target.value })}
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
                  value={infoTask.cuantificable}
                  label='Cuantificable'
                  onChange={(e) => setInfoTask({ ...infoTask, cuantificable: e.target.value })}
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
                  value={infoTask.entrada}
                  label='Entrada'
                  onChange={(e) => setInfoTask({ ...infoTask, entrada: e.target.value })}
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
                  value={infoTask.compartida}
                  label='Compartida'
                  onChange={(e) => setInfoTask({ ...infoTask, compartida: e.target.value })}
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
                  value={infoTask.dificultad}
                  label='Dificultad'
                  onChange={(e) => setInfoTask({ ...infoTask, dificultad: e.target.value })}
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
                  value={infoTask.acumulativa}
                  label='Acumulativa'
                  onChange={(e) => setInfoTask({ ...infoTask, acumulativa: e.target.value })}
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
                      onChange: (e) =>
                        setInfoTask({ ...infoTask, codigo_trazabilidad: e.target.value }),
                      type: 'text',
                      required: true,
                    }}
                  />
                </FormControl>
              )}{' '}
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successTaskSpecificUpdate ? 'success' : 'primary'} block>
                {loadingTaskSpecificUpdate
                  ? 'Actualizando...'
                  : successTaskSpecificUpdate
                  ? 'Tarea Específica Actualizada'
                  : 'Actualizar Tarea Específica'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorTaskSpecificUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorTaskSpecificUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateTaskModal
