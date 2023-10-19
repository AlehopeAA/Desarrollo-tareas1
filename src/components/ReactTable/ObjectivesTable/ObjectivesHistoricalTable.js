import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Assignment, Visibility } from '@mui/icons-material'
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardIcon from 'components/Card/CardIcon'
import CardHeader from 'components/Card/CardHeader'
import ReactTable from 'components/ReactTable/ReactTable'
import Button from 'components/CustomButtons/Button'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const ObjectivesHistoricalTable = ({ data, label }) => {
  const ExcelFile = ReactExport.ExcelFile
  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)
  const [columns, setColumns] = useState([
    { 
      Header: 'Tarea', 
      accessor: 'descripcion_tarea',
      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
     },
    { Header: 'Fecha Mod.', accessor: 'fecha_modificacion', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Modificador', accessor: 'fullModificador', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Dif. anterior', accessor: 'dificultad_anterior' },
    { Header: 'Dif. nueva', accessor: 'dificultad_nueva' },
    { Header: 'Uds. Ant. mín/med/max', accessor: 'fullUnidadesAnterior' },
    { Header: 'Uds. Nue. mín/med/max nueva', accessor: 'fullUnidadesNueva' },
    { Header: 'M. Ant. Temp', accessor: 'magnitud_temporal_anterior' },
    { Header: 'M. Nue. Temp', accessor: 'magnitud_temporal_nueva' },
    { Header: '% E. Ant. mín/med/max', accessor: 'fullEntradaAnterior' },
    { Header: '% E. Nue. mín/med/max', accessor: 'fullEntradaNueva' },
    { Header: 'T. Ant. mín/med/max', accessor: 'fullTiempoAnterior' },
    { Header: 'T. Nue. mín/med/max', accessor: 'fullTiempoNueva' },
    { Header: '% J. Ant. mín/med/max', accessor: 'fullJornadaAnterior' },
    { Header: '% J. Nue. mín/med/max', accessor: 'fullJornadaNueva' },
  ])

  useEffect(() => {
    if (label === 'Ord/Ext') {
      setColumns([
        {
          Header: 'Perfiles',
          accessor: 'codigo_perfil',
          Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
        },
        ...columns,
      ])
    }
  }, [label])

  useEffect(() => {    
    if (label === 'Específicos') {
      setColumns([
        {
          Header: 'Puesto',
          accessor: 'fullname',
          Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
        },        
        ...columns,        
      ])
    }
  }, [label])


  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a2")
    doc.text('Histórico de objetivos de tareas', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        { 
          header: 'PERFILES', 
          dataKey: 'codigo_perfil' 
        },
        { 
          header: 'PUESTO', 
          dataKey: 'fullname' 
        },
        { 
          header: 'DESCRIPCION', 
          dataKey: 'descripcion_tarea' 
        },
        { 
          header: 'FECHA MODIFICACIÓN', 
          dataKey: 'fecha_modificacion' 
        },
        { 
          header: 'MODIFICADOR', 
          dataKey: 'fullModificador' 
        },
        { 
          header: 'DIFICULTAD ANTERIOR', 
          dataKey: 'dificultad_anterior' 
        },
        { 
          header: 'DIFICULTAD NUEVA', 
          dataKey: 'dificultad_nueva' 
        },
        {
          header: 'UD. MINIMO ANTERIOR',
          dataKey: 'unidades_minimo_anterior',
        },
        {
          header: 'UD. MINIMO NUEVA',
          dataKey: 'unidades_minimo_nueva',
        },
        {
          header: 'UD. MEDIO ANTERIOR',
          dataKey: 'unidades_medio_anterior',
        },
        {
          header: 'UD. MEDIO NUEVA',
          dataKey: 'unidades_medio_nueva',
        },
        {
          header: 'UD. MAXIMO ANTERIOR',
          dataKey: 'unidades_maximo_anterior',
        },
        {
          header: 'UD. MAXIMO NUEVA',
          dataKey: 'unidades_maximo_nueva',
        },
        {
          header: '% ENTRADA MINIMO ANTERIOR',
          dataKey: 'porcentaje_entrada_minimo_anterior',
        },
        {
          header: '% ENTRADA MINIMO NUEVA',
          dataKey: 'porcentaje_entrada_minimo_nueva',
        },
        {
          header: '% ENTRADA MEDIO ANTERIOR',
          dataKey: 'porcentaje_entrada_medio_anterior',
        },
        {
          header: '% ENTRADA MEDIO NUEVA',
          dataKey: 'porcentaje_entrada_medio_nueva',
        },        
        {
          header: '% ENTRADA MAXIMO ANTERIOR',
          dataKey: 'porcentaje_entrada_maximo_anterior',
        },
        {
          header: '% ENTRADA MAXIMO NUEVA',
          dataKey: 'porcentaje_entrada_maximo_nueva',
        },
        {
          header: 'TIEMPO MINIMO ANTERIOR',
          dataKey: 'tiempo_minimo_anterior',
        },
        {
          header: 'TIEMPO MINIMO NUEVA',
          dataKey: 'tiempo_minimo_nueva',
        },
        {
          header: 'TIEMPO MEDIO ANTERIOR',
          dataKey: 'tiempo_medio_anterior',
        },
        {
          header: 'TIEMPO MEDIO NUEVA',
          dataKey: 'tiempo_medio_nueva',
        },
        {
          header: 'TIEMPO MAXIMO ANTERIOR',
          dataKey: 'tiempo_maximo_anterior',
        },
        {
          header: 'TIEMPO MAXIMO NUEVA',
          dataKey: 'tiempo_maximo_nueva',
        },
        {
          header: '% JORNADA MINIMO ANTERIOR',
          dataKey: 'porcentaje_jornada_minimo_anterior',
        },
        {
          header: '% JORNADA MINIMO NUEVA',
          dataKey: 'porcentaje_jornada_minimo_nueva',
        },
        {
          header: '% JORNADA MEDIO ANTERIOR',
          dataKey: 'porcentaje_jornada_medio_anterior',
        },
        {
          header: '% JORNADA MEDIO NUEVA',
          dataKey: 'porcentaje_jornada_medio_nueva',
        },
        {
          header: '% JORNADA MAXIMO ANTERIOR',
          dataKey: 'porcentaje_jornada_maximo_anterior',
        },
        {
          header: '% JORNADA MAXIMO NUEVA',
          dataKey: 'porcentaje_jornada_maximo_nueva',
        },
        {
          header: 'MAG. TEMPORAL ANTERIOR',
          dataKey: 'magnitud_temporal_anterior',
        },
        {
          header: 'MAG. TEMPORAL NUEVA',
          dataKey: 'magnitud_temporal_nueva',
        },
      ],
    })
    doc.save('HistoricoObjetivo.pdf')
  }

  return (
    <GridContainer>
      <GridItem xs={12}>
        <h3>Histórico de objetivos {label}</h3>
        <Card>
          <CardHeader color='primary' icon>
            <CardIcon color='primary'>
              <Assignment />
            </CardIcon>
          </CardHeader>
          <CardBody>
            {!!data.length ? <ReactTable columns={columns} data={data} /> : <h3>No hay histórico de objetivos para mostrar</h3>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                {excel && (
                  <ExcelFile
                    element={<Button color='primary'>Exportar Excel</Button>}
                    filename='HistoricoObjetivos'
                    hideElement={true}
                  >
                    <ExcelFile.ExcelSheet data={data} name='HistoricoObjetivos'>
                      <ExcelFile.ExcelColumn label='PERFILES' value={(codigos) => codigos.codigo_perfil && codigos.codigo_perfil.length > 0 ? codigos.codigo_perfil.join(', '): '-'} />
                      <ExcelFile.ExcelColumn label='PUESTO' value='fullname' />
                      <ExcelFile.ExcelColumn label='DESCRIPCION' value='descripcion_tarea' />
                      <ExcelFile.ExcelColumn label='FECHA MODIFICACIÓN' value='fecha_modificacion' />
                      <ExcelFile.ExcelColumn label='MODIFICADOR' value='fullModificador' />
                      <ExcelFile.ExcelColumn label='DIFICULTAD ANTERIOR' value='dificultad_anterior' />
                      <ExcelFile.ExcelColumn label='DIFICULTAD NUEVA' value='dificultad_nueva' />
                      <ExcelFile.ExcelColumn label='UD. MINIMO ANTERIOR' value='unidades_minimo_anterior' />
                      <ExcelFile.ExcelColumn label='UD. MINIMO NUEVA' value='unidades_minimo_nueva' />
                      <ExcelFile.ExcelColumn label='UD. MEDIO ANTERIOR' value='unidades_medio_anterior' />
                      <ExcelFile.ExcelColumn label='UD. MEDIO NUEVA' value='unidades_medio_nueva' />
                      <ExcelFile.ExcelColumn label='UD. MAXIMO ANTERIOR' value='unidades_maximo_anterior' />
                      <ExcelFile.ExcelColumn label='UD. MAXIMO NUEVA' value='unidades_maximo_nueva' />
                      <ExcelFile.ExcelColumn label='% ENTRADA MINIMO ANTERIOR' value='porcentaje_entrada_minimo_anterior' />
                      <ExcelFile.ExcelColumn label='% ENTRADA MINIMO NUEVA' value='porcentaje_entrada_minimo_nueva' />
                      <ExcelFile.ExcelColumn label='% ENTRADA MEDIO ANTERIOR' value='porcentaje_entrada_medio_anterior' />
                      <ExcelFile.ExcelColumn label='% ENTRADA MEDIO NUEVA' value='porcentaje_entrada_medio_nueva' />
                      <ExcelFile.ExcelColumn label='% ENTRADA MAXIMO ANTERIOR' value='porcentaje_entrada_maximo_anterior' />
                      <ExcelFile.ExcelColumn label='% ENTRADA MAXIMO NUEVA' value='porcentaje_entrada_maximo_nueva' />
                      <ExcelFile.ExcelColumn label='TIEMPO MINIMO ANTERIOR' value='tiempo_minimo_anterior' />
                      <ExcelFile.ExcelColumn label='TIEMPO MINIMO NUEVA' value='tiempo_minimo_nueva' />
                      <ExcelFile.ExcelColumn label='TIEMPO MEDIO ANTERIOR' value='tiempo_medio_anterior' />
                      <ExcelFile.ExcelColumn label='TIEMPO MEDIO NUEVA' value='tiempo_medio_nueva' />
                      <ExcelFile.ExcelColumn label='TIEMPO MAXIMO ANTERIOR' value='tiempo_maximo_anterior' />
                      <ExcelFile.ExcelColumn label='TIEMPO MAXIMO NUEVA' value='tiempo_maximo_nueva' />
                      <ExcelFile.ExcelColumn label='% JORNADA MINIMO ANTERIOR' value='porcentaje_jornada_minimo_anterior' />
                      <ExcelFile.ExcelColumn label='% JORNADA MINIMO NUEVA' value='porcentaje_jornada_minimo_nueva' />
                      <ExcelFile.ExcelColumn label='% JORNADA MEDIO ANTERIOR' value='porcentaje_jornada_medio_anterior' />
                      <ExcelFile.ExcelColumn label='% JORNADA MEDIO NUEVA' value='porcentaje_jornada_medio_nueva' />
                      <ExcelFile.ExcelColumn label='% JORNADA MAXIMO ANTERIOR' value='porcentaje_jornada_maximo_anterior' />
                      <ExcelFile.ExcelColumn label='% JORNADA MAXIMO NUEVA' value='porcentaje_jornada_maximo_nueva' />
                      <ExcelFile.ExcelColumn label='MAG. TEMPORAL ANTERIOR' value='magnitud_temporal_anterior' />
                      <ExcelFile.ExcelColumn label='MAG. TEMPORAL NUEVA' value='magnitud_temporal_nueva' />
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
      {downloadExcel && (
      <DownloadConfirmModal
        downloadFile={downloadExcel}
        setDownloadFile={setDownloadExcel}
        setFile={setExcel}
        tableName='Histórico de objetivo'
        FileExtension='Excel'
      />
    )}
    {downloadPdf && (
      <DownloadConfirmModal
        downloadFile={downloadPdf}
        setDownloadFile={setDownloadPdf}
        setFile={setPdf}
        tableName='Hist´rico de objetivos'
        FileExtension='PDF'
      />
    )}
    </GridContainer>    
  )
}
export default ObjectivesHistoricalTable
