import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Card, makeStyles } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { registerFestivos } from 'redux/actions/festivosActions'
import { FESTIVOS_REGISTER_RESET } from 'redux/constants/festivosConstants'
import styles from './styles/registerFestivosStyles'

const useStyles = makeStyles(styles)

const RegisterFestivosScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [festivos, setFestivos] = useState({ fecha_seleccionada: new Date() })
  const [alert, setAlert] = useState(null)

  const { loadingFestivosRegister, successFestivosRegister, errorFestivosRegister } = useSelector((state) => state.festivosRegister)

  useEffect(() => {
    if (successFestivosRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Festivo guardado correctamente
        </SweetAlert>
      )
    }
    return () => dispatch({ type: FESTIVOS_REGISTER_RESET })
  }, [dispatch, successFestivosRegister])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerFestivos({dia: festivos.fecha_seleccionada.getDate(), mes: festivos.fecha_seleccionada.getMonth() + 1, anio: festivos.fecha_seleccionada.getFullYear()}))
  }
  const confirmSuccess = () => {
    setFestivos({
      fecha_seleccionada: new Date()
    })
    setAlert(null)
    dispatch({ type: FESTIVOS_REGISTER_RESET })
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} md={8} style={{ margin: 'auto' }}>
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <GridContainer>
                  <GridItem xs={12} md={6}>
                    <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Día Festivo"
                        value={festivos.fecha_seleccionada}
                        onChange={(e) => setFestivos({ ...festivos, fecha_seleccionada: e })}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                        style={{width:"100%"}}
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>
                  <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' color='primary'>
                      {loadingFestivosRegister ? 'Creando festivo...' : 'Registrar Festivo'}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
              {errorFestivosRegister && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorFestivosRegister} color='danger' />
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

export default RegisterFestivosScreen
