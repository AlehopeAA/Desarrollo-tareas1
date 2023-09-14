import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { taskUpdateInfo } from 'redux/actions/taskActions'
import { TASK_LIST_RESET, TASK_UPDATE_RESET } from 'redux/constants/taskConstants'
import styles from '../styles/updateModalStyles'
import { getTaskTypes } from 'redux/actions/taskTypeActions'

const useStyles = makeStyles(styles)

const UpdateTaskModal = ({ handleCloseModal, updateTaskModal, showUpdateTask }) => {
  console.log('actualizar tarea')
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoTask, setInfoTask] = useState(showUpdateTask)

  const { loadingTaskUpdate, errorTaskUpdate, successTaskUpdate } = useSelector((state) => state.taskUpdate)
  const { taskTypes, successTaskTypeList } = useSelector((state) => state.taskTypeList)

  useEffect(() => {
    dispatch(getTaskTypes())
  }, [])

  useEffect(() => {
    if (successTaskUpdate) {
      dispatch({ type: TASK_LIST_RESET })
      setTimeout(() => {
        dispatch({ type: TASK_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successTaskUpdate])
  useEffect(() => {
    dispatch({ type: TASK_UPDATE_RESET })
  }, [dispatch])

  const updateTaskHandler = (e) => {
    e.preventDefault()
    
    console.log({ ...infoTask, id_puesto: 1 })
    dispatch(taskUpdateInfo({ ...infoTask, id_puesto: 1 }))
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
          <h4 className={classes.modalTitle}>{`Editar Tarea`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12} sm={6}>
              <CustomInput
                labelText={'DESCRIPCION'}
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
            <GridItem xs={12}>
              <CustomInput
                labelText={'CUANTIFICABLE'}
                id='cuantificable'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoTask.cuantificable,
                  onChange: (e) => setInfoTask({ ...infoTask, cuantificable: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='taskType'>Tipo de Tarea</InputLabel>
                <Select
                  labelId='taskType'
                  id='taskType'
                  value={infoTask.id_tipo_tarea}
                  label='Tipo de Tarea'
                  onChange={(e) => setInfoTask({ ...infoTask, id_tipo_tarea: e.target.value })}
                >
                  {successTaskTypeList &&
                    taskTypes.map((type, index) => (
                      <MenuItem key={index} value={type.id_tipo_tarea}>
                        {type.tipo_tarea}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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
                  <MenuItem value={'si'}>si</MenuItem>
                  <MenuItem value={'no'}>no</MenuItem>
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
                  <MenuItem value={'si'}>si</MenuItem>
                  <MenuItem value={'no'}>no</MenuItem>
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
                  <MenuItem value={'si'}>si</MenuItem>
                  <MenuItem value={'no'}>no</MenuItem>
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
                  <MenuItem value={'si'}>si</MenuItem>
                  <MenuItem value={'no'}>no</MenuItem>
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
                  <MenuItem value={'si'}>si</MenuItem>
                  <MenuItem value={'no'}>no</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='activo'>Activo</InputLabel>
                <Select
                  labelId='activo'
                  id='activo'
                  value={infoTask.activo}
                  label='Activo'
                  onChange={(e) => setInfoTask({ ...infoTask, activo: e.target.value })}
                >
                  <MenuItem value={'si'}>si</MenuItem>
                  <MenuItem value={'no'}>no</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successTaskUpdate ? 'success' : 'primary'} block>
                {loadingTaskUpdate ? 'Actualizando...' : successTaskUpdate ? 'Tarea Actualizada' : 'Actualizar Tarea'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorTaskUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorTaskUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateTaskModal
