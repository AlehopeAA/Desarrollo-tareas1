import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, Select as Selectable, InputLabel, makeStyles, MenuItem } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { getTaskAbsences } from 'redux/actions/taskAbsenceActions'
import { TASK_ABSENCE_LIST_RESET } from 'redux/constants/taskAbsenceConstants'

const TasksAbsencesSelect = ({ toggleHasDifficulty, objetiveAbsence, setObjetiveAbsence }) => {
  const dispatch = useDispatch()
  const classes = {}

  const { loadingTaskAbsenceList, taskAbsences, successTaskAbsenceList } = useSelector((state) => state.taskAbsenceList)

  useEffect(() => {
    if (!successTaskAbsenceList) {
      dispatch(getTaskAbsences())
    }
  }, [successTaskAbsenceList])

  useEffect(() => {
    return () => dispatch({ type: TASK_ABSENCE_LIST_RESET })
  }, [dispatch])

  const handleChange = (e) => {
    const { dificultad } = e.target.value
    setObjetiveAbsence({ ...objetiveAbsence, task: e.target.value })
    dificultad === 'SI' && toggleHasDifficulty(true)
  }

  const isEmpty = (array) => array.length <= 0

  return (
    <GridItem xs={6}>
      {loadingTaskAbsenceList ? (
        <>Cargando</>
      ) : (
        taskAbsences && (
          <FormControl fullWidth>
            <InputLabel htmlFor='tasks'>
              {isEmpty(taskAbsences) ? 'No hay tareas para seleccionar ' : 'Tareas Ausentes'}
            </InputLabel>
            <Selectable
              MenuProps={{
                className: classes.selectMenu,
              }}
              className={classes.select}
              value={objetiveAbsence.task}
              disabled={isEmpty(taskAbsences)}
              onChange={(e) => handleChange(e)}
              inputProps={{
                name: 'tasks',
                id: 'tasks',
              }}
            >
              {taskAbsences?.length > 0 && (
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem,
                  }}
                >
                  Seleccione una tarea
                </MenuItem>
              )}
              {taskAbsences?.length > 0 ? (
                taskAbsences.map((task, index) => (
                  <MenuItem
                    classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                    value={task}
                    id={task.id_tarea}
                    key={index}
                  >
                    {task.descripcion_tarea}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No hay tareas de ausencias para seleccionar</MenuItem>
              )}
            </Selectable>
          </FormControl>
        )
      )}
    </GridItem>
  )
}

export default TasksAbsencesSelect
