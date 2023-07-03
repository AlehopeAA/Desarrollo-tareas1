import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { format } from 'date-fns'
import Button from 'components/CustomButtons/Button'
import HistoricalTable from './HistoricalTable'
import { getConfiguracionHistorical } from 'redux/actions/configuracionActions'
import { CONFIGURACION_HISTORICAL_RESET } from 'redux/constants/configuracionConstants'

import styles from '../styles/configuracionListScreenStyles'

const useStyles = makeStyles(styles)

const ViewHistorical = ({ closeViewActivityInfoModal, info }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  
  const { loadingConfiguracionHistoricalList, configuracionHistoricalListData, successConfiguracionHistoricalList } = useSelector(
    (state) => state.configuracionHistoricalList
  )

  const [infodata, setData] = useState([])

  useEffect(() => {
    if (successConfiguracionHistoricalList) {
      const configuraciones = configuracionHistoricalListData.map((item) => {
        return {
          ...item,
          fecha_modificacion: format(new Date(item.fecha_modificacion), 'dd-MM-yyyy'),
          fullModificador: `${item?.nombreModificador || ''} ${item?.apellido1Modificador || ''} ${item?.apellido2Modificador || ''}  `,
        }
      })
      setData(configuraciones)
    } else {
        dispatch(getConfiguracionHistorical(info))
    }
  }, [dispatch, successConfiguracionHistoricalList])

  useEffect(() => {
    return () => dispatch({ type: CONFIGURACION_HISTORICAL_RESET })
  }, [dispatch])

  return (
    <>
      {!loadingConfiguracionHistoricalList && (
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
