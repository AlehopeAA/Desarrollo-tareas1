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

const MultiSelectService = ({ label, data, handleChangeMultiData, multiData }) => {
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
            renderValue={(selected) => `${selected.map((select) => select.codigo_servicio)}, `}
            MenuProps={MenuProps}
          >
            {data.length > 0 ? (
              data.map((servicio) => (
                <MenuItem
                  key={servicio.id_servicio}
                  value={{ id_servicio: servicio.id_servicio, codigo_servicio: servicio.codigo_servicio }}
                >
                  <Checkbox checked={multiData.map((data) => data.id_servicio).indexOf(servicio.id_servicio) > -1} />
                  <ListItemText primary={servicio.codigo_servicio} />
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

export default MultiSelectService
