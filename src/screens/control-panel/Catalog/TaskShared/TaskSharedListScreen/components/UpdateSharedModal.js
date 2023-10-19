import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import {
  Dialog,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select as Selectable,
} from '@material-ui/core'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { sharedUpdateInfo } from 'redux/actions/sharedActions'
import { SHARED_UPDATE_RESET } from 'redux/constants/sharedConstants'
import styles from '../styles/updateSharedModalStyles'

const useStyles = makeStyles(styles)

const UpdateSharedModal = ({ handleCloseModal, updateSharedModal, showUpdateShared }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [sharedInfo, setSharedInfo] = useState(showUpdateShared)

  const [alert, setAlert] = useState(null)
  const { loadingSharedUpdate, errorSharedUpdate, successSharedUpdate } = useSelector((state) => state.sharedUpdate)

  useEffect(() => {
    if (successSharedUpdate) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='HECHO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Tarea compartida actualizada correctamente
        </SweetAlert>
      )
    }
  }, [successSharedUpdate])

  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(sharedUpdateInfo(sharedInfo))
  }

  useEffect(() => {
    return () => dispatch({ type: SHARED_UPDATE_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    dispatch({ type: SHARED_UPDATE_RESET })
    handleCloseModal()
    setAlert(null)
  }

  return (
    <>
      <Dialog
        open={updateSharedModal}
        keepMounted
        onClose={handleCloseModal}
        aria-labelledby='notice-modal-slide-title'
        aria-describedby='notice-modal-slide-description'
      >
        <Card>
          <CardBody>
            <form onSubmit={handleUpdate}>
              <GridContainer>
              <GridItem xs={12} md={12}>
                  <CustomInput
                    labelText={'Tarea'}
                    id='tarea'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: sharedInfo.descripcion_tarea,
                      type: 'text',
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} md={12}>
                  <CustomInput
                    labelText={'Puesto'}
                    id='puesto'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: `${sharedInfo.nombre} ${sharedInfo.apellido1} ${sharedInfo?.apellido2 || ''}`,
                      type: 'text',
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} md={6}>
                  <CustomInput
                    labelText={'Porcentaje de responsabilidad'}
                    id='porcentaje'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: sharedInfo?.porcentaje_responsabilidad,
                      onChange: (e) => setSharedInfo({ ...sharedInfo, porcentaje_responsabilidad: e.target.value }),
                      type: 'number',
                      required: true,
                    }}
                  />
                </GridItem>                
                <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'space-around' }}>
                  <Button color='secondary' onClick={handleCloseModal}>
                    Cerrar
                  </Button>
                  <Button type='submit' color='primary'>
                    {loadingSharedUpdate ? 'Actualizando...' : 'Actualizar tarea compartida'}
                  </Button>
                </GridItem>
                {errorSharedUpdate && (
                  <GridItem xs={12}>
                    <SnackbarContent message={errorSharedUpdate} color='danger' />
                  </GridItem>
                )}
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </Dialog>
      {alert}
    </>
  )
}

export default UpdateSharedModal
