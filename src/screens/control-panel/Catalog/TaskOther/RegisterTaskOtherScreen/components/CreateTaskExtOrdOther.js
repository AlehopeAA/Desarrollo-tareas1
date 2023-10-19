import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { format } from 'date-fns'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import MultiSelectProfile from 'components/MultiSelectProfiles/MultiSelectProfiles'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { TASK_OTHER_REGISTER_RESET } from 'redux/constants/taskOtherConstants'
import { PROFILE_LIST_RESET } from 'redux/constants/profileConstants'
import { getProfiles } from 'redux/actions/profileActions'
import { registerTaskOther } from 'redux/actions/taskOtherActions'
import { TASK_OTHER_LIST_RESET } from 'redux/constants/taskOtherConstants'

const CreateTaskOther = ({ taskType, setTaskType }) => {
  const dispatch = useDispatch()

  const initialState = {
    action_type: taskType,
    task_type: '',
    descripcion_tarea: '',
    cuantificable: 'NO',
    indicador: 'NO',
    entrada: 'NO',
    compartida: 'NO',
    dificultad: 'NO',
    acumulativa: 'NO',
    codigo_trazabilidad: 'NO',
    fecha_alta: format(new Date(), 'yyyy-MM-dd'),
  }

  const [taskOther, setTaskOther] = useState(initialState)
  const [profilesData, setProfilesData] = useState([])
  const [alert, setAlert] = useState(null)
  const [profileError, setProfileError] = useState('')
  const [codTrazability, setCodTrazability] = useState('NO')

  const { successProfileList, loadingProfileList, profiles } = useSelector((state) => state.profileList)

  const { loadingTaskOtherRegister, successTaskOtherRegister, errorTaskOtherRegister } = useSelector(
    (state) => state.taskOtherRegister
  )

  useEffect(() => {
    if (successTaskOtherRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          //confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Tarea {taskOther.task_type} guardada correctamente
        </SweetAlert>
      )
      dispatch({ type: TASK_OTHER_REGISTER_RESET })
      dispatch({ type: TASK_OTHER_LIST_RESET })
      setTaskOther(initialState)
      setCodTrazability('NO')
    }
  }, [successTaskOtherRegister])

  useEffect(() => {
    return () => dispatch({ type: TASK_OTHER_REGISTER_RESET })
  }, [dispatch])

  useEffect(() => {
    return () => dispatch({ type: PROFILE_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successProfileList) {
      dispatch(getProfiles())
    }
  }, [successProfileList])

  const confirmSuccess = () => {
    setAlert(null)
    setTaskOther(initialState)
    setProfileError([])
    setProfileError('')
    setTaskType('')
    dispatch({ type: TASK_OTHER_REGISTER_RESET })
  }
  const hideAlert = () => {
    setAlert(null)
  }

  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (profilesData.map((profile) => profile.id_perfil).indexOf(value[value.length - 1].id_perfil) === -1) {
      setProfilesData(value)
    } else {
      setProfilesData(profilesData.filter((profile) => profile.id_perfil !== value[value.length - 1]?.id_perfil))
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (profilesData.length === 0) {
      return setProfileError('Por favor seleccione un Perfil.')
    }

    dispatch(registerTaskOther({ ...taskOther, profilesData }))
  }
  const handleSelector = (e) => {
    const {
      target: { value },
    } = e
    setCodTrazability(value)
    setTaskOther({ ...taskOther, codigo_trazabilidad: e.target.value })
  }
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <GridItem style={{ marginBottom: '20px' }} xs={12}>
        <CustomInput
          labelText={'DESCRIPCION *'}
          id='description'
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: taskOther.descripcion_tarea,
            onChange: (e) => setTaskOther({ ...taskOther, descripcion_tarea: e.target.value }),
            type: 'text',
            required: true,
          }}
        />
      </GridItem>      
      <GridItem xs={12} style={{ marginTop: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id='task-type'>Tipo de Tarea *</InputLabel>
          <Select
            labelId='task-type'
            id='task-type'
            value={taskOther.task_type}
            label='task-type'
            onChange={(e) => setTaskOther({ ...taskOther, task_type: e.target.value })}
            required= 'true'
          >
            <MenuItem value={'EXTRAORDINARIA'}>EXTRAORDINARIA</MenuItem>
            <MenuItem value={'ORDINARIA'}>ORDINARIA</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} style={{ margin: '20px 0' }}>
        <GridContainer>
          <GridItem xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='indicador'>Indicador</InputLabel>
              <Select
                labelId='indicador'
                id='indicador'
                name='indicador'
                value={taskOther.indicador}
                label='Indicador'
                onChange={(e) => setTaskOther({ ...taskOther, indicador: e.target.value })}
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
                value={taskOther.cuantificable}
                label='Cuantificable'
                onChange={(e) => setTaskOther({ ...taskOther, cuantificable: e.target.value })}
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
                name='entrada'
                value={taskOther.entrada}
                label='Entrada'
                onChange={(e) => setTaskOther({ ...taskOther, entrada: e.target.value })}
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
                value={taskOther.compartida}
                label='Compartida'
                onChange={(e) => setTaskOther({ ...taskOther, compartida: e.target.value })}
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
                value={taskOther.dificultad}
                label='Dificultad'
                onChange={(e) => setTaskOther({ ...taskOther, dificultad: e.target.value })}
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
                value={taskOther.acumulativa}
                label='Acumulativa'
                onChange={(e) => setTaskOther({ ...taskOther, acumulativa: e.target.value })}
              >
                <MenuItem value={'SI'}>SI</MenuItem>
                <MenuItem value={'NO'}>NO</MenuItem>
              </Select>
            </FormControl>
          </GridItem>         
          <GridItem xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id='codigo_trazabilidad'>COD. TRAZABILIDAD</InputLabel>
              <Select
                labelId='codigo_trazabilidad'
                id='codigo_trazabilidad'
                name='codigo_trazabilidad'
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
                    onChange: (e) => setTaskOther({ ...taskOther, codigo_trazabilidad: e.target.value }),
                    type: 'text',
                    required: true,
                  }}
                />
              </FormControl>
            )}{' '}
          </GridItem>
          <GridItem xs={12} style={{ marginTop: '16px' }}>
            {loadingProfileList ? (
              <>Cargando lista de perfiles</>
            ) : (
              profiles && (
                <MultiSelectProfile
                  label={'Perfiles'}
                  data={profiles}
                  multiData={profilesData}
                  handleChangeMultiData={handleChangeMultiData}
                />
              )
            )}
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12}>
        {errorTaskOtherRegister && (
          <GridContainer>
            <GridItem xs={12}>
              <SnackbarContent message={errorTaskOtherRegister} color='danger' />
            </GridItem>
          </GridContainer>
        )}
        {profileError && profilesData.length === 0 && (
          <GridContainer>
            <GridItem xs={12}>
              <SnackbarContent message={profileError} color='danger' />
            </GridItem>
          </GridContainer>
        )}
      </GridItem>

      <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
        <Button type='submit' color='primary'>
          {loadingTaskOtherRegister ? 'Guardando...' : 'Guardar'}
        </Button>
      </GridItem>
      {alert}
    </form>
  )
}

export default CreateTaskOther
