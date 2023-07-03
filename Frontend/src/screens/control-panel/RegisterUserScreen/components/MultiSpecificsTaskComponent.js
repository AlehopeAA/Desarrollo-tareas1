import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import MultiSpecificsTaskForm from './MultiSpecificsTaskForm'
import GridContainer from 'components/Grid/GridContainer'
import { filterMultiTask } from 'redux/actions/uiAddMultiTaskAction'
import { buttonActionMultiTask } from 'redux/actions/uiAddMultiTaskAction'
import { UI_MULTI_TASK_RESET } from 'redux/constants/uiMultiTaskConstant'

const MultiSpecificsTaskComponent = () => {
  const dispatch = useDispatch()

  const { tasks, addTask } = useSelector((state) => state.uiMultiTask)

  useEffect(() => {
    return () => dispatch({ type: UI_MULTI_TASK_RESET })
  }, [dispatch])

  return (
    <>
      <GridItem xs={12}>
        {tasks.length > 0 && (
          <>
            <GridContainer>
              <GridItem s={12}>
                <Typography>Lista de Tareas Asignadas</Typography>
              </GridItem>
            </GridContainer>

            {tasks.map((task) => (
              <GridContainer key={task.id_tarea}>
                <GridItem xs={9}>
                  {task.descripcion_tarea.length > 20
                    ? task.descripcion_tarea.slice(1, 10) +
                      '...' +
                      task.descripcion_tarea.slice(task.descripcion_tarea.length - 6, task.descripcion_tarea.length)
                    : task.descripcion_tarea}
                </GridItem>
                <GridItem xs={3}>
                  <Button size='sm' onClick={() => dispatch(filterMultiTask(task.id_tarea))}>
                    Remover Tarea
                  </Button>
                </GridItem>
              </GridContainer>
            ))}
          </>
        )}
      </GridItem>
      <GridItem xs={12}>
        {!addTask ? (
          <Button onClick={() => dispatch(buttonActionMultiTask())}>
            {tasks.length > 0 ? 'Agregar Nueva Tarea Específica' : 'Agregar Tarea Específica'}
          </Button>
        ) : (
          <MultiSpecificsTaskForm />
        )}
      </GridItem>
    </>
  )
}

export default MultiSpecificsTaskComponent
