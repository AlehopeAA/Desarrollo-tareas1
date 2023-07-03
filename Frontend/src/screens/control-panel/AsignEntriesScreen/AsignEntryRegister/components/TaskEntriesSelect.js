import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, makeStyles, MenuItem, Select as Selectable } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
// import { TEAM_WORKS_BY_RESPONSIBLE_RESET } from 'redux/constants/teamWorkConstants'
import { getEntriesToManager } from 'redux/actions/entriesManagerActions'
import { ENTRIES_TO_MANAGER_LIST_RESET } from 'redux/constants/entriesManagerConstants'

const TaskEntriesSelect = ({ setTaskEntryId, taskEntryId }) => {
  const dispatch = useDispatch()
  const classes = {}

  const { loadingEntriesToManagerList, successEntriesToManagerList, entriesToManagerList } = useSelector(
    (state) => state.entriesToManagerList
  )
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (!successEntriesToManagerList) {
      dispatch(getEntriesToManager(userInfo.id_puesto))
    }
  }, [successEntriesToManagerList])

  useEffect(() => {
    return () => dispatch({ type: ENTRIES_TO_MANAGER_LIST_RESET })
  }, [dispatch])

  const isEmpty = (arr) => arr.length <= 0

  return (
    <>
      {loadingEntriesToManagerList ? (
        <>Cargando</>
      ) : (
        entriesToManagerList && (
          <GridItem xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor='register-entry'>
                {isEmpty(entriesToManagerList?.assigned) ? 'No hay Tareas para seleccionar' : 'Tareas *'}
              </InputLabel>
              <Selectable
                MenuProps={{
                  className: classes.selectMenu,
                }}
                className={classes.select}
                value={taskEntryId}
                onChange={(e) => {
                  setTaskEntryId(e.target.value)
                }}
                disabled={isEmpty(entriesToManagerList?.assigned)}
                inputProps={{
                  name: 'register-entry',
                  id: 'register-entry',
                }}
              >
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                  }}
                  disabled
                >
                  Selecciona uno
                </MenuItem>
                {entriesToManagerList.assigned.map((taskEntry, index) => (
                  <MenuItem
                    value={taskEntry.id_tarea}
                    key={index}
                    classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                  >
                    {taskEntry.codigo_perfil && (
                       `TAREA: ${taskEntry.descripcion_tarea} PERFIL: ${taskEntry.codigo_perfil} `
                     )}
                    
                    {taskEntry.nombre && (
                       `TAREA: ${taskEntry.descripcion_tarea} PUESTO: ${taskEntry.nombre} ${taskEntry.apellido1} ${taskEntry.apellido2} `
                    )}
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

export default TaskEntriesSelect
