import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, Select as Selectable, InputLabel, MenuItem } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { getTaskSpecifics } from 'redux/actions/taskSpecificActions'
import { TASK_SPECIFIC_LIST_RESET } from 'redux/constants/taskSpecificConstants'

const SpecificTaskSelect = ({ toggleHasDifficulty, objetiveSpecific, setObjetiveSpecific }) => {
  const dispatch = useDispatch()
  const classes = {}

  const { loadingTaskSpecificList, taskSpecifics, successTaskSpecificList } = useSelector(
    (state) => state.taskSpecificList
  )

  useEffect(() => {
    if (!successTaskSpecificList) {
      dispatch(getTaskSpecifics())
    }
  }, [successTaskSpecificList])

  useEffect(() => {
    return () => dispatch({ type: TASK_SPECIFIC_LIST_RESET })
  }, [dispatch])

  const isEmpty = (array) => array.length <= 0

  const handleChange = (e) => {
    const { dificultad } = e.target.value
    setObjetiveSpecific({ ...objetiveSpecific, task: e.target.value })
    dificultad === 'SI' && toggleHasDifficulty(true)
  }

  return (
    <GridItem xs={6}>
      {loadingTaskSpecificList ? (
        <>Cargando</>
      ) : (
        taskSpecifics && (
          <FormControl fullWidth>
            <InputLabel htmlFor='tasks'>
              {isEmpty(taskSpecifics) ? 'No hay tareas para seleccionar' : 'Tareas Específicas'}
            </InputLabel>
            <Selectable
              MenuProps={{
                className: classes.selectMenu,
              }}
              className={classes.select}
              value={objetiveSpecific.task}
              disabled={isEmpty(taskSpecifics)}
              onChange={(e) => handleChange(e)}
              inputProps={{
                name: 'tasks',
                id: 'tasks',
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem,
                }}
              >
                Seleccione una tarea
              </MenuItem>
              {taskSpecifics.map((task, index) => (
                <MenuItem
                  classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                  id={task.id_tarea}
                  value={task}
                  key={index}
                >
                  {`TAREA: ${task.descripcion_tarea} PUESTO: ${task.nombre} ${task.apellido1} ${task.apellido2}`}
                </MenuItem>
              ))}
            </Selectable>
          </FormControl>
        )
      )}
    </GridItem>
  )
}

export default SpecificTaskSelect
