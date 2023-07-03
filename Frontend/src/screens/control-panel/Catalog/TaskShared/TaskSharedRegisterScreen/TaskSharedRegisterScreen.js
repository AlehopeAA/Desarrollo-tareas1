import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { FormControl, InputLabel, ListItemText, makeStyles, MenuItem, Select, DatePickerField } from '@material-ui/core'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import CustomInput from 'components/CustomInput/CustomInput'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import TasksSharedSelect from './components/TasksSharedSelect'
import { SHARED_LIST_RESET } from 'redux/constants/sharedConstants'
import {
  SHARED_REGISTER_RESET,
  SHARED_LIST_BY_TASK_ID_RESET,
} from 'redux/constants/sharedConstants'
import { getSharedByTaskId, registerShared } from 'redux/actions/sharedActions'
import styles from './styles/sharedRegisterStyles'

const useStyles = makeStyles(styles)

const sharedRegister = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [taskSharedId, setTaskSharedId] = useState('')
  const [alert, setAlert] = useState(null)
  const [componentePorcentajes, setComponentePorcentajes] = useState(<></>)

  const { loadingSharedListByTaskId, sharedListByTaskId, successSharedListByTaskId } = useSelector(
    (state) => state.sharedListByTaskId
  )
  const { loadingSharedRegister, successSharedRegister, errorSharedRegister } = useSelector(
    (state) => state.sharedRegister
  )
  
  const initialState = {
    idpuestos: [],
    puestos: [],
    porcentajes: [],
  }

  const [sharedInfo, setSharedInfo] = useState(initialState)

  useEffect(() => {
    if (successSharedListByTaskId) {      
      sharedInfo.idpuestos = []
      sharedInfo.puestos = []
      sharedInfo.porcentajes = []
      sharedListByTaskId?.map((item) => {       
        sharedInfo.puestos.push (`${item?.nombre} ${item?.apellido1} ${item?.apellido2 || ''}`)
        sharedInfo.idpuestos.push(item.id_puesto)
        sharedInfo.porcentajes.push(item.porcentaje_responsabilidad)
        setTaskSharedId (item.id_tarea)
      })      
      construirPorcentajes()
    }  
  }, [successSharedListByTaskId])

  const construirPorcentajes = () => {
    var listado = []
      for(let i = 0; i < sharedListByTaskId.length; i++) {
        listado.push(
          <GridContainer>
            <GridItem xs={12} md={6}>
              <CustomInput
                labelText={'Puesto'}
                id='puesto'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: sharedInfo.puestos[i],
                  type: 'text',
                  disabled: 'true',
                }}
              />
            </GridItem>            
            <GridItem xs={12} md={6}>
              <CustomInput                    
                labelText={'Porcentaje de responsabilidad'}
                id='porcentaje'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: sharedInfo.porcentajes[i],
                  onChange: (e) => { sharedInfo.porcentajes[i] = e.target.value; construirPorcentajes()},
                  type: 'number',
                  maxLength: 3,
                  required: true,
                }}
              />             
            </GridItem>
          </GridContainer>
        )
      }
      setComponentePorcentajes(listado)
  }

  useEffect(() => {
    return () => {
      dispatch({ type: SHARED_REGISTER_RESET })
      dispatch({ type: SHARED_LIST_BY_TASK_ID_RESET })
      dispatch({ type: SHARED_LIST_RESET })
      setSharedInfo(initialState)
      setAlert(false)
      setComponentePorcentajes(<></>)
    }
  }, [dispatch])

  useEffect(() => {
    if (successSharedRegister) {
      setTaskSharedId('')
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => confirmSuccess()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
        'Porcentaje de responsabilidad registrado correctamente'
        </SweetAlert>
      )
    }
  }, [successSharedRegister])

  const confirmSuccess = () => {
    dispatch({ type: SHARED_REGISTER_RESET })
    dispatch({ type: SHARED_LIST_BY_TASK_ID_RESET })
    dispatch({ type: SHARED_LIST_RESET })
    setSharedInfo(initialState)
    setAlert(false)
    setComponentePorcentajes(<></>)
  }

  const handleShared = (e) => {
    e.preventDefault()
    dispatch(
      registerShared({
        id_tarea: taskSharedId,
        ...sharedInfo,
      })
    )
  }

  return (
    <GridContainer>
      <GridItem xs={12} md={8} className={classes.rootItem}>
        <GridContainer>
          <TasksSharedSelect setTaskSharedId={setTaskSharedId} taskSharedId={taskSharedId} />
          <GridItem xs={4}>
            <Button
              disabled={!taskSharedId}
              color='primary'
              onClick={() => dispatch(getSharedByTaskId(taskSharedId))}
            >
              Buscar Tareas compartidas
            </Button>
          </GridItem>
        </GridContainer>        
      </GridItem>
      <GridItem xs={12} sm={12} md={10} style={{ margin: '0 auto' }}>
        <Card>
          <CardBody>          
            <form onSubmit={handleShared}>              
                {loadingSharedListByTaskId ? (
                  <>Cargando porcentajes</>
                ) : sharedListByTaskId && (               
                  componentePorcentajes          
                )}
              {errorSharedRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorSharedRegister} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
              {sharedListByTaskId && (
                <Button type='submit' color='primary' className={classes.registerButton}>
                  {loadingSharedRegister ? 'Registrando porcentaje compartido...' : 'Registrar porcentaje'}
                </Button>
              )}
            </form>
          </CardBody>
        </Card>
      </GridItem>
      {alert}
    </GridContainer>
  )  
}

export default sharedRegister
