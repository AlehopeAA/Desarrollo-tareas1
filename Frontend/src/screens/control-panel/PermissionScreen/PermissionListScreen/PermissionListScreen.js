import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, makeStyles, Tooltip } from '@material-ui/core'
import { Visibility, Delete } from '@material-ui/icons'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ReactTable from 'components/ReactTable/ReactTable'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import UpdatePermissionModal from './components/UpdatePermissionModal'
import DeletePermissionModal from './components/DeletePermissionModal'
import { getPermissions } from 'redux/actions/permissionActions'
import styles from './styles/permissionListScreenStyles'

const useStyles = makeStyles(styles)

const PermissionListScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [data, setData] = useState([])
  const [showUpdatePermission, setShowUpdatePermission] = useState({})
  const [showDeletePermission, setShowDeletePermission] = useState({})
  const [updatePermissionModal, setUpdatePermissionModal] = useState(false)
  const [deletePermissionModal, setDeletePermissionModal] = useState(false)

  const { loadingPermissionList, permissions, successPermissionList, errorPermissionList } = useSelector(
    (state) => state.permissionList
  )

  useEffect(() => {
    if (successPermissionList) {
      const list = permissions.map((item) => {
        return {
          ...item,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => showDeletePermissionHandler(item.id_permiso)}
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
    }
  }, [successPermissionList])

  useEffect(() => {
    dispatch(getPermissions())
  }, [dispatch])

  const showUpdatePermissionHandler = (id) => {
    const permission = permissions.find((permission) => permission.id_permiso === id)
    setShowUpdatePermission(permission)
    setUpdatePermissionModal(true)
  }

  const handleCloseModal = () => {
    setUpdatePermissionModal(false)
    setShowUpdatePermission({})
  }

  const showDeletePermissionHandler = (id) => {
    const permission = permissions.find((permission) => permission.id_permiso === id)
    setShowDeletePermission(permission)
    setDeletePermissionModal(true)
  }

  const closeDeletePermissionModal = () => {
    setDeletePermissionModal(false)
    setShowDeletePermission({})
  }
  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingPermissionList ? (
                'Cargando Permisos...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'ID PERMISO',
                      accessor: 'id_permiso',
                    },
                    {
                      Header: 'DESCRIPCION',
                      accessor: 'permiso',
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
            {errorPermissionList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorPermissionList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {updatePermissionModal && (
        <UpdatePermissionModal
          handleCloseModal={handleCloseModal}
          updatePermissionModal={updatePermissionModal}
          showUpdatePermission={showUpdatePermission}
        />
      )}
      {deletePermissionModal && (
        <DeletePermissionModal
          deletePermissionModal={deletePermissionModal}
          handleCloseDeletePermissionModal={closeDeletePermissionModal}
          showDeletePermissionInfo={showDeletePermission}
        />
      )}
    </>
  )
}

export default PermissionListScreen
