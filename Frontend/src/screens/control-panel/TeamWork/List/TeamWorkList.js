import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import { format } from 'date-fns'
import 'jspdf-autotable'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles, Checkbox } from '@material-ui/core'
import { Visibility, Delete, Edit, Lightbulb, LightbulbOutlined, Calculate } from '@mui/icons-material'
import ReactTable from 'components/ReactTable/ReactTable'
import GridContainer from 'components/Grid/GridContainer'
import Card from 'components/Card/Card'
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip'
import Button from 'components/CustomButtons/Button'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import roles from 'config/roles/roles'
import ActiveAndDesactiveActionModal from 'components/ReactTableActions/ActiveAndDesactive/ActiveAndDesactiveActionModal'
import UpdateTeamModal from './components/UpdateTeamModal'
import DeleteTeamModal from './components/DeleteTeamModal'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import ViewTeamModal from './components/ViewTeamModal'
import ViewHistorical from './components/ViewHistoricalModal'
import { TEAM_WORK_LIST_RESET } from 'redux/constants/teamWorkConstants'
import { TEAM_WORK_HISTORICAL_RESET } from 'redux/constants/teamWorkConstants'
import { USER_UPDATE_RESET } from 'redux/constants/userConstants'
import { getTeamWorks } from 'redux/actions/teamWorkActions'
import { userUpdateInfo } from 'redux/actions/userActions'
import styles from './styles/teamWorkListStyles'
import { TEAM_WORK_DELETE_RESET } from 'redux/constants/teamWorkConstants'

const useStyles = makeStyles(styles)

