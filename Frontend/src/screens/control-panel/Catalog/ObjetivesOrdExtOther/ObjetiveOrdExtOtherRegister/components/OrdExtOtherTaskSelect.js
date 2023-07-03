import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, Select as Selectable, InputLabel, makeStyles, MenuItem } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { getTaskOthers } from 'redux/actions/taskOtherActions'
import { TASK_OTHER_LIST_RESET } from 'redux/constants/taskOtherConstants'

const OrdExtOtherTaskSelect = ({ toggleHasDifficulty, objetiveOrdExtOther, setObjetiveOrdExtOther }) => {
  const dispatch = useDispatch()
  const classes = {}

  const { loadingTaskOtherList, taskOthers, successTaskOtherList } = useSelector((state) => state.taskOtherList)

  useEffect(() => {
    if (!successTaskOtherList) {
      dispatch(getTaskOthers())
    }
  }, [successTaskOtherList])

  useEffect(() => {
    return () => dispatch({ type: TASK_OTHER_LIST_RESET })
  }, [dispatch])

  const handleChange = (e) => {
    const { dificultad } = e.target.value
    setObjetiveOrdExtOther({ ...objetiveOrdExtOther, task: e.target.value })
    dificultad === 'SI' && toggleHasDifficulty(true)
  }

  const isEmpty = (array) => array.length <= 0

  return (
    <GridItem xs={6}>
      {loadingTaskOtherList ? (
        <>Cargando</>
      ) : (
        taskOthers && (
          <FormControl fullWidth>
            <InputLabel htmlFor='tasks'>
              {isEmpty(taskOthers) ? 'No hay Tareas para seleccionar' : 'Tareas Ord/Ext'}
            </InputLabel>
            <Selectable
              MenuProps={{
                className: classes.selectMenu,
              }}
              className={classes.select}
              disabled={isEmpty(taskOthers)}
              value={objetiveOrdExtOther.task}
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
              {taskOthers.map((task, index) => (
                <MenuItem
                  classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                  value={task}
                  id={task.id_tarea}
                  key={index}
                >
                  {`TAREA: ${task.descripcion_tarea} PERFIL: ${task.codigo_perfil}`}
                </MenuItem>
              ))}
            </Selectable>
          </FormControl>
        )
      )}
    </GridItem>
  )
}

export default OrdExtOtherTaskSelect
