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

const ObjectivesTable = ({ data, label }) => {
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
    { Header: 'Dificultad', accessor: 'dificultad' },
    { Header: 'Compartida', accessor: 'compartida' },
    { Header: 'Uds. mín/med/max', accessor: 'fullUnidades' },
    { Header: 'M. Temp', accessor: 'magnitud_temporal' },
    { Header: '% E. mín/med/max', accessor: 'fullEntrada' },
    { Header: 'T. mín/med/max', accessor: 'fullTiempo' },
    { Header: '% J. mín/med/max', accessor: 'fullJornada' },
    {
      Header: 'Acciones',
      accessor: 'actions',
    },
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
    const doc = new jsPDF("p", "mm", "a3")
    doc.text('Objetivos de tareas', 20, 10)
    if (label == 'Ord/Ext') {
      doc.autoTable({
        body: data,
        columns: [
          { 
            header: 'DESCRIPCION', 
            dataKey: 'descripcion_tarea',
          },
          { 
            header: 'PERFILES', 
            dataKey: 'codigo_perfil', 
          },
          { 
            header: 'DIFICULTAD', 
            dataKey: 'dificultad',
          },
          {
            header: 'UD. MINIMO',
            dataKey: 'unidades_minimo',
          },
          {
            header: 'UD. MEDIO',
            dataKey: 'unidades_medio',
          },
          {
            header: 'UD. MAXIMO',
            dataKey: 'unidades_maximo',
          },
          {
            header: '% ENTRADA MINIMO',
            dataKey: 'porcentaje_entrada_minimo',
          },
          {
            header: '% ENTRADA MEDIO',
            dataKey: 'porcentaje_entrada_medio',
          },
          {
            header: '% ENTRADA MAXIMO',
            dataKey: 'porcentaje_entrada_maximo',
          },
          {
            header: 'TIEMPO MINIMO',
            dataKey: 'tiempo_minimo',
          },
          {
            header: 'TIEMPO MEDIO',
            dataKey: 'tiempo_medio',
          },
          {
            header: 'TIEMPO MAXIMO',
            dataKey: 'tiempo_maximo',
          },
          {
            header: '% JORNADA MINIMO',
            dataKey: 'porcentaje_jornada_minimo',
          },
          {
            header: '% JORNADA MEDIO',
            dataKey: 'porcentaje_jornada_medio',
          },
          {
            header: '% JORNADA MAXIMO',
            dataKey: 'porcentaje_jornada_maximo',
          },
          {
            header: 'MAG. TEMPORAL',
            dataKey: 'magnitud_temporal',
          },
        ],
      })
    } else if (label == 'Específicos') {
     doc.autoTable({
       body: data,
       columns: [
        { 
          header: 'DESCRIPCION', 
          dataKey: 'descripcion_tarea',
        },
        { 
          header: 'PUESTO', 
          dataKey: 'fullname', 
        },
        { 
          header: 'DIFICULTAD', 
          dataKey: 'dificultad',
        },
        {
          header: 'UD. MINIMO',
          dataKey: 'unidades_minimo',
        },
        {
          header: 'UD. MEDIO',
          dataKey: 'unidades_medio',
        },
        {
          header: 'UD. MAXIMO',
          dataKey: 'unidades_maximo',
        },
        {
          header: '% ENTRADA MINIMO',
          dataKey: 'porcentaje_entrada_minimo',
        },
        {
          header: '% ENTRADA MEDIO',
          dataKey: 'porcentaje_entrada_medio',
        },
        {
          header: '% ENTRADA MAXIMO',
          dataKey: 'porcentaje_entrada_maximo',
        },
        {
          header: 'TIEMPO MINIMO',
          dataKey: 'tiempo_minimo',
        },
        {
          header: 'TIEMPO MEDIO',
          dataKey: 'tiempo_medio',
        },
        {
          header: 'TIEMPO MAXIMO',
          dataKey: 'tiempo_maximo',
        },
        {
          header: '% JORNADA MINIMO',
          dataKey: 'porcentaje_jornada_minimo',
        },
        {
          header: '% JORNADA MEDIO',
          dataKey: 'porcentaje_jornada_medio',
        },
        {
          header: '% JORNADA MAXIMO',
          dataKey: 'porcentaje_jornada_maximo',
        },
        {
          header: 'MAG. TEMPORAL',
          dataKey: 'magnitud_temporal',
        },
      ],
     })
    } else {
      doc.autoTable({
        body: data,
        columns: [
          { 
            header: 'DESCRIPCION', 
            dataKey: 'descripcion_tarea',
          },
          { 
            header: 'DIFICULTAD', 
            dataKey: 'dificultad',
          },
          {
            header: 'UD. MINIMO',
            dataKey: 'unidades_minimo',
          },
          {
            header: 'UD. MEDIO',
            dataKey: 'unidades_medio',
          },
          {
            header: 'UD. MAXIMO',
            dataKey: 'unidades_maximo',
          },
          {
            header: '% ENTRADA MINIMO',
            dataKey: 'porcentaje_entrada_minimo',
          },
          {
            header: '% ENTRADA MEDIO',
            dataKey: 'porcentaje_entrada_medio',
          },
          {
            header: '% ENTRADA MAXIMO',
            dataKey: 'porcentaje_entrada_maximo',
          },
          {
            header: 'TIEMPO MINIMO',
            dataKey: 'tiempo_minimo',
          },
          {
            header: 'TIEMPO MEDIO',
            dataKey: 'tiempo_medio',
          },
          {
            header: 'TIEMPO MAXIMO',
            dataKey: 'tiempo_maximo',
          },
          {
            header: '% JORNADA MINIMO',
            dataKey: 'porcentaje_jornada_minimo',
          },
          {
            header: '% JORNADA MEDIO',
            dataKey: 'porcentaje_jornada_medio',
          },
          {
            header: '% JORNADA MAXIMO',
            dataKey: 'porcentaje_jornada_maximo',
          },
          {
            header: 'MAG. TEMPORAL',
            dataKey: 'magnitud_temporal',
          },
        ],
      })
    }
    doc.save('objetivos.pdf')
  }

  return (
    <GridContainer>
      <GridItem xs={12}>
        <h3>Objetivos {label}</h3>
        <Card>
          <CardHeader color='primary' icon>
            <CardIcon color='primary'>
              <Assignment />
            </CardIcon>
          </CardHeader>
          <CardBody>
            {!!data.length ? <ReactTable columns={columns} data={data} /> : <h3>No hay objetivos para mostrar</h3>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                {excel && (
                  <ExcelFile
                    element={<Button color='primary'>Exportar Excel</Button>}
                    filename='objetivos'
                    hideElement={true}
                  >
                    <ExcelFile.ExcelSheet data={data} name='Objetivos'>
                      <ExcelFile.ExcelColumn label='DESCRIPCION' value='descripcion_tarea' />
                        <ExcelFile.ExcelColumn label='PERFILES' value='codigo_perfil' />
                        <ExcelFile.ExcelColumn label='PUESTO' value='fullname' />
                      <ExcelFile.ExcelColumn label='DIFICULTAD' value='dificultad' />
                      <ExcelFile.ExcelColumn label='UD. MINIMO' value='unidades_minimo' />
                      <ExcelFile.ExcelColumn label='UD. MEDIO' value='unidades_medio' />
                      <ExcelFile.ExcelColumn label='UD. MAXIMO' value='unidades_maximo' />
                      <ExcelFile.ExcelColumn label='% ENTRADA MINIMO' value='porcentaje_entrada_minimo' />
                      <ExcelFile.ExcelColumn label='% ENTRADA MEDIO' value='porcentaje_entrada_medio' />
                      <ExcelFile.ExcelColumn label='% ENTRADA MAXIMO' value='porcentaje_entrada_maximo' />
                      <ExcelFile.ExcelColumn label='TIEMPO MINIMO' value='tiempo_minimo' />
                      <ExcelFile.ExcelColumn label='TIEMPO MEDIO' value='tiempo_medio' />
                      <ExcelFile.ExcelColumn label='TIEMPO MAXIMO' value='tiempo_maximo' />
                      <ExcelFile.ExcelColumn label='% JORNADA MINIMO' value='porcentaje_jornada_minimo' />
                      <ExcelFile.ExcelColumn label='% JORNADA MEDIO' value='porcentaje_jornada_medio' />
                      <ExcelFile.ExcelColumn label='% JORNADA MAXIMO' value='porcentaje_jornada_maximo' />
                      <ExcelFile.ExcelColumn label='MAG. TEMPORAL' value='magnitud_temporal' />
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
        tableName='Objetivos'
        FileExtension='Excel'
      />
    )}
    {downloadPdf && (
      <DownloadConfirmModal
        downloadFile={downloadPdf}
        setDownloadFile={setDownloadPdf}
        setFile={setPdf}
        tableName='Objetivos'
        FileExtension='PDF'
      />
    )}
    </GridContainer>    
  )
}
export default ObjectivesTable
