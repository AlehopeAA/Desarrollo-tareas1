import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GridItem from 'components/Grid/GridItem'
import MultiSelectTask from 'components/MultiSelectTasks/MultiSelectTask'
import { TASK_LIST_RESET } from 'redux/constants/taskConstants'
import { getTasks } from 'redux/actions/taskActions'

const MultiTasksSelect = ({ tasks, setTask }) => {
  const dispatch = useDispatch()

  const { successTaskList, loadingTaskList, tasksData, errorTaskList } = useSelector((state) => state.taskList)

  useEffect(() => {
    return () => dispatch({ type: TASK_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successTaskList) {
      dispatch(getTasks())
    }
  }, [successTaskList])

  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (tasks.map((task) => task.id_tarea).indexOf(value[value.length - 1].id_tarea) === -1) {
      setTask(value)
    } else {
      setTask(tasks.filter((task) => task.id_tarea !== value[value.length - 1]?.id_tarea))
    }
  }
  return (
    <GridItem xs={12} style={{ marginTop: '17px' }}>
      {loadingTaskList ? (
        <>Cargando...</>
      ) : tasksData?.length > 0 ? (
        <MultiSelectTask
          label={'Tareas'}
          data={tasksData}
          multiData={tasks}
          handleChangeMultiData={handleChangeMultiData}
        />
      ) : (
        'No hay tareas para selecionar'
      )}
    </GridItem>
  )
}

export default MultiTasksSelect
