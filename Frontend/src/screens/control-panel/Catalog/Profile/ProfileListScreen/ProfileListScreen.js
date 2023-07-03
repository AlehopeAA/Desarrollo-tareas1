import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Visibility, Delete, Lightbulb, LightbulbOutlined, Edit } from '@mui/icons-material'
import ReactTable from 'components/ReactTable/ReactTable'
import GridContainer from 'components/Grid/GridContainer'
import Card from 'components/Card/Card'
import Button from 'components/CustomButtons/Button'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import DeleteProfileModal from './components/DeleteModal/DeleteProfileModal'
import UpdateProfileModal from './components/UpdateProfileModal'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import ActiveAndDesactiveProfileModal from './components/ActiveAndDesactiveModal/ActiveAndDesactiveProfileModal'
import ViewProfileInfoModal from './components/ViewInfoModal/ViewProfileInfoModal'
import { PROFILE_LIST_RESET } from 'redux/constants/profileConstants'
import { getProfiles } from 'redux/actions/profileActions'
import styles from './styles/profileListScreenStyles'

const useStyles = makeStyles(styles)

const ProfileListScreen = () => {
  const dispatch = useDispatch()
  const ExcelFile = ReactExport.ExcelFile
  const classes = useStyles()

  const [data, setData] = useState([])
  const [updateProfileModal, setUpdateProfileModal] = useState(false)
  const [deleteProfileModal, setDeleteProfileModal] = useState(false)
  const [desactiveModal, setDesactiveModal] = useState(false)
  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)
  const [showActiveInfo, setShowActiveInfo] = useState({})
  const [showDesactiveInfo, setShowDesactiveInfo] = useState({})
  const [showUpdateProfile, setShowUpdateProfile] = useState({})
  const [showDeleteProfileInfo, setShowDeleteProfileInfo] = useState({})
  const [viewInfoModal, setViewInfoModal] = useState(false)
  const [showViewInfoModal, setShowViewInfoModal] = useState({})

  const { loadingProfileList, profiles, successProfileList, errorProfileList } = useSelector(
    (state) => state.profileList
  )

  useEffect(() => {
    if (successProfileList) {
      const list = profiles.map((profile) => {
        return {
          ...profile,
          descripcion_perfil: `${profile.descripcion_perfil || '-'}`,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => handlerActiveAndDesactive(profile)}
                color='warning'
                className='active-deactive'
              >
                <Tooltip title='activar/desactivar'>
                  {profile.activo === 'SI' ? <Lightbulb /> : <LightbulbOutlined />}
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                simple
                onClick={() => showUpdateProfileHandler(profile.id_perfil)}
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
                onClick={() => showViewInfoHandler(profile.id_perfil)}
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
                onClick={() => showDeleteProfileHandler(profile.id_perfil)}
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
    } else {
      dispatch(getProfiles())
    }
  }, [successProfileList, dispatch])

  useEffect(() => {
    return () => dispatch({ type: PROFILE_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const handlerActiveAndDesactive = (profile) => {
    if (profile.activo === 'SI') {
      showDesactiveUserHandler(profile.id_perfil)
      return
    }
    showActiveUserHandler(profile.id_perfil)
  }

  const showActiveUserHandler = (id) => {
    const profile = profiles.find((profile) => profile.id_perfil === id)
    setShowActiveInfo(profile)
    setActiveModal(true)
  }

  const closeActiveModal = () => {
    setActiveModal(false)
    setShowActiveInfo({})
  }
  const showDesactiveUserHandler = (id) => {
    const perfil = profiles.find((perfil) => perfil.id_perfil === id)
    setShowDesactiveInfo(perfil)
    setDesactiveModal(true)
  }

  const closeDesactiveModal = () => {
    setDesactiveModal(false)
    setShowDesactiveInfo({})
  }

  const handleCloseModal = () => {
    setUpdateProfileModal(false)
    setShowUpdateProfile({})
  }
  const showUpdateProfileHandler = (id) => {
    const profile = profiles.find((el) => el.id_perfil === id)
    setShowUpdateProfile(profile)
    setUpdateProfileModal(true)
  }

  const showDeleteProfileHandler = (id) => {
    const profile = profiles.find((el) => el.id_perfil === id)
    setShowDeleteProfileInfo(profile)
    setDeleteProfileModal(true)
  }

  const handleCloseDeleteProfileModal = () => {
    setDeleteProfileModal(false)
    setShowDeleteProfileInfo({})
  }

  const showViewInfoHandler = (id) => {
    const profile = profiles.find((profile) => profile.id_perfil === id)
    setShowViewInfoModal(profile)
    setViewInfoModal(true)
  }

  const closeViewInfoModal = () => {
    setViewInfoModal(false)
    setShowViewInfoModal({})
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Perfiles', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        { header: 'Codigo de Perfil', dataKey: 'codigo_perfil' },
        { header: 'Descripcion', dataKey: 'descripcion_perfil' },
      ],
    })
    doc.save('perfiles.pdf')
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingProfileList ? (
                'Cargando Perfiles...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'COD.DE PERFIL',
                      accessor: 'codigo_perfil',
                    },
                    {
                      Header: 'DESC.DE PERFIL',
                      accessor: 'descripcion_perfil',
                    },
                    {
                      Header: 'DESC.DE SUBDIRECCIÓN',
                      accessor: 'descripcion_subdireccion',
                    },
                    {
                      Header: 'DESC.DE SERVICIO',
                      accessor: 'descripcion_servicio',
                    },
                    {
                      Header: 'DESC.DE DEPARTAMENTO',
                      accessor: 'descripcion_departamento',
                    },
                    {
                      Header: 'DESC.DE UNIDAD',
                      accessor: 'descripcion_unidad',
                    },
                    {
                      Header: 'DESC.DE ROL',
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                {excel && (
                  <ExcelFile
                    element={<Button color='primary'>Exportar Excel</Button>}
                    filename='perfiles'
                    hideElement={true}
                  >
                    <ExcelFile.ExcelSheet data={data} name='Perfiles'>
                      <ExcelFile.ExcelColumn label='Codigo de Perfil' value='codigo_perfil' />
                      <ExcelFile.ExcelColumn label='Descripcion' value='descripcion_perfil' />
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
            {errorProfileList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorProfileList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {activeModal && (
        <ActiveAndDesactiveProfileModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          info={showActiveInfo}
          active={true}
        />
      )}
      {desactiveModal && (
        <ActiveAndDesactiveProfileModal
          activeModal={desactiveModal}
          closeActiveModal={closeDesactiveModal}
          info={showDesactiveInfo}
          active={false}
        />
      )}
      {updateProfileModal && (
        <UpdateProfileModal
          handleCloseModal={handleCloseModal}
          updateProfileModal={updateProfileModal}
          showUpdateProfile={showUpdateProfile}
        />
      )}
      {viewInfoModal && (
        <ViewProfileInfoModal
          viewInfo={viewInfoModal}
          closeViewInfoModal={closeViewInfoModal}
          info={showViewInfoModal}
        />
      )}
      {deleteProfileModal && (
        <DeleteProfileModal
          handleCloseDeleteProfileModal={handleCloseDeleteProfileModal}
          deleteProfileModal={deleteProfileModal}
          showDeleteProfileInfo={showDeleteProfileInfo}
        />
      )}
      {downloadExcel && (
        <DownloadConfirmModal
          downloadFile={downloadExcel}
          setDownloadFile={setDownloadExcel}
          setFile={setExcel}
          tableName='Perfiles'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Perfiles'
          FileExtension='PDF'
        />
      )}
    </>
  )
}

export default ProfileListScreen
