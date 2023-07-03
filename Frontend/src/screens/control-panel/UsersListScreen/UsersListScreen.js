import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { makeStyles, Tooltip } from '@material-ui/core'
import { Lightbulb, LightbulbOutlined, Visibility } from '@mui/icons-material'
import { Delete, Edit } from '@material-ui/icons'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import ReactTable from 'components/ReactTable/ReactTable'
import UpdateUserModal from './components/UpdateModal/UpdateUserModal'
import DeleteUserModal from './components/DeleteModal/DeleteUserModal'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import ViewUserInfoModal from './components/ViewInfoModal/ViewUserInfoModal'
import ActiveAndDesactiveModal from './components/ActiveAndDescativeModal/ActiveAndDesactiveModal'
import { useWindowsSize } from 'shared/customHooks/useWindowsSize'
import { USER_LIST_RESET } from 'redux/constants/userConstants'
import { getUsers } from 'redux/actions/userActions'
import styles from './styles/userListScreenStyles'

const useStyles = makeStyles(styles)

const UsersListScreen = () => {
  const ExcelFile = ReactExport.ExcelFile
  const dispatch = useDispatch()
  const classes = useStyles()
  const windowsSize = useWindowsSize()

  const [data, setData] = useState([])
  const [updateUserModal, setUpdateUserModal] = useState(false)
  const [showUpdateUser, setShowUpdateUser] = useState({})
  const [deleteUserModal, setDeleteUserModal] = useState(false)
  const [showDeleteUserInfo, setShowDeleteUserInfo] = useState({})
  const [viewInfoModal, setViewInfoModal] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState({})
  const [activeModal, setActiveModal] = useState(false)
  const [showActiveInfo, setShowActiveInfo] = useState({})
  const [desactiveModal, setDesactiveModal] = useState(false)
  const [showDesactiveInfo, setShowDesactiveInfo] = useState({})
  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)

  const { loadingUserList, users, successUserList } = useSelector((state) => state.userList)

  useEffect(() => {
    if (successUserList) {
      const user = users.map((user) => {
        return {
          ...user,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => handlerActiveAndDesactive(user)}
                color='warning'
                className='active-deactive'
              >
                <Tooltip title='activar/desactivar'>
                  {user.activo === 'SI' ? <Lightbulb /> : <LightbulbOutlined />}
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                simple
                onClick={() => showUpdateUserHandler(user.id_puesto)}
                color='primary'
                className='edit'
              >
                <Tooltip title='Editar Información'>
                  <Edit />
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                simple
                onClick={() => showUserInfoHandler(user.id_puesto)}
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
                onClick={() => showDeleteInfoHandler(user.id_puesto)}
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
      setData(user)
    } else {
      dispatch(getUsers())
    }
  }, [dispatch, successUserList])

  useEffect(() => {
    return () => dispatch({ type: USER_LIST_RESET })
  }, [])

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a3")
    doc.text('Puestos de Trabajo', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        { header: 'COD.AYRE', dataKey: 'cod_ayre' },
        { header: 'Codigo de Puesto', dataKey: 'codigo_puesto' },
        { header: 'Nombre', dataKey: 'nombre' },
        { header: 'Apellido 1', dataKey: 'apellido1' },
        { header: 'Apellido 2', dataKey: 'apellido2' },
        { header: 'Denominacion', dataKey: 'denominacion_puesto' },
        { header: 'Denominacion', dataKey: 'denominacion_puesto' },
        { header: 'Jornada Laboral', dataKey: 'jornada_laboral' },
      ],
    })
    doc.save('puestos-de-trabajo.pdf')
  }

  const showUpdateUserHandler = (id) => {
    const user = users.find((user) => user.id_puesto === id)
    setShowUpdateUser(user)
    setUpdateUserModal(true)
  }

  const showUserInfoHandler = (id) => {
    const user = users.find((user) => user.id_puesto === id)
    setShowUserInfo(user)
    setViewInfoModal(true)
  }
  const closeViewInfoModal = () => {
    setViewInfoModal(false)
    setShowUserInfo({})
  }

  const handleCloseModal = () => {
    setUpdateUserModal(false)
    setShowUpdateUser({})
  }

  const showDeleteInfoHandler = (id) => {
    const user = users.find((user) => user.id_puesto === id)
    setShowDeleteUserInfo(user)
    setDeleteUserModal(true)
  }

  const handleCloseDeleteUserModal = () => {
    setDeleteUserModal(false)
    setShowDeleteUserInfo({})
  }

  const handlerActiveAndDesactive = (user) => {
    if (user.activo === 'SI') {
      showDesactiveUserHandler(user.id_puesto)
      return
    }
    showActiveUserHandler(user.id_puesto)
  }

  const showActiveUserHandler = (id) => {
    const user = users.find((user) => user.id_puesto === id)
    setShowActiveInfo(user)
    setActiveModal(true)
  }

  const closeActiveModal = () => {
    setActiveModal(false)
    setShowActiveInfo({})
  }
  const showDesactiveUserHandler = (id) => {
    const user = users.find((user) => user.id_puesto === id)
    setShowDesactiveInfo(user)
    setDesactiveModal(true)
  }

  const closeDesactiveModal = () => {
    setDesactiveModal(false)
    setShowDesactiveInfo({})
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingUserList ? (
                'Cargando los Puesto de Trabajo...'
              ) : (
                <ReactTable
                  columns={
                    windowsSize.width > 600
                      ? [
                          {
                            Header: 'COD.AYRE',
                            accessor: 'cod_ayre',
                          },
                          {
                            Header: 'Codigo de Puesto',
                            accessor: 'codigo_puesto',
                          },
                          {
                            Header: 'Nombre',
                            accessor: 'nombre',
                          },
                          {
                            Header: 'Apellido 1',
                            accessor: 'apellido1',
                          },
                          {
                            Header: 'Apellido 2',
                            accessor: 'apellido2',
                          },
                          {
                            Header: 'Denominacion',
                            accessor: 'denominacion_puesto',
                          },
                          {
                            Header: 'Jornada Laboral',
                            accessor: 'jornada_laboral',
                          },
                          {
                            Header: 'Actions',
                            accessor: 'actions',
                          },
                        ]
                      : [
                          {
                            Header: 'Nombre',
                            accessor: 'nombre',
                          },

                          {
                            Header: 'Acciones',
                            accessor: 'actions',
                          },
                        ]
                  }
                  data={data}
                />
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                {excel && (
                  <ExcelFile
                    element={<Button color='primary'>Exportar Excel</Button>}
                    filename='puestos-de-trabajo'
                    hideElement={true}
                  >
                    <ExcelFile.ExcelSheet data={data} name='Puestos de Trabajo'>
                      <ExcelFile.ExcelColumn label='COD.AYRE' value='cod_ayre' />
                      <ExcelFile.ExcelColumn label='Codigo de Puesto' value='codigo_puesto' />
                      <ExcelFile.ExcelColumn label='Nombre' value='nombre' />
                      <ExcelFile.ExcelColumn label='Apellido 1' value='apellido1' />
                      <ExcelFile.ExcelColumn label='Apellido 2' value='apellido2' />
                      <ExcelFile.ExcelColumn label='Denominacion' value='denominacion_puesto' />
                      <ExcelFile.ExcelColumn label='Jornada Laboral' value='jornada_laboral' />
                    </ExcelFile.ExcelSheet>
                  </ExcelFile>
                )}
                <Button color='primary' onClick={() => setDownloadExcel(true)} style={{ marginLeft: '10px' }}>
                  Exportar EXCEL
                </Button>
                <Button color='primary' onClick={() => setDownloadPdf(true)} style={{ marginLeft: '10px' }}>
                  Exportar PDF
                </Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {updateUserModal && (
        <UpdateUserModal
          handleCloseModal={handleCloseModal}
          updateUserModal={updateUserModal}
          showUpdateUser={showUpdateUser}
        />
      )}
      {viewInfoModal && (
        <ViewUserInfoModal viewInfo={viewInfoModal} closeViewInfoModal={closeViewInfoModal} info={showUserInfo} />
      )}
      {activeModal && (
        <ActiveAndDesactiveModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          info={showActiveInfo}
          active={true}
        />
      )}
      {desactiveModal && (
        <ActiveAndDesactiveModal
          activeModal={desactiveModal}
          closeActiveModal={closeDesactiveModal}
          info={showDesactiveInfo}
          active={false}
        />
      )}
      {deleteUserModal && (
        <DeleteUserModal
          handleCloseDeleteUserModal={handleCloseDeleteUserModal}
          deleteUserModal={deleteUserModal}
          showDeleteUserInfo={showDeleteUserInfo}
        />
      )}
      {downloadExcel && (
        <DownloadConfirmModal
          downloadFile={downloadExcel}
          setDownloadFile={setDownloadExcel}
          setFile={setExcel}
          tableName='Puestos de Trabajo'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Puestos de Trabajo'
          FileExtension='PDF'
        />
      )}
    </>
  )
}

export default UsersListScreen
