import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, makeStyles, MenuItem, Select as Selectable } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { getAcumulativesTasks } from 'redux/actions/acumulativesActions'
import { ACUMULATIVES_TO_MANAGER_LIST_RESET } from 'redux/constants/acumulativesConstants'

const TasksAcumulativesSelect = ({ setTaskAcumulativesId, taskAcumulativesId }) => {
  const dispatch = useDispatch()
  const classes = {}

  const { loadingAcumulativesTasksSelect, successAcumulativesTasksSelect, acumulativesTasksSelect } = useSelector((state) => state.acumulativesTasksSelect)

  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (!successAcumulativesTasksSelect) {
      dispatch(getAcumulativesTasks(userInfo.id_puesto))
    }
  }, [successAcumulativesTasksSelect])

  useEffect(() => {
    return () => dispatch({ type: ACUMULATIVES_TO_MANAGER_LIST_RESET })
  }, [dispatch])

  const isEmpty = (arr) => arr && arr.length <= 0
  
  return (
    <>
      {loadingAcumulativesTasksSelect ? (
        <>Cargando</>
      ) : (
        acumulativesTasksSelect && (
          <GridItem xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor='register-acumulatives'>
                {isEmpty(acumulativesTasksSelect?.tasks) ? 'No hay Tareas acumulativas para seleccionar' : 'Tareas acumulativas*'}
              </InputLabel>
              <Selectable
                MenuProps={{
                  className: classes.selectMenu,
                }}
                className={classes.select}
                value={taskAcumulativesId}
                onChange={(e) => {
                  setTaskAcumulativesId(e.target.value)
                }}
                disabled={isEmpty(acumulativesTasksSelect?.tasks)}
                inputProps={{
                  name: 'register-acumulatives',
                  id: 'register-acumulatives',
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
                {acumulativesTasksSelect.map((taskEntry, index) => (
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

export default TasksAcumulativesSelect
