import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, Select as Selectable, InputLabel, makeStyles, MenuItem } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { getTaskGenerals } from 'redux/actions/taskGeneralActions'
import { TASK_GENERAL_LIST_RESET } from 'redux/constants/taskGeneralConstants'

const GeneralTaskSelect = ({ toggleHasDifficulty, objetiveGeneral, setObjetiveGeneral }) => {
  const dispatch = useDispatch()
  const classes = {}

  const { loadingTaskGeneralList, taskGenerals, successTaskGeneralList } = useSelector((state) => state.taskGeneralList)

  useEffect(() => {
    if (!successTaskGeneralList) {
      dispatch(getTaskGenerals())
    }
  }, [successTaskGeneralList])

  useEffect(() => {
    return () => dispatch({ type: TASK_GENERAL_LIST_RESET })
  }, [dispatch])

  const handleChange = (e) => {
    const { dificultad } = e.target.value
    setObjetiveGeneral({ ...objetiveGeneral, task: e.target.value })
    dificultad === 'SI' && toggleHasDifficulty(true)
  }

  const isEmpty = (array) => array.length <= 0

  return (
    <GridItem xs={6}>
      {loadingTaskGeneralList ? (
        <>Cargando</>
      ) : (
        taskGenerals && (
          <FormControl fullWidth>
            <InputLabel htmlFor='tasks'>
              {isEmpty(taskGenerals) ? 'No hay tareas para seleccionar' : 'Tareas Generales'}
            </InputLabel>
            <Selectable
              MenuProps={{
                className: classes.selectMenu,
              }}
              className={classes.select}
              value={objetiveGeneral.task}
              onChange={(e) => handleChange(e)}
              disabled={isEmpty(taskGenerals)}
              inputProps={{
                name: 'tasks',
                id: 'tasks',
              }}
            >
              {taskGenerals?.length > 0 && (
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem,
                  }}
                >
                  Seleccione una tarea
                </MenuItem>
              )}
              {taskGenerals?.length > 0 ? (
                taskGenerals.map((task, index) => (
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
                <MenuItem disabled>No hay tareas de generales para seleccionar</MenuItem>
              )}
            </Selectable>
          </FormControl>
        )
      )}
    </GridItem>
  )
}

export default GeneralTaskSelect
