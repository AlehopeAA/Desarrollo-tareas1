import { FormControl, Select as Selectable, InputLabel, MenuItem } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'

const ObjetiveDificultySelect = ({ disabled, dificultySelect, setDificultySelect }) => {
  const classes = {}
  return (
    <GridItem xs={6}>
      <FormControl fullWidth>
        <InputLabel id='dificulty'>Dificultad</InputLabel>
        <Selectable
          MenuProps={{
            className: classes.selectMenu,
          }}
          className={classes.select}
          value={dificultySelect.dificulty}
          onChange={(e) => setDificultySelect({ ...dificultySelect, dificulty: e.target.value })}
          inputProps={{
            name: 'dificulty',
            id: 'dificulty',
          }}
          disabled={disabled}
        >
          <MenuItem
            disabled
            classes={{
              root: classes.selectMenuItem,
            }}
          >
            Seleccione la Dificultad
          </MenuItem>
          {['ALTA', 'MEDIA', 'BAJA'].map((dificulty, index) => (
            <MenuItem
              classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
              value={dificulty}
              key={index}
            >
              {dificulty}
            </MenuItem>
          ))}
        </Selectable>
      </FormControl>
    </GridItem>
  )
}

export default ObjetiveDificultySelect
