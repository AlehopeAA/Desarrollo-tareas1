import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Card, makeStyles } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { registerService } from 'redux/actions/serviceActions'
import { SERVICE_REGISTER_RESET } from 'redux/constants/serviceConstants'
import styles from './styles/RegisterServiceScreenStyles'

const useStyles = makeStyles(styles)
const RegisterServiceScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [service, setService] = useState({})
  const [alert, setAlert] = useState(null)

  const { loadingServiceRegister, successServiceRegister, errorServiceRegister } = useSelector(
    (state) => state.serviceRegister
  )

  useEffect(() => {
    if (successServiceRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Servicio guardado correctamente
        </SweetAlert>
      )
    }
  }, [successServiceRegister])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerService(service))
  }
  const confirmSuccess = () => {
    setService({
      codigo_servicio: '',
      descripcion_servicio: '',
    })
    setAlert(null)
    dispatch({ type: SERVICE_REGISTER_RESET })
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
                      labelText={'COD. SERVICIO'}
                      id='codeService'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: service.codigo_servicio,
                        onChange: (e) => setService({ ...service, codigo_servicio: e.target.value }),
                        type: 'text',
                        required: true,
                        maxLength: 20,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText={'DESCRIPCION'}
                      id='description'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: service.descripcion_servicio,
                        onChange: (e) => setService({ ...service, descripcion_servicio: e.target.value }),
                        type: 'text',
                        maxLength: 100,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingServiceRegister ? 'Creando servicio...' : 'Registrar Servicio'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorServiceRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorServiceRegister} color='danger' />
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

export default RegisterServiceScreen
