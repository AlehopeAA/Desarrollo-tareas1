import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Assignment, Edit, Delete } from '@mui/icons-material'
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardIcon from 'components/Card/CardIcon'
import CardHeader from 'components/Card/CardHeader'
import ReactTable from 'components/ReactTable/ReactTable'
import UpdateDificultyModal from './components/UpdateDificultyModal'
import DeleteDificultyModal from './components/DeleteDificultyModal'
import Button from 'components/CustomButtons/Button'
import { getDificultiesByManagerId } from 'redux/actions/dificultiesActions'
import { DIFICULTIES_LIST_BY_MANAGER_ID_RESET } from 'redux/constants/dificultiesConstants'

const AsignDificulties = () => {
  const dispatch = useDispatch()
  const classes = {}

  const [data, setData] = useState([])
  const [updateDificultyModal, setUpdateDificultyModal] = useState(false)
  const [updateDificultyInfo, setUpdateDificultyInfo] = useState({})
  const [deleteDificultyModal, setDeleteDificultyModal] = useState(false)
  const [deleteDificultyInfo, setDeleteDificultyInfo] = useState({})
  
  const { loadingDificultiesListByManagerId, successDificultiesListByManagerId, dificultiesListByManagerId, errorDificultiesListByManagerId } = useSelector(
    (state) => state.dificultiesListByManagerId
  )
  
  const { userInfo } = useSelector((state) => state.userLogin)
  
  useEffect(() => {
    if (!dificultiesListByManagerId && !errorDificultiesListByManagerId) {
      dispatch(getDificultiesByManagerId(userInfo.id_puesto))
    }
  }, [dificultiesListByManagerId, errorDificultiesListByManagerId])

  useEffect(() => {
    return () => dispatch({ type: DIFICULTIES_LIST_BY_MANAGER_ID_RESET })
  }, [dispatch])

  useEffect(() => {
    if (successDificultiesListByManagerId) {
      const { dificulties } = dificultiesListByManagerId
      const alldificulties = dificulties?.map((item) => {
        return {
          id_dificultad: item.id_dificultad,
          descripcion_tarea: item.descripcion_tarea,
          codigo_perfil: item.codigo_perfil,
          codigo_trazabilidad: item.codigo_trazabilidad,
          dificultad: item.dificultad,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => updateDificultyHandler(item.id_dificultad)}
                color='primary'
                className='edit'
              >
                <Edit />
              </Button>
              <Button
                justIcon
                round
                simple
                onClick={() => deleteDificultyHandler(item.id_dificultad)}
                color='danger'
                className='delete'
              >
                <Delete />
              </Button>
            </div>
          ),
        }        
      })
      setData(alldificulties)
    }
  }, [successDificultiesListByManagerId])
  
  const updateDificultyHandler = (id) => {
    const { dificulties } = dificultiesListByManagerId
    const dificult = dificulties.find((el) => el.id_dificultad === id)
    setUpdateDificultyModal(true)
    setUpdateDificultyInfo(dificult)
  }
  
  const closeUpdateDificultyModal = () => {
    setUpdateDificultyInfo({})
    setUpdateDificultyModal(false)
    dispatch({ type: DIFICULTIES_LIST_BY_MANAGER_ID_RESET })
  }

  const deleteDificultyHandler = (id) => {
    const { dificulties } = dificultiesListByManagerId
    const dificult = dificulties.find((el) => el.id_dificultad === id)
    setDeleteDificultyInfo(dificult)
    setDeleteDificultyModal(true)
  }
  const closeDeleteDificultyModal = () => {
    setDeleteDificultyModal(false)
    setDeleteDificultyInfo({})
    dispatch({ type: DIFICULTIES_LIST_BY_MANAGER_ID_RESET })
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
              <h4 className={classes.cardIconTitle}>Lista de Dificultades</h4>
            </CardHeader>
            <CardBody>
            {loadingDificultiesListByManagerId
                ? 'Cargando Dificultades...'
                : dificultiesListByManagerId && (
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
                    Header: 'Cod. Trazabilidad',
                    accessor: 'codigo_trazabilidad',
                  },
                  {
                    Header: 'Dificultad',
                    accessor: 'dificultad',
                  },
                  {
                    Header: 'ACCIONES',
                    accessor: 'actions',
                  },
                ]}
                data={data}
              />
            )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {updateDificultyModal && (
        <UpdateDificultyModal
          closeUpdateDificultyModal={closeUpdateDificultyModal}
          updateDificultyModal={updateDificultyModal}
          info={updateDificultyInfo}
        />
      )}
      {deleteDificultyModal && (
        <DeleteDificultyModal
          closeDeleteDificultyModal={closeDeleteDificultyModal}
          deleteDificultyModal={deleteDificultyModal}
          deleteDificultyInfo={deleteDificultyInfo}
        />
      )}
    </>
  )
}

export default AsignDificulties
