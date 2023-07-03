import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { format } from 'date-fns'
import Button from 'components/CustomButtons/Button'
import ObjectivesHistoricalTable from 'components/ReactTable/ObjectivesTable/ObjectivesHistoricalTable'
import { getObjetivesHistorical } from 'redux/actions/objetivesOrdExtOtherAction'
import { OBJETIVES_HISTORICAL_RESET } from 'redux/constants/objetivesOrdExtOtherConstants'

import styles from '../styles/ObjectiveModalStyle'

const useStyles = makeStyles(styles)

const ViewHistorical = ({ closeViewActivityInfoModal, info, label }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  
  const { loadingObjetiveHistoricalList, objetiveHistoricalListData, successObjetiveHistoricalList } = useSelector(
    (state) => state.objetiveHistoricalList
  )

  const [infodata, setData] = useState([])

  useEffect(() => {
    if (successObjetiveHistoricalList) {
      const objetives = objetiveHistoricalListData.objetives.map((item) => {
        return {
          ...item,
          fecha_modificacion: format(new Date(item.fecha_modificacion), 'dd-MM-yyyy'),
          fullModificador: `${item?.nombreModificador || ''} ${item?.apellido1Modificador || ''} ${item?.apellido2Modificador || ''}  `,
          fullname: `${item?.nombre || ''} ${item?.apellido1 || ''} ${item?.apellido2 || ''}  `,
          fullUnidadesAnterior: `${item?.unidades_minimo_anterior || '-'} / ${item?.unidades_medio_anterior || '-'} / ${item?.unidades_maximo_anterior || '-'}  `,
          fullEntradaAnterior: `${item?.porcentaje_entrada_minimo_anterior || '-'} / ${item.porcentaje_entrada_medio_anterior || '-'} / ${item.porcentaje_entrada_maximo_anterior || '-'} `,
          fullTiempoAnterior: `${item?.tiempo_minimo_anterior || '-'} / ${item?.tiempo_medio_anterior || '-'} / ${item?.tiempo_maximo_anterior || '-'}  `,
          fullJornadaAnterior: `${item?.porcentaje_jornada_minimo_anterior || '-'} / ${item.porcentaje_jornada_medio_anterior || '-'} / ${item.porcentaje_jornada_maximo_anterior || '-'} `,
          fullUnidadesNueva: `${item?.unidades_minimo_nueva || '-'} / ${item?.unidades_medio_nueva || '-'} / ${item?.unidades_maximo_nueva || '-'}  `,
          fullEntradaNueva: `${item?.porcentaje_entrada_minimo_nueva || '-'} / ${item.porcentaje_entrada_medio_nueva || '-'} / ${item.porcentaje_entrada_maximo_nueva || '-'} `,
          fullTiempoNueva: `${item?.tiempo_minimo_nueva || '-'} / ${item?.tiempo_medio_nueva || '-'} / ${item?.tiempo_maximo_nueva || '-'}  `,
          fullJornadaNueva: `${item?.porcentaje_jornada_minimo_nueva || '-'} / ${item.porcentaje_jornada_medio_nueva || '-'} / ${item.porcentaje_jornada_maximo_nueva || '-'} `,
        }
      })
      setData(objetives)
    } else {
        dispatch(getObjetivesHistorical(info))
    }
  }, [dispatch, successObjetiveHistoricalList])

  useEffect(() => {
    return () => dispatch({ type: OBJETIVES_HISTORICAL_RESET })
  }, [dispatch])

  return (
    <>
      {!loadingObjetiveHistoricalList && (
        <>
          <ObjectivesHistoricalTable data={infodata} label={label} />
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
