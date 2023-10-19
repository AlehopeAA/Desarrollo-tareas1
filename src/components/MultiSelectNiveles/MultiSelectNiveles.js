import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const MultiSelectStrings = ({ label, data, handleChangeMultiData, multiData }) => {
  return (
    <>
      {data ? (
        <FormControl sx={{ mb: 1, width: '100%' }}>
          <InputLabel id='demo-multiple-checkbox-label'>{label}</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={multiData}
            onChange={handleChangeMultiData}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => `${selected.map((select) => select)}, `}
            MenuProps={MenuProps}
          >
            {data.length > 0 ? (
              data.map((string) => (
                <MenuItem
                  key={string}
                  value={string}
                >
                  <Checkbox checked={multiData.map((data) => data).indexOf(string) > -1} />
                  <ListItemText style={string == 'SATISFACTORIO' ? {color: '#92D050'}: string == 'INSATISFACTORIO' ? {color: '#FF0000'} : string == 'ALTO' ? {color: '#00B050'} : {color: '#00B0F0'}  } primary={string} />
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No tienes {label} para seleccionar</MenuItem>
            )}
          </Select>
        </FormControl>
      ) : (
        <>Cargando {label}</>
      )}
    </>
  )
}

export default MultiSelectStrings
