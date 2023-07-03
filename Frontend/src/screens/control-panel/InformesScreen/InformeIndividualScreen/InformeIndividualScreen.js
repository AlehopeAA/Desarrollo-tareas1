import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Typography } from '@material-ui/core'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import Card from 'components/Card/Card'
import { Tooltip } from '@material-ui/core'
import Button from 'components/CustomButtons/Button'
import CardBody from 'components/Card/CardBody'
import ReactTable from 'components/ReactTable/ReactTable'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import styles from './styles/informeIndividualScreenStyles'
import SelectTrabajadorFilter from './components/SelectTrabajadorFilter'
import ViewGlobalesModal from '../../InformesScreen/InformeIndividualScreen/components/ViewGlobalesModal'
import { getEvaluacionInforme, getResumenInforme } from 'redux/actions/evaluacionActions'
import { EVALUACION_INFO_INFORME_RESET, EVALUACION_RESUMEN_INFORME_RESET } from 'redux/constants/evaluacionConstants'

import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles(styles)
const InformeIndividualScreen = () => {
  const ExcelFile = ReactExport.ExcelFile
  const dispatch = useDispatch()

  const classes = useStyles()
  const initialState = {
    fecha_inicio_seleccionada: new Date(),
    fecha_fin_seleccionada: new Date(),
  }
 
  const [consultaInfo, setConsultaInfo] = useState(initialState)
  const [successInformeConsulta, setSuccessInformeConsulta] = useState(false)
  const [selectTrabajadorId, setselectTrabajadorId] = useState('')
  const [data, setData] = useState([])

  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)

  const {
    successEvaluacionInfoInforme,
    loadingEvaluacionInfoInforme,
    evaluacionInfoInformeData,
    errorEvaluacionInfoInforme,
  } = useSelector((state) => state.evaluacionInfoInforme)

  const {
    successEvaluacionResumenInforme,
    loadingEvaluacionResumenInforme,
    evaluacionResumenInformeData,
    errorEvaluacionResumenInforme,
  } = useSelector((state) => state.evaluacionResumenInforme)

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a3")
    doc.text('Informe individual', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        {
          header: 'TAREA',
          dataKey: 'descripcion_tarea',          
        },
        {
          header: 'FECHA',
          dataKey: 'fecha',
        },
        {
          header: 'HORAS DEDICADAS',
          dataKey: 'horas',
        },
        {
          header: 'DESEMPEÑO UNIDADES',
          dataKey: 'nivel_unidades',
        },
        {
          header: 'DESEMPEÑO TIEMPO',
          dataKey: 'nivel_tiempo',
        },
        {
          header: 'DESEMPEÑO % ENTRADA',
          dataKey: 'nivel_porcentaje_entrada',
        },
        {
          header: 'DESEMPEÑO % JORNADA',
          dataKey: 'nivel_porcentaje_jornada',
        },
      ],
    })
    doc.save('informe_individual.pdf')
  }

  useEffect(() => {
    if (!successInformeConsulta) {
      dispatch({ type: EVALUACION_INFO_INFORME_RESET })
    }
  }, [successInformeConsulta])

  useEffect(() => {
    if (successEvaluacionInfoInforme) {
      const list = evaluacionInfoInformeData.map((team) => {
        return {
          descripcion_tarea: team.descripcion_tarea,
          fecha: `${team.mes} / ${team.anio}`,
          horas: team.horas,
          nivel_unidades: team.nivel_unidades_corregido ? team.nivel_unidades_corregido : team.nivel_unidades,
          nivel_tiempo: team.nivel_tiempo_corregido ? team.nivel_tiempo_corregido : team.nivel_tiempo,
          nivel_porcentaje_entrada: team.nivel_porcentaje_entrada_corregido ? team.nivel_porcentaje_entrada_corregido : team.nivel_porcentaje_entrada,
          nivel_porcentaje_jornada: team.nivel_porcentaje_jornada_corregido ? team.nivel_porcentaje_jornada_corregido : team.nivel_porcentaje_jornada,
        }
      })
      setData(list)
    }
  }, [successEvaluacionInfoInforme])
 
  const handleRealizarConsulta = (e) => {
    e.preventDefault()
    const filter = {
      mes_inicio: consultaInfo.fecha_inicio_seleccionada.getMonth() + 1,
      anyo_inicio: consultaInfo.fecha_inicio_seleccionada.getFullYear(),
      mes_fin: consultaInfo.fecha_fin_seleccionada.getMonth() + 1,
      anyo_fin: consultaInfo.fecha_fin_seleccionada.getFullYear(),
      trabajador_id: selectTrabajadorId,
      es_para_validar: false,
    }
    dispatch(getEvaluacionInforme(filter))
  } 

  const handleLimpiarConsulta = (e) => {
    e.preventDefault()
    setSuccessInformeConsulta(false)
    setConsultaInfo(initialState)
    setselectTrabajadorId('')
    dispatch({ type: EVALUACION_INFO_INFORME_RESET })
  }

  const closeViewGlobalesModal = () => {
    dispatch({ type: EVALUACION_RESUMEN_INFORME_RESET })
  }

  const handleGlobales = (e) => {
    e.preventDefault()
    const filter = {
      mes_inicio: consultaInfo.fecha_inicio_seleccionada.getMonth() + 1,
      anyo_inicio: consultaInfo.fecha_inicio_seleccionada.getFullYear(),
      mes_fin: consultaInfo.fecha_fin_seleccionada.getMonth() + 1,
      anyo_fin: consultaInfo.fecha_fin_seleccionada.getFullYear(),
      trabajador_id: selectTrabajadorId,
    }
    dispatch(getResumenInforme(filter))
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              <form onSubmit={handleRealizarConsulta}>
                <GridContainer>
                  
                  <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                    <GridItem xs={12} md={6}>
                      <KeyboardDatePicker
                        disableToolbar
                        format="MM/yyyy"
                        views={["year", "month"]}
                        margin="normal"
                        id="date-picker-inline"
                        label="Mes y Año inicio *"
                        value={consultaInfo.fecha_inicio_seleccionada}
                        onChange={(e) => setConsultaInfo({ ...consultaInfo, fecha_inicio_seleccionada: e })}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </GridItem>
                  </MuiPickersUtilsProvider>

                  <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                    <GridItem xs={12} md={6}>
                      <KeyboardDatePicker
                        disableToolbar
                        format="MM/yyyy"
                        views={["year", "month"]}
                        margin="normal"
                        id="date-picker-inline"
                        label="Mes y Año fin *"
                        value={consultaInfo.fecha_fin_seleccionada}
                        onChange={(e) => setConsultaInfo({ ...consultaInfo, fecha_fin_seleccionada: e })}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </GridItem>
                  </MuiPickersUtilsProvider>
                    
                  <GridItem xs={12}>
                    <GridContainer>
                      <SelectTrabajadorFilter
                        selectTrabajadorId={selectTrabajadorId}
                        setSelectTrabajadorId={setselectTrabajadorId}
                      />
                    </GridContainer>
                  </GridItem>
                </GridContainer>                
                
                {errorEvaluacionInfoInforme && (
                  <GridContainer>
                    <GridItem xs={12}>
                      <SnackbarContent message={errorEvaluacionInfoInforme} color='danger' />
                    </GridItem>
                  </GridContainer>
                )}
                {errorEvaluacionResumenInforme && (
                  <GridContainer>
                    <GridItem xs={12}>
                      <SnackbarContent message={errorEvaluacionResumenInforme} color='danger' />
                    </GridItem>
                  </GridContainer>
                )}
                {successEvaluacionInfoInforme && (
                  <Button type='submit' color='primary' className={classes.informeResumenButton} onClick={handleGlobales}>
                      {loadingEvaluacionResumenInforme ? 'Mostrando desempeños globales...': 'Desempeños globales'}
                  </Button>
                )}

                <Button type='submit' color='primary' className={classes.informeButton} onClick={handleLimpiarConsulta}>
                  Limpiar
                </Button>
                <Button type='submit' color='primary' className={classes.informeButton}>
                  {loadingEvaluacionInfoInforme ? 'Realizando consulta...' : 'Filtrar'}
                </Button>                
              </form>
            </CardBody>
          </Card>
        </GridItem>
        
        {successEvaluacionInfoInforme? (
          <>          
            <GridItem xs={12} className={classes.rootItem}>
              <Card>
                <CardBody>
                    <GridContainer>
                      <GridItem xs={12}>
                        <ReactTable
                            columns={[
                              {
                                Header: 'TAREA',
                                accessor: 'descripcion_tarea',
                                Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                              },
                              {
                                Header: 'FECHA',
                                accessor: 'fecha',
                              },
                              {
                                Header: 'HORAS DEDICADAS',
                                accessor: 'horas',
                              },
                              {
                                Header: 'DESEMPEÑO UNIDADES',
                                accessor: 'nivel_unidades',
                                Cell: ({ value }) => <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>
                              },
                              {
                                Header: 'DESEMPEÑO TIEMPO',
                                accessor: 'nivel_tiempo',
                                Cell: ({ value }) => <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>
                              },
                              {
                                Header: 'DESEMPEÑO % ENTRADA',
                                accessor: 'nivel_porcentaje_entrada',
                                Cell: ({ value }) => <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>
                              },
                              {
                                Header: 'DESEMPEÑO % JORNADA',
                                accessor: 'nivel_porcentaje_jornada',
                                Cell: ({ value }) => <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>
                              },
                            ]}
                            data={data}
                            numFilas={100}
                        />
                      </GridItem>
                    </GridContainer>
                    <Button color='primary' onClick={() => setDownloadExcel(true)} style={{ marginLeft: '10px' }}>
                       Exportar EXCEL
                    </Button>
                    <Button color='primary' onClick={() => setDownloadPdf(true)} style={{ marginLeft: '10px' }}>
                       Exportar PDF
                    </Button>
                </CardBody>
              </Card>
            </GridItem>
          </>
        ) : (
          <></>
        )}        

      </GridContainer>
      {excel && (
                        <ExcelFile
                          element={<Button color='primary'>Exportar Excel</Button>}
                          filename='informeIndividual'
                          hideElement={true}
                        >
                          <ExcelFile.ExcelSheet data={data} name='Informe Individual'>
                            <ExcelFile.ExcelColumn label='TAREA' value='descripcion_tarea' />
                            <ExcelFile.ExcelColumn label='FECHA' value='fecha' />
                            <ExcelFile.ExcelColumn label='HORAS DEDICADAS' value='horas' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO UNIDADES' value='nivel_unidades' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO TIEMPO' value='nivel_tiempo' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO % ENTRADA' value='nivel_porcentaje_entrada' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO % JORNADA' value='nivel_porcentaje_jornada' />
                          </ExcelFile.ExcelSheet>
                        </ExcelFile>
                      )}
      {successEvaluacionResumenInforme && (
        <ViewGlobalesModal
          viewInfo={successEvaluacionResumenInforme}
          closeViewInfoModal={closeViewGlobalesModal}
          info={evaluacionResumenInformeData}
        />
      )}
      {downloadExcel && (
        <DownloadConfirmModal
          downloadFile={downloadExcel}
          setDownloadFile={setDownloadExcel}
          setFile={setExcel}
          tableName='Informe individual'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Informe individual'
          FileExtension='PDF'
        />
      )}

    </>
  )
}

export default InformeIndividualScreen
