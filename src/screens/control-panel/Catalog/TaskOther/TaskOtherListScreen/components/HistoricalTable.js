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

const HistoricalTable = ({ data, label }) => {
    const ExcelFile = ReactExport.ExcelFile
    const [downloadExcel, setDownloadExcel] = useState(false)
    const [downloadPdf, setDownloadPdf] = useState(false)
    const [excel, setExcel] = useState(false)
    const [pdf, setPdf] = useState(false)
    const [columns, setColumns] = useState([      
      { Header: 'Fecha Mod.', accessor: 'fecha_modificacion', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
      { Header: 'Modificador', accessor: 'fullModificador', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
      { Header: 'Tarea Ant.', accessor: 'descripcion_anterior', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
      { Header: 'Tarea Nue.', accessor: 'descripcion_nueva', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
      { Header: 'Tipo Ant.', accessor: 'tipo_tarea_anterior' },
      { Header: 'Tipo Nue.', accessor: 'tipo_tarea_nueva' },
      { Header: 'Ind. Ant.', accessor: 'indicador_anterior' },
      { Header: 'Ind. Nue.', accessor: 'indicador_nueva' },
      { Header: 'Cuant. Ant.', accessor: 'cuantificable_anterior' },
      { Header: 'Cuant. Nue', accessor: 'cuantificable_nueva' },
      { Header: 'Ent. Ant.', accessor: 'entrada_anterior' },
      { Header: 'Ent. Nue.', accessor: 'entrada_nueva' },
      { Header: 'Comp. Ant.', accessor: 'compartida_anterior' },
      { Header: 'Comp. Nue.', accessor: 'compartida_nueva' },
      { Header: 'Dif. Ant.', accessor: 'dificultad_anterior' },
      { Header: 'Dif. Nue.', accessor: 'dificultad_nueva' },
      { Header: 'Acum. Ant.', accessor: 'acumulativa_anterior' },
      { Header: 'Acum. Nue.', accessor: 'acumulativa_nueva' },
      { Header: 'Traz. Ant.', accessor: 'codigo_trazabilidad_anterior' },
      { Header: 'Traz. Nue.', accessor: 'codigo_trazabilidad_nueva' },
      { Header: 'Activo Ant.', accessor: 'activo_anterior' },
      { Header: 'Activo Nue.', accessor: 'activo_nueva' },
      { Header: 'Baja Ant.', accessor: 'fecha_baja_anterior' },
      { Header: 'Baja Nue.', accessor: 'fecha_baja_nueva' },
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
      const doc = new jsPDF("p", "mm", "a1")
      doc.text('Histórico de tarea', 20, 10)
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
            header: 'FECHA MODIFICACIÓN', 
            dataKey: 'fecha_modificacion' 
          },
          { 
            header: 'MODIFICADOR', 
            dataKey: 'fullModificador' 
          },
          { 
            header: 'DESCRIPCION ANTERIOR', 
            dataKey: 'descripcion_anterior' 
          },
          { 
            header: 'DESCRIPCION NUEVA', 
            dataKey: 'descripcion_nueva' 
          },
          { 
            header: 'TIPO ANTERIOR', 
            dataKey: 'tipo_tarea_anterior' 
          },
          { 
            header: 'TIPO NUEVA', 
            dataKey: 'tipo_tarea_nueva' 
          },          
          {
            header: 'INDICADOR ANTERIOR',
            dataKey: 'indicador_anterior',
          },
          {
            header: 'INDICADOR NUEVA',
            dataKey: 'indicador_nueva',
          },
          {
            header: 'CUANTIFICABLE ANTERIOR',
            dataKey: 'cuantificable_anterior',
          },
          {
            header: 'CUANTIFICABLE NUEVA',
            dataKey: 'cuantificable_nueva',
          },
          {
            header: 'ENTRADA ANTERIOR',
            dataKey: 'entrada_anterior',
          },
          {
            header: 'ENTRADA NUEVA',
            dataKey: 'entrada_nueva',
          },
          {
            header: 'COMPARTIDA ANTERIOR',
            dataKey: 'compartida_anterior',
          },
          {
            header: 'COMPARTIDA NUEVA',
            dataKey: 'compartida_nueva',
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
            header: 'ACUMULATIVA ANTERIOR',
            dataKey: 'acumulativa_anterior',
          },
          {
            header: 'ACUMULATIVA NUEVA',
            dataKey: 'acumulativa_nueva',
          },
          {
            header: 'CODIGO TRAZABILIDAD ANTERIOR',
            dataKey: 'codigo_trazabilidad_anterior',
          },
          {
            header: 'CODIGO TRAZABILIDAD NUEVA',
            dataKey: 'codigo_trazabilidad_nueva',
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
            header: 'FECHA BAJA ANTERIOR',
            dataKey: 'fecha_baja_anterior',
          },
          {
            header: 'FECHA BAJA NUEVA',
            dataKey: 'fecha_baja_nueva',
          },
        ],
      })
      doc.save('HistoricoTarea.pdf')
    }
  
    return (
      <GridContainer>
        <GridItem xs={12}>
          <h3>Histórico de tarea {label}</h3>
          <Card>
            <CardHeader color='primary' icon>
              <CardIcon color='primary'>
                <Assignment />
              </CardIcon>
            </CardHeader>
            <CardBody>
              {!!data.length ? <ReactTable columns={columns} data={data} /> : <h3>No hay histórico de tarea para mostrar</h3>}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  {excel && (
                    <ExcelFile
                      element={<Button color='primary'>Exportar Excel</Button>}
                      filename='HistoricoTarea'
                      hideElement={true}
                    >
                      <ExcelFile.ExcelSheet data={data} name='HistoricoTarea'>
                        <ExcelFile.ExcelColumn label='PERFILES' value={(codigos) => codigos.codigo_perfil && codigos.codigo_perfil.length > 0 ? codigos.codigo_perfil.join(', '): '-'} />
                        <ExcelFile.ExcelColumn label='PUESTO' value='fullname' />                        
                        <ExcelFile.ExcelColumn label='FECHA MODIFICACIÓN' value='fecha_modificacion' />
                        <ExcelFile.ExcelColumn label='MODIFICADOR' value='fullModificador' />
                        <ExcelFile.ExcelColumn label='DESCRIPCION ANTERIOR' value='descripcion_anterior' />
                        <ExcelFile.ExcelColumn label='DESCRIPCION NUEVA' value='descripcion_nueva' />
                        <ExcelFile.ExcelColumn label='TIPO TAREA ANTERIOR' value='tipo_tarea_anterior' />
                        <ExcelFile.ExcelColumn label='TIPO TAREA NUEVA' value='tipo_tarea_nueva' />
                        <ExcelFile.ExcelColumn label='INDICADOR ANTERIOR' value='indicador_anterior' />
                        <ExcelFile.ExcelColumn label='INDICADOR NUEVA' value='indicador_nueva' />
                        <ExcelFile.ExcelColumn label='CUANTIFICABLE ANTERIOR' value='cuantificable_anterior' />
                        <ExcelFile.ExcelColumn label='CUANTIFICABLE NUEVA' value='cuantificable_nueva' />
                        <ExcelFile.ExcelColumn label='ENTRADA ANTERIOR' value='entrada_anterior' />
                        <ExcelFile.ExcelColumn label='ENTRADA NUEVA' value='entrada_nueva' />
                        <ExcelFile.ExcelColumn label='COMPARTIDA ANTERIOR' value='compartida_anterior' />
                        <ExcelFile.ExcelColumn label='COMPARTIDA NUEVA' value='compartida_nueva' />
                        <ExcelFile.ExcelColumn label='DIFICULTAD ANTERIOR' value='dificultad_anterior' />
                        <ExcelFile.ExcelColumn label='DIFICULTAD NUEVA' value='dificultad_nueva' />
                        <ExcelFile.ExcelColumn label='CODIGO TRAZABILIDAD ANTERIOR' value='codigo_trazabilidad_anterior' />
                        <ExcelFile.ExcelColumn label='CODIGO TRAZABILIDAD NUEVA' value='codigo_trazabilidad_nueva' />
                        <ExcelFile.ExcelColumn label='ACTIVO ANTERIOR' value='activo_anterior' />
                        <ExcelFile.ExcelColumn label='ACTIVO NUEVA' value='activo_nueva' />
                        <ExcelFile.ExcelColumn label='FECHA BAJA ANTERIOR' value='fecha_baja_anterior' />
                        <ExcelFile.ExcelColumn label='FECHA BAJA NUEVA' value='fecha_baja_nueva' />
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
          tableName='Histórico de tarea'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Hist´rico de tarea'
          FileExtension='PDF'
        />
      )}
      </GridContainer>    
    )
  }
export default HistoricalTable
