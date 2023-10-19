import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import { Checkbox, Tooltip, FormControl, FormControlLabel, InputLabel, ListItemText, makeStyles, MenuItem, Select as Selectable, } from '@material-ui/core'
import Card from 'components/Card/Card'
import Button from 'components/CustomButtons/Button'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ReactTable from 'components/ReactTable/ReactTable'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import IndicadoresMultiSelect from './components/IndicadoresMultiSelect'
import ModalidadesMultiSelect from './components/ModalidadesMultiSelect'
import NivelesMultiSelect from './components/NivelesMultiSelect'
import ProfileMultiSelect from './components/ProfileMultiSelect'
import PuestosMultiSelect from './components/PuestosMultiSelect'
import TareasMultiSelect from './components/TareasMultiSelect'
import { getAgregado } from 'redux/actions/evaluacionActions'
import { EVALUACION_AGREGADO_RESET } from 'redux/constants/evaluacionConstants'
import styles from './styles/informeAgregadoScreenStyles'

const useStyles = makeStyles(styles)

const InformeAgregadoScreen = () => {
  const ExcelFile = ReactExport.ExcelFile
  const dispatch = useDispatch()
  const classes = useStyles()

  const initialState = {
    fecha_desde_seleccionada: new Date(),
    fecha_hasta_seleccionada: new Date(),
    
    indicadores_seleccionados: [],
    niveles_seleccionados: [],
    perfiles_seleccionados: [],
    modalidades_seleccionados: [],
    puestos_seleccionados: [],
    tareas_seleccionados: [],
      
    indicadores: '',
    compartida: '',
    cuantificable: '',
    dificultad: '',
    entrada: '',
    acumulativa: ''
  }

  const valores_flag = ['SI', 'NO']
  const [consultaInfo, setConsultaInfo] = useState(initialState)
  const [successInformeConsulta, setSuccessInformeConsulta] = useState(false)
  
  const {
    successEvaluacionAgregado,
    loadingEvaluacionAgregado,
    evaluacionAgregadoData,
    errorEvaluacionAgregado,
  } = useSelector((state) => state.evaluacionAgregado)

  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)


  useEffect(() => {
    if (!successInformeConsulta) {
      dispatch({ type: EVALUACION_AGREGADO_RESET })
    }
  }, [successInformeConsulta])
 
  const handleRealizarConsulta = (e) => {
    e.preventDefault()
    
    const filter = {
      mes_desde: consultaInfo.fecha_desde_seleccionada.getMonth() + 1,
      anyo_desde: consultaInfo.fecha_desde_seleccionada.getFullYear(),
      mes_hasta: consultaInfo.fecha_hasta_seleccionada.getMonth() + 1,
      anyo_hasta: consultaInfo.fecha_hasta_seleccionada.getFullYear(),
      
      indicadores_seleccionados: consultaInfo.indicadores_seleccionados,
      niveles_seleccionados: [],
      perfiles_seleccionados: [],
      modalidades_seleccionados: [],
      puestos_seleccionados: [],
      tareas_seleccionados: [],
        
      indicadores: consultaInfo.indicadores,
      compartida: consultaInfo.compartida,
      cuantificable: consultaInfo.cuantificable,
      dificultad: consultaInfo.dificultad,
      entrada: consultaInfo.entrada,
      acumulativa: consultaInfo.acumulativa,
    }

    consultaInfo.perfiles_seleccionados.map((perfil) => filter.perfiles_seleccionados.push(perfil.id_perfil))
    consultaInfo.modalidades_seleccionados.map((modalidad) => filter.modalidades_seleccionados.push(`'${modalidad}'`))
    consultaInfo.puestos_seleccionados.map((puesto) => filter.puestos_seleccionados.push(puesto.id_puesto))
    consultaInfo.tareas_seleccionados.map((tarea) => filter.tareas_seleccionados.push(tarea.id_tarea))
    consultaInfo.niveles_seleccionados.map((nivel) => filter.niveles_seleccionados.push(`'${nivel}'`))

    dispatch(getAgregado(filter))
  } 

  const handleLimpiarConsulta = (e) => {
    e.preventDefault()
    setSuccessInformeConsulta(false)
    setConsultaInfo(initialState)
    dispatch({ type: EVALUACION_AGREGADO_RESET })
  }
  
  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Informe Agregado', 20, 10)
    doc.autoTable({
      body: evaluacionAgregadoData,
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
          header: 'Nº PUESTOS',
          dataKey: 'numero_puestos',
        },
        {
          header: 'TOTAL HORAS',
          dataKey: 'horas_totales',
        },
        {
          header: 'MEDIA HORAS',
          dataKey: 'horas_media',
        },
        {
          header: 'TOTAL UNIDADES',
          dataKey: 'unidades_totales',
        },
        {
          header: 'MEDIA UNIDADES',
          dataKey: 'unidades_media',
        },
        {
          header: 'INSATISFACTORIO',
          dataKey: 'numero_insatisfactorios',
        },
        {
          header: 'SATISFACTORIO',
          dataKey: 'numero_satisfactorios',
        },
        {
          header: 'ALTO',
          dataKey: 'numero_altos',
        },
        {
          header: 'EXCELENTE',
          dataKey: 'numero_excelentes',
        },       
      ],
    })
    doc.save('informeAgregado.pdf')
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              <form onSubmit={handleRealizarConsulta}>
                <GridContainer>
                  <GridItem xs={12} md={6}>
                    <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        format="MM/yyyy"
                        views={["year", "month"]}
                        margin="normal"
                        id="date-picker-inline"
                        label="Mes y Año Desde *"
                        value={consultaInfo.fecha_desde_seleccionada}
                        onChange={(e) => setConsultaInfo({ ...consultaInfo, fecha_desde_seleccionada: e })}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                        style={{width:"100%"}}
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>
                  <GridItem xs={12} md={6}>
                    <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        format="MM/yyyy"
                        views={["year", "month"]}
                        margin="normal"
                        id="date-picker-inline"
                        label="Mes y Año Hasta *"
                        value={consultaInfo.fecha_hasta_seleccionada}
                        onChange={(e) => setConsultaInfo({ ...consultaInfo, fecha_hasta_seleccionada: e })}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                        style={{width:"100%"}}
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>


                  <GridItem xs={12} md={126}>
                    <PuestosMultiSelect puestosData={consultaInfo.puestos_seleccionados} setPuestosData={(e) => setConsultaInfo({ ...consultaInfo, puestos_seleccionados: e })} />        
                  </GridItem>
                  <GridItem xs={12} md={6}>
                    <ProfileMultiSelect profilesData={consultaInfo.perfiles_seleccionados} setProfilesData={(e) => setConsultaInfo({ ...consultaInfo, perfiles_seleccionados: e })} />        
                  </GridItem>
                  <GridItem xs={12} md={6}>
                    <ModalidadesMultiSelect modalidadesData={consultaInfo.modalidades_seleccionados} setModalidadesData={(e) => setConsultaInfo({ ...consultaInfo, modalidades_seleccionados: e })} />        
                  </GridItem>
                  
                  <GridItem xs={12} md={12}>
                    <TareasMultiSelect tareasData={consultaInfo.tareas_seleccionados} setTareasData={(e) => setConsultaInfo({ ...consultaInfo, tareas_seleccionados: e })} />        
                  </GridItem>
                  <GridItem xs={12} md={6}>
                    <IndicadoresMultiSelect indicadoresData={consultaInfo.indicadores_seleccionados} setIndicadoresData={(e) => setConsultaInfo({ ...consultaInfo, indicadores_seleccionados: e })} />        
                  </GridItem>

                  
                  <GridItem xs={12} md={6}>
                    <NivelesMultiSelect nivelesData={consultaInfo.niveles_seleccionados} setNivelesData={(e) => setConsultaInfo({ ...consultaInfo, niveles_seleccionados: e })} />        
                  </GridItem>
                  

                  <GridItem xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='select-indicadores'>Indicadores</InputLabel>
                      <Selectable
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        className={classes.select}
                        value={consultaInfo.indicadores}
                        onChange={(e) => setConsultaInfo({ ...consultaInfo, indicadores: e.target.value })}
                        inputProps={{
                          name: 'select-indicadores',
                          id: 'select-indicadores',
                          required: false,
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Selecciona uno
                        </MenuItem>
                        {valores_flag.map((valor, index) => (
                          <MenuItem
                            value={valor}
                            key={index}
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected}}
                          >
                            {`${valor}`}
                          </MenuItem>
                        ))}
                      </Selectable>
                    </FormControl>
                  </GridItem>        

                  <GridItem xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='select-compartida'>Compartida</InputLabel>
                      <Selectable
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        className={classes.select}
                        value={consultaInfo.compartida}
                        onChange={(e) => setConsultaInfo({ ...consultaInfo, compartida: e.target.value })}
                        inputProps={{
                          name: 'select-compartida',
                          id: 'select-compartida',
                          required: false,
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Selecciona uno
                        </MenuItem>
                        {valores_flag.map((valor, index) => (
                          <MenuItem
                            value={valor}
                            key={index}
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected}}
                          >
                            {`${valor}`}
                          </MenuItem>
                        ))}
                      </Selectable>
                    </FormControl>
                  </GridItem>
                  
                  <GridItem xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='select-cuantificable'>Cuantificable</InputLabel>
                      <Selectable
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        className={classes.select}
                        value={consultaInfo.cuantificable}
                        onChange={(e) => setConsultaInfo({ ...consultaInfo, cuantificable: e.target.value })}
                        inputProps={{
                          name: 'select-cuantificable',
                          id: 'select-cuantificable',
                          required: false,
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Selecciona uno
                        </MenuItem>
                        {valores_flag.map((valor, index) => (
                          <MenuItem
                            value={valor}
                            key={index}
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected}}
                          >
                            {`${valor}`}
                          </MenuItem>
                        ))}
                      </Selectable>
                    </FormControl>
                  </GridItem>
                  
                  <GridItem xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='select-dificultad'>Dificultad</InputLabel>
                      <Selectable
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        className={classes.select}
                        value={consultaInfo.dificultad}
                        onChange={(e) => setConsultaInfo({ ...consultaInfo, dificultad: e.target.value })}
                        inputProps={{
                          name: 'select-dificultad',
                          id: 'select-dificultad',
                          required: false,
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Selecciona uno
                        </MenuItem>
                        {valores_flag.map((valor, index) => (
                          <MenuItem
                            value={valor}
                            key={index}
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected}}
                          >
                            {`${valor}`}
                          </MenuItem>
                        ))}
                      </Selectable>
                    </FormControl>
                  </GridItem>            

                  <GridItem xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='select-entrada'>Entrada</InputLabel>
                      <Selectable
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        className={classes.select}
                        value={consultaInfo.entrada}
                        onChange={(e) => setConsultaInfo({ ...consultaInfo, entrada: e.target.value })}
                        inputProps={{
                          name: 'select-entrada',
                          id: 'select-entrada',
                          required: false,
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Selecciona uno
                        </MenuItem>
                        {valores_flag.map((valor, index) => (
                          <MenuItem
                            value={valor}
                            key={index}
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected}}
                          >
                            {`${valor}`}
                          </MenuItem>
                        ))}
                      </Selectable>
                    </FormControl>
                  </GridItem>
                  
                  <GridItem xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='select-acumulativa'>Acumulativa</InputLabel>
                      <Selectable
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        className={classes.select}
                        value={consultaInfo.acumulativa}
                        onChange={(e) => setConsultaInfo({ ...consultaInfo, acumulativa: e.target.value })}
                        inputProps={{
                          name: 'select-acumulativa',
                          id: 'select-acumulativa',
                          required: false,
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Selecciona uno
                        </MenuItem>
                        {valores_flag.map((valor, index) => (
                          <MenuItem
                            value={valor}
                            key={index}
                            classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected}}
                          >
                            {`${valor}`}
                          </MenuItem>
                        ))}
                      </Selectable>
                    </FormControl>
                  </GridItem>
                  

                </GridContainer>
              
              
                {errorEvaluacionAgregado && (
                  <GridContainer>
                    <GridItem xs={12}>
                      <SnackbarContent message={errorEvaluacionAgregado} color='danger' />
                    </GridItem>
                  </GridContainer>
                )}

                <Button type='submit' color='primary' className={classes.informeButton} onClick={handleLimpiarConsulta}>
                  Limpiar
                </Button>
                <Button type='submit' color='primary' className={classes.informeButton}>
                  {loadingEvaluacionAgregado ? 'Realizando consulta...' : 'Filtrar'}
                </Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>


        {successEvaluacionAgregado ? (
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
                                Header: 'Nº PUESTOS',
                                accessor: 'numero_puestos',
                              },
                              {
                                Header: 'TOTAL HORAS',
                                accessor: 'horas_totales',
                              },
                              {
                                Header: 'MEDIA HORAS',
                                accessor: 'horas_media',
                              },
                              {
                                Header: 'TOTAL UNIDADES',
                                accessor: 'unidades_totales',
                              },
                              {
                                Header: 'MEDIA UNIDADES',
                                accessor: 'unidades_media',
                              },
                              {
                                Header: 'INSATISFACTORIO',
                                accessor: 'numero_insatisfactorios',
                              },
                              {
                                Header: 'SATISFACTORIO',
                                accessor: 'numero_satisfactorios',
                              },
                              {
                                Header: 'ALTO',
                                accessor: 'numero_altos',
                              },
                              {
                                Header: 'EXCELENTE',
                                accessor: 'numero_excelentes',
                              },
                            ]}
                            data={evaluacionAgregadoData}
                        />
                      </GridItem>
                    </GridContainer>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                      {excel && (
                        <ExcelFile
                          element={<Button color='primary'>Exportar Excel</Button>}
                          filename='informeAgregado'
                          hideElement={true}
                        >
                          <ExcelFile.ExcelSheet data={evaluacionAgregadoData} name='Informe Agregado'>
                            <ExcelFile.ExcelColumn label='TAREA' value='descripcion_tarea' />
                            <ExcelFile.ExcelColumn label='FECHA' value='fecha' />
                            <ExcelFile.ExcelColumn label='Nº PUESTOS' value='numero_puestos' />
                            <ExcelFile.ExcelColumn label='TOTAL HORAS' value='horas_totales' />
                            <ExcelFile.ExcelColumn label='MEDIA HORAS' value='horas_media' />
                            <ExcelFile.ExcelColumn label='TOTAL UNIDADES' value='unidades_totales' />
                            <ExcelFile.ExcelColumn label='MEDIA UNIDADES' value='unidades_media' />
                            <ExcelFile.ExcelColumn label='INSATISFACTORIOS' value='numero_insatisfactorios' />
                            <ExcelFile.ExcelColumn label='SATISFACTORIOS' value='numero_satisfactorios' />
                            <ExcelFile.ExcelColumn label='ALTO' value='numero_altos' />
                            <ExcelFile.ExcelColumn label='EXCELENTE' value='numero_excelentes' />
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
          </>
        ) : (
          <></>
        )}          

      </GridContainer>

      {downloadExcel && (
        <DownloadConfirmModal
          downloadFile={downloadExcel}
          setDownloadFile={setDownloadExcel}
          setFile={setExcel}
          tableName='Informe agregado'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Informe agregado'
          FileExtension='PDF'
        />
      )}             
    </>
  )
}

export default InformeAgregadoScreen
