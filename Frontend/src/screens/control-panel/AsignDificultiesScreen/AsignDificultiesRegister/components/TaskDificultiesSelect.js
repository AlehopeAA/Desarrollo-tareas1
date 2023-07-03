import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, makeStyles, MenuItem, Select as Selectable } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { getTasksDificulties } from 'redux/actions/difficultiesManagerActions'
import { DIFFICULTIES_TO_MANAGER_LIST_RESET } from 'redux/constants/difficultiesManagerConstants'

const TaskDificultiesSelect = ({ setTaskDificultyId, taskDificultyId }) => {
  const dispatch = useDispatch()
  const classes = {}

  const { loadingDifficultiesToManagerList, successDifficultiesToManagerList, difficultiesToManagerList } = useSelector(
    (state) => state.difficultiesToManagerList
  )
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (!successDifficultiesToManagerList) {
      dispatch(getTasksDificulties(userInfo.id_puesto))
    }
  }, [successDifficultiesToManagerList])

  useEffect(() => {
    return () => dispatch({ type: DIFFICULTIES_TO_MANAGER_LIST_RESET })
  }, [dispatch])

  const isEmpty = (arr) => arr && arr.length <= 0

  return (
    <>
      {loadingDifficultiesToManagerList ? (
        <>Cargando</>
      ) : (
        difficultiesToManagerList && (
          <GridItem xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor='register-difulty'>
                {isEmpty(difficultiesToManagerList) ? 'No hay Tareas para seleccionar' : 'Tareas *'}
              </InputLabel>
              <Selectable
                MenuProps={{
                  className: classes.selectMenu,
                }}
                className={classes.select}
                value={taskDificultyId}
                onChange={(e) => {
                  setTaskDificultyId(e.target.value)
                }}
                disabled={isEmpty(difficultiesToManagerList)}
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
                  Selecciona una
                </MenuItem>
                {difficultiesToManagerList && difficultiesToManagerList.map((taskDificulty, index) => (
                  <MenuItem
                    value={taskDificulty.id_tarea}
                    key={index}
                    classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                  >
                    {`TAREA: ${taskDificulty.descripcion_tarea} PERFIL: ${taskDificulty.codigo_perfil}`}
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

export default TaskDificultiesSelect
