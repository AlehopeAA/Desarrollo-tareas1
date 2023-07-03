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
import { registerRole } from 'redux/actions/roleActions'
import { ROLE_REGISTER_RESET } from 'redux/constants/roleConstants'
import styles from './styles/RegisterRoleScreenStyles'

const useStyles = makeStyles(styles)
const RegisterRoleScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [role, setRole] = useState({})
  const [alert, setAlert] = useState(null)

  const { loadingRoleRegister, successRoleRegister, errorRoleRegister } = useSelector((state) => state.roleRegister)

  useEffect(() => {
    if (successRoleRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Rol guardada correctamente
        </SweetAlert>
      )
      return
    }
  }, [successRoleRegister])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerRole(role))
  }
  const confirmSuccess = () => {
    setRole({
      codigo_rol: '',
      descripcion_rol: '',
    })
    setAlert(null)
    dispatch({ type: ROLE_REGISTER_RESET })
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
                      labelText={'COD. ROL'}
                      id='codeRole'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: role.codigo_rol,
                        onChange: (e) => setRole({ ...role, codigo_rol: e.target.value }),
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
                        value: role.descripcion_rol,
                        onChange: (e) => setRole({ ...role, descripcion_rol: e.target.value }),
                        type: 'text',
                        maxLength: 100,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingRoleRegister ? 'Creando rol...' : 'Registrar Rol'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorRoleRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorRoleRegister} color='danger' />
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

export default RegisterRoleScreen
