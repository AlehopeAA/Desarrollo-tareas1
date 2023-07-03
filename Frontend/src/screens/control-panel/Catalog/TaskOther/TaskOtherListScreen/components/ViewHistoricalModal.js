import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { format } from 'date-fns'
import Button from 'components/CustomButtons/Button'
import HistoricalTable from './HistoricalTable'
import { getTaskHistorical } from 'redux/actions/taskOtherActions'
import { TASK_HISTORICAL_RESET } from 'redux/constants/taskOtherConstants'

import styles from '../styles/taskOtherListScreenStyles'

const useStyles = makeStyles(styles)

const ViewHistorical = ({ closeViewActivityInfoModal, info, label }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  
  const { loadingTaskHistoricalList, taskHistoricalListData, successTaskHistoricalList } = useSelector(
    (state) => state.taskHistoricalList
  )

  const [infodata, setData] = useState([])

  useEffect(() => {
    if (successTaskHistoricalList) {
      const puestos = taskHistoricalListData.tareas.map((item) => {
        return {
          ...item,
          fecha_modificacion: format(new Date(item.fecha_modificacion), 'dd-MM-yyyy'),
          fullModificador: `${item?.nombreModificador || ''} ${item?.apellido1Modificador || ''} ${item?.apellido2Modificador || ''}  `,
        }
      })
      setData(puestos)
    } else {
        dispatch(getTaskHistorical(info))
    }
  }, [dispatch, successTaskHistoricalList])

  useEffect(() => {
    return () => dispatch({ type: TASK_HISTORICAL_RESET })
  }, [dispatch])

  return (
    <>
      {!loadingTaskHistoricalList && (
        <>
          <HistoricalTable data={infodata} label={label} />
        </>
      )}{' '}
      <Button color='primary' onClick={closeViewActivityInfoModal} style={{ marginLeft: '10px' }}>
        Volver
      </Button>
      {alert}
    </>
  )
}

export default ViewHistorical
