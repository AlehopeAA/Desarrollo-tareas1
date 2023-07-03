import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, makeStyles, Tooltip } from '@material-ui/core'
import { Visibility, Delete, Edit } from '@material-ui/icons'
import { Calculate } from '@mui/icons-material'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ReactTable from 'components/ReactTable/ReactTable'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import UpdateConfiguracionModal from './components/UpdateConfiguracionModal'
import DeleteConfiguracionModal from './components/DeleteConfiguracionModal'
import ViewConfiguracionInfoModal from './components/ViewInfoModal/ViewConfiguracionInfoModal'
import ViewHistorical from './components/ViewHistoricalModal'
import { getConfiguracions } from 'redux/actions/configuracionActions'
import { CONFIGURACION_LIST_RESET } from 'redux/constants/configuracionConstants'
import { CONFIGURACION_HISTORICAL_RESET } from 'redux/constants/configuracionConstants'
import styles from './styles/configuracionListScreenStyles'

const useStyles = makeStyles(styles)

const ConfiguracionListScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [data, setData] = useState([])
  const [showUpdateConfiguracion, setShowUpdateConfiguracion] = useState({})
  const [showDeleteConfiguracion, setShowDeleteConfiguracion] = useState({})
  const [updateConfiguracionModal, setUpdateConfiguracionModal] = useState(false)
  const [deleteConfiguracionModal, setDeleteConfiguracionModal] = useState(false)
  const [viewInfoModal, setViewInfoModal] = useState(false)
  const [showViewInfoModal, setShowViewInfoModal] = useState({})
  const [viewHistoricalModal, setViewHistoricalModal] = useState(false)
  const [viewListModal, setViewListModal] = useState(true)
  const [showHistorical, setShowHistorical] = useState({})
  
  const { loadingConfiguracionList, configuracions, successConfiguracionList, errorConfiguracionList } = useSelector((state) => state.configuracionList)

  useEffect(() => {
    if (successConfiguracionList) {
      const list = configuracions.map((item) => {
        return {
          ...item,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                size='sm'
                onClick={() => showUpdateConfiguracionHandler(item.id_configuracion)}
                color='primary'
                className='active-deactive'
              >
                <Tooltip title='Editar Información'>
                  <Edit />
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                simple
                size='sm'
                onClick={() => showViewInfoHandler(item.id_configuracion)}
                color='success'
                className='edit'
              >
                <Tooltip title='Ver Información'>
                  <Visibility />
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                simple
                size='sm'
                onClick={() => showDeleteConfiguracionHandler(item.id_configuracion)}
                color='danger'
                className='delete'
              >
                <Tooltip title='Borrar'>
                  <Delete />
                </Tooltip>
              </Button>
              <Button justIcon round simple size='sm' onClick={() => historicalHandler(item)} color='info' className='view'>
                <Tooltip title='Ver histórico'>
                  <Calculate />
                </Tooltip>
              </Button>
            </div>
          ),
        }
      })
      setData(list)
      return
    }
    dispatch(getConfiguracions())
  }, [successConfiguracionList])

  useEffect(() => {
    dispatch(getConfiguracions())
  }, [dispatch])

  const showUpdateConfiguracionHandler = (id) => {
    const configuracion = configuracions.find((configuracion) => configuracion.id_configuracion === id)
    setShowUpdateConfiguracion(configuracion)
    setUpdateConfiguracionModal(true)
  }

  const handleCloseModal = () => {
    setUpdateConfiguracionModal(false)
    setShowUpdateConfiguracion({})
  }

  const showDeleteConfiguracionHandler = (id) => {
    const configuracion = configuracions.find((configuracion) => configuracion.id_configuracion === id)
    setShowDeleteConfiguracion(configuracion)
    setDeleteConfiguracionModal(true)
  }

  const closeDeleteConfiguracionModal = () => {
    setDeleteConfiguracionModal(false)
    setShowDeleteConfiguracion({})
  }

  const showViewInfoHandler = (id) => {
    const configuracion = configuracions.find((configuracion) => configuracion.id_configuracion === id)
    setShowViewInfoModal(configuracion)
    setViewInfoModal(true)
  }

  const closeViewInfoModal = () => {
    setViewInfoModal(false)
    setShowViewInfoModal({})
  }

  const historicalHandler = (data) => {
    setViewHistoricalModal(true)
    setViewListModal(false)
    setShowHistorical(data)
    dispatch({ type: CONFIGURACION_LIST_RESET })
    dispatch({ type: CONFIGURACION_HISTORICAL_RESET })
  }
  const closeHistoricalModal = () => {
    setViewHistoricalModal(false)
    setViewListModal(true)
    setShowHistorical({})
  }

  return (
    <>
      {viewListModal && (
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingConfiguracionList ? (
                'Cargando Parámetros...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'PARÁMETRO',
                      accessor: 'parametro',
                    },
                    {
                      Header: 'VALOR',
                      accessor: 'valor',
                    },
                    {
                      Header: 'DESCRIPCION',
                      accessor: 'descripcion',
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
            {errorConfiguracionList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorConfiguracionList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      )}
      {viewInfoModal && (
        <ViewConfiguracionInfoModal viewInfo={viewInfoModal} closeViewInfoModal={closeViewInfoModal} info={showViewInfoModal} />
      )}
      {updateConfiguracionModal && (
        <UpdateConfiguracionModal
          handleCloseModal={handleCloseModal}
          updateConfiguracionModal={updateConfiguracionModal}
          showUpdateConfiguracion={showUpdateConfiguracion}
        />
      )}
      {deleteConfiguracionModal && (
        <DeleteConfiguracionModal
          deleteConfiguracionModal={deleteConfiguracionModal}
          handleCloseDeleteConfiguracionModal={closeDeleteConfiguracionModal}
          showDeleteConfiguracionInfo={showDeleteConfiguracion}
        />
      )}
      {viewHistoricalModal && (
        <ViewHistorical
          closeViewActivityInfoModal={closeHistoricalModal}
          info={showHistorical}
        />
      )}
    </>
  )
}

export default ConfiguracionListScreen
