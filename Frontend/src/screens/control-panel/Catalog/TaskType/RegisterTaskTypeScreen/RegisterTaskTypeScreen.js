import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, makeStyles } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import Button from 'components/CustomButtons/Button'
import SweetAlert from 'react-bootstrap-sweetalert'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { registerTaskType } from 'redux/actions/taskTypeActions'
import { TASK_TYPE_REGISTER_RESET } from 'redux/constants/taskTypeConstants'
import { getTaskTypes } from 'redux/actions/taskTypeActions'
import styles from './styles/RegisterTaskTypeScreenStyles'

const useStyles = makeStyles(styles)
const RegisterTaskTypeScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [taskType, setTaskType] = useState({})
  const [alert, setAlert] = useState(null)

  const { loadingTaskTypeRegister, successTaskTypeRegister, errorTaskTypeRegister } = useSelector(
    (state) => state.taskTypeRegister
  )

  useEffect(() => {
    return () => {
      dispatch(getTaskTypes())
    }
  }, [])

  useEffect(() => {
    if (successTaskTypeRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Tipo de Tarea guardada correctamente
        </SweetAlert>
      )
      return
    }
  }, [successTaskTypeRegister])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerTaskType(taskType))
  }
  const confirmSuccess = () => {
    setAlert(null)
    dispatch({ type: TASK_TYPE_REGISTER_RESET })
    setTaskType({
      tipo_tarea: '',
    })
  }
  const hideAlert = () => {
    setAlert(null)
  }
  return (
    <>
      <GridContainer>
        <GridItem xs={12} md={8} style={{ margin: 'auto' }}>
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <GridContainer>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText={'DESCRIPCION'}
                      id='description'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: taskType.tipo_tarea,
                        onChange: (e) => setTaskType({ ...taskType, tipo_tarea: e.target.value }),
                        type: 'text',
                        required: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingTaskTypeRegister ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorTaskTypeRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorTaskTypeRegister} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {alert}
    </>
  )
}

export default RegisterTaskTypeScreen
