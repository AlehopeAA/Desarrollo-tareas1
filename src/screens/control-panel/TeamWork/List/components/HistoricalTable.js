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

const HistoricalTable = ({ data }) => {
  const ExcelFile = ReactExport.ExcelFile
  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)
  const [columns, setColumns] = useState([
    { Header: 'Fecha Mod.', accessor: 'fecha_modificacion', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Modificador', accessor: 'fullModificador', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Cod Ayre anterior', accessor: 'cod_ayre_anterior' },
    { Header: 'Cod Ayre nueva', accessor: 'cod_ayre_nueva' },
    { Header: 'Cod Ant.', accessor: 'codigo_puesto_anterior' },
    { Header: 'Cod Nue.', accessor: 'codigo_puesto_nueva' },
    { Header: 'Deno. Ant.', accessor: 'denominacion_puesto_anterior', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Deno. Nue.', accessor: 'denominacion_puesto_nueva', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Nombre Ant.', accessor: 'nombre_anterior' },
    { Header: 'Nombre Nue.', accessor: 'nombre_nueva' },
    { Header: 'Ape1 Ant.', accessor: 'apellido1_anterior' },
    { Header: 'Ape1 Nue.', accessor: 'apellido1_nueva' },
    { Header: 'Ape2 Ant.', accessor: 'apellido2_anterior' },
    { Header: 'Ape2 Nue.', accessor: 'apellido2_nueva' },
    { Header: 'Jornada Ant.', accessor: 'jornada_laboral_anterior' },
    { Header: 'Jornada Nue.', accessor: 'jornada_laboral_nueva' },
    { Header: 'Ver Obj. Ant.', accessor: 'ver_objetivos_anterior' },
    { Header: 'Ver Obj. Nue.', accessor: 'ver_objetivos_nueva' },
    { Header: 'Perfiles Ant.', accessor: 'perfiles_anterior', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Perfiles Nue.', accessor: 'perfiles_nueva', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Resp. Ant.', accessor: 'responsables_anterior', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Resp. Nue.', accessor: 'responsables_nueva', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Val. Ant.', accessor: 'validadores_anterior', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Val. Nue.', accessor: 'validadores_nueva', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    { Header: 'Activo Ant.', accessor: 'activo_anterior' },
    { Header: 'Activo Nue.', accessor: 'activo_nueva' },
    { Header: 'F. Baja Ant.', accessor: 'fecha_baja_anterior' },
    { Header: 'F. Baja Nue.', accessor: 'fecha_baja_nueva' },
  ])

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a2")
    doc.text('Histórico de puestos de trabajo', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        { 
          header: 'FECHA MODIFICACIÓN', 
          dataKey: 'fecha_modificacion' 
        },
        { 
          header: 'MODIFICADOR', 
          dataKey: 'fullModificador' 
        },
        { 
          header: 'CODIGO AYRE ANTERIOR', 
          dataKey: 'cod_ayre_anterior' 
        },
        { 
          header: 'CODIGO AYRE NUEVA', 
          dataKey: 'cod_ayre_nueva' 
        },
        {
          header: 'CODIGO PUESTO ANTERIOR',
          dataKey: 'codigo_puesto_anterior',
        },
        {
          header: 'CODIGO PUESTO NUEVA',
          dataKey: 'codigo_puesto_nueva',
        },
        {
          header: 'DENOMINACION PUESTO ANTERIOR',
          dataKey: 'denominacion_puesto_anterior',
        },
        {
          header: 'DENOMINACION PUESTO NUEVA',
          dataKey: 'denominacion_puesto_nueva',
        },
        {
          header: 'NOMBRE ANTERIOR',
          dataKey: 'nombre_anterior',
        },
        {
          header: 'NOMBRE NUEVA',
          dataKey: 'nombre_nueva',
        },
        {
          header: 'PRIMER APELLIDO ANTERIOR',
          dataKey: 'apellido1_anterior',
        },
        {
          header: 'PRIMER APELLIDO NUEVA',
          dataKey: 'apellido1_nueva',
        },
        {
          header: 'SEGUNDO APELLIDO ANTERIOR',
          dataKey: 'apellido2_anterior',
        },
        {
          header: 'SEGUNDO APELLIDO NUEVA',
          dataKey: 'apellido2_nueva',
        },
        {
          header: 'JORNADA LABORAL ANTERIOR',
          dataKey: 'jornada_laboral_anterior',
        },
        {
          header: 'JORNADA LABORAL NUEVA',
          dataKey: 'jornada_laboral_nueva',
        },        
        {
          header: 'VER OBJETIVOS ANTERIOR',
          dataKey: 'ver_objetivos_anterior',
        },
        {
          header: 'VER OBJETIVOS NUEVA',
          dataKey: 'ver_objetivos_nueva',
        },
        {
          header: 'PERFILES ANTERIOR',
          dataKey: 'perfiles_anterior',
        },
        {
          header: 'PERFILES NUEVA',
          dataKey: 'perfiles_nueva',
        },
        {
          header: 'RESPONSABLES ANTERIOR',
          dataKey: 'responsables_anterior',
        },
        {
          header: 'RESPONSABLES NUEVA',
          dataKey: 'responsables_nueva',
        },
        {
          header: 'VALIDADORES ANTERIOR',
          dataKey: 'validadores_anterior',
        },
        {
          header: 'VALIDADORES NUEVA',
          dataKey: 'validadores_nueva',
        },
        {
          header: 'ACTIVO ANTERIOR',
          dataKey: 'activo_anterior',
        },
        {
          header: 'ACTIVO NUEVA',
          dataKey: 'activo_nueva',
        },
        {
          header: 'FECHA DE BAJA ANTERIOR',
          dataKey: 'fecha_baja_anterior',
        },
        {
          header: 'FECHA DE BAJA NUEVA',
          dataKey: 'fecha_baja_nueva',
        },
      ],
    })
    doc.save('HistoricoPuestos.pdf')
  }

  return (
    <GridContainer>
      <GridItem xs={12}>
        <h3>Histórico de puestos de trabajo</h3>
        <Card>
          <CardHeader color='primary' icon>
            <CardIcon color='primary'>
              <Assignment />
            </CardIcon>
          </CardHeader>
          <CardBody>
            {!!data.length ? <ReactTable columns={columns} data={data} /> : <h3>No hay histórico de puesto para mostrar</h3>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                {excel && (
                  <ExcelFile
                    element={<Button color='primary'>Exportar Excel</Button>}
                    filename='HistoricoPuestosTrabajo'
                    hideElement={true}
                  >
                    <ExcelFile.ExcelSheet data={data} name='HistoricoPuestosTrabajo'>
                      <ExcelFile.ExcelColumn label='FECHA MODIFICACIÓN' value='fecha_modificacion' />
                      <ExcelFile.ExcelColumn label='MODIFICADOR' value='fullModificador' />
                      <ExcelFile.ExcelColumn label='CODIGO AYRE ANTERIOR' value='cod_ayre_anterior' />
                      <ExcelFile.ExcelColumn label='CODIGO AYRE NUEVA' value='cod_ayre_nueva' />
                      <ExcelFile.ExcelColumn label='CODIGO PUESTO ANTERIOR' value='codigo_puesto_anterior' />
                      <ExcelFile.ExcelColumn label='CODIGO PUESTO NUEVA' value='codigo_puesto_nueva' />
                      <ExcelFile.ExcelColumn label='DENOMINACIÓN PUESTO ANTERIOR' value='denominacion_puesto_anterior' />
                      <ExcelFile.ExcelColumn label='DENOMINACIÓN PUESTO NUEVA' value='denominacion_puesto_nueva' />
                      <ExcelFile.ExcelColumn label='NOMBRE ANTERIOR' value='nombre_anterior' />
                      <ExcelFile.ExcelColumn label='NOMBRE NUEVA' value='nombre_nueva' />
                      <ExcelFile.ExcelColumn label='PRIMER APELLIDO ANTERIOR' value='apellido1_anterior' />
                      <ExcelFile.ExcelColumn label='PRIMER APELLIDO NUEVA' value='apellido2_nueva' />
                      <ExcelFile.ExcelColumn label='SEGUNDO APELLIDO ANTERIOR' value='apellido2_anterior' />
                      <ExcelFile.ExcelColumn label='SEGUNDO APELLIDO NUEVA' value='apellido2_nueva' />
                      <ExcelFile.ExcelColumn label='JORNADA LABORAL ANTERIOR' value='jornada_laboral_anterior' />
                      <ExcelFile.ExcelColumn label='JORNADA LABORAL NUEVA' value='jornada_laboral_nueva' />
                      <ExcelFile.ExcelColumn label='VER OBJETIVOS ANTERIOR' value='ver_objetivos_anterior' />
                      <ExcelFile.ExcelColumn label='VER OBJETIVOS NUEVA' value='ver_objetivos_nueva' />
                      <ExcelFile.ExcelColumn label='PERFILES ANTERIOR' value='perfiles_anterior' />
                      <ExcelFile.ExcelColumn label='PERFILES NUEVA' value='perfiles_nueva' />
                      <ExcelFile.ExcelColumn label='RESPONSABLES ANTERIOR' value='responsables_anterior' />
                      <ExcelFile.ExcelColumn label='RESPONSABLES NUEVA' value='responsables_nueva' />
                      <ExcelFile.ExcelColumn label='VALIDADORES ANTERIOR' value='validadores_anterior' />
                      <ExcelFile.ExcelColumn label='VALIDADORES NUEVA' value='validadores_nueva' />
                      <ExcelFile.ExcelColumn label='ACTIVO ANTERIOR' value='activo_anterior' />
                      <ExcelFile.ExcelColumn label='ACTIVO NUEVA' value='activo_nueva' />
                      <ExcelFile.ExcelColumn label='FECHA DE BAJA ANTERIOR' value='fecha_baja_anterior' />
                      <ExcelFile.ExcelColumn label='FECHA DE BAJA NUEVA' value='fecha_baja_nueva' />
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
        tableName='Histórico de puestos de trabajo'
        FileExtension='Excel'
      />
    )}
    {downloadPdf && (
      <DownloadConfirmModal
        downloadFile={downloadPdf}
        setDownloadFile={setDownloadPdf}
        setFile={setPdf}
        tableName='Hist´rico de puestos de trabajo'
        FileExtension='PDF'
      />
    )}
    </GridContainer>    
  )
}
export default HistoricalTable
