import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select as Selectable,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import Clearfix from 'components/Clearfix/Clearfix'
import styles from '../styles/updateTeamModalStyles'
import { matchStatusUser } from 'shared/matchData/matchData'

const useStyles = makeStyles(styles)

const UpdateProfileModal = ({ handleCloseModal, updateProfileModal, showUpdateProfile }) => {
  const classes = useStyles()

  const [infoProfile, setInfoProfile] = useState(showUpdateProfile)

  const updateProfileHandler = (e) => {
    e.preventDefault()
    const data = {
      _id: infoProfile._id,
      codeProfile: infoProfile.codeProfile,
      description: infoProfile.description,
      subdirection: infoProfile.subdirection,
      service: infoProfile.service,
      departament: infoProfile.departament,
      unit: infoProfile.unit,
      role: infoProfile.role,
    }
    console.log(data)
  }
  return (
    <Dialog
      open={updateProfileModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateProfileHandler} autoComplete='false'>
        <DialogTitle id='notice-modal-slide-title' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={handleCloseModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>{`Editar Perfil`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridItem xs={12}>
            <GridContainer>
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
              <GridItem xs={6}>
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

              <GridItem xs={6}>
                <FormControl>
                  <InputLabel htmlFor='profile-update-type'>SUBDIRECCION</InputLabel>
                  <Selectable
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
                </FormControl>
              </GridItem>
              <GridItem xs={6}>
                <FormControl>
                  <InputLabel htmlFor='profile-update-type'>SERVICIO</InputLabel>
                  <Selectable
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
                </FormControl>
              </GridItem>
              <GridItem xs={6}>
                <FormControl>
                  <InputLabel htmlFor='profile-update-type'>DEARTAMENTO</InputLabel>
                  <Selectable
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
                </FormControl>
              </GridItem>
              <GridItem xs={6}>
                <FormControl>
                  <InputLabel htmlFor='profile-update-type'>UNIDAD</InputLabel>
                  <Selectable
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
                </FormControl>
              </GridItem>
              <GridItem xs={6}>
                <FormControl>
                  <InputLabel htmlFor='profile-update-type'>ROL</InputLabel>
                  <Selectable
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
                </FormControl>
              </GridItem>

              <GridItem xs={6}>
                <FormControl>
                  <InputLabel htmlFor='team-update-type'>Estado</InputLabel>
                  <Selectable
                    value={matchStatusUser(infoProfile.status)}
                    onChange={(e) => setInfoProfile({ ...infoProfile, status: e.target.value })}
                    inputProps={{
                      name: 'team-update-type',
                      id: 'team-update-type',
                    }}
                  >
                    <MenuItem disabled>Selecciona una Opción</MenuItem>
                    {['Activo', 'Inactivo'].map((entityType, index) => (
                      <MenuItem
                        classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                        value={entityType}
                        key={index}
                      >
                        {entityType}
                      </MenuItem>
                    ))}
                  </Selectable>
                </FormControl>
              </GridItem>
            </GridContainer>
          </GridItem>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <GridContainer>
            <GridItem xs={12}>
              <Button type='submit' color='primary' block>
                Actualizar Perfil
              </Button>
              <Clearfix />
            </GridItem>
          </GridContainer>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UpdateProfileModal
