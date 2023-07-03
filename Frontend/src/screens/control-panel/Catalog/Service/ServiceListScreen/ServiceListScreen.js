import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Tooltip } from '@material-ui/core'
import { Visibility, Delete, Edit } from '@material-ui/icons'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ReactTable from 'components/ReactTable/ReactTable'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import UpdateServiceModal from './components/UpdateServiceModal'
import DeleteServiceModal from './components/DeleteServiceModal'
import ViewServiceInfoModal from './components/ViewInfoModal/ViewServiceInfoModal'
import { getServices } from 'redux/actions/serviceActions'

const ServiceListScreen = () => {
  const dispatch = useDispatch()
  const classes = {}

  const [data, setData] = useState([])
  const [showUpdateService, setShowUpdateService] = useState({})
  const [showDeleteService, setShowDeleteService] = useState({})
  const [updateServiceModal, setUpdateServiceModal] = useState(false)
  const [deleteServiceModal, setDeleteServiceModal] = useState(false)
  const [viewInfoModal, setViewInfoModal] = useState(false)
  const [showViewInfoModal, setShowViewInfoModal] = useState({})
  
  const { loadingServiceList, services, successServiceList, errorServiceList } = useSelector(
    (state) => state.serviceList
  )

  useEffect(() => {
    if (successServiceList) {
      const list = services.map((item) => {
        return {
          ...item,
          descripcion_servicio: item.descripcion_servicio !== 'undefined' ? item.descripcion_servicio : '',
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => showUpdateServiceHandler(item.id_servicio)}
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
                onClick={() => showViewInfoHandler(item.id_servicio)}
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
                onClick={() => showDeleteServiceHandler(item.id_servicio)}
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
    dispatch(getServices())
  }, [successServiceList])

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  const showUpdateServiceHandler = (id) => {
    const service = services.find((service) => service.id_servicio === id)
    setShowUpdateService(service)
    setUpdateServiceModal(true)
  }

  const handleCloseModal = () => {
    setUpdateServiceModal(false)
    setShowUpdateService({})
  }

  const showDeleteServiceHandler = (id) => {
    const service = services.find((service) => service.id_servicio === id)
    setShowDeleteService(service)
    setDeleteServiceModal(true)
  }

  const closeDeleteServiceModal = () => {
    setDeleteServiceModal(false)
    setShowDeleteService({})
  }
  const showViewInfoHandler = (id) => {
    const service = services.find((service) => service.id_servicio === id)
    setShowViewInfoModal(service)
    setViewInfoModal(true)
  }

  const closeViewInfoModal = () => {
    setViewInfoModal(false)
    setShowViewInfoModal({})
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardBody>
              {loadingServiceList ? (
                'Cargando Servicios...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'CODIGO DE SERVICIO',
                      accessor: 'codigo_servicio',
                    },
                    {
                      Header: 'DESCRIPCION',
                      accessor: 'descripcion_servicio',
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
            {errorServiceList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorServiceList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {viewInfoModal && (
        <ViewServiceInfoModal
          viewInfo={viewInfoModal}
          closeViewInfoModal={closeViewInfoModal}
          info={showViewInfoModal}
        />
      )}
      {updateServiceModal && (
        <UpdateServiceModal
          handleCloseModal={handleCloseModal}
          updateServiceModal={updateServiceModal}
          showUpdateService={showUpdateService}
        />
      )}
      {deleteServiceModal && (
        <DeleteServiceModal
          deleteServiceModal={deleteServiceModal}
          handleCloseDeleteServiceModal={closeDeleteServiceModal}
          showDeleteServiceInfo={showDeleteService}
        />
      )}
    </>
  )
}

export default ServiceListScreen
