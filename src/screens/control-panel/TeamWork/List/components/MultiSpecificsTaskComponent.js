import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Delete, Edit } from '@mui/icons-material'
import { makeStyles, Typography } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import MultiSpecificsTaskForm from './MultiSpecificTaskForm'
import { filterMultiTask } from 'redux/actions/uiAddMultiTaskAction'
import { buttonActionMultiTask } from 'redux/actions/uiAddMultiTaskAction'
import { UI_MULTI_TASK_RESET } from 'redux/constants/uiMultiTaskConstant'
import { editMultiTask } from 'redux/actions/uiAddMultiTaskAction'
import styles from '../styles/taskFormStyles'

const useStyles = makeStyles(styles)

const MultiSpecificsTaskComponent = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { tasks, addTask } = useSelector((state) => state.uiMultiTask)

  useEffect(() => {
    return () => dispatch({ type: UI_MULTI_TASK_RESET })
  }, [dispatch])

  return (
    <>
      <GridItem className={classes.formRoot} xs={12}>
        {tasks.length > 0 && (
          <>
            <GridContainer>
              <GridItem s={12}>
                <Typography variant='body1'>Lista de Tareas Asignadas</Typography>
              </GridItem>
            </GridContainer>

            {tasks.map((task) => (
              <GridContainer key={task.id_tarea}>
                <GridItem xs={10}>
                {task.descripcion_tarea.length > 20
                    ? task.descripcion_tarea.slice(1, 10) +
                      '...' +
                      task.descripcion_tarea.slice(task.descripcion_tarea.length - 6, task.descripcion_tarea.length)
                    : task.descripcion_tarea}
                </GridItem>
                <GridItem xs={1}>
                  <Button
                    size='sm'
                    color='primary'
                    disabled={addTask}
                    justIcon
                    onClick={() => dispatch(editMultiTask(task.id_tarea))}
                  >
                    <Edit />
                  </Button>
                </GridItem>
                <GridItem xs={1}>
                  <Button
                    size='sm'
                    color='danger'
                    disabled={addTask}
                    justIcon
                    onClick={() => dispatch(filterMultiTask(task.id_tarea))}
                  >
                    <Delete />
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
