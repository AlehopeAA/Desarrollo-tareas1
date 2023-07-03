import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import styles from './styles/viewObjetivesScreenStyles'
import { getMyObjetives } from 'redux/actions/myObjetivesAction'
import { MY_OBJETIVES_LIST_RESET } from 'redux/constants/myObjetivesConstants'
import ObjectivesTable from 'components/ReactTable/ObjectivesTable/MyObjectivesTable'

const useStyles = makeStyles(styles)

const ViewObjectivesScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { loadingMyObjetiveList, myObjetiveListData, successMyObjetiveList } = useSelector(
    (state) => state.myObjetiveList
  )

  const [infodata, setData] = useState([])
  
  useEffect(() => {
    return () => dispatch({ type: MY_OBJETIVES_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (successMyObjetiveList) {
      const objectives = myObjetiveListData.map((item) => {
        return {
          ...item,
          fullUnidades: `${item?.unidades_minimo || '-'} / ${item?.unidades_medio || '-'} / ${item?.unidades_maximo || '-'}  `,
          fullEntrada: `${item?.porcentaje_entrada_minimo || '-'} / ${item.porcentaje_entrada_medio || '-'} / ${item.porcentaje_entrada_maximo || '-'} `,
          fullTiempo: `${item?.tiempo_minimo || '-'} / ${item?.tiempo_medio || '-'} / ${item?.tiempo_maximo || '-'}  `,
          fullJornada: `${item?.porcentaje_jornada_minimo || '-'} / ${item.porcentaje_jornada_medio || '-'} / ${item.porcentaje_jornada_maximo || '-'} `,
          codigo_perfil: item?.codigo_perfil?.toString().replaceAll(',', ' ; ') || '',
        }
      })
      setData(objectives)
    } else {
      dispatch(getMyObjetives())
    }
  }, [dispatch, successMyObjetiveList])

  return (
    <>
      {!loadingMyObjetiveList && (
        <>
          <ObjectivesTable data={infodata} />
        </>
      )}
      <GridContainer xs={12} style={{ marginTop: '20px', justifyContent: 'center' }}>
        <GridItem>
          <NavLink to={'/admin/user-page'} >
            <Button color='primary'>
              Volver
            </Button>
          </NavLink>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default ViewObjectivesScreen
