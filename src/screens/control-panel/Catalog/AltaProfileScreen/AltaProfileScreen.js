import { useState, useEffect } from 'react'
import {
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select as Selectable,
} from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import Button from 'components/CustomButtons/Button'
import SweetAlert from 'react-bootstrap-sweetalert'

const AltaProfileScreen = () => {
  const [infoProfile, setInfoProfile] = useState({})
  const [alert, setAlert] = useState(null)
  const [save, setSave] = useState(false)
  const classes = {}

  useEffect(() => {
    if (save) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          El perfil se ha guardado correctamente
        </SweetAlert>
      )
      return
    }
  }, [save])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(infoProfile)
    setSave(true)
  }
  const confirmSuccess = () => {
    setSave(false)
    setAlert(null)
  }
  const hideAlert = () => {
    setSave(false)
    setAlert(null)
  }

  const resetInputs = () => {
    setInfoProfile({})
  }
  return (
    <>
      <Card sx={{ maxWidth: 400 }}>
        <form onSubmit={handleSubmit} autoComplete={false}>
          <CardHeader>
            <GridContainer xs={12}>
              <GridItem xs={6}>
                <FormControl component='fieldset'>
                  <RadioGroup aria-label='gender' defaultValue='female' name='radio-buttons-group'>
                    <FormControlLabel value='manuel' control={<Radio />} label='Manual' />
                    <FormControlLabel value='automatic' control={<Radio />} label='Automatico' />
                  </RadioGroup>
                </FormControl>
              </GridItem>
              <GridItem xs={6}>
                <CustomInput
                  labelText={'COD. PERFIL'}
                  id='codeprofile'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: infoProfile.codeProfile,
                    onChange: (e) => setInfoProfile({ ...infoProfile, codeProfile: e.target.value }),
                    type: 'text',
                    required: true,
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardHeader>
          <Divider />
          <CardBody>
            <GridContainer>
              <GridItem xs={12}>
                <CustomInput
                  labelText={'DESCRIPCION'}
                  id='description'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: infoProfile.description,
                    onChange: (e) => setInfoProfile({ ...infoProfile, description: e.target.value }),
                    type: 'text',
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={3}>
                <InputLabel htmlFor='profile-update-type'>SUBDIRECCION</InputLabel>
                <Selectable
                  style={{ width: '100%' }}
                  value={infoProfile.subdirection}
                  onChange={(e) => setInfoProfile({ ...infoProfile, subdirection: e.target.value })}
                  inputProps={{
                    name: 'profile-update-type',
                    id: 'profile-update-type',
                  }}
                >
                  <MenuItem disabled>Selecciona una Opción</MenuItem>
                  {['SGAE', 'SGT'].map((entityType, index) => (
                    <MenuItem
                      classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                      value={entityType}
                      key={index}
                    >
                      {entityType}
                    </MenuItem>
                  ))}
                </Selectable>
              </GridItem>
              <GridItem xs={3}>
                <InputLabel htmlFor='profile-update-type'>SERVICIO</InputLabel>
                <Selectable
                  style={{ width: '100%' }}
                  value={infoProfile.service}
                  onChange={(e) => setInfoProfile({ ...infoProfile, service: e.target.value })}
                  inputProps={{
                    name: 'profile-update-type',
                    id: 'profile-update-type',
                  }}
                >
                  <MenuItem disabled>Selecciona una Opción</MenuItem>
                  {['Licencias y Consultas', 'Regimen Juridico', 'DR'].map((entityType, index) => (
                    <MenuItem
                      classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                      value={entityType}
                      key={index}
                    >
                      {entityType}
                    </MenuItem>
                  ))}
                </Selectable>
              </GridItem>
              <GridItem xs={3}>
                <InputLabel htmlFor='profile-update-type'>DEARTAMENTO</InputLabel>
                <Selectable
                  style={{ width: '100%' }}
                  value={infoProfile.departament}
                  onChange={(e) => setInfoProfile({ ...infoProfile, departament: e.target.value })}
                  inputProps={{
                    name: 'profile-update-type',
                    id: 'profile-update-type',
                  }}
                >
                  <MenuItem disabled>Selecciona una Opción</MenuItem>
                  {['Resoluciones'].map((entityType, index) => (
                    <MenuItem
                      classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                      value={entityType}
                      key={index}
                    >
                      {entityType}
                    </MenuItem>
                  ))}
                </Selectable>
              </GridItem>
              <GridItem xs={3}>
                <InputLabel htmlFor='profile-update-type'>Unidad</InputLabel>
                <Selectable
                  style={{ width: '100%' }}
                  value={infoProfile.unit}
                  onChange={(e) => setInfoProfile({ ...infoProfile, unit: e.target.value })}
                  inputProps={{
                    name: 'profile-update-type',
                    id: 'profile-update-type',
                  }}
                >
                  <MenuItem disabled>Selecciona una Opción</MenuItem>
                  {['Tecnico', 'Juridico', 'Jefe-Negociado', 'Auxiliar administrativo'].map((entityType, index) => (
                    <MenuItem
                      classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                      value={entityType}
                      key={index}
                    >
                      {entityType}
                    </MenuItem>
                  ))}
                </Selectable>
              </GridItem>
              <GridItem xs={6}>
                <InputLabel htmlFor='profile-update-type'>ROL</InputLabel>
                <Selectable
                  style={{ width: '100%' }}
                  value={infoProfile.role}
                  onChange={(e) => setInfoProfile({ ...infoProfile, role: e.target.value })}
                  inputProps={{
                    name: 'profile-update-type',
                    id: 'profile-update-type',
                  }}
                >
                  <MenuItem disabled>Selecciona una Opción</MenuItem>
                  {['LEPAR l', 'NO LEPAR', 'L'].map((entityType, index) => (
                    <MenuItem
                      classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                      value={entityType}
                      key={index}
                    >
                      {entityType}
                    </MenuItem>
                  ))}
                </Selectable>
              </GridItem>
              <GridItem xs={12}>
                <Button type='submit' color='primary'>
                  Guardar
                </Button>
                <Button color='primary' onClick={resetInputs}>
                  Cancelar
                </Button>
              </GridItem>
            </GridContainer>
          </CardBody>
        </form>
      </Card>
      {alert}
    </>
  )
}

export default AltaProfileScreen
