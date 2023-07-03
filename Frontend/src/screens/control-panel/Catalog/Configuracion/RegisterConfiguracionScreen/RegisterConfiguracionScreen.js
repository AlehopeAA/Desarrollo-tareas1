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
import { registerConfiguracion } from 'redux/actions/configuracionActions'
import { CONFIGURACION_REGISTER_RESET } from 'redux/constants/configuracionConstants'
import styles from './styles/registerConfiguracionStyles'

const useStyles = makeStyles(styles)

const RegisterConfiguracionScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [configuracion, setConfiguracion] = useState({ codigo_unidad: '', descripcion_unidad: '' })
  const [alert, setAlert] = useState(null)

  const { loadingConfiguracionRegister, successConfiguracionRegister, errorConfiguracionRegister } = useSelector((state) => state.configuracionRegister)

  useEffect(() => {
    if (successConfiguracionRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Parámetro guardado correctamente
        </SweetAlert>
      )
    }
    return () => dispatch({ type: CONFIGURACION_REGISTER_RESET })
  }, [dispatch, successConfiguracionRegister])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerConfiguracion(configuracion))
  }
  const confirmSuccess = () => {
    setConfiguracion({
      parametro: '',
      varlor: '',
      descripcion: '',
    })
    setAlert(null)
    dispatch({ type: CONFIGURACION_REGISTER_RESET })
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
                      labelText={'PARÁMETRO'}
                      id='parametro'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: configuracion.parametro,
                        onChange: (e) => setConfiguracion({ ...configuracion, parametro: e.target.value }),
                        type: 'text',
                        required: true,
                        maxLength: 50,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText={'VALOR'}
                      id='valor'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: configuracion.valor,
                        onChange: (e) => setConfiguracion({ ...configuracion, valor: e.target.value }),
                        type: 'number'
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
                        value: configuracion.descripcion,
                        onChange: (e) => setConfiguracion({ ...configuracion, descripcion: e.target.value }),
                        type: 'text',
                        maxLength: 100,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingConfiguracionRegister ? 'Creando parámetro...' : 'Registrar Parámetro'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorConfiguracionRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorConfiguracionRegister} color='danger' />
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

export default RegisterConfiguracionScreen
