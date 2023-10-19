import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  FormControl, Select as Selectable, InputLabel, makeStyles, MenuItem } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { TASK_LIST_RESET } from 'redux/constants/taskConstants'
import { getTasks } from 'redux/actions/taskActions'
import styles from '../../styles/tasksSelectStyles'

const useStyles = makeStyles(styles)

const TasksSelect = ({ activityInfo, setActivityInfo, task, setTask }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { successTaskList, loadingTaskList, tasksData } = useSelector((state) => state.taskList)

  useEffect(() => {
    if (!successTaskList) {
      dispatch(getTasks())
    }
    else {
      //Se ha cargado.
      if (task) {
        setTask(tasksData.filter((taskData) => taskData.id_tarea === task)[0])
      }
    }
  }, [successTaskList])

  useEffect(() => {
    if (tasksData && task) {
      setActivityInfo({
        ...activityInfo,
        tarea: tasksData.filter((taskData) => taskData.id_tarea === task),
      })
    }
  }, [task])

  useEffect(() => {
    return () => dispatch({ type: TASK_LIST_RESET })
  }, [dispatch])

  return (
    <GridItem xs={12}>
      {loadingTaskList ? (
        <>Cargando</>
      ) : (
        tasksData?.length > 0 && (
          <FormControl fullWidth>
            <InputLabel htmlFor='tasks'>Tareas</InputLabel>
            <Selectable
              MenuProps={{
                className: classes.selectMenu,
              }}
              className={classes.select}
              value={task}
              onChange={(e) => setTask(tasksData.filter((taskData) => taskData.id_tarea === e.target.value)[0])}
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
                Tareas
              </MenuItem>
              {tasksData.map((task, index) => (
                <MenuItem
                  classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                  value={task.id_tarea}
                  key={index}
                >
                  {task.descripcion_tarea}
                </MenuItem>
              ))}
            </Selectable>
          </FormControl>
        )
      )}
    </GridItem>
  )
}

export default TasksSelect
