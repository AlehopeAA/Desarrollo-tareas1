import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Delete, Edit } from '@mui/icons-material'
import ReactTable from 'components/ReactTable/ReactTable'
import GridContainer from 'components/Grid/GridContainer'
import Card from 'components/Card/Card'
import Button from 'components/CustomButtons/Button'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import DeleteAcumulativesModal from './components/DeleteAcumulativesModal'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import { ACUMULATIVES_LIST_RESET } from 'redux/constants/acumulativesConstants'
import { getAcumulativesList } from 'redux/actions/acumulativesActions'
import styles from './styles/acumulativesListScreenStyles'

const useStyles = makeStyles(styles)

const AcumulativesTasksListScreen = () => {
  const dispatch = useDispatch()
  const ExcelFile = ReactExport.ExcelFile
  const classes = useStyles()

  const [data, setData] = useState([])
  const [deleteAcumulativesModal, setDeleteAcumulativesModal] = useState(false)
  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)
  const [showDeleteAcumulativesInfo, setShowDeleteAcumulativesInfo] = useState({})

  const { loadingAcumulativesList, acumulativesList, successAcumulativesList, errorAcumulativesList } = useSelector(
    (state) => state.acumulativesList
  )

  useEffect(() => {
    if (successAcumulativesList) {
      const list = acumulativesList?.acumulativas.map((acumulative) => {
        return {
          desc_padre: acumulative.desc_padre,
          desc_hija: acumulative.desc_hija,
          ...acumulative,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => showDeleteAcumulativesHandler(acumulative)}
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
      dispatch(getAcumulativesList())
    }
  }, [successAcumulativesList, dispatch])

  useEffect(() => {
    return () => dispatch({ type: ACUMULATIVES_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const showDeleteAcumulativesHandler = (acumulative) => {
    setShowDeleteAcumulativesInfo(acumulative)
    setDeleteAcumulativesModal(true)
  }

  const handleCloseDeleteAcumulativesModal = () => {
    setDeleteAcumulativesModal(false)
    setShowDeleteAcumulativesInfo({})
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Acumulatives', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        { header: 'Tarea Padre', dataKey: 'desc_padre' },
        { header: 'Perfil Padre', dataKey: 'codigo_perfil_padre' },
        { header: 'Tarea Hija', dataKey: 'desc_hija' },
        { header: 'Perfil Hija', dataKey: 'codigo_perfil_hija' },
      ],
    })
    doc.save('acumulativas.pdf')
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingAcumulativesList ? (
                'Cargando Acumulativas...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'TAREA PADRE',
                      accessor: 'desc_padre',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                    },
                    {
                      Header: 'PERFIL PADRE',
                      accessor: 'codigo_perfil_padre',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                    },
                    {
                      Header: 'TAREA HIJA',
                      accessor: 'desc_hija',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                    },
                    {
                      Header: 'PERFIL HIJA',
                      accessor: 'codigo_perfil_hija',
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
                    filename='acumulativas'
                    hideElement={true}
                  >
                    <ExcelFile.ExcelSheet data={data} name='Acumulativas'>
                      <ExcelFile.ExcelColumn label='Tarea Padre' value='desc_padre' />
                      <ExcelFile.ExcelColumn label='Perfil Padre' value='codigo_perfil_padre' />
                      <ExcelFile.ExcelColumn label='Tarea Hija' value='desc_hija' />
                      <ExcelFile.ExcelColumn label='Perfil Hija' value='codigo_perfil_hija' />
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
            {errorAcumulativesList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorAcumulativesList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {deleteAcumulativesModal && (
        <DeleteAcumulativesModal
          handleCloseDeleteAcumulativesModal={handleCloseDeleteAcumulativesModal}
          deleteAcumulativesModal={deleteAcumulativesModal}
          showDeleteAcumulativesInfo={showDeleteAcumulativesInfo}
        />
      )}
      {downloadExcel && (
        <DownloadConfirmModal
          downloadFile={downloadExcel}
          setDownloadFile={setDownloadExcel}
          setFile={setExcel}
          tableName='Acumulativas'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Acumulativas'
          FileExtension='PDF'
        />
      )}
    </>
  )
}

export default AcumulativesTasksListScreen
