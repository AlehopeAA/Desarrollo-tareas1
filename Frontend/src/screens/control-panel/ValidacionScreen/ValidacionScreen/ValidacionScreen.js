import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import { makeStyles } from '@material-ui/core'
import { LocalHospital, LibraryAddCheck, Check, Clear, HealthAndSafety, Delete, Calculate } from '@mui/icons-material'
import Card from 'components/Card/Card'
import { Tooltip } from '@material-ui/core'
import Button from 'components/CustomButtons/Button'
import CardBody from 'components/Card/CardBody'
import ReactTable from 'components/ReactTable/ReactTable'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import SweetAlert from 'react-bootstrap-sweetalert'
import styles from './styles/validacionScreenStyles'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import SelectTrabajadorFilter from './components/SelectTrabajadorFilter'
import ViewResumenHorasModal from '../../InformesScreen/InformeIndividualScreen/components/ResumenHorasModal/ViewResumenHorasModal'
import UpdateCorreccionNivelModal from './components/CorreccionNivelModal/UpdateCorreccionNivelModal'
import { getConfiguracions } from 'redux/actions/configuracionActions'
import UpdateCorreccionNivelGlobalModal from '../SupervisionScreen/components/CorreccionNivelModal/UpdateCorreccionNivelGlobalModal'
import { validacionUpdateInfo, getEvaluacion, correccionDeleteInfo, correccionGlobalDeleteInfo, validacionMasiva, getResumen, finalizarValidacion } from 'redux/actions/evaluacionActions'
import ViewCalculoModal from '../../InformesScreen/InformeIndividualScreen/components/CalculosModal/ViewCalculoModal'
import { EVALUACION_VALIDACION_UPDATE_RESET, EVALUACION_CORRECCION_DELETE_RESET, EVALUACION_CORRECCION_GLOBAL_DELETE_RESET, EVALUACION_VALIDACION_MASIVA_RESET } from 'redux/constants/evaluacionConstants'
import { EVALUACION_INFO_RESET, EVALUACION_RESUMEN_RESET, EVALUACION_FINALIZAR_VALIDACION_RESET } from 'redux/constants/evaluacionConstants'
import { USER_LIST_RESET } from 'redux/constants/userConstants'