const TeamWorkList = () => {
  const ExcelFile = ReactExport.ExcelFile
  const classes = useStyles()
  const dispatch = useDispatch()

  const [data, setData] = useState([])

  const [updateTeamModal, setUpdateTeamModal] = useState(false)
  const [showUpdateTeam, setShowUpdateTeam] = useState({})

  const [viewTeamModal, setViewTeamModal] = useState(false)
  const [showViewTeam, setShowViewTeam] = useState({})

  const [deleteTeamModal, setDeleteTeamModal] = useState(false)
  const [showDeleteTeamInfo, setShowDeleteTeamInfo] = useState({})
  const [relativeDesactive, setRelativeDesactive] = useState(false)

  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)

  const [isdelete, setIsDelete] = useState(false)
  const [alert, setAlert] = useState(null)

  const [activeModal, setActiveModal] = useState(false)
  const [activeModalData, setActiveModalData] = useState({})

  const [viewHistoricalModal, setViewHistoricalModal] = useState(false)
  const [viewListModal, setViewListModal] = useState(true)
  const [showHistorical, setShowHistorical] = useState({})

  const [perfilesTareasCompartidasBool, setPerfilesTareasCompartidas] = useState(false)
  const [mensajeAlertaActiviadesCompartidas, setMensajeAlertaActiviadesCompartidas] = useState("")



  const { loadingTeamWorkList, successTeamWorkList, teamWorkListData, errorTeamWorkList } = useSelector(
    (state) => state.teamWorkList
  )
  const { successUserUpdate } = useSelector((state) => state.userUpdate)

  const { successTeamWorkDelete, errorTeamWorkDelete } = useSelector((state) => state.teamWorkDelete)

  const { userInfo } = useSelector((state) => state.userLogin)

  const adminPermission = userInfo?.permiso.includes(roles.ADMIN_ROLE) ? true : false
  const profileManagerPermission = userInfo?.permiso.includes(roles.GESTOR_DE_PERFILES_ROLE) ? true : false
  const isAdminOrProfileManager = adminPermission || profileManagerPermission

  console.log(userInfo)
  console.log(profileManagerPermission)
  useEffect(() => {
    if (!teamWorkListData && !errorTeamWorkList) {
      dispatch(getTeamWorks())
    }
  }, [teamWorkListData, errorTeamWorkList])

  useEffect(() => {
    if (successUserUpdate) {
      dispatch({ type: TEAM_WORK_LIST_RESET })
      dispatch({ type: USER_UPDATE_RESET })
    }
  }, [successUserUpdate])

  useEffect(() => {
    if (successTeamWorkDelete) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='ELIMINADO'
          onConfirm={() => {setAlert(null) 
            actualizarEstados(userInfo)
            }}
          onCancel={() => setAlert(null)}
        >
          El puesto de trabajo sido eliminado correctamente
        </SweetAlert>
      )
      dispatch({ type: TEAM_WORK_DELETE_RESET })
      dispatch({ type: TEAM_WORK_LIST_RESET })
    } else if (errorTeamWorkDelete) {
      setRelativeDesactive(true)
      handleActiveModal(showDeleteTeamInfo)
      handleCloseDeleteTeamModal()
    }
  }, [successTeamWorkDelete, errorTeamWorkDelete])

  useEffect(() => {
    if (successTeamWorkList) {
      const list = teamWorkListData.map((team) => {
        return {
          id: team.id_puesto,
          codayre: team.cod_ayre,
          workstation: team?.codigo_puesto,          
          denominacion: team?.denominacion_puesto,
          nombre: `${team.nombre} ${team.apellido1} ${team?.apellido2 || ''}`,          
          workday: team?.jornada_laboral,
          activo: team?.activo,
          profile: team?.codigo_perfil?.toString().replaceAll(',', ' ; ') || '',          
          actions: (
            <div className='actions-right'>
              {isAdminOrProfileManager && (
              <Button
                justIcon
                round
                simple
                size='sm'
                onClick={() => handleActiveModal({ ...team })}
                color='warning'
                className='active-deactive'
              >
                <Tooltip title='activar/desactivar'>
                  {team.activo === 'SI' ? <Lightbulb /> : <LightbulbOutlined />}
                </Tooltip>
              </Button>
              )}
              {isAdminOrProfileManager && (
              <Button
                justIcon
                round
                simple
                size='sm'
                onClick={() => showUpdateTeamHandler(team.id_puesto)}
                color='primary'
                className='active-deactive'
              >
                <Tooltip title='Editar Información'>
                  <Edit />
                </Tooltip>
              </Button>
              )}
              <Button
                justIcon
                round
                simple
                size='sm'
                onClick={() => showViewTeamHandler(team.id_puesto)}
                color='success'
                className='edit'
              >
                <Tooltip title='Ver Información'>
                  <Visibility />
                </Tooltip>
              </Button>
              {adminPermission && (
              <Button
                justIcon
                round
                simple
                size='sm'
                onClick={() => showDeleteTeamHandler(team.id_puesto)}
                color='danger'
                className='delete'
              >
                <Tooltip title='Borrar'>
                  <Delete />
                </Tooltip>
              </Button>
              )}
              <Button justIcon round simple size='sm' onClick={() => historicalHandler(team)} color='info' className='view'>
                <Tooltip title='Ver histórico'>
                  <Calculate />
                </Tooltip>
              </Button>
            </div>
          ),
        }
      })
      setData(list)
    }
  }, [successTeamWorkList])

  useEffect(() => {
    if (isdelete) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Eliminado!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          El puesto de trabajo se ha eliminado correctamente
        </SweetAlert>
      )
      return
    }
  }, [isdelete])
  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  useEffect(() => {
    return () => dispatch({ type: TEAM_WORK_LIST_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setDeleteTeamModal(false)
    setIsDelete(false)
    setAlert(null)
  }
  const hideAlert = () => {
    setDeleteTeamModal(false)
    setIsDelete(false)
    setAlert(null)
  }

  const handleCloseModal = () => {
    setUpdateTeamModal(false)
    setShowUpdateTeam({})
  }
  const showUpdateTeamHandler = (id) => {
    const team = teamWorkListData.find((el) => el.id_puesto === id)
    setShowUpdateTeam(team)
    setUpdateTeamModal(true)
  }

  const showDeleteTeamHandler = (id) => {
    const team = teamWorkListData.find((el) => el.id_puesto === id)
    setShowDeleteTeamInfo(team)
    setDeleteTeamModal(true)
  }

  const handleCloseDeleteTeamModal = () => {
    setDeleteTeamModal(false)
    setShowDeleteTeamInfo({})
  }

  const showViewTeamHandler = (id) => {
    const team = teamWorkListData.find((el) => el.id_puesto === id)
    setShowViewTeam(team)
    setViewTeamModal(true)
  }

  const handleCloseViewTeamModal = () => {
    setViewTeamModal(false)
    setShowViewTeam({})
  }

  const handleActiveModal = (data) => {
    setActiveModal(true)
    console.log(data)
    setActiveModalData(data)
  }
  const handleCloseActiveModal = () => {
    setActiveModal(false)
    setActiveModalData({})
  }
  const historicalHandler = (data) => {
    setViewHistoricalModal(true)
    setViewListModal(false)
    setShowHistorical(data)
    dispatch({ type: TEAM_WORK_LIST_RESET })
    dispatch({ type: TEAM_WORK_HISTORICAL_RESET })
  }
  const closeHistoricalModal = () => {
    setViewHistoricalModal(false)
    setViewListModal(true)
    setShowHistorical({})
  }

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a3")
    doc.text('Equipos de Trabajo', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        { header: 'CÓDIGO AYRE', dataKey: 'codayre' },
        { header: 'CÓDIGO PUESTO', dataKey: 'workstation' },
        { header: 'DENOMINACION PUESTO', dataKey: 'denominacion' },
        { header: 'NOMBRE', dataKey: 'nombre' },
        { header: 'JORNADA LABORAL', dataKey: 'workday' },
        { header: 'ACTIVO', dataKey: 'activo' },
        { header: 'PERFIL', dataKey: 'profile' },
        
      ],
    })
    doc.save('equipos-de-trabajo.pdf')
  }
  const activeOrDesactive = (jobPosition) => {
    handleCloseActiveModal()
    setRelativeDesactive(false)
    if (jobPosition.activo === 'NO') {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Guardado!'
          onConfirm={() => setAlert(null)}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          El puesto ha sido activado correctamente
        </SweetAlert>
      )
      return dispatch(userUpdateInfo({ ...jobPosition, activo: 'SI' }))
    } else {
      
      actualizarEstados(jobPosition)
     setAlert(
      <SweetAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title='Guardado!'
        onConfirm={() => {
          setAlert(null)
          alertPerfilActividadesCompartidas()
        }}
        onCancel={() => {
          setAlert(null)
          alertPerfilActividadesCompartidas()
        }}
        confirmBtnCssClass={classes.button + ' ' + classes.success}
      >
        El puesto ha sido desactivado correctamente
      </SweetAlert>
    )
      return dispatch(userUpdateInfo({ ...jobPosition, activo: 'NO', fecha_baja: format(new Date(), 'yyyy-MM-dd') }))
    }
  }

  useEffect(() => {
    if (perfilesTareasCompartidasBool) {
      alertPerfilActividadesCompartidas()
    }
  }, [perfilesTareasCompartidasBool, mensajeAlertaActiviadesCompartidas])

  const alertPerfilActividadesCompartidas = () => {
    console.log(perfilesTareasCompartidasBool + "popopopopo" + mensajeAlertaActiviadesCompartidas)
    if(perfilesTareasCompartidasBool){
      setAlert(
        <SweetAlert
          info
          style={{ display: 'block', marginTop: '-100px' }}
          title='Aviso!'
          onConfirm={() => {
          // Restablecer los estados a sus valores iniciales
          setPerfilesTareasCompartidas(false);
          setMensajeAlertaActiviadesCompartidas("");
          setAlert(null);
        }}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
         {mensajeAlertaActiviadesCompartidas}
        </SweetAlert>
      )
    }else{
      setAlert(null)
    }
  }

  const actualizarEstados = (jobPosition) => {
    var messageTareasCompartidas = "";
    var perfilesTareasCompartidas = ""
    console.log( jobPosition)
    jobPosition.tareas_compartidas.forEach((profile)=>
    {
      if (profile.count_tareas_compartidas > 0) {
        perfilesTareasCompartidas += ` ${profile.codigo_perfil},`
      }
    });
    console.log(perfilesTareasCompartidas)
    console.log(perfilesTareasCompartidas.length)
  
    messageTareasCompartidas = `El trabajador incativado tenía alguna tarea compartida en el perfil ${perfilesTareasCompartidas}
    por favor revise el reparto de % de responsabilidad de los trabajadores que continúan desarrollando esta/s tareas/s compartidas/s.` 
   if(perfilesTareasCompartidas.length > 0){
      setMensajeAlertaActiviadesCompartidas(messageTareasCompartidas)
      console.log(messageTareasCompartidas)
  
      setPerfilesTareasCompartidas(perfilesTareasCompartidas)
      console.log(perfilesTareasCompartidasBool)
    }
  }

  return (
    <>
      {viewListModal && (
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingTeamWorkList ? (
                <>Cargando...</>
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'COD.AYRE',
                      accessor: 'codayre',
                    },
                    {
                      Header: 'COD.PUESTO',
                      accessor: 'workstation',
                    },
                    {
                      Header: 'DENOMINACION',
                      accessor: 'denominacion',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                    },
                    {
                      Header: 'NOMBRE',
                      accessor: 'nombre',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                    },
                    {
                      Header: 'JORNADA LABORAL',
                      accessor: 'workday',
                    },
                    {
                      Header: 'ACTIVO',
                      accessor: 'activo',
                    },
                    {
                      Header: 'PERFILES',
                      accessor: 'profile',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
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
                    filename='equipos-de-trabajo'
                    hideElement={true}
                  >
                    <ExcelFile.ExcelSheet data={data} name='Equipos de Trabajo'>
                      <ExcelFile.ExcelColumn label='COD.AYRE' value='codayre' />
                      <ExcelFile.ExcelColumn label='COD.PUESTO' value='workstation' />
                      <ExcelFile.ExcelColumn label='DENOMINACION' value='denominacion' />
                      <ExcelFile.ExcelColumn label='NOMBRE' value='nombre' />
                      <ExcelFile.ExcelColumn label='JORNADA LABORAL' value='workday' />
                      <ExcelFile.ExcelColumn label='ACTIVO' value='activo' />
                      <ExcelFile.ExcelColumn label='PERFIL' value='profile' />                      
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
        </GridItem>{' '}
        {alert}
      </GridContainer>
      )}
      {activeModal && (
        <ActiveAndDesactiveActionModal
          open={activeModal}
          handleCloseModal={() => handleCloseActiveModal()}
          handleSubmit={() => activeOrDesactive(activeModalData)}
          message={
            !relativeDesactive ? (
              <>
                Va a {activeModalData.activo === 'NO' ? 'activar' : 'desactivar'} el puesto de trabajo de{' '}
                <strong>
                  {activeModalData.nombre} {activeModalData.apellido1} {activeModalData.apellido2}
                </strong>
              </>
            ) : (
              <p>
                El puesto <strong>{activeModalData.cod_ayre}</strong> no se puede eliminar, ya que tiene una actividad
                asignada, pero puede {activeModalData.activo === 'NO' ? 'activarla' : 'desactivarla'}
              </p>
            )
          }
          modalTitle={`${activeModalData.activo === 'NO' ? 'Activar' : 'Desactivar'} Puesto de trabajo`}
          loadingMessageButton={activeModalData.activo === 'NO' ? 'Activando...' : 'Desactivando...'}
          succesMessageButton={activeModalData.activo === 'NO' ? 'Activar' : 'Desactivar'}
        ></ActiveAndDesactiveActionModal>
      )}
      {updateTeamModal && (
        <UpdateTeamModal
          alert={setAlert}
          handleCloseModal={handleCloseModal}
          updateTeamModal={updateTeamModal}
          showUpdateTeam={showUpdateTeam}
        />
      )}
      {viewTeamModal && (
        <ViewTeamModal
          handleCloseModal={handleCloseViewTeamModal}
          showViewTeam={showViewTeam}
          viewTeamModal={viewTeamModal}
        />
      )}
      {deleteTeamModal && (
        <DeleteTeamModal
          alert={setAlert}
          handleCloseDeleteTeamModal={handleCloseDeleteTeamModal}
          deleteTeamModal={deleteTeamModal}
          showDeleteTeamInfo={showDeleteTeamInfo}
        />
      )}
      {downloadExcel && (
        <DownloadConfirmModal
          downloadFile={downloadExcel}
          setDownloadFile={setDownloadExcel}
          setFile={setExcel}
          tableName='Equipos de Trabajo'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Equipos de Trabajo'
          FileExtension='PDF'
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

export default TeamWorkList
