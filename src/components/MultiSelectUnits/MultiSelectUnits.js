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

const MultiSelectUnit = ({ label, data, handleChangeMultiData, multiData }) => {
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
            renderValue={(selected) => `${selected.map((select) => select.codigo_unidad)}, `}
            MenuProps={MenuProps}
          >
            {data.length > 0 ? (
              data.map((unidad) => (
                <MenuItem
                  key={unidad.id_unidad}
                  value={{ id_unidad: unidad.id_unidad, codigo_unidad: unidad.codigo_unidad }}
                >
                  <Checkbox checked={multiData.map((data) => data.id_unidad).indexOf(unidad.id_unidad) > -1} />
                  <ListItemText primary={unidad.codigo_unidad} />
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

export default MultiSelectUnit
