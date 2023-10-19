import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectTareas from 'components/MultiSelectTasks/MultiSelectTask'

import { TASK_LIST_RESET } from 'redux/constants/taskConstants'
import { getAllTasks } from 'redux/actions/taskActions'
import styles from '../styles/multiSelectStyles'

const useStyles = makeStyles(styles)

const TareasMultiSelect = ({ tareasData, setTareasData }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const { successTaskList, loadingTaskList, tasksData, errorTaskList } = useSelector((state) => state.taskList)


  useEffect(() => {
    return () => dispatch({ type: TASK_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successTaskList) {
      dispatch(getAllTasks())
    } else {
      setData(tasksData)
    }
  }, [successTaskList])

  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (tareasData.map((tarea) => tarea.id_tarea).indexOf(value[value.length - 1].id_tarea) === -1) {
      setTareasData(value)
    } else {
      setTareasData(tareasData.filter((tarea) => tarea.id_tarea !== value[value.length - 1]?.id_tarea))
    }
  }

  return (
    <GridItem xs={12}>
      <MultiSelectTareas
        label={'Tareas'}
        data={data}
        multiData={tareasData}
        handleChangeMultiData={handleChangeMultiData}
      />
    </GridItem>
  )
}

export default TareasMultiSelect
