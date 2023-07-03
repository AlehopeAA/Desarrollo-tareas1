import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Card, FormControl, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import CustomInput from 'components/CustomInput/CustomInput'
import ReactTable from 'components/ReactTable/ReactTable'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import TaskDificultiesSelect from './components/TaskDificultiesSelect'
import { DIFICULTIES_LIST_RESET } from 'redux/constants/dificultiesConstants'
import {
  DIFICULTIES_UPDATE_RESET,
  DIFICULTIES_REGISTER_RESET,
  DIFICULTIES_LIST_BY_TASK_ID_RESET,
} from 'redux/constants/dificultiesConstants'
import { getDificultiesByTaskId, registerDificulties } from 'redux/actions/dificultiesActions'
import styles from './styles/asignDificultyRegisterStyles'

const useStyles = makeStyles(styles)

const AsignDificultyRegister = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [taskDificultyId, setTaskDificultyId] = useState('')
  const [alert, setAlert] = useState(null)
  const [data, setData] = useState([])
  const [errorCodigosTrazabilidad, setErrorCodigosTrazabilidad] = useState('')

  const { loadingDificultiesListByTaskId, dificultiesListByTaskId, successDificultiesListByTaskId } = useSelector(
    (state) => state.dificultiesListByTaskId
  )
  const { loadingDificultiesRegister, successDificultiesRegister, errorDificultiesRegister } = useSelector(
    (state) => state.dificultiesRegister
  )
  const initialState = {
    codigo_trazabilidad: '',
    dificultad: '',
  }

  const [dificultInfo, setDificultInfo] = useState(initialState)

  useEffect(() => {
    if (successDificultiesListByTaskId) {
      const dificulties = dificultiesListByTaskId?.map((item) => {
        return {
          codigo_trazabilidad: item.codigo_trazabilidad,
          dificultad: item.dificultad,
        }
      })
      setData(dificulties)
      setDificultInfo(initialState)
      setErrorCodigosTrazabilidad('')
    }      
  }, [successDificultiesListByTaskId])

  useEffect(() => {
    if (successDificultiesRegister) {
      setTaskDificultyId('')
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => confirmSuccess()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          {successDificultiesRegister ? 'Dificultad registrada correctamente' : 'Dificultad editada correctamente'}
        </SweetAlert>
      )
    }
  }, [successDificultiesRegister])

  useEffect(() => {
    return () => {
      dispatch({ type: DIFICULTIES_REGISTER_RESET })
      dispatch({ type: DIFICULTIES_UPDATE_RESET })
      dispatch({ type: DIFICULTIES_LIST_BY_TASK_ID_RESET })
      dispatch({ type: DIFICULTIES_LIST_RESET })
      setDificultInfo(initialState)
      setErrorCodigosTrazabilidad('')
      setData([])
      setAlert(false)      
    }
  }, [dispatch])

  const confirmSuccess = () => {
    dispatch({ type: DIFICULTIES_REGISTER_RESET })
    dispatch({ type: DIFICULTIES_UPDATE_RESET })
    dispatch({ type: DIFICULTIES_LIST_BY_TASK_ID_RESET })
    dispatch({ type: DIFICULTIES_LIST_RESET })
    setDificultInfo(initialState)
    setErrorCodigosTrazabilidad('')
    setData([])
    setAlert(false)
  }

  const handleDificulties = (e) => {
    e.preventDefault()
    debugger;
    const expRegNumExp = /^[0-9]{3}\/[0-9]{4}\/[0-9]{5}$/
    if(!expRegNumExp.test(dificultInfo.codigo_trazabilidad)) {
      return setErrorCodigosTrazabilidad('El código de trazabilidad es incorrecto')
    }
    dispatch(
      registerDificulties({
        id_tarea: taskDificultyId,
        codigo_trazabilidad: dificultInfo.codigo_trazabilidad,
        dificultad: dificultInfo.dificultad,
      })
    )
  }

  return (
    <>
    <GridContainer>
      <GridItem xs={12} md={8} className={classes.rootItem}>
        <GridContainer>
          <TaskDificultiesSelect setTaskDificultyId={setTaskDificultyId} taskDificultyId={taskDificultyId} />
          <GridItem xs={4}>
            <Button
              disabled={!taskDificultyId}
              color='primary'
              onClick={() => dispatch(getDificultiesByTaskId(taskDificultyId))}
            >
              Buscar Dificultades
            </Button>
          </GridItem>
        </GridContainer>
        {loadingDificultiesListByTaskId ? (
          <>Cargando dificultades</>
        ) : dificultiesListByTaskId && (   
          <GridContainer>
            <GridItem xs={12} className={classes.rootItem}>
              <Card>
                <CardBody>                       
                  <ReactTable
                    columns={[
                      {
                        Header: 'Cod. Trazabilidad',
                        accessor: 'codigo_trazabilidad',
                      },
                      {
                        Header: 'Dificultad',
                        accessor: 'dificultad',
                      },
                    ]}
                    data={data}
                    />              
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      </GridItem>
    </GridContainer>
    {<p></p>}
    {dificultiesListByTaskId && (
    <GridContainer>
      <GridItem xs={12} sm={12} md={10} style={{ margin: '0 auto' }}>
        <Card>
          <CardBody>
            <form onSubmit={handleDificulties}>
              <GridContainer>
                <GridItem xs={12}>
                  <CustomInput                    
                    labelText='codigo_trazabilidad'
                    id='codigo_trazabilidad'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: dificultInfo.codigo_trazabilidad,
                      onChange: (e) => {setDificultInfo({ ...dificultInfo, codigo_trazabilidad: e.target.value }); setErrorCodigosTrazabilidad('')},
                      type: 'text',
                      maxLength: 50,
                      required: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={6}>
                   <span className={classes.incorrect_format}>El formato tiene que ser:  nnn/nnnn/nnnnn (n: Código númerico)</span>
                </GridItem>
                <GridItem xs={12}>                               
                  <FormControl fullWidth>
                    <InputLabel id='dificultad'>Dificultad</InputLabel>
                      <Select
                        labelId='dificultad'
                        id='dificultad'
                        value={dificultInfo.dificultad}
                        label='Dificultad'
                        required={true}
                        onChange={(e) => setDificultInfo({ ...dificultInfo, dificultad: e.target.value })}
                      >
                        <MenuItem value={'ALTA'}>ALTA</MenuItem>
                        <MenuItem value={'BAJA'}>BAJA</MenuItem>
                      </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              {<p></p>}
              {errorDificultiesRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorDificultiesRegister} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
              {errorCodigosTrazabilidad && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorCodigosTrazabilidad} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
              <Button type='submit' color='primary' className={classes.registerButton}>
                {loadingDificultiesRegister ? 'Registrando Dificultad...' : 'Registrar Dificultad'}
              </Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      {alert}
    </GridContainer>
    )}
    </>
  )
}

export default AsignDificultyRegister
