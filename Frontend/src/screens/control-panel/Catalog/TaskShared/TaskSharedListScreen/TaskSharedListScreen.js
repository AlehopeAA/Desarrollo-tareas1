import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Edit } from '@mui/icons-material'
import ReactTable from 'components/ReactTable/ReactTable'
import GridContainer from 'components/Grid/GridContainer'
import Card from 'components/Card/Card'
import Button from 'components/CustomButtons/Button'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { NavLink } from 'react-router-dom'
import UpdateSharedModal from './components/UpdateSharedModal'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import { SHARED_LIST_RESET } from 'redux/constants/sharedConstants'
import { getSharedByTaskId, getSharedList } from 'redux/actions/sharedActions'
import styles from './styles/sharedListScreenStyles'

const useStyles = makeStyles(styles)

const TaskSharedListScreen = () => {
  const dispatch = useDispatch()
  const ExcelFile = ReactExport.ExcelFile
  const classes = useStyles()

  const [data, setData] = useState([])
  const [updateSharedModal, setUpdateSharedModal] = useState(false)
  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)
  const [showUpdateShared, setShowUpdateShared] = useState({})
  
  const { loadingSharedList, sharedList, successSharedList, errorSharedList } = useSelector(
    (state) => state.sharedList
  )

  useEffect(() => {
    if (successSharedList) {
      const list = sharedList?.compartidas.map((shared) => {
        return {
          ...shared,
          porcentaje_responsabilidad: `${shared?.porcentaje_responsabilidad || 0}`,
          actions: (
            <div className='actions-right'>
              <NavLink to={'/admin/tasks-shared-register'} >
              <Button
                justIcon
                round
                simple
                onClick={() => showUpdateSharedHandler(shared)}
                color='primary'
                className='edit'
              >
                <Tooltip title='Editar Información'>
                  <Edit />
                </Tooltip>
              </Button>
              </NavLink>
            </div>
          ),
        }
      })
      setData(list)
    } else {
      dispatch(getSharedList())
    }
  }, [successSharedList, dispatch])

  useEffect(() => {
    return () => dispatch({ type: SHARED_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const handleCloseModal = () => {
    setUpdateSharedModal(false)
    setShowUpdateShared({})
    dispatch({ type: SHARED_LIST_RESET })
  }

  const showUpdateSharedHandler = (shared) => {
    setUpdateSharedModal(true)
    setShowUpdateShared(shared)
    dispatch(getSharedByTaskId(shared.id_tarea))
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Compartidas', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        { header: 'Tarea', dataKey: 'descripcion_tarea' },
        { header: 'Perfiles', dataKey: 'codigo_perfil' },
        { header: '% responsabilidad', dataKey: 'porcentaje_responsabilidad' },
      ],
    })
    doc.save('compartidas.pdf')
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingSharedList ? (
                'Cargando Compartidas...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'TAREA',
                      accessor: 'descripcion_tarea',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                    },
                    {
                      Header: 'PERFIL',
                      accessor: 'codigo_perfil',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                    },
                    {
                      Header: '% RESPONSABILIDAD',
                      accessor: 'porcentaje_responsabilidad',
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
                    filename='compartidas'
                    hideElement={true}
                  >
                    <ExcelFile.ExcelSheet data={data} name='Compartidas'>
                      <ExcelFile.ExcelColumn label='Tarea' value='descripcion_tarea' />
                      <ExcelFile.ExcelColumn label='Perfil' value='codigo_perfil' />
                      <ExcelFile.ExcelColumn label='% Responsabilidad' value='porcentaje_responsabilidad' />
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
            {errorSharedList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorSharedList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {updateSharedModal && (
        <UpdateSharedModal
          handleCloseModal={handleCloseModal}
          updateSharedModal={updateSharedModal}
          showUpdateShared={showUpdateShared}
        />
      )}
      {downloadExcel && (
        <DownloadConfirmModal
          downloadFile={downloadExcel}
          setDownloadFile={setDownloadExcel}
          setFile={setExcel}
          tableName='Compartidas'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Compartidas'
          FileExtension='PDF'
        />
      )}
    </>
  )
}

export default TaskSharedListScreen
