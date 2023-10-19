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
const isEmpty = (arr) => arr.length <= 0

const MultiSelectValidators = ({ label, data, handleChangeMultiData, multiData }) => {
  return (
    <>
      {data ? (
        <FormControl sx={{ mb: 1, width: '100%' }}>
          <InputLabel id='demo-multiple-checkbox-label'>
            {isEmpty(data) ? `No hay ${label} para seleccionar` : label}
          </InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={multiData}
            disabled={isEmpty(data)}
            onChange={handleChangeMultiData}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => `${selected.map((select) => `${select.nombre} ${select?.apellido1} ${select?.apellido2}`  )}, `}
            MenuProps={MenuProps}
          >
            {data.map((dataJobPosition) => (
              <MenuItem
                key={dataJobPosition.id_puesto}
                value={{ id_puesto: dataJobPosition.id_puesto, nombre: dataJobPosition.nombre, apellido1: dataJobPosition?.apellido1, apellido2: dataJobPosition?.apellido2 }}
              >
                <Checkbox checked={multiData.map((data) => data.id_puesto).indexOf(dataJobPosition.id_puesto) > -1} />
                <ListItemText primary={`${dataJobPosition.nombre} ${dataJobPosition?.apellido1} ${dataJobPosition?.apellido2}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <>Cargando {label}</>
      )}
    </>
  )
}

export default MultiSelectValidators
