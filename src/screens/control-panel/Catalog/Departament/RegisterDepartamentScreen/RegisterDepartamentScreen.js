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
import { registerDepartament } from 'redux/actions/departamentActions'
import { DEPARTAMENT_REGISTER_RESET } from 'redux/constants/departamentConstants'
import styles from './styles/RegisterDepartamentScreenStyles'

const useStyles = makeStyles(styles)

const RegisterDepartamentScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [departament, setDepartament] = useState({})
  const [alert, setAlert] = useState(null)

  const { loadingDepartamentRegister, successDepartamentRegister, errorDepartamentRegister } = useSelector(
    (state) => state.departamentRegister
  )

  useEffect(() => {
    if (successDepartamentRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Departamento guardada correctamente
        </SweetAlert>
      )
    }
  }, [successDepartamentRegister])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerDepartament(departament))
  }
  const confirmSuccess = () => {
    setDepartament({
      codigo_departamento: '',
      descripcion_departamento: '',
    })
    setAlert(null)
    dispatch({ type: DEPARTAMENT_REGISTER_RESET })
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
                      labelText={'COD. DEPARTAMENTO'}
                      id='codeDepartament'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: departament.codigo_departamento,
                        onChange: (e) => setDepartament({ ...departament, codigo_departamento: e.target.value }),
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
                        value: departament.descripcion_departamento,
                        onChange: (e) => setDepartament({ ...departament, descripcion_departamento: e.target.value }),
                        type: 'text',
                        maxLength: 100,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingDepartamentRegister ? 'Creando departamento...' : 'Registrar Departamento'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorDepartamentRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorDepartamentRegister} color='danger' />
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

export default RegisterDepartamentScreen
