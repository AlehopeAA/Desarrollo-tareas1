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
import UpdateSubdirectionModal from './components/UpdateSubdirectionModal'
import DeleteSubdirectionModal from './components/DeleteSubdirectionModal'
import ViewSubdirectionInfoModal from './components/ViewInfoModal/ViewSubdirectionInfoModal'
import { getSubdirections } from 'redux/actions/subdirectionActions'
import { SUBDIRECTION_LIST_RESET } from 'redux/constants/subdirectionConstants'

const SubdirectionListScreen = () => {
  const dispatch = useDispatch()
  const classes = {}

  const [data, setData] = useState([])
  const [showUpdateSubdirection, setShowUpdateSubdirection] = useState({})
  const [showDeleteSubdirection, setShowDeleteSubdirection] = useState({})
  const [updateSubdirectionModal, setUpdateSubdirectionModal] = useState(false)
  const [deleteSubdirectionModal, setDeleteSubdirectionModal] = useState(false)
  const [viewInfoModal, setViewInfoModal] = useState(false)
  const [showViewInfoModal, setShowViewInfoModal] = useState({})
  
  const { loadingSubdirectionList, subdirections, successSubdirectionList, errorSubdirectionList } = useSelector(
    (state) => state.subdirectionList
  )

  useEffect(() => {
    if (successSubdirectionList) {
      const list = subdirections.map((item) => {
        return {
          ...item,
          descripcion_subdireccion: item.descripcion_subdireccion !== 'undefined' ? item.descripcion_subdireccion : '',
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => showUpdateSubdirectionHandler(item.id_subdireccion)}
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
                onClick={() => showViewInfoHandler(item.id_subdireccion)}
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
                onClick={() => showDeleteSubdirectionHandler(item.id_subdireccion)}
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
    dispatch(getSubdirections())
  }, [successSubdirectionList])

  useEffect(() => {
    dispatch(getSubdirections())
  }, [dispatch])

  useEffect(() => {
    return () => dispatch({ type: SUBDIRECTION_LIST_RESET })
  }, [dispatch])

  const showUpdateSubdirectionHandler = (id) => {
    const subdirection = subdirections.find((subdirection) => subdirection.id_subdireccion === id)
    setShowUpdateSubdirection(subdirection)
    setUpdateSubdirectionModal(true)
  }

  const handleCloseModal = () => {
    setUpdateSubdirectionModal(false)
    setShowUpdateSubdirection({})
  }

  const showDeleteSubdirectionHandler = (id) => {
    const subdirection = subdirections.find((subdirection) => subdirection.id_subdireccion === id)
    setShowDeleteSubdirection(subdirection)
    setDeleteSubdirectionModal(true)
  }

  const closeDeleteSubdirectionModal = () => {
    setDeleteSubdirectionModal(false)
    setShowDeleteSubdirection({})
  }

  const showViewInfoHandler = (id) => {
    const subdirection = subdirections.find((subdirection) => subdirection.id_subdireccion === id)
    setShowViewInfoModal(subdirection)
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
              {loadingSubdirectionList ? (
                'Cargando Unidades...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'CODIGO DE SUBDIRECCION',
                      accessor: 'codigo_subdireccion',
                    },
                    {
                      Header: 'DESCRIPCION',
                      accessor: 'descripcion_subdireccion',
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
            {errorSubdirectionList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorSubdirectionList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {viewInfoModal && (
        <ViewSubdirectionInfoModal
          viewInfo={viewInfoModal}
          closeViewInfoModal={closeViewInfoModal}
          info={showViewInfoModal}
        />
      )}
      {updateSubdirectionModal && (
        <UpdateSubdirectionModal
          handleCloseModal={handleCloseModal}
          updateSubdirectionModal={updateSubdirectionModal}
          showUpdateSubdirection={showUpdateSubdirection}
        />
      )}
      {deleteSubdirectionModal && (
        <DeleteSubdirectionModal
          deleteSubdirectionModal={deleteSubdirectionModal}
          handleCloseDeleteSubdirectionModal={closeDeleteSubdirectionModal}
          showDeleteSubdirectionInfo={showDeleteSubdirection}
        />
      )}
    </>
  )
}

export default SubdirectionListScreen
