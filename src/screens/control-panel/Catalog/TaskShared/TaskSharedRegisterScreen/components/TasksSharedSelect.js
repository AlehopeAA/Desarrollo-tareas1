import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, makeStyles, MenuItem, Select as Selectable } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { getTasksShared } from 'redux/actions/sharedActions'
import { SHARED_TO_MANAGER_LIST_RESET } from 'redux/constants/sharedConstants'

const TaskSharedSelect = ({ setTaskSharedId, taskSharedId }) => {
  const dispatch = useDispatch()
  const classes = {}

  const { loadingTasksShared, successTasksShared, tasksShared } = useSelector((state) => state.tasksShared)

  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (!successTasksShared) {
      dispatch(getTasksShared(userInfo.id_puesto))
    }
  }, [successTasksShared])

  useEffect(() => {
    return () => dispatch({ type: SHARED_TO_MANAGER_LIST_RESET })
  }, [dispatch])

  const isEmpty = (arr) => arr && arr.length <= 0
  
  return (
    <>
      {loadingTasksShared ? (
        <>Cargando</>
      ) : (
        tasksShared && (
          <GridItem xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor='register-shared'>
                {isEmpty(tasksShared?.tasks) ? 'No hay Tareas Compartidas para seleccionar' : 'Tareas Compartidas*'}
              </InputLabel>
              <Selectable
                MenuProps={{
                  className: classes.selectMenu,
                }}
                className={classes.select}
                value={taskSharedId}
                onChange={(e) => {
                  setTaskSharedId(e.target.value)
                }}
                disabled={isEmpty(tasksShared?.tasks)}
                inputProps={{
                  name: 'register-shared',
                  id: 'register-shared',
                }}
              >
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                  }}
                  disabled
                >
                  Selecciona una
                </MenuItem>
                {tasksShared.map((taskEntry, index) => (
                  <MenuItem
                    value={taskEntry.id_tarea}
                    key={index}
                    classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                  >
                    {`TAREA: ${taskEntry.descripcion_tarea} PERFIL: ${taskEntry.codigo_perfil}`}
                  </MenuItem>
                ))}
              </Selectable>
            </FormControl>
          </GridItem>
        )
      )}
    </>
  )
}

export default TaskSharedSelect
