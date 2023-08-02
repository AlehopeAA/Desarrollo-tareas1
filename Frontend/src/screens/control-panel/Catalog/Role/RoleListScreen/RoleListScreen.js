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
import UpdateRoleModal from './components/UpdateRoleModal'
import DeleteRoleModal from './components/DeleteModal/DeleteRoleModal'
import { getRoles } from 'redux/actions/roleActions'
import styles from './styles/RoleListScreenStyles'
import ViewRoleInfoModal from './components/ViewInfoModal/ViewRoleInfoModal'

const useStyles = makeStyles(styles)

const RoleListScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [data, setData] = useState([])
  const [showUpdateRole, setShowUpdateRole] = useState({})
  const [showDeleteRole, setShowDeleteRole] = useState({})
  const [updateRoleModal, setUpdateRoleModal] = useState(false)
  const [deleteRoleModal, setDeleteRoleModal] = useState(false)
  const [viewInfoModal, setViewInfoModal] = useState(false)
  const [showViewInfoModal, setShowViewInfoModal] = useState({})
  
  const { loadingRoleList, roles, successRoleList, errorRoleList } = useSelector((state) => state.roleList)

  useEffect(() => {
    if (successRoleList) {
      const list = roles.map((item) => {
        return {
          ...item,
          descripcion_rol: item.descripcion_rol === "undefined" ? '' : item.descripcion_rol,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => showUpdateRoleHandler(item.id_rol)}
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
                onClick={() => showViewInfoHandler(item.id_rol)}
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
                onClick={() => showDeleteRoleHandler(item.id_rol)}
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
    dispatch(getRoles())
  }, [successRoleList])

  useEffect(() => {
    dispatch(getRoles())
  }, [dispatch])

  const showUpdateRoleHandler = (id) => {
    const role = roles.find((role) => role.id_rol === id)
    setShowUpdateRole(role)
    setUpdateRoleModal(true)
  }

  const handleCloseModal = () => {
    setUpdateRoleModal(false)
    setShowUpdateRole({})
  }

  const showDeleteRoleHandler = (id) => {
    const role = roles.find((role) => role.id_rol === id)
    setShowDeleteRole(role)
    setDeleteRoleModal(true)
  }

  const closeDeleteRoleModal = () => {
    setDeleteRoleModal(false)
    setShowDeleteRole({})
  }

  const showViewInfoHandler = (id) => {
    const role = roles.find((role) => role.id_rol === id)
    setShowViewInfoModal(role)
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
              {loadingRoleList ? (
                'Cargando Roles...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'CODIGO DE ROL',
                      accessor: 'codigo_rol',
                    },
                    {
                      Header: 'DESCRIPCION',
                      accessor: 'descripcion_rol',
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
            {errorRoleList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorRoleList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {viewInfoModal && (
        <ViewRoleInfoModal viewInfo={viewInfoModal} closeViewInfoModal={closeViewInfoModal} info={showViewInfoModal} />
      )}
      {updateRoleModal && (
        <UpdateRoleModal
          handleCloseModal={handleCloseModal}
          updateRoleModal={updateRoleModal}
          showUpdateRole={showUpdateRole}
        />
      )}
      {deleteRoleModal && (
        <DeleteRoleModal
          deleteRoleModal={deleteRoleModal}
          handleCloseDeleteRoleModal={closeDeleteRoleModal}
          showDeleteRoleInfo={showDeleteRole}
        />
      )}
    </>
  )
}

export default RoleListScreen
