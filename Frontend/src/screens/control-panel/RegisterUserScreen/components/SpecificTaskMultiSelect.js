import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import CustomInput from 'components/CustomInput/CustomInput'
import Button from 'components/CustomButtons/Button'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import { TASK_LIST_RESET } from 'redux/constants/taskConstants'
import { getTasks } from 'redux/actions/taskActions'
import styles from '../styles/specifictaskMultiSelectStyles'
import MultiSelectTask from 'components/MultiSelectTasks/MultiSelectTask'

const useStyles = makeStyles(styles)

const SpecificTaskMultiSelect = ({ specificTasks, setSpecificTask }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { successTaskList, loadingTaskList, tasks, errorTaskList } = useSelector((state) => state.taskList)

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
    if (specificTasks.map((specificTask) => specificTask.id_tarea).indexOf(value[value.length - 1].id_tarea) === -1) {
      setSpecificTask(value)
    } else {
      setSpecificTask(
        specificTasks.filter((specificTask) => specificTask.id_tarea !== value[value.length - 1]?.id_tarea)
      )
    }
  }

  return (
    <GridItem xs={12}>
      <MultiSelectTask
        label={'Tareas Especificas'}
        data={tasks}
        multiData={specificTasks}
        handleChangeMultiData={handleChangeMultiData}
      />
    </GridItem>
  )
}

export default SpecificTaskMultiSelect
