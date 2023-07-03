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
import styles from './styles/permissionListScreenStyles'
import { getUserPermissions } from 'redux/actions/userPermissionActions'
import { getPermissions } from 'redux/actions/permissionActions'
import { getUsers } from 'redux/actions/userActions'

const useStyles = makeStyles(styles)

const AssignPermissionListScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [data, setData] = useState([])
  const [showUpdateUserPermission, setShowUpdatePermission] = useState({})
  const [showDeleteUserPermission, setShowDeletePermission] = useState({})
  const [updateUserPermissionModal, setUpdatePermissionModal] = useState(false)
  const [deleteUserPermissionModal, setDeletePermissionModal] = useState(false)

  const {
    loadingUserPermissionList,
    userPermissions,
    successUserPermissionList,
    errorUserPermissionList,
  } = useSelector((state) => state.userPermissionList)
  const { permissions } = useSelector((state) => state.permissionList)
  const { users } = useSelector((state) => state.userList)

  useEffect(() => {
    if (successUserPermissionList) {
      const list = userPermissions.map((item) => {
        return {
          ...item,
          id_permiso_puesto: item.id_permiso_puesto,
          nameAndLastNames: `${item.nombre} ${item.apellido1} ${item?.apellido2 || ''} `,
          actions: (
            <div className='actions-right'>
              {/* <Button
                justIcon
                round
                simple
                onClick={() => showUpdateUserPermissionHandler(item.id_permiso_puesto)}
                color='success'
                className='edit'
              >
                <Visibility />
              </Button> */}
              <Button
                justIcon
                round
                simple
                onClick={() => showDeleteUserPermissionHandler(item.id_permiso_puesto)}
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
    dispatch(getUserPermissions())
  }, [successUserPermissionList])

  useEffect(() => {
    dispatch(getPermissions())
    dispatch(getUsers())
  }, [dispatch])

  const showUpdateUserPermissionHandler = (id) => {
    const permission = userPermissions.find((permission) => permission.id_permiso_puesto === id)
    setShowUpdatePermission(permission)
    setUpdatePermissionModal(true)
  }

  const handleCloseModal = () => {
    setUpdatePermissionModal(false)
    setShowUpdatePermission({})
  }

  const showDeleteUserPermissionHandler = (id) => {
    const permission = userPermissions.find((permission) => permission.id_permiso_puesto === id)
    setShowDeletePermission(permission)
    setDeletePermissionModal(true)
  }

  const closeDeletePermissionModal = () => {
    setDeletePermissionModal(false)
    setShowDeletePermission({})
  }

  const handleData = (data = []) => {
    return data.map((user) => {
      const puesto = users?.find((usr) => usr.id_puesto === user.id_puesto)
      const permiso = permissions?.find((permiso) => permiso.id_permiso === user.id_permiso)
      return {
        ...user,
        id_puesto: puesto?.nombre,
        id_permiso: permiso?.permiso,
      }
    })
  }
  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingUserPermissionList ? (
                'Cargando Permisos...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'NOMBRE Y APELLIDOS',
                      accessor: 'nameAndLastNames',
                    },
                    {
                      Header: 'PERMISO',
                      accessor: 'id_permiso',
                    },
                    {
                      Header: 'ACCIONES',
                      accessor: 'actions',
                    },
                  ]}
                  data={handleData(data)}
                />
              )}
            </CardBody>
            {errorUserPermissionList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorUserPermissionList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {/* {updateUserPermissionModal && (
        <UpdatePermissionModal
          handleCloseModal={handleCloseModal}
          updateUserPermissionModal={updateUserPermissionModal}
          showUpdateUserPermission={showUpdateUserPermission}
        />
      )} */}
      {deleteUserPermissionModal && (
        <DeletePermissionModal
          deleteUserPermissionModal={deleteUserPermissionModal}
          handleCloseDeletePermissionModal={closeDeletePermissionModal}
          showDeleteUserPermissionInfo={showDeleteUserPermission}
        />
      )}
    </>
  )
}

export default AssignPermissionListScreen
