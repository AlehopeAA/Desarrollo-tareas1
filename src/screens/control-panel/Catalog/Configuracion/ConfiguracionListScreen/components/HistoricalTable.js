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
      { Header: 'Parámetro Ant.', accessor: 'parametro_anterior' },
      { Header: 'Parámetro Nue.', accessor: 'parametro_nueva' },
      { Header: 'Valor Ant.', accessor: 'valor_anterior' },
      { Header: 'Valor Nue.', accessor: 'valor_nueva' },
      { Header: 'Desc Ant.', accessor: 'descripcion_anterior', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
      { Header: 'Desc. Nue.', accessor: 'descripcion_nueva', Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip> },
    ])
  
    useEffect(() => {
      if (pdf) {
        exportPDF()
      }
    }, [pdf])
  
    const exportPDF = () => {
      const doc = new jsPDF("p", "mm", "a4")
      doc.text('Histórico de configuraciones', 20, 10)
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
            header: 'PARÁMETRO ANTERIOR', 
            dataKey: 'parametro_anterior' 
          },
          { 
            header: 'PARÁMETRO NUEVA', 
            dataKey: 'parametro_nueva' 
          },          
          {
            header: 'VALOR ANTERIOR',
            dataKey: 'valor_anterior',
          },
          {
            header: 'VALOR NUEVA',
            dataKey: 'valor_nueva',
          },
          { 
            header: 'DESCRIPCION ANTERIOR', 
            dataKey: 'descripcion_anterior' 
          },
          { 
            header: 'DESCRIPCION NUEVA', 
            dataKey: 'descripcion_nueva' 
          },
        ],
      })
      doc.save('HistoricoConfiguraciones.pdf')
    }
  
    return (
      <GridContainer>
        <GridItem xs={12}>
          <h3>Histórico de configuración</h3>
          <Card>
            <CardHeader color='primary' icon>
              <CardIcon color='primary'>
                <Assignment />
              </CardIcon>
            </CardHeader>
            <CardBody>
              {!!data.length ? <ReactTable columns={columns} data={data} /> : <h3>No hay histórico de configuración para mostrar</h3>}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  {excel && (
                    <ExcelFile
                      element={<Button color='primary'>Exportar Excel</Button>}
                      filename='HistoricoConfiguracion'
                      hideElement={true}
                    >
                      <ExcelFile.ExcelSheet data={data} name='HistoricoConfiguracion'>
                        <ExcelFile.ExcelColumn label='FECHA MODIFICACIÓN' value='fecha_modificacion' />
                        <ExcelFile.ExcelColumn label='MODIFICADOR' value='fullModificador' />
                        <ExcelFile.ExcelColumn label='PARÁMETRO ANTERIOR' value='parametro_anterior' />
                        <ExcelFile.ExcelColumn label='PARÁMETRO NUEVA' value='parametro_nueva' />
                        <ExcelFile.ExcelColumn label='VALOR ANTERIOR' value='valor_anterior' />
                        <ExcelFile.ExcelColumn label='VALOR NUEVA' value='valor_nueva' />
                        <ExcelFile.ExcelColumn label='DESCRIPCION ANTERIOR' value='descripcion_anterior' />
                        <ExcelFile.ExcelColumn label='DESCRIPCION NUEVA' value='descripcion_nueva' />
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
          tableName='Histórico de configuración'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Hist´rico de configuración'
          FileExtension='PDF'
        />
      )}
      </GridContainer>    
    )
  }
export default HistoricalTable
