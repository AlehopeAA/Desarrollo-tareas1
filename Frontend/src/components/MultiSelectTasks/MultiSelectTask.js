import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { Tooltip } from '@material-ui/core'

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

const MultiSelectTask = ({ label, data, handleChangeMultiData, multiData }) => {
  return (
    <div>
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
            renderValue={(selected) => `${selected.map((select) => select.fullName)}, `}
            MenuProps={MenuProps}
          >
            {data.map((task) => (
              <MenuItem key={task.id_tarea} value={{ id_tarea: task.id_tarea, fullName: task.descripcion_tarea }}>
                <Checkbox checked={multiData.map((data) => data.id_tarea).indexOf(task.id_tarea) > -1} />                
                <Tooltip title={<span style={{ fontSize: "16px" }}>{task.descripcion_tarea}</span>} placement="bottom"><span>{task.descripcion_tarea}</span></Tooltip>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <>Cargando Tareas</>
      )}
    </div>
  )
}

export default MultiSelectTask
