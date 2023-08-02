import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import Typography from '@mui/material/Typography'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import ReactTable from 'components/ReactTable/ReactTable'
import TasksAcumulativesSelect from './components/TasksAcumulativesSelect'
import TasksAcumulativesHijaSelect from './components/TasksAcumulativesHijaSelect'
import { ACUMULATIVES_LIST_RESET } from 'redux/constants/acumulativesConstants'
import {
  ACUMULATIVES_REGISTER_RESET,
  ACUMULATIVES_LIST_BY_TASK_ID_RESET,
} from 'redux/constants/acumulativesConstants'
import { getAcumulativesByTaskId, registerAcumulatives } from 'redux/actions/acumulativesActions'
import styles from './styles/acumulativesRegisterStyles'

const useStyles = makeStyles(styles)

const useAcumulativesRegister = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [taskAcumulativesId, setTaskAcumulativesId] = useState('')
  const [taskAcumulativesHijaId, setTaskAcumulativesHijaId] = useState('')
  const [alert, setAlert] = useState(null)
  const [data, setData] = useState([])

  const { loadingAcumulativesListByTaskId, acumulativesListByTaskId, successAcumulativesListByTaskId } = useSelector(
    (state) => state.acumulativesListByTaskId
  )
  const { loadingAcumulativesRegister, successAcumulativesRegister, errorAcumulativesRegister } = useSelector(
    (state) => state.acumulativesRegister
  )
  
  useEffect(() => {
    if (successAcumulativesListByTaskId) {       
      const acumulatives = acumulativesListByTaskId?.acumulativas.map((item) => {
        return {
          descripcion_tarea: item.descripcion_tarea,
          codigo_perfil: item.codigo_perfil,
        }
      })
      setData(acumulatives)     
    }  
  }, [successAcumulativesListByTaskId])

  useEffect(() => {
    return () => {
      dispatch({ type: ACUMULATIVES_REGISTER_RESET })
      dispatch({ type: ACUMULATIVES_LIST_BY_TASK_ID_RESET })
      dispatch({ type: ACUMULATIVES_LIST_RESET })
      setAlert(false)
      setData([])
    }
  }, [dispatch])

  useEffect(() => {
    if (successAcumulativesRegister) {
      setTaskAcumulativesId(taskAcumulativesId)      
      setTaskAcumulativesHijaId('')
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => confirmSuccess()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
        'Tarea acumulativa guardada correctamente'
        </SweetAlert>
      )
    }
  }, [successAcumulativesRegister])

  const confirmSuccess = () => {
    dispatch({ type: ACUMULATIVES_REGISTER_RESET })
    dispatch({ type: ACUMULATIVES_LIST_BY_TASK_ID_RESET })
    dispatch({ type: ACUMULATIVES_LIST_RESET })
    setAlert(false)
    dispatch(getAcumulativesByTaskId(taskAcumulativesId))
  }

  const handleAcumulatives = (e) => {
    e.preventDefault()
    dispatch(
      registerAcumulatives({
        id_tarea_padre: taskAcumulativesId,
        id_tarea_hija: taskAcumulativesHijaId,
      })
    )
  }

  return (
    <GridContainer>
      <GridItem xs={12} md={8} className={classes.rootItem}>
        <GridContainer>
          <TasksAcumulativesSelect setTaskAcumulativesId={setTaskAcumulativesId} taskAcumulativesId={taskAcumulativesId} />
          <GridItem xs={4}>
            <Button
              disabled={!taskAcumulativesId}
              color='primary'
              onClick={() => dispatch(getAcumulativesByTaskId(taskAcumulativesId))}
            >
              Buscar Tareas acumulativas
            </Button>
          </GridItem>
        </GridContainer>        
      </GridItem>
      <GridItem xs={12} sm={12} md={10} style={{ margin: '0 auto' }}>
        <Card>
          <CardBody>          
            <form onSubmit={handleAcumulatives}>              
                {loadingAcumulativesListByTaskId ? (
                  <>Cargando tareas acumulativas</>
                ) : acumulativesListByTaskId && (
                  <GridContainer>
                    <GridItem xs={12} className={classes.rootItem}>
                      <Card>
                        <CardBody>                       
                          <ReactTable
                            columns={[
                              {
                                Header: 'Tarea Hija',
                                accessor: 'descripcion_tarea',
                                Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                              },
                              {
                                Header: 'Perfiles',
                                accessor: 'codigo_perfil',
                                Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                              },
                            ]}
                            data={data}
                          />              
                        </CardBody>
                      </Card>
                    </GridItem>
                      <Typography variant='body1' gutterBottom>
                        <b><br></br>SELECCIONE TAREA HIJA A ASOCIAR</b>
                      </Typography>
                    <TasksAcumulativesHijaSelect setTaskAcumulativesHijaId={setTaskAcumulativesHijaId} taskAcumulativesHijaId={taskAcumulativesHijaId} taskAcumulativesId={taskAcumulativesId} />
                  </GridContainer>        
                )}
              {errorAcumulativesRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorAcumulativesRegister} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
              {acumulativesListByTaskId && (                
                <Button type='submit' color='primary' className={classes.registerButton} disabled={!taskAcumulativesHijaId}>
                  {loadingAcumulativesRegister ? 'Registrando tareas acumulativas...' : 'Registrar tareas acumulativas'}
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

export default useAcumulativesRegister
