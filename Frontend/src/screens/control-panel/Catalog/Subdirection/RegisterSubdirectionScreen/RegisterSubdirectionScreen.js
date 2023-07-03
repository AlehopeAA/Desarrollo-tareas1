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
import { registerSubdirection } from 'redux/actions/subdirectionActions'
import { SUBDIRECTION_REGISTER_RESET } from 'redux/constants/subdirectionConstants'
import styles from './styles/registerSubdirectionScreenStyles'

const useStyles = makeStyles(styles)

const RegisterSubdirectionScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [subdirection, setSubdirection] = useState({})
  const [alert, setAlert] = useState(null)

  const { loadingSubdirectionRegister, successSubdirectionRegister, errorSubdirectionRegister } = useSelector(
    (state) => state.subdirectionRegister
  )

  useEffect(() => {
    if (successSubdirectionRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Subdireccion guardada correctamente
        </SweetAlert>
      )
    }
    return () => dispatch({ type: SUBDIRECTION_REGISTER_RESET })
  }, [dispatch, successSubdirectionRegister])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerSubdirection(subdirection))
  }
  const confirmSuccess = () => {
    setSubdirection({
      codigo_subdireccion: '',
      descripcion_subdireccion: '',
    })
    setAlert(null)
    dispatch({ type: SUBDIRECTION_REGISTER_RESET })
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
                      labelText={'COD. SUBDIRECCION'}
                      id='codeSubdirection'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: subdirection.codigo_subdireccion,
                        onChange: (e) => setSubdirection({ ...subdirection, codigo_subdireccion: e.target.value }),
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
                        value: subdirection.descripcion_subdireccion,
                        onChange: (e) => setSubdirection({ ...subdirection, descripcion_subdireccion: e.target.value }),
                        type: 'text',
                        maxLength: 100,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingSubdirectionRegister ? 'Creando subdireccion...' : 'Registrar Subdireccion'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorSubdirectionRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorSubdirectionRegister} color='danger' />
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

export default RegisterSubdirectionScreen
