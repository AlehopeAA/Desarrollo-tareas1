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
import { registerPermission } from 'redux/actions/permissionActions'
import { PERMISSION_REGISTER_RESET } from 'redux/constants/permissionConstants'
import styles from './styles/registerPermissionStyles'

const useStyles = makeStyles(styles)

const RegisterPermissionScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [permission, setPermission] = useState('')
  const [alert, setAlert] = useState(null)

  const { loadingPermissionRegister, successPermissionRegister, errorPermissionRegister } = useSelector(
    (state) => state.permissionRegister
  )

  useEffect(() => {
    if (successPermissionRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Permiso guardado correctamente
        </SweetAlert>
      )
    }
  }, [successPermissionRegister])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerPermission({ permiso: permission }))
  }
  const confirmSuccess = () => {
    setPermission('')
    setAlert(null)
    dispatch({ type: PERMISSION_REGISTER_RESET })
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
                        value: permission,
                        onChange: (e) => setPermission(e.target.value),
                        type: 'text',
                        required: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingPermissionRegister ? 'Creando permiso...' : 'Registrar Permiso'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorPermissionRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorPermissionRegister} color='danger' />
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

export default RegisterPermissionScreen
