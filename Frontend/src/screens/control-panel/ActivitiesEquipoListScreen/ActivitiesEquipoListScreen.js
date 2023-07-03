import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { format } from 'date-fns'
import { Visibility } from '@mui/icons-material'
import { Card } from '@material-ui/core'
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import ReactTable from 'components/ReactTable/ReactTable'
import Button from 'components/CustomButtons/Button'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import ViewActivityInfoModal from './components/ViewActivityInfoModal'
import { getActivities, getActivityInfo } from 'redux/actions/activitiesActions'
import { ACTIVITIES_LIST_RESET, ACTIVITIES_INFO_RESET } from 'redux/constants/activitiesConstants'

const ActivitiesEquipoListScreen = () => {
  const ExcelFile = ReactExport.ExcelFile
  const classes = {}
  const dispatch = useDispatch()  

  const [data, setData] = useState([])
  const [infoActivityModal, setInfoActivityModal] = useState(false)
  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)
  
  const { loadingActivitiesList, successActivitiesList, activitiesListData } = useSelector(
    (state) => state.activitiesList
  )
  const { loadingActivityInfo, successActivityInfo, activityInfoData } = useSelector(
    (state) => state.activityInfo
  )
  const { userInfo } = useSelector((state) => state.userLogin)
  
  useEffect(() => {
    return () => dispatch({ type: ACTIVITIES_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (successActivitiesList) {
      const activities = activitiesListData.map((item) => {
        return {
          ...item,
          fecha_actividad: format(new Date(item.fecha_actividad), 'dd-MM-yyyy'),
          fecha_creacion: format(new Date(item.fecha_creacion), 'dd-MM-yyyy'),
          fecha_modificacion: format(new Date(item.fecha_modificacion), 'dd-MM-yyyy'),
          codigos_trazabilidad: item.codigos_trazabilidad && item.codigos_trazabilidad.length > 0 ? item.codigos_trazabilidad.join(', '): '-',
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => showActivityInfoHandler(item)}
                color='success'
                className='view'
              >
                <Visibility />
              </Button>
            </div>
          ),          
        }
      })
      setData(activities)
    } else {
      dispatch(getActivities(true))
    }
  }, [successActivitiesList])

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a3")
    doc.text('Actividades', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        {
          header: 'Puesto',
          dataKey: 'nombre',
        },
        {
          header: 'Tarea',
          dataKey: 'descripcion_tarea',
        },
        {
          header: 'F. Actividad',
          dataKey: 'fecha_actividad',
        },
        {
          header: 'Modalidad',
          dataKey: 'modalidad',
        },
        {
          header: 'Horas',
          dataKey: 'horas',
        },
        {
          header: 'Ud',
          dataKey: 'unidades',
        },
        {
          header: 'Cod. Traza.',
          dataKey: 'codigos_trazabilidad',
        },
        {
          header: 'Obs.',
          dataKey: 'observaciones',
        },
        {
          header: 'F. Creación',
          dataKey: 'fecha_creacion',
        },
        {
          header: 'F. Modificación',
          dataKey: 'fecha_modificacion',
        },
      ],
    })
    doc.save('actividades.pdf')
  }
  const showActivityInfoHandler = (activity) => {
    setInfoActivityModal(true)
    dispatch(getActivityInfo(activity))
  }
  const closeViewActivityInfoModal = () => {
    setInfoActivityModal(false)
    dispatch({ type: ACTIVITIES_INFO_RESET })
  }

  return (    
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingActivitiesList
                ? 'Cargando Actividades...'
                : activitiesListData && (
                    <ReactTable
                      columns={[
                        {
                          Header: 'Puesto',
                          accessor: 'nombre',
                          Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                        },
                        {
                          Header: 'Tarea',
                          accessor: 'descripcion_tarea',
                          Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                        },
                        {
                          Header: 'Fecha',
                          accessor: 'fecha_actividad',
                        },
                        {
                          Header: 'Modalidad',
                          accessor: 'modalidad',
                        },
                        {
                          Header: 'Horas',
                          accessor: 'horas',
                        },
                        {
                          Header: 'Unidades',
                          accessor: 'unidades',
                        },
                        {
                          Header: 'Cód. trazabilidad',
                          accessor: 'codigos_trazabilidad',
                          Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                        },
                        {
                          Header: 'Observaciones',
                          accessor: 'observaciones',
                          Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                        },
                        {
                          Header: 'Acciones',
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
                    filename='actividades'
                    hideElement={true}
                  >
                    <ExcelFile.ExcelSheet data={data} name='Actividades'>
                      <ExcelFile.ExcelColumn label='Puesto' value='nombre' />
                      <ExcelFile.ExcelColumn label='Tarea' value='descripcion_tarea' />
                      <ExcelFile.ExcelColumn label='Fecha Actividad' value='fecha_actividad' />
                      <ExcelFile.ExcelColumn label='Modalidad' value='modalidad' />
                      <ExcelFile.ExcelColumn label='Horas' value='horas' />
                      <ExcelFile.ExcelColumn label='Unidades' value='unidades' />
                      <ExcelFile.ExcelColumn label='Codigo Trazabilidad' value='codigos_trazabilidad' />
                      <ExcelFile.ExcelColumn label='Observaciones' value='observaciones' />
                      <ExcelFile.ExcelColumn label='Fecha Creacion' value='fecha_creacion' />
                      <ExcelFile.ExcelColumn label='Fecha Modificacion' value='fecha_modificacion' />
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
      {downloadExcel && (
        <DownloadConfirmModal
          downloadFile={downloadExcel}
          setDownloadFile={setDownloadExcel}
          setFile={setExcel}
          tableName='Actividades'
          FileExtension='Excel'
        />
      )}
      {infoActivityModal && successActivityInfo && (
        <ViewActivityInfoModal
          closeViewActivityInfoModal={closeViewActivityInfoModal}
          viewActivityInfo={infoActivityModal && successActivityInfo}
          info={activityInfoData}
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Actividades'
          FileExtension='PDF'
        />
      )}
    </>
  )
}

export default ActivitiesEquipoListScreen