const useStyles = makeStyles(styles)
const ValidacionScreen = () => {
  const ExcelFile = ReactExport.ExcelFile
  const dispatch = useDispatch()

  const classes = useStyles()
  const initialState = {
    fecha_seleccionada: new Date(),
    mes: new Date().getMonth() + 1,
    anyo: new Date().getFullYear(),
  }

  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)
 
  const [consultaInfo, setConsultaInfo] = useState(initialState)
  const [successValidacionConsulta, setSuccessValidacionConsulta] = useState(false)
  const [selectTrabajadorId, setselectTrabajadorId] = useState('')

  const [alert, setAlert] = useState(null)
  const { errorValidacionUpdate, successValidacionUpdate, validacionUpdated } = useSelector((state) => state.evaluacionValidacionUpdate)
  const { loadingCorreccionDelete, errorCorreccionDelete, successCorreccionDelete, correccionDeleted } = useSelector((state) => state.evaluacionCorreccionDelete)
  const { loadingCorreccionGlobalDelete, errorCorreccionGlobalDelete, successCorreccionGlobalDelete, correccionGlobalDeleted } = useSelector((state) => state.evaluacionCorreccionGlobalDelete)
  const { loadingValidacionMasiva, errorValidacionMasiva, successValidacionMasiva } = useSelector((state) => state.evaluacionValidacionMasiva)
  const { loadingFinalizarValidacion, errorFinalizarValidacion, successFinalizarValidacion } = useSelector((state) => state.evaluacionFinalizarValidacion)

  const [limiteFechas, setLimiteFechas] = useState('')
  const { configuracions, successConfiguracionList } = useSelector((state) => state.configuracionList)

  const [viewCalculoModal, setViewCalculoModal] = useState(false)
  const [dataCalculoModal, setDataCalculoModal] = useState({})

  const {
    successEvaluacionInfo,
    loadingEvaluacionInfo,
    evaluacionInfoData,
    errorEvaluacionInfo,
  } = useSelector((state) => state.evaluacionInfo)

  const {
    successEvaluacionResumen,
    loadingEvaluacionResumen,
    evaluacionResumenData,
    errorEvaluacionResumen,
  } = useSelector((state) => state.evaluacionResumen)
 
  const [viewCorreccionModal, setViewCorreccionModal] = useState(false)
  const [dataCorreccionModal, setDataCorreccionModal] = useState({})

  const [viewCorreccionGlobalModal, setViewCorreccionGlobalModal] = useState(false)
  const [dataCorreccionGlobalModal, setDataCorreccionGlobalModal] = useState({})

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a2")
    doc.text('Informe Supervisión', 20, 10)
    doc.autoTable({
      body: evaluacionInfoData.detalles,
      columns: [
        {
          header: 'TIPO',
          dataKey: 'tipo_tarea',
        },
        {
          header: 'TAREA',
          dataKey: 'descripcion_tarea',          
        },
        {
          header: 'DIF.',
          dataKey: 'nivel_dificultad',
        },
        {
          header: 'H.',
          dataKey: 'horas',
        },
        {
          header: 'UDS.',
          dataKey: 'unidades',
        },
        {
          header: 'D. UDS',
          dataKey: 'nivel_unidades',
        },
        {
          header: 'D. CORR. UDS',
          dataKey: 'nivel_unidades_corregido',
        },
        {
          header: 'D. TIEMPO',
          dataKey: 'nivel_tiempo',
        },
        {
          header: 'D. CORR. TIEMPO',
          dataKey: 'nivel_tiempo_corregido',
        },
        {
          header: 'D. % ENTRADA',
          dataKey: 'nivel_porcentaje_entrada',
        },
        {
          header: 'D. CORR. % ENTRADA',
          dataKey: 'nivel_porcentaje_entrada_corregido',
        },
        {
          header: 'D. % JORNADA',
          dataKey: 'nivel_porcentaje_jornada',
        },
        {
          header: 'D. CORR. % JORNADA',
          dataKey: 'nivel_porcentaje_jornada_corregido',
        },
        {
          header: 'SUPERVISIÓN',
          dataKey: 'supervision',
        },
        {
          header: 'VALIDACIÓN',
          dataKey: 'evaluacion',
        },
      ],
    })
    doc.save('supervision.pdf')
  }

  useEffect(() => {
    if (!successValidacionConsulta) {
      dispatch({ type: EVALUACION_INFO_RESET })
      dispatch({ type: EVALUACION_RESUMEN_RESET })
      setViewCalculoModal(false);
      setDataCalculoModal({});
      setViewCorreccionModal(false);
      setDataCorreccionModal({});
      setViewCorreccionGlobalModal(false);
      setDataCorreccionGlobalModal({});
    }
  }, [successValidacionConsulta])
 
  const handleRealizarConsulta = (e) => {
    e.preventDefault()
    const filter = {
      mes: consultaInfo.fecha_seleccionada.getMonth() + 1,
      anyo: consultaInfo.fecha_seleccionada.getFullYear(),
      trabajador_id: selectTrabajadorId,
      es_para_validar: true
    }
    dispatch(getEvaluacion(filter))
  } 

  const handleLimpiarConsulta = (e) => {
    e.preventDefault()
    setSuccessValidacionConsulta(false)
    setConsultaInfo(initialState)
    setselectTrabajadorId('')
    dispatch({ type: EVALUACION_INFO_RESET })
    dispatch({ type: EVALUACION_RESUMEN_RESET })
    setViewCorreccionModal(false);
    setDataCorreccionModal({});
    setViewCorreccionGlobalModal(false);
    setDataCorreccionGlobalModal({});
  }

  const closeViewResumenModal = () => {
    dispatch({ type: EVALUACION_RESUMEN_RESET })
  }

  const handleResumenHoras = (e) => {
    e.preventDefault()
    const filter = {
      mes: consultaInfo.fecha_seleccionada.getMonth() + 1,
      anyo: consultaInfo.fecha_seleccionada.getFullYear(),
      trabajador_id: selectTrabajadorId,
    }
    dispatch(getResumen(filter))
  }

  const closeViewCorreccionModal = () => {
    setViewCorreccionModal(false);
    setDataCorreccionModal({});
  }

  const closeViewCorreccionGlobalModal = () => {
    setViewCorreccionGlobalModal(false);
    setDataCorreccionGlobalModal({});
  }

  const updateViewCorreccionModal = (datos_modificados) => {
    var evalucionModificada = evaluacionInfoData.detalles.find(item => item.id_detalle_evaluacion === datos_modificados.id_detalle_evaluacion);
    evaluacionInfoData.nivel_global_corregido = datos_modificados.nivel_global_corregido
    evalucionModificada.nivel_unidades_corregido = datos_modificados.nivel_unidades_corregido
    evalucionModificada.nivel_tiempo_corregido = datos_modificados.nivel_tiempo_corregido
    evalucionModificada.nivel_porcentaje_jornada_corregido = datos_modificados.nivel_porcentaje_jornada_corregido
    evalucionModificada.nivel_porcentaje_entrada_corregido = datos_modificados.nivel_porcentaje_entrada_corregido
    evalucionModificada.observaciones = datos_modificados.observaciones
    evalucionModificada.evaluacion = 'CORREGIDO'
  }

  const updateViewCorreccionGlobalModal = (datos_modificados) => {
    var evalucionModificada = evaluacionInfoData;
    evaluacionInfoData.nivel_global_corregido = datos_modificados.nivel_global_corregido
  }

  const handleVerCorreccion = (id_detalle) => {
    setViewCorreccionModal(true);
    const datosCorregidos = evaluacionInfoData.detalles.find(item => item.id_detalle_evaluacion === id_detalle);
    setDataCorreccionModal(datosCorregidos);
  }

  const handleVerCorreccionGlobal = () => {
    setViewCorreccionGlobalModal(true);
    const datosCorregidos = evaluacionInfoData;
    setDataCorreccionGlobalModal(datosCorregidos);
  }

  useEffect(() => {
    if (successValidacionUpdate) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='HECHO!'
          onConfirm={() => confirmValidacion()}
          onCancel={() => confirmValidacion()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Se ha {validacionUpdated.evaluacion == 'SI' ? 'validado' : 'desvalidado'} correctamente.
        </SweetAlert>
      )
    }
    else if (errorValidacionUpdate) {
      setAlert(
        <SweetAlert
          error
          style={{ display: 'block', marginTop: '-100px' }}
          title='ERROR!'
          onConfirm={() => closeValidacion()}
          onCancel={() => closeValidacion()}
          confirmBtnCssClass={classes.errorBtnCssClass}
        >
          Error en la actualización de la validación. Intentelo más tarde.
        </SweetAlert>
      )
    }
  }, [successValidacionUpdate, errorValidacionUpdate])


  const closeValidacion = () => {
    dispatch({ type: EVALUACION_VALIDACION_UPDATE_RESET })
    setAlert(null)
  }

  const confirmValidacion = () => {
    const detalle_seleccionado = evaluacionInfoData.detalles.find(item => item.id_detalle_evaluacion === validacionUpdated.id_detalle_evaluacion);
    detalle_seleccionado.evaluacion = validacionUpdated.evaluacion
    dispatch({ type: EVALUACION_VALIDACION_UPDATE_RESET })
    setAlert(null)
  }


  const handleValidacion = (id_detalle) => {
    const detalle_seleccionado = evaluacionInfoData.detalles.find(item => item.id_detalle_evaluacion === id_detalle);
    
    if(detalle_seleccionado.evaluacion === 'CORREGIDO') {
      setAlert(
        <SweetAlert
          warning
          style={{ display: 'block', marginTop: '-100px' }}
          title='Aviso!'
          onConfirm={() => closeValidacion()}
          onCancel={() => closeValidacion()}
          confirmBtnCssClass={classes.warningBtnCssClass}
        >
          No es necesario validar, porque esta corregido.
        </SweetAlert>
      )
    }
    else {
      var valor = 'SI'
      if(detalle_seleccionado.evaluacion === 'SI') {
        valor = 'NO'
      }

      const data = {
        id_detalle_evaluacion: detalle_seleccionado.id_detalle_evaluacion,
        evaluacion: valor,
      }
      dispatch(validacionUpdateInfo(data))
    }
  }

  useEffect(() => {
    if (successCorreccionDelete) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='HECHO!'
          onConfirm={() => confirmBorrado()}
          onCancel={() => confirmBorrado()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Corrección borrada correctamente.
        </SweetAlert>
      )
    }
    else if (errorCorreccionDelete) {
      setAlert(
        <SweetAlert
          error
          style={{ display: 'block', marginTop: '-100px' }}
          title='ERROR!'
          onConfirm={() => closeBorrado()}
          onCancel={() => closeBorrado()}
          confirmBtnCssClass={classes.errorBtnCssClass}
        >
          Error en la actualización de la corrección. Intentelo más tarde.
        </SweetAlert>
      )
    }
  }, [successCorreccionDelete, errorCorreccionDelete])

  useEffect(() => {
    if (successCorreccionGlobalDelete) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='HECHO!'
          onConfirm={() => confirmBorradoGlobal()}
          onCancel={() => confirmBorradoGlobal()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Corrección global borrada correctamente.
        </SweetAlert>
      )
    }
    else if (errorCorreccionGlobalDelete) {
      setAlert(
        <SweetAlert
          error
          style={{ display: 'block', marginTop: '-100px' }}
          title='ERROR!'
          onConfirm={() => closeBorradoGlobal()}
          onCancel={() => closeBorradoGlobal()}
          confirmBtnCssClass={classes.errorBtnCssClass}
        >
          Error en la actualización de la corrección global. Intentelo más tarde.
        </SweetAlert>
      )
    }
  }, [successCorreccionGlobalDelete, errorCorreccionGlobalDelete])

  useEffect(() => {
    if (successConfiguracionList) {
      const currentDate = new Date()
      const rangoFechas = {
        fecha_minima: new Date('12/01/2021'),
        fecha_maxima: currentDate
      }

      const parametro_seleccionado = configuracions.filter((configuracion) => configuracion.parametro == 'registro_actividad' )[0];
      if(rangoFechas.fecha_maxima.getDate() > parametro_seleccionado.valor) {
        //Es el mes anterior
        rangoFechas.fecha_maxima = new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 28);
        setConsultaInfo({ ...consultaInfo, fecha_seleccionada: rangoFechas.fecha_maxima})
      }
      else {
        //Es dos meses antes
        rangoFechas.fecha_maxima = new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 28);
        setConsultaInfo({ ...consultaInfo, fecha_seleccionada: rangoFechas.fecha_maxima})
      }      
      setLimiteFechas(rangoFechas)
    }
    else {
      dispatch(getConfiguracions())
    }
    
  }, [successConfiguracionList])

  useEffect(() => {
    if (successValidacionMasiva) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='HECHO!'
          onConfirm={() => confirmValidacionMasiva()}
          onCancel={() => confirmValidacionMasiva()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Validación masiva realizada correctamente.
        </SweetAlert>
      )
    }
    else if (errorValidacionMasiva) {
      setAlert(
        <SweetAlert
          error
          style={{ display: 'block', marginTop: '-100px' }}
          title='ERROR!'
          onConfirm={() => closeValidacionMasiva()}
          onCancel={() => closeValidacionMasiva()}
          confirmBtnCssClass={classes.errorBtnCssClass}
        >
          Error en la actualización de la validación masiva. Intentelo más tarde.
        </SweetAlert>
      )
    }
  }, [successValidacionMasiva, errorValidacionMasiva])

  useEffect(() => {
    if (successFinalizarValidacion) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='HECHO!'
          onConfirm={() => confirmFinalizarValidacion()}
          onCancel={() => confirmFinalizarValidacion()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Finalización de validación realizada correctamente.
        </SweetAlert>
      )
    }
    else if (errorFinalizarValidacion) {
      setAlert(
        <SweetAlert
          error
          style={{ display: 'block', marginTop: '-100px' }}
          title='ERROR!'
          onConfirm={() => closeFinalizarValidacion()}
          onCancel={() => closeFinalizarValidacion()}
          confirmBtnCssClass={classes.errorBtnCssClass}
        >
          Error en la finalización de la validación masiva. Intentelo más tarde.
        </SweetAlert>
      )
    }
  }, [successFinalizarValidacion, errorFinalizarValidacion])

  const closeBorrado = () => {
    dispatch({ type: EVALUACION_CORRECCION_DELETE_RESET })
    setAlert(null)
  }

  const confirmBorrado = () => {
    const detalle_seleccionado = evaluacionInfoData.detalles.find(item => item.id_detalle_evaluacion === correccionDeleted.detalle.id_detalle_evaluacion);
    evaluacionInfoData.nivel_global_corregido = correccionDeleted.nivel_global_corregido
    detalle_seleccionado.evaluacion = correccionDeleted.detalle.evaluacion
    detalle_seleccionado.supervision = correccionDeleted.detalle.supervision
    detalle_seleccionado.nivel_unidades_corregido = null
    detalle_seleccionado.nivel_tiempo_corregido = null
    detalle_seleccionado.nivel_porcentaje_jornada_corregido = null
    detalle_seleccionado.nivel_porcentaje_entrada_corregido = null
    detalle_seleccionado.observaciones = null
    dispatch({ type: EVALUACION_CORRECCION_DELETE_RESET })
    setAlert(null)
  }

  const handleBorrarCorreccion = (id_detalle) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title='Confirmar'
        onConfirm={() => dispatch(correccionDeleteInfo({id_detalle_evaluacion: id_detalle}))}
        onCancel={() => setAlert(null)}
        confirmBtnCssClass={classes.confirmBtnCssClass}
        cancelBtnCssClass={classes.errorBtnCssClass}
        confirmBtnText= {loadingCorreccionDelete ? 'Borrando...' : 'Si'}
        cancelBtnText='No'
        showCancel
      >
        ¿Estas seguro de borrar la corrección guardada para esta evaluación?
      </SweetAlert>
    )
  }

  const closeBorradoGlobal = () => {
    dispatch({ type: EVALUACION_CORRECCION_GLOBAL_DELETE_RESET })
    setAlert(null)
  }

  const confirmBorradoGlobal = () => {
    const detalle_seleccionado = evaluacionInfoData;
    evaluacionInfoData.nivel_global_corregido = correccionGlobalDeleted.nivel_global_corregido
    dispatch({ type: EVALUACION_CORRECCION_GLOBAL_DELETE_RESET })
    setAlert(null)
  }

  const handleBorrarCorreccionGlobal = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title='Confirmar'
        onConfirm={() => dispatch(correccionGlobalDeleteInfo(evaluacionInfoData))}
        onCancel={() => setAlert(null)}
        confirmBtnCssClass={classes.confirmBtnCssClass}
        cancelBtnCssClass={classes.errorBtnCssClass}
        confirmBtnText= {loadingCorreccionGlobalDelete ? 'Borrando...' : 'Si'}
        cancelBtnText='No'
        showCancel
      >
        ¿Estas seguro de borrar la corrección global guardada para esta evaluación?
      </SweetAlert>
    )
  }

  const handleValidacionMasiva = () => {
    //debugger
    setAlert(
      <SweetAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title='Confirmar'
        onConfirm={() => dispatch(validacionMasiva(evaluacionInfoData))}
        onCancel={() => setAlert(null)}
        confirmBtnCssClass={classes.confirmBtnCssClass}
        cancelBtnCssClass={classes.errorBtnCssClass}
        confirmBtnText= {loadingValidacionMasiva ? 'Validando...' : 'Si'}
        cancelBtnText='No'
        showCancel
      >
        ¿Estas seguro de validar todo salvo las tareas con niveles insatisfactorios?
      </SweetAlert>
    )

  }

  const closeValidacionMasiva = () => {
    dispatch({ type: EVALUACION_INFO_RESET })
    dispatch({ type: EVALUACION_VALIDACION_MASIVA_RESET })
    setAlert(null)
    const filter = {
      mes: consultaInfo.fecha_seleccionada.getMonth() + 1,
      anyo: consultaInfo.fecha_seleccionada.getFullYear(),
      trabajador_id: selectTrabajadorId,
      es_para_validar: true
    }
    dispatch(getEvaluacion(filter))
  }

  const confirmValidacionMasiva = () => {
    dispatch({ type: EVALUACION_INFO_RESET })
    dispatch({ type: EVALUACION_VALIDACION_MASIVA_RESET })
    setAlert(null)
    const filter = {
      mes: consultaInfo.fecha_seleccionada.getMonth() + 1,
      anyo: consultaInfo.fecha_seleccionada.getFullYear(),
      trabajador_id: selectTrabajadorId,
      es_para_validar: true
    }
    dispatch(getEvaluacion(filter))
  }

  const handleFinalizarValidacion = () => {
    //debugger
    setAlert(
      <SweetAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title='Confirmar'
        onConfirm={() => dispatch(finalizarValidacion(evaluacionInfoData))}
        onCancel={() => setAlert(null)}
        confirmBtnCssClass={classes.confirmBtnCssClass}
        cancelBtnCssClass={classes.errorBtnCssClass}
        confirmBtnText= {loadingFinalizarValidacion ? 'Finalizando validavión...' : 'Si'}
        cancelBtnText='No'
        showCancel
      >
        Esto finalizará la validación y no podrá validar ni corregir los desempeños de las tareas. Ni el trabajador podrá añadir o modificar más tareas este mes. ¿Estas seguro de continuar?
      </SweetAlert>
    )

  }

  const closeFinalizarValidacion = () => {
    dispatch({ type: EVALUACION_INFO_RESET })
    dispatch({ type: EVALUACION_FINALIZAR_VALIDACION_RESET })
    setAlert(null)
    const filter = {
      mes: consultaInfo.fecha_seleccionada.getMonth() + 1,
      anyo: consultaInfo.fecha_seleccionada.getFullYear(),
      trabajador_id: selectTrabajadorId,
      es_para_validar: true
    }
    dispatch(getEvaluacion(filter))
  }

  const confirmFinalizarValidacion = () => {
    dispatch({ type: EVALUACION_INFO_RESET })
    dispatch({ type: EVALUACION_FINALIZAR_VALIDACION_RESET })
    setAlert(null)
    const filter = {
      mes: consultaInfo.fecha_seleccionada.getMonth() + 1,
      anyo: consultaInfo.fecha_seleccionada.getFullYear(),
      trabajador_id: selectTrabajadorId,
      es_para_validar: true
    }
    dispatch(getEvaluacion(filter))
  }

  const closeViewCalculoModal = () => {
    setViewCalculoModal(false);
    setDataCalculoModal({});
  }

  const handleVerCalculo = (id_detalle) => {
    setViewCalculoModal(true);
    var datosEvaluacion = evaluacionInfoData.detalles.find(item => item.id_detalle_evaluacion === id_detalle);
    setDataCalculoModal([datosEvaluacion]);
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
                        label="Mes y Año *"
                        minDate={limiteFechas.fecha_minima}
                        maxDate={limiteFechas.fecha_maxima}
                        value={consultaInfo.fecha_seleccionada}
                        onChange={(e) => {setConsultaInfo({ ...consultaInfo, fecha_seleccionada: e, mes: e.getMonth() + 1, anyo: e.getFullYear() }); dispatch({ type: USER_LIST_RESET })}}                        
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
                        smes={consultaInfo.mes}
                        sanyo={consultaInfo.anyo}
                      />
                    </GridContainer>
                  </GridItem>
                </GridContainer>
                
                {errorEvaluacionInfo && (
                  <GridContainer>
                    <GridItem xs={12}>
                      <SnackbarContent message={errorEvaluacionInfo} color='danger' />
                    </GridItem>
                  </GridContainer>
                )}
                {errorEvaluacionResumen && (
                  <GridContainer>
                    <GridItem xs={12}>
                      <SnackbarContent message={errorEvaluacionResumen} color='danger' />
                    </GridItem>
                  </GridContainer>
                )}
                {successEvaluacionInfo && (
                  <Button type='submit' color='primary' className={classes.informeResumenButton} onClick={handleResumenHoras}>
                      {loadingEvaluacionResumen ? 'Mostrando resumen...': 'Resumen Horas Laborables'}
                  </Button>
                )}
 
                <Button type='submit' color='primary' className={classes.informeButton} onClick={handleLimpiarConsulta}>
                  Limpiar
                </Button>
                <Button type='submit' color='primary' className={classes.informeButton}>
                  {loadingEvaluacionInfo ? 'Realizando consulta...' : 'Filtrar'}
                </Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
        {successEvaluacionInfo ? (
          <>
            <GridItem xs={12} className={classes.rootItem}>
              <Card>
                <CardBody>
                    <GridContainer>
                      <GridItem xs={12} md={6}>
                        <span className={classes.informacion_evaluacion}>Nivel desempeño Global:  </span>
                        {evaluacionInfoData.nivel_global_corregido ? (
                          <span className={evaluacionInfoData.nivel_global_corregido == 'EXCELENTE'? classes.evaluacion_excelente : evaluacionInfoData.nivel_global_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : evaluacionInfoData.nivel_global_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{evaluacionInfoData.nivel_global_corregido}</span>
                        ): (
                          <span className={evaluacionInfoData.nivel_global == 'EXCELENTE'? classes.evaluacion_excelente : evaluacionInfoData.nivel_global == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : evaluacionInfoData.nivel_global == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{evaluacionInfoData.nivel_global}</span>
                        )}
                        {evaluacionInfoData.validada !== 'SI' ? (
                          evaluacionInfoData.nivel_global_corregido ? (
                            <Button justIcon round simple color='primary' onClick={() => handleBorrarCorreccionGlobal()}><Tooltip title='Borrar corrección'><Delete /></Tooltip></Button>
                          ): (
                            <Button justIcon round simple color='primary' onClick={() => handleVerCorreccionGlobal()}><Tooltip title='Corregir'><LocalHospital /></Tooltip></Button>                       
                          )
                          ) : <h5><span className={classes.evaluacion_sindatos} style={{float: 'right'}}>VALIDACIÓN FINALIZADA</span></h5>}
                      </GridItem>
                      <GridItem xs={12} md={6}>
                        <div style={{float: 'right'}}>
                          <span className={classes.informacion_evaluacion}>% Carga de Trabajo:  </span>
                          <span className={evaluacionInfoData.nivel_carga == 'EXCELENTE'? classes.evaluacion_excelente : evaluacionInfoData.nivel_carga == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : evaluacionInfoData.nivel_carga == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{evaluacionInfoData.porcentaje_carga ? `${evaluacionInfoData.porcentaje_carga} %`: ''} {evaluacionInfoData.nivel_carga ? evaluacionInfoData.nivel_carga : ''}</span>
                        </div>
                      </GridItem>
                      
                      <br></br>
                      <br></br>
                      
                      <GridItem xs={12}>
                        <ReactTable
                            columns={[
                              {
                                Header: 'TAREA',
                                accessor: 'descripcion_tarea',
                                Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                              },
                              {
                                Header: 'DIFICULTAD',
                                accessor: 'nivel_dificultad',
                                Cell: ({ value, row }) => <span>{row.original.dificultad == 'SI'? value : ''}</span>
                              },
                              {
                                Header: 'TOTAL HORAS',
                                accessor: 'horas',
                              },
                              {
                                Header: 'TOTAL UDS.',
                                accessor: 'unidades',
                              },
                              {
                                Header: 'D. UNIDADES',
                                accessor: 'nivel_unidades',
                                Cell: ({ value, row }) => <div> {row.original.nivel_unidades_corregido == 'EXCELENTE' || row.original.nivel_unidades_corregido == 'SATISFACTORIO' || row.original.nivel_unidades_corregido == 'ALTO' || row.original.nivel_unidades_corregido == 'INSATISFACTORIO' ? (
                                  <span className={row.original.nivel_unidades_corregido == 'EXCELENTE'? classes.evaluacion_excelente : row.original.nivel_unidades_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : row.original.nivel_unidades_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{row.original.nivel_unidades_corregido}</span>
                                ): (
                                  <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>
                                )} </div>
                              },
                              {
                                Header: 'D. TIEMPO',
                                accessor: 'nivel_tiempo',
                                Cell: ({ value, row }) => <div> {row.original.nivel_tiempo_corregido == 'EXCELENTE' || row.original.nivel_tiempo_corregido == 'SATISFACTORIO' || row.original.nivel_tiempo_corregido == 'ALTO' || row.original.nivel_tiempo_corregido == 'INSATISFACTORIO' ? (
                                  <span className={row.original.nivel_tiempo_corregido == 'EXCELENTE'? classes.evaluacion_excelente : row.original.nivel_tiempo_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : row.original.nivel_tiempo_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{row.original.nivel_tiempo_corregido}</span>
                                ): (
                                  <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>
                                )} </div>
                              },
                              {
                                Header: 'D. % ENTRADA',
                                accessor: 'nivel_porcentaje_entrada',
                                Cell: ({ value, row }) => <div> {row.original.nivel_porcentaje_entrada_corregido == 'EXCELENTE' || row.original.nivel_porcentaje_entrada_corregido == 'SATISFACTORIO' || row.original.nivel_porcentaje_entrada_corregido == 'ALTO' || row.original.nivel_porcentaje_entrada_corregido == 'INSATISFACTORIO' ? (
                                  <span className={row.original.nivel_porcentaje_entrada_corregido == 'EXCELENTE'? classes.evaluacion_excelente : row.original.nivel_porcentaje_entrada_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : row.original.nivel_porcentaje_entrada_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{row.original.nivel_porcentaje_entrada_corregido}</span>
                                ): (
                                  <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>
                                )} </div>
                              },
                              {
                                Header: 'D. % JORNADA',
                                accessor: 'nivel_porcentaje_jornada',
                                Cell: ({ value, row }) => <div> {row.original.nivel_porcentaje_jornada_corregido == 'EXCELENTE' || row.original.nivel_porcentaje_jornada_corregido == 'SATISFACTORIO' || row.original.nivel_porcentaje_jornada_corregido == 'ALTO' || row.original.nivel_porcentaje_jornada_corregido == 'INSATISFACTORIO' ? (
                                  <span className={row.original.nivel_porcentaje_jornada_corregido == 'EXCELENTE'? classes.evaluacion_excelente : row.original.nivel_porcentaje_jornada_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : row.original.nivel_porcentaje_jornada_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{row.original.nivel_porcentaje_jornada_corregido}</span>
                                ): (
                                  <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>
                                )} </div>
                              },
                              {
                                Header: 'SUPERVISIÓN',
                                accessor: 'supervision',
                                Cell: ({ value }) => <Button justIcon round simple color='primary'><Tooltip title={value == 'SI'? 'Si' : value == 'CORREGIDO' ?  'Corregido' : 'No' }>{value == 'SI'? <Check />: value == 'CORREGIDO'? <HealthAndSafety /> : <Clear />}</Tooltip></Button>
                              },
                              {
                                Header: 'VALIDACIÓN',
                                accessor: 'evaluacion',
                                Cell: ({ value }) => <Button justIcon round simple color='primary'><Tooltip title={value == 'SI'? 'Si' : value == 'CORREGIDO' ?  'Corregido' : 'No' }>{value == 'SI'? <Check />: value == 'CORREGIDO'? <HealthAndSafety /> : <Clear />}</Tooltip></Button>
                              },
                              {
                                Header: 'ACCIONES',
                                accessor: 'id_detalle_evaluacion',
                                Cell: ({ value }) => <div className='actions-right'>{evaluacionInfoData.detalles.find(item => item.id_detalle_evaluacion === value).evaluacion != 'CORREGIDO' && evaluacionInfoData.validada !== 'SI' ? <Button justIcon round simple color='primary' onClick={() => handleValidacion(value)}><Tooltip title='Validar/Desvalidar'><LibraryAddCheck /></Tooltip></Button> : <></>}{evaluacionInfoData.validada !== 'SI' ? <Button justIcon round simple color='primary' onClick={() => handleVerCorreccion(value)}><Tooltip title='Corregir'><LocalHospital /></Tooltip></Button> : <></>}{evaluacionInfoData.detalles.find(item => item.id_detalle_evaluacion === value).evaluacion === 'CORREGIDO' && evaluacionInfoData.validada !== 'SI' ? <Button justIcon round simple color='primary' onClick={() => handleBorrarCorreccion(value)}><Tooltip title='Borrar corrección'><Delete /></Tooltip></Button> : <></>}<Button justIcon round simple color='primary' onClick={() => handleVerCalculo(value)}><Tooltip title='Ver Detalle Cálculo'><Calculate /></Tooltip></Button></div>
                              },
                            ]}
                            data={evaluacionInfoData.detalles}
                            numFilas={20}
                        />
                      </GridItem>
                    </GridContainer>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                      {excel && (
                        <ExcelFile
                          element={<Button color='primary'>Exportar Excel</Button>}
                          filename='informeValidación'
                          hideElement={true}
                        >
                          <ExcelFile.ExcelSheet data={evaluacionInfoData.detalles} name='Informe Supervisión'>
                            <ExcelFile.ExcelColumn label='TIPO TAREA' value='tipo_tarea' />
                            <ExcelFile.ExcelColumn label='TAREA' value='descripcion_tarea' />
                            <ExcelFile.ExcelColumn label='DIFICULTAD' value='dificultad' />
                            <ExcelFile.ExcelColumn label='TOTAL HORAS' value='horas' />
                            <ExcelFile.ExcelColumn label='TOTAL UNIDADES' value='unidades' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO UNIDADES' value='nivel_unidades' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO CORREGIDO UNIDADES' value='nivel_unidades_corregido' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO TIEMPO' value='nivel_tiempo' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO CORREGIDO TIEMPO' value='nivel_tiempo_corregido' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO % ENTRADA' value='nivel_porcentaje_entrada' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO CORREGIDO % ENTRADA' value='nivel_porcentaje_entrada_corregido' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO % JORNADA' value='nivel_porcentaje_jornada' />
                            <ExcelFile.ExcelColumn label='DESEMPEÑO CORREGIDO % JORNADA' value='nivel_porcentaje_jornada_corregido' />
                            <ExcelFile.ExcelColumn label='SUPERVISIÓN' value='supervision' />
                            <ExcelFile.ExcelColumn label='VALIDACIÓN' value='evaluacion' />
                          </ExcelFile.ExcelSheet>
                        </ExcelFile>
                      )}
                      {evaluacionInfoData.validada !== 'SI' && (
                        <Button color='primary' onClick={() => handleFinalizarValidacion()} style={{ marginLeft: '10px' }}>
                          Finalizar validación
                        </Button>
                      )}
                      {evaluacionInfoData.validada !== 'SI' && (
                        <Button color='primary' onClick={() => handleValidacionMasiva()} style={{ marginLeft: '10px' }}>
                          Validar todo (excepto insatisfactorios)
                        </Button>
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
      {successEvaluacionResumen && (
        <ViewResumenHorasModal
          viewInfo={successEvaluacionResumen}
          closeViewInfoModal={closeViewResumenModal}
          info={evaluacionResumenData}
        />
      )}
      {viewCorreccionModal && (
        <UpdateCorreccionNivelModal
          updateInfoModal={viewCorreccionModal}
          handleUpdateModal={updateViewCorreccionModal}
          handleCloseModal={closeViewCorreccionModal}
          info={dataCorreccionModal}
        />
      )}
      {viewCorreccionGlobalModal && (
        <UpdateCorreccionNivelGlobalModal
          updateInfoModal={viewCorreccionGlobalModal}
          handleUpdateModal={updateViewCorreccionGlobalModal}
          handleCloseModal={closeViewCorreccionGlobalModal}
          info={dataCorreccionGlobalModal}
        />
      )}
      {downloadExcel && (
        <DownloadConfirmModal
          downloadFile={downloadExcel}
          setDownloadFile={setDownloadExcel}
          setFile={setExcel}
          tableName='Informe validación'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Informe supervisión'
          FileExtension='PDF'
        />
      )}
      {viewCalculoModal && (
        <ViewCalculoModal
          viewInfo={viewCalculoModal}
          closeViewInfoModal={closeViewCalculoModal}
          info={dataCalculoModal}
        />
      )}

      {alert}
    </>
  )
}

export default ValidacionScreen
