import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, makeStyles, Tooltip } from '@material-ui/core'
import { Visibility, Delete, Edit } from '@material-ui/icons'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ReactTable from 'components/ReactTable/ReactTable'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import UpdateFestivosModal from './components/UpdateFestivosModal'
import DeleteFestivosModal from './components/DeleteFestivosModal'
import ViewFestivosInfoModal from './components/ViewInfoModal/ViewFestivosInfoModal'
import { getFestivos } from 'redux/actions/festivosActions'
import styles from './styles/festivosListScreenStyles'

const useStyles = makeStyles(styles)

const FestivosListScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [data, setData] = useState([])
  const [showUpdateFestivos, setShowUpdateFestivos] = useState({})
  const [showDeleteFestivos, setShowDeleteFestivos] = useState({})
  const [updateFestivosModal, setUpdateFestivosModal] = useState(false)
  const [deleteFestivosModal, setDeleteFestivosModal] = useState(false)
  const [viewInfoModal, setViewInfoModal] = useState(false)
  const [showViewInfoModal, setShowViewInfoModal] = useState({})
  
  const { loadingFestivosList, festivos, successFestivosList, errorFestivosList } = useSelector((state) => state.festivosList)

  useEffect(() => {
    if (successFestivosList) {
      const list = festivos.map((item) => {
        return {
          ...item,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => showUpdateFestivosHandler(item.id_calendario)}
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
                onClick={() => showViewInfoHandler(item.id_calendario)}
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
                onClick={() => showDeleteFestivosHandler(item.id_calendario)}
                color='danger'
                className='delete'
              >
                <Tooltip title='Borrar'>
                  <Delete />
                </Tooltip>
              </Button>
            </div>
          ),
        }
      })
      setData(list)
      return
    }
    dispatch(getFestivos())
  }, [successFestivosList])

  useEffect(() => {
    dispatch(getFestivos())
  }, [dispatch])

  const showUpdateFestivosHandler = (id) => {
    const festivo = festivos.find((festivo) => festivo.id_calendario === id)
    setShowUpdateFestivos({...festivo, fecha_seleccionada: new Date(festivo.anio, festivo.mes - 1, festivo.dia) })
    setUpdateFestivosModal(true)
  }

  const handleCloseModal = () => {
    setUpdateFestivosModal(false)
    setShowUpdateFestivos({})
  }

  const showDeleteFestivosHandler = (id) => {
    const festivo = festivos.find((festivo) => festivo.id_calendario === id)
    setShowDeleteFestivos(festivo)
    setDeleteFestivosModal(true)
  }

  const closeDeleteFestivosModal = () => {
    setDeleteFestivosModal(false)
    setShowDeleteFestivos({})
  }

  const showViewInfoHandler = (id) => {
    const festivo = festivos.find((festivo) => festivo.id_calendario === id)
    setShowViewInfoModal(festivo)
    setViewInfoModal(true)
  }

  const closeViewInfoModal = () => {
    setViewInfoModal(false)
    setShowViewInfoModal({})
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingFestivosList ? (
                'Cargando Festivos...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'DIA',
                      accessor: 'dia',
                    },
                    {
                      Header: 'MES',
                      accessor: 'mes',
                    },
                    {
                      Header: 'AÑO',
                      accessor: 'anio',
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
            {errorFestivosList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorFestivosList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {viewInfoModal && (
        <ViewFestivosInfoModal viewInfo={viewInfoModal} closeViewInfoModal={closeViewInfoModal} info={showViewInfoModal} />
      )}
      {updateFestivosModal && (
        <UpdateFestivosModal
          handleCloseModal={handleCloseModal}
          updateFestivosModal={updateFestivosModal}
          showUpdateFestivos={showUpdateFestivos}
        />
      )}
      {deleteFestivosModal && (
        <DeleteFestivosModal
          deleteFestivosModal={deleteFestivosModal}
          handleCloseDeleteFestivosModal={closeDeleteFestivosModal}
          showDeleteFestivosInfo={showDeleteFestivos}
        />
      )}
    </>
  )
}

export default FestivosListScreen
