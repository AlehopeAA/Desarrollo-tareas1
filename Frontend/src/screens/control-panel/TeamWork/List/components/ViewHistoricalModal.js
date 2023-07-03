import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { format } from 'date-fns'
import Button from 'components/CustomButtons/Button'
import HistoricalTable from './HistoricalTable'
import { getJobPositionHistorical } from 'redux/actions/teamWorkActions'
import { TEAM_WORK_HISTORICAL_RESET } from 'redux/constants/teamWorkConstants'

import styles from '../styles/teamWorkListStyles'

const useStyles = makeStyles(styles)

const ViewHistorical = ({ closeViewActivityInfoModal, info }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  
  const { loadingTeamWorkHistoricalList, teamWorkHistoricalListData, successTeamWorkHistoricalList } = useSelector(
    (state) => state.teamWorkHistoricalList
  )

  const [infodata, setData] = useState([])

  useEffect(() => {
    if (successTeamWorkHistoricalList) {
      const puestos = teamWorkHistoricalListData.map((item) => {
        return {
          ...item,
          fecha_modificacion: format(new Date(item.fecha_modificacion), 'dd-MM-yyyy'),
          fullModificador: `${item?.nombreModificador || ''} ${item?.apellido1Modificador || ''} ${item?.apellido2Modificador || ''}  `,
        }
      })
      setData(puestos)
    } else {
        dispatch(getJobPositionHistorical(info))
    }
  }, [dispatch, successTeamWorkHistoricalList])

  useEffect(() => {
    return () => dispatch({ type: TEAM_WORK_HISTORICAL_RESET })
  }, [dispatch])

  return (
    <>
      {!loadingTeamWorkHistoricalList && (
        <>
          <HistoricalTable data={infodata} />
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
