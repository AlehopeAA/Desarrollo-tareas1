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
import { registerUnit } from 'redux/actions/unitActions'
import { UNIT_REGISTER_RESET } from 'redux/constants/unitConstants'
import styles from './styles/registerUnitStyles'
import { getUnits } from 'redux/actions/unitActions'

const useStyles = makeStyles(styles)

const RegisterUnitScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [unit, setUnit] = useState({ codigo_unidad: '', descripcion_unidad: '' })
  const [alert, setAlert] = useState(null)

  const { loadingUnitRegister, successUnitRegister, errorUnitRegister } = useSelector((state) => state.unitRegister)

  useEffect(() => {
    return () => {
      dispatch(getUnits())
    }
  }, [])

  useEffect(() => {
    if (successUnitRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Unidad guardada correctamente
        </SweetAlert>
      )
    }
  }, [successUnitRegister])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUnit(unit))
  }
  const confirmSuccess = () => {
    setAlert(null)
    setUnit({
      codigo_unidad: '',
      descripcion_unidad: '',
    })
    dispatch({ type: UNIT_REGISTER_RESET })
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
                      labelText={'COD. UNIDAD'}
                      id='codeUnit'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: unit.codigo_unidad,
                        onChange: (e) => setUnit({ ...unit, codigo_unidad: e.target.value }),
                        type: 'text',
                        required: true,
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
                        value: unit.descripcion_unidad,
                        onChange: (e) => setUnit({ ...unit, descripcion_unidad: e.target.value }),
                        type: 'text',
                        required: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingUnitRegister ? 'Creando unidad...' : 'Registrar Unidad'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorUnitRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorUnitRegister} color='danger' />
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

export default RegisterUnitScreen
