import { FormControl, InputLabel, MenuItem, Select as Selectable, makeStyles } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import styles from '../../styles/updateUserModalStyles'

const useStyles = makeStyles(styles)

const Inputs = ({ infoModalData, setModalData }) => {
  const classes = useStyles()
  return (
    <GridContainer>
      <GridItem xs={12} md={6}>
        <CustomInput
          labelText={'Nombre'}
          id='user-name'
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: infoModalData.nombre,
            onChange: (e) => setModalData({ ...infoModalData, nombre: e.target.value }),
            type: 'text',
            required: true,
          }}
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <CustomInput
          labelText={'Apellido 1'}
          id='lastname1'
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: infoModalData.apellido1,
            onChange: (e) => setModalData({ ...infoModalData, apellido1: e.target.value }),
            type: 'text',
            required: true,
          }}
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <CustomInput
          labelText={'Apellido 2'}
          id='lastname2'
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: infoModalData.apellido2,
            onChange: (e) => setModalData({ ...infoModalData, apellido2: e.target.value }),
            type: 'text',
            required: true,
          }}
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <CustomInput
          labelText={'Jornada Laboral'}
          id='joranda_laboral'
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: infoModalData.jornada_laboral,
            onChange: (e) => setModalData({ ...infoModalData, jornada_laboral: e.target.value }),
            type: 'text',
            required: true,
          }}
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <CustomInput
          labelText={'Denominacion del Puesto'}
          id='denominacion_puesto'
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: infoModalData.denominacion_puesto,
            onChange: (e) => setModalData({ ...infoModalData, denominacion_puesto: e.target.value }),
            type: 'text',
            required: true,
          }}
        />
      </GridItem>

      {/* <GridItem xs={12} md={6}>
        <FormControl fullWidth style={{ marginTop: '12px' }}>
          <InputLabel htmlFor='user-update-type'>Estado</InputLabel>
          <Selectable
            value={infoModalData.activo}
            onChange={(e) => setModalData({ ...infoModalData, activo: e.target.value })}
            inputProps={{
              name: 'user-update-type',
              id: 'user-update-type',
            }}
          >
            <MenuItem disabled>Selecciona una Opción</MenuItem>
            {['SI', 'NO'].map((entityType, index) => (
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
      </GridItem> */}
    </GridContainer>
  )
}

export default Inputs
