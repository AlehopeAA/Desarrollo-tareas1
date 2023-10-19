import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, Typography, makeStyles } from '@material-ui/core'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'
import styles from '../styles/informeIndividualScreenStyles'
import EvaluacionTable from './CalculosModal/EvaluacionTable'

const useStyles = makeStyles(styles)
const ViewGlobalesModal = ({ viewInfo, closeViewInfoModal, info }) => {
  const ExcelFile = ReactExport.ExcelFile
  const classes = useStyles()
  const dispatch = useDispatch()
  
  const closeCalculoView = () => {
    closeViewInfoModal()
  }

  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a4")
    doc.text('Desempeño global:', 10, 10)
    doc.text(info.nivel_global, 60, 10)
    doc.text('% carga global:', 115, 10)
    doc.text(info.porcentaje_global.toString(), 155, 10)
    doc.autoTable({
      body: info.evaluaciones,
      columns: [
        {
          header: 'MES',
          dataKey: 'mes',
        },
        {
          header: 'AÑO',
          dataKey: 'anio',
        },
        {
          header: 'DESEMPEÑO',
          dataKey: 'nivel_global',
        },
        {
          header: '% CARGA',
          dataKey: 'porcentaje_carga',
        },
      ],
    })
    doc.save('desemp_global_informe_individual.pdf')
  }

  return (
    <>
    <ViewInfoActionModal
      open={viewInfo}
      handleCloseModal={() => closeCalculoView()}
      modalTitle={`Desempeños Globales`}
      anchoPersonalizado='md'
      hideButtonClose={true}
      children={
        <GridContainer>
          <GridItem xs={12} md={6}>
             <div>
                Desempeño del periodo: <span className={info.nivel_global == 'EXCELENTE'? classes.evaluacion_excelente : info.nivel_global == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : info.nivel_global == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{info.nivel_global}</span>
             </div>
          </GridItem>
          <GridItem xs={12} md={6}>
             <div>
                % Carga del periodo: <span className={classes.informacion_evaluacion}>{info.porcentaje_global}</span>
             </div>
          </GridItem>
          <br></br>
          <br></br>
          <GridItem xs={12}>
            <EvaluacionTable
                showFilters={false}
                scrollX={false}
                columns={[
                  {
                    Header: 'MES',
                    accessor: 'mes',
                  },
                  {
                    Header: 'AÑO',
                    accessor: 'anio',
                  },
                  {
                    Header: 'DESEMPEÑO',
                    accessor: 'nivel_global',
                  },
                  {
                    Header: '% CARGA',
                    accessor: 'porcentaje_carga',
                  },
                ]}
                data={info.evaluaciones}
            />
          </GridItem>
          <Button color='primary' onClick={() => setDownloadExcel(true)} style={{ marginLeft: '10px' }}>
            Exportar EXCEL
          </Button>
          <Button color='primary' onClick={() => setDownloadPdf(true)} style={{ marginLeft: '10px' }}>
            Exportar PDF
          </Button>                                         
        </GridContainer>
        
      }
    />
    {excel && (
                        <ExcelFile
                          element={<Button color='primary'>Exportar Excel</Button>}
                          filename='Desemp_global_informe_individual'
                          hideElement={true}
                        >
                          <ExcelFile.ExcelSheet data={info.evaluaciones} name='Desempeño Global Informe Individual'>
                            <ExcelFile.ExcelColumn label='MES' value='mes' />
                            <ExcelFile.ExcelColumn label='AÑO' value='anio' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO GLOBAL' value='nivel_global' />
                            <ExcelFile.ExcelColumn label='% CARGA' value='porcentaje_carga' />
                          </ExcelFile.ExcelSheet>
                        </ExcelFile>
    )}    
    {downloadExcel && (
      <DownloadConfirmModal
        downloadFile={downloadExcel}
        setDownloadFile={setDownloadExcel}
        setFile={setExcel}
        tableName='Desempeño global informe individual'
        FileExtension='Excel'
      />
    )}
    {downloadPdf && (
      <DownloadConfirmModal
        downloadFile={downloadPdf}
        setDownloadFile={setDownloadPdf}
        setFile={setPdf}
        tableName='Desempeño global informe individual'
        FileExtension='PDF'
      />
    )}      
    </>   
  )  
}

export default ViewGlobalesModal
