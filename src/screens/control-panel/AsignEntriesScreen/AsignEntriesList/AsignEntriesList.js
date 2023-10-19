import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format, isValid } from 'date-fns'
import { Assignment } from '@mui/icons-material'
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip'
import { Edit } from '@mui/icons-material'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardIcon from 'components/Card/CardIcon'
import CardHeader from 'components/Card/CardHeader'
import ReactTable from 'components/ReactTable/ReactTable'
import { NavLink } from 'react-router-dom'
import Button from 'components/CustomButtons/Button'
import UpdateEntryModal from './components/UpdateEntryModal'
import { getEntriesByManagerId } from 'redux/actions/entriesActions'
import { ENTRIES_LIST_BY_MANAGER_ID_RESET } from 'redux/constants/entriesConstants'

const AsignEntries = () => {
  const dispatch = useDispatch()
  const classes = {}

  const [data, setData] = useState([])
  const [updateEntryModal, setUpdateEntryModal] = useState(false)
  const [updateEntryInfo, setUpdateEntryInfo] = useState({})

  const { loadingEntriesListByManagerId, successEntriesListByManagerId, entriesListByManagerId, errorEntriesListByManagerId } = useSelector(
    (state) => state.entriesListByManagerId
  )
  const { userInfo } = useSelector((state) => state.userLogin)
  
  useEffect(() => {
    if (!entriesListByManagerId && !errorEntriesListByManagerId) {
      dispatch(getEntriesByManagerId(userInfo.id_puesto))
    }
  }, [entriesListByManagerId, errorEntriesListByManagerId])

  useEffect(() => {
    return () => dispatch({ type: ENTRIES_LIST_BY_MANAGER_ID_RESET })
  }, [dispatch])

  useEffect(() => {
    if (successEntriesListByManagerId) {
      const { entries } = entriesListByManagerId
      const allentries = entries?.map((item) => {
        return {
          id: item.id_entrada,
          descripcion_tarea: item.descripcion_tarea,
          puesto: `${item.nombre} ${item.apellido1} ${item?.apellido2 || '-'}`,
          anio: item.anio,
          mes: item.mes,
          entrada: item.entrada,
          codigo_perfil: item.codigo_perfil,
          tipo: item.tipo,
          fecha_ultima_modificacion:
            item.fecha_ultima_modificacion == null || !isValid(new Date(item.fecha_ultima_modificacion))
              ? '-'
              : format(new Date(item.fecha_ultima_modificacion), 'dd/MM/yyyy'),
          actions: (
                <div className='actions-right'>
                   <Button
                        justIcon
                        round
                        simple
                        onClick={() => updateEntryHandler(item.id_entrada, item.tipo)}
                        color='primary'
                        className='edit'
                      >
                        <Edit />
                      </Button>
                </div>
              ),
        }
      })
      setData(allentries)
    }
  }, [successEntriesListByManagerId])
  
  const updateEntryHandler = (id, tipo) => {
    const { entries } = entriesListByManagerId
    const entry = entries.find((el) => el.id_entrada === id && el.tipo === tipo)
    setUpdateEntryInfo(entry)
    setUpdateEntryModal(true)
  }
  
  const closeUpdateEntryModal = () => {
    setUpdateEntryModal(false)
    dispatch({ type: ENTRIES_LIST_BY_MANAGER_ID_RESET })
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardHeader color='primary' icon>
              <CardIcon color='primary'>
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Lista de Entradas</h4>
            </CardHeader>
            <CardBody>
            {loadingEntriesListByManagerId
                ? 'Cargando Entradas...'
                : entriesListByManagerId && (
              <ReactTable
                columns={[
                  {
                    Header: 'Desc. Tarea',
                    accessor: 'descripcion_tarea',
                    Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                  },
                  {
                    Header: 'Perfil',
                    accessor: 'codigo_perfil',
                    Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                  },
                  {
                    Header: 'Puesto',
                    accessor: 'puesto',
                  },
                  {
                    Header: 'Año',
                    accessor: 'anio',
                  },
                  {
                    Header: 'Mes',
                    accessor: 'mes',
                  },
                  {
                    Header: 'Entrada',
                    accessor: 'entrada',
                  },
                  {
                    Header: 'Fecha.Ult.Mod',
                    accessor: 'fecha_ultima_modificacion',
                  },
                  {
                    Header: 'Acciones',
                    accessor: 'actions',
                  },
                ]}
                data={data}
              />
            )}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} md={6}>
                      <NavLink to={'/admin/entries-register'} >
                        <Button color='primary' >
                          Registrar Entradas
                        </Button>
                      </NavLink>
                    </GridItem>
      </GridContainer>
      {updateEntryModal && (
        <UpdateEntryModal
          closeUpdateEntryModal={closeUpdateEntryModal}
          updateEntryModal={updateEntryModal}
          info={updateEntryInfo}
        />
      )}
    </>
  )
}

export default AsignEntries
