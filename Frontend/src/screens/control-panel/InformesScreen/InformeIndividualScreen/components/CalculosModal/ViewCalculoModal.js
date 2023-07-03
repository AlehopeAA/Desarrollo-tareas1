import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, Typography, makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'
import styles from '../../styles/informeIndividualScreenStyles'
import EvaluacionTable from './EvaluacionTable'
import { EVALUACION_CALCULO_RESET } from 'redux/constants/evaluacionConstants'
import { getCalculo } from 'redux/actions/evaluacionActions'

const useStyles = makeStyles(styles)
const ViewCalculoModal = ({ viewInfo, closeViewInfoModal, info }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  
  const [showExplicacionUnidades, setShowExplicacionUnidades] = useState(false)
  const [showExplicacionTiempo, setShowExplicacionTiempo] = useState(false)
  const [showExplicacionEntrada, setShowExplicacionEntrada] = useState(false)
  const [showExplicacionJornada, setShowExplicacionJornada] = useState(false)

  const {
    successEvaluacionCalculo,
    loadingEvaluacionCalculo,
    evaluacionCalculoData,
    errorEvaluacionCalculo,
  } = useSelector((state) => state.evaluacionCalculo)

  const handleVerCalculo = (id_detalle, tipo_calculo) => {
    dispatch({ type: EVALUACION_CALCULO_RESET })
    setShowExplicacionUnidades(false)
    setShowExplicacionTiempo(false)
    setShowExplicacionEntrada(false)
    setShowExplicacionJornada(false)

    const filter = {
      id_detalle: id_detalle,
      tipo: tipo_calculo,
    }
    dispatch(getCalculo(filter))
  }

  useEffect(() => {
    if (!successEvaluacionCalculo) {
      dispatch({ type: EVALUACION_CALCULO_RESET })
      setShowExplicacionUnidades(false)
      setShowExplicacionTiempo(false)
      setShowExplicacionEntrada(false)
      setShowExplicacionJornada(false)
    }
    else {
      if(evaluacionCalculoData['tipo'] == 'unidades') {
        setShowExplicacionUnidades(true)
      }
      if (evaluacionCalculoData['tipo'] == 'tiempo') {
        setShowExplicacionTiempo(true)
      }
      if (evaluacionCalculoData['tipo'] == 'entrada') {
        setShowExplicacionEntrada(true)
      }
      if (evaluacionCalculoData['tipo'] == 'jornada') {
        setShowExplicacionJornada(true)
      }
    }
  }, [successEvaluacionCalculo, evaluacionCalculoData])


  const closeCalculoView = () => {
    dispatch({ type: EVALUACION_CALCULO_RESET })
    setShowExplicacionUnidades(false)
    setShowExplicacionTiempo(false)
    setShowExplicacionEntrada(false)
    setShowExplicacionJornada(false)
    closeViewInfoModal()
  }

  return (
    <ViewInfoActionModal
      open={viewInfo}
      handleCloseModal={() => closeCalculoView()}
      modalTitle={`Detalle Cálculo`}
      anchoPersonalizado='md'
      hideButtonClose={true}
      children={
        <GridContainer>
          <GridItem xs={12}>
            <EvaluacionTable
                showFilters={false}
                scrollX={false}
                columns={[
                  {
                    Header: 'TIPO TAREA',
                    accessor: 'tipo_tarea',
                  },
                  {
                    Header: 'TAREA',
                    accessor: 'descripcion_tarea',
                  },
                  {
                    Header: 'DIFICULTAD',
                    accessor: 'nivel_dificultad',
                    Cell: ({ value, row }) => <span>{row.original.dificultad == 'SI'? value : '-'}</span>
                  },
                  {
                    Header: 'HORAS DEDICADAS',
                    accessor: 'horas',
                  },
                  {
                    Header: 'UNIDADES',
                    accessor: 'unidades',
                  },
                ]}
                data={info}
            />
          </GridItem>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <GridItem xs={12}>
            <EvaluacionTable
                showFilters={false}
                scrollX={false}
                columns={[
                  {
                    Header: 'DESEMPEÑO UNIDADES',
                    accessor: 'nivel_unidades',
                    Cell: ({ value, row }) => <div><span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>{row.original.nivel_unidades_corregido ? <><br></br>Corregido: <span className={row.original.nivel_unidades_corregido == 'EXCELENTE'? classes.evaluacion_excelente : row.original.nivel_unidades_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : row.original.nivel_unidades_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : row.original.nivel_unidades_corregido == 'ALTO' ?  classes.evaluacion_alto : row.original.nivel_unidades_corregido == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{row.original.nivel_unidades_corregido}</span></>: <br></br>}<br></br><Button color='primary' block onClick={() => handleVerCalculo(row.original.id_detalle_evaluacion, 'unidades')} >Ver cálculo</Button></div>
                  },
                  {
                    Header: 'DESEMPEÑO TIEMPO',
                    accessor: 'nivel_tiempo',
                    Cell: ({ value, row }) => <div><span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>{row.original.nivel_tiempo_corregido ? <><br></br>Corregido: <span className={row.original.nivel_tiempo_corregido == 'EXCELENTE'? classes.evaluacion_excelente : row.original.nivel_tiempo_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : row.original.nivel_tiempo_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : row.original.nivel_tiempo_corregido == 'ALTO' ?  classes.evaluacion_alto : row.original.nivel_tiempo_corregido == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{row.original.nivel_tiempo_corregido}</span></>: <br></br>}<br></br><Button color='primary' block onClick={() => handleVerCalculo(row.original.id_detalle_evaluacion, 'tiempo')} >Ver cálculo</Button></div>
                  },
                  {
                    Header: 'DESEMPEÑO % ENTRADA',
                    accessor: 'nivel_porcentaje_entrada',
                    Cell: ({ value, row }) => <div><span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>{row.original.nivel_porcentaje_entrada_corregido ? <><br></br>Corregido: <span className={row.original.nivel_porcentaje_entrada_corregido == 'EXCELENTE'? classes.evaluacion_excelente : row.original.nivel_porcentaje_entrada_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : row.original.nivel_porcentaje_entrada_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : row.original.nivel_porcentaje_entrada_corregido == 'ALTO' ?  classes.evaluacion_alto : row.original.nivel_porcentaje_entrada_corregido == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{row.original.nivel_porcentaje_entrada_corregido}</span></>: <br></br>}<br></br><Button color='primary' block onClick={() => handleVerCalculo(row.original.id_detalle_evaluacion, 'entrada')} >Ver cálculo</Button></div>
                  },
                  {
                    Header: 'DESEMPEÑO % JORNADA',
                    accessor: 'nivel_porcentaje_jornada',
                    Cell: ({ value, row }) => <div><span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : value == 'ALTO' ?  classes.evaluacion_alto : value == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{value}</span>{row.original.nivel_porcentaje_jornada_corregido ? <><br></br>Corregido: <span className={row.original.nivel_porcentaje_jornada_corregido == 'EXCELENTE'? classes.evaluacion_excelente : row.original.nivel_porcentaje_jornada_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : row.original.nivel_porcentaje_jornada_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : row.original.nivel_porcentaje_jornada_corregido == 'ALTO' ?  classes.evaluacion_alto : row.original.nivel_porcentaje_jornada_corregido == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{row.original.nivel_porcentaje_jornada_corregido}</span></>: <br></br>}<br></br><Button color='primary' block onClick={() => handleVerCalculo(row.original.id_detalle_evaluacion, 'jornada')} >Ver cálculo</Button></div>
                  },
                ]}
                data={info}
            />
          </GridItem>


          {showExplicacionUnidades && (
            <div style = {{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style = {{display: 'flex',  flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center'}}>
                <span className= {evaluacionCalculoData['tiene_indicador'] == true ? classes.calculo_enable: classes.span}>
                  Si la tarea tiene indicador a 'Si':
                </span>
                  <span className= {evaluacionCalculoData['cuantificable'] == true ? classes.calculo_enable: classes.span} style= {{marginLeft: '20px'}}>
                    Si la tarea tiene cuantificable a 'Si':
                  </span>
                    <span className= {evaluacionCalculoData['tiene_unidad_minima'] == true ? classes.calculo_enable: classes.span} style= {{marginLeft: '40px' }}>
                      Si su objetivo tiene definido unidad minima:
                    </span>
                      <span className= {evaluacionCalculoData['compartida'] == 'NO' ? classes.calculo_enable: classes.span} style= {{ marginLeft: '50px' }}>
                        Si la tarea tiene compartida a 'NO':
                      </span>
                        <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO'  ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si la magnitud del objetivo es 'día':
                        </span>
                          <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                              <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                              </span>
                            </span>
                          <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip>:
                          </span>
                            
                            <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_satisfactorio}>SATISFACTORIO</span>
                              </span>
                            </span>  
                          <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>:
                          </span>
                            
                            <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_alto}>ALTO</span>
                              </span>
                            </span> 
                          <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#8805; <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>:
                          </span>

                            <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_excelente}>EXCELENTE</span>
                              </span>
                            </span>  
                        <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO'  ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si la magnitud del objetivo es 'Semana':
                        </span>
                          <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                              </span>
                            </span>  
                          <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip>:
                          </span>
                          <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                            <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                              Desempeño de unidades = <span className={classes.evaluacion_satisfactorio}>SATISFACTORIO</span>
                            </span>
                          </span>
                            
                          <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>:
                          </span>
                            
                            <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_alto}>ALTO</span>
                              </span>
                            </span>  
                          <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#8805; (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_excelente}>EXCELENTE</span>
                              </span>
                            </span>

                        <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si la magnitud del objetivo es 'Mes':
                        </span>
                          <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                              </span>
                            </span>  
                          <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_satisfactorio}>SATISFACTORIO</span>
                              </span>
                            </span>  
                          <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >=  evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                          Si <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >=  evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >=  evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span> 
                              <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >=  evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_alto}>ALTO</span>
                              </span>
                            </span>
                          <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                          Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#8805; <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_excelente}>EXCELENTE</span>
                              </span>
                            </span>
                      <span className= {evaluacionCalculoData['compartida'] == 'SI' ? classes.calculo_enable: classes.span} style= {{ marginLeft: '50px' }}>
                        Si la tarea tiene compartida a 'SI':
                      </span>
                        <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si la magnitud del objetivo es 'día':
                        </span>
                          <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                              <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                              </span>
                            </span>
                          <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                            
                            <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_satisfactorio}>SATISFACTORIO</span>
                              </span>
                            </span>  
                          <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                            
                            <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_alto}>ALTO</span>
                              </span>
                            </span> 
                          <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#8805; <Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>

                            <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Dia' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['dias_laborables'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_excelente}>EXCELENTE</span>
                              </span>
                            </span>  
                        <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si la magnitud del objetivo es 'Semana':
                        </span>
                          <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip>  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                              </span>
                            </span>  
                          <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip>  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip>  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                          <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                            <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                              Desempeño de unidades = <span className={classes.evaluacion_satisfactorio}>SATISFACTORIO</span>
                            </span>
                          </span>
                            
                          <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip>  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                            
                            <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_alto}>ALTO</span>
                              </span>
                            </span>  
                          <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#8805; (<Tooltip title={evaluacionCalculoData['dias_laborables']}><span className={classes.calculo_valor}>Dias laborables</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_laborables']/5.0}><span className={classes.calculo_valor}>/</span></Tooltip> 5)  <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip> <Tooltip title={(evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] }><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Semana' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= (evaluacionCalculoData['dias_laborables']/5.0) * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_excelente}>EXCELENTE</span>
                              </span>
                            </span>

                        <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si la magnitud del objetivo es 'Mes':
                        </span>
                          <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                              </span>
                            </span>  
                          <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_minimo']}><span className={classes.calculo_valor}>unidades minimo</span></Tooltip> <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_minimo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_satisfactorio}>SATISFACTORIO</span>
                              </span>
                            </span>  
                          <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >=  evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                          Si <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_medio']}><span className={classes.calculo_valor}>unidades medio</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >=  evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >=  evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span> 
                              <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >=  evaluacionCalculoData['unidades_medio'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] && evaluacionCalculoData['unidades_tarea'] < evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_alto}>ALTO</span>
                              </span>
                            </span>
                          <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                          Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#8805; <Tooltip title={evaluacionCalculoData['dias_mes']}><span className={classes.calculo_valor}>K</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['unidades_maximo']}><span className={classes.calculo_valor}>unidades máximo</span></Tooltip>  <Tooltip title={evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>&#42;</span></Tooltip>  <Tooltip title={evaluacionCalculoData['responsabilidad']}><span className={classes.calculo_valor}>% responsabilidad</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['magnitud'] == 'Mes' && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['unidades_tarea'] >= evaluacionCalculoData['unidades_maximo'] * evaluacionCalculoData['dias_mes'] * evaluacionCalculoData['responsabilidad'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de unidades = <span className={classes.evaluacion_excelente}>EXCELENTE</span>
                              </span>
                            </span>
                    <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['cuantificable'] == true && evaluacionCalculoData['tiene_unidad_minima'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px'}}>
                      Si no tiene objetivo mínimo:
                    </span>
                      <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['cuantificable'] == true && evaluacionCalculoData['tiene_unidad_minima'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                        <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['cuantificable'] == true && evaluacionCalculoData['tiene_unidad_minima'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                        <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['cuantificable'] == true && evaluacionCalculoData['tiene_unidad_minima'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Desempeño de unidades = N/A
                        </span>
                      </span>
                  <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['cuantificable'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '20px'}}>
                    Si no es cuantificable:
                  </span>
                    <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['cuantificable'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                      <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['cuantificable'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                      <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['cuantificable'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px' }}>
                        Desempeño de unidades = N/A
                      </span>
                    </span>  
                <span className= {evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_enable : classes.calculo_disable } >
                  Si no tiene indicador:
                </span>
                  <span className={evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                    <span className={evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                    <span className= {evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '20px' }}>
                      Desempeño de unidades = N/A
                    </span>
                  </span>
              </div>
            </div>
          )}
          {showExplicacionTiempo && (
            <div style = {{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style = {{display: 'flex',  flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center'}}>
                <span className= {evaluacionCalculoData['tiene_indicador'] == true ? classes.calculo_enable: classes.span}>
                  Si la tarea tiene indicador a 'SI':
                </span>
                    <span className= {evaluacionCalculoData['tiene_tiempo_minimo'] == true ? classes.calculo_enable: classes.span} style= {{marginLeft: '20px' }}>
                      Si su objetivo tiene definido tiempo minimo:
                    </span>
                      <span className= {evaluacionCalculoData['tiene_tiempo_minimo'] == true && evaluacionCalculoData['unidades_tarea'] > 0 ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px' }}>
                        Si <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip> &#62; 0:
                      </span>
                        
                        
                        <span className= {evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si (<Tooltip title={evaluacionCalculoData['horas_tarea']}><span className={classes.calculo_valor}>horas de la tarea</span></Tooltip> <Tooltip title={evaluacionCalculoData['horas_tarea'] * 60}><span className={classes.calculo_valor}>&#42;</span></Tooltip> 60) <Tooltip title={(evaluacionCalculoData['horas_tarea'] * 60)/evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>/</span></Tooltip> <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip>   &#8804; <Tooltip title={evaluacionCalculoData['tiempo_minimo']}><span className={classes.calculo_valor}>tiempo minimo</span></Tooltip>:
                        </span>
                          <span className={evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_minimo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_minimo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                            <span className= {evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                              Desempeño de tiempo = <span className={classes.evaluacion_excelente}>EXCELENTE</span>
                            </span>
                          </span>
                        
                        <span className= {evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_minimo'] && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si <Tooltip title={evaluacionCalculoData['tiempo_minimo']}><span className={classes.calculo_valor}>tiempo minimo</span></Tooltip> &#60; (<Tooltip title={evaluacionCalculoData['horas_tarea']}><span className={classes.calculo_valor}>horas de la tarea</span></Tooltip> <Tooltip title={evaluacionCalculoData['horas_tarea'] * 60}><span className={classes.calculo_valor}>&#42;</span></Tooltip> 60) <Tooltip title={(evaluacionCalculoData['horas_tarea'] * 60)/evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>/</span></Tooltip> <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip>   &#8804; <Tooltip title={evaluacionCalculoData['tiempo_medio']}><span className={classes.calculo_valor}>tiempo medio</span></Tooltip>:
                        </span>
                          <span className={evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_minimo'] && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_medio'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_minimo'] && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_medio'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                            <span className= {evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_minimo'] && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                              Desempeño de tiempo = <span className={classes.evaluacion_alto}>ALTO</span>
                            </span>
                          </span>

                        
                        <span className= {evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_medio'] && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si <Tooltip title={evaluacionCalculoData['tiempo_medio']}><span className={classes.calculo_valor}>tiempo medio</span></Tooltip> &#60; (<Tooltip title={evaluacionCalculoData['horas_tarea']}><span className={classes.calculo_valor}>horas de la tarea</span></Tooltip> <Tooltip title={evaluacionCalculoData['horas_tarea'] * 60}><span className={classes.calculo_valor}>&#42;</span></Tooltip> 60) <Tooltip title={(evaluacionCalculoData['horas_tarea'] * 60)/evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>/</span></Tooltip> <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip>   &#8804; <Tooltip title={evaluacionCalculoData['tiempo_maximo']}><span className={classes.calculo_valor}>tiempo máximo</span></Tooltip>:
                        </span>
                          <span className={evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_medio'] && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_medio'] && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                            <span className= {evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_medio'] && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] <= evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                              Desempeño de tiempo = <span className={classes.evaluacion_satisfactorio}>SATISFACTORIO</span>
                            </span>
                          </span>

                        <span className= {evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si (<Tooltip title={evaluacionCalculoData['horas_tarea']}><span className={classes.calculo_valor}>horas de la tarea</span></Tooltip> <Tooltip title={evaluacionCalculoData['horas_tarea'] * 60}><span className={classes.calculo_valor}>&#42;</span></Tooltip> 60) <Tooltip title={(evaluacionCalculoData['horas_tarea'] * 60)/evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>/</span></Tooltip> <Tooltip title={evaluacionCalculoData['unidades_tarea']}><span className={classes.calculo_valor}>unidades de la tarea</span></Tooltip>   &#62; <Tooltip title={evaluacionCalculoData['tiempo_maximo']}><span className={classes.calculo_valor}>tiempo máximo</span></Tooltip>:
                        </span>
                          <span className={evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                            <span className= {evaluacionCalculoData['unidades_tarea'] > 0 && (evaluacionCalculoData['horas_tarea'] * 60) / evaluacionCalculoData['unidades_tarea'] > evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                              Desempeño de tiempo = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                            </span>
                          </span>

                      <span className= {evaluacionCalculoData['unidades_tarea'] == 0  ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px'}}>
                        Si no tiene unidades:
                      </span>
                        <span className= {evaluacionCalculoData['unidades_tarea'] == 0 && evaluacionCalculoData['horas_tarea'] * 60 > evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si <Tooltip title={evaluacionCalculoData['horas_tarea']}><span className={classes.calculo_valor}>horas de la tarea</span></Tooltip> <Tooltip title={evaluacionCalculoData['horas_tarea'] * 60}><span className={classes.calculo_valor}>&#42;</span></Tooltip> 60 &#62; <Tooltip title={evaluacionCalculoData['tiempo_maximo']}><span className={classes.calculo_valor}>tiempo máximo</span></Tooltip>:
                        </span>
                          <span className={evaluacionCalculoData['unidades_tarea'] == 0 && evaluacionCalculoData['horas_tarea'] * 60 > evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['unidades_tarea'] == 0 && evaluacionCalculoData['horas_tarea'] * 60 > evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                            <span className= {evaluacionCalculoData['unidades_tarea'] == 0 && evaluacionCalculoData['horas_tarea'] * 60 > evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                              Desempeño de tiempo = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                            </span>
                          </span>
                        
                        <span className= {evaluacionCalculoData['unidades_tarea'] == 0 && evaluacionCalculoData['horas_tarea'] * 60 <= evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si no:
                        </span>
                          <span className={evaluacionCalculoData['unidades_tarea'] == 0 && evaluacionCalculoData['horas_tarea'] * 60 <= evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['unidades_tarea'] == 0 && evaluacionCalculoData['horas_tarea'] * 60 <= evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                            <span className= {evaluacionCalculoData['unidades_tarea'] == 0 && evaluacionCalculoData['horas_tarea'] * 60 <= evaluacionCalculoData['tiempo_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                              Desempeño de tiempo = SIN DATOS
                            </span>
                          </span>
                      

                    <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['tiene_tiempo_minimo'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '20px'}}>
                      Si no tiene objetivo mínimo:
                    </span>
                      <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['tiene_tiempo_minimo'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                        <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['tiene_tiempo_minimo'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                        <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['tiene_tiempo_minimo'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px' }}>
                          Desempeño de tiempo = N/A
                        </span>
                      </span>
                    
                <span className= {evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_enable : classes.calculo_disable } >
                  Si no tiene indicador:
                </span>
                  <span className={evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                    <span className={evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                    <span className= {evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '20px' }}>
                      Desempeño de tiempo = N/A
                    </span>
                  </span>
              </div>
            </div>
          )}
          {showExplicacionEntrada && (
            <div style = {{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style = {{display: 'flex',  flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center'}}>
                <span className= {evaluacionCalculoData['tiene_indicador'] == true ? classes.calculo_enable: classes.span}>
                  Si la tarea tiene indicador a 'Si':
                </span>
                  <span className= {evaluacionCalculoData['entrada'] == true ? classes.calculo_enable: classes.span} style= {{marginLeft: '20px'}}>
                    Si la tarea tiene entrada a 'Si':
                  </span>
                    <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true ? classes.calculo_enable: classes.span} style= {{marginLeft: '40px' }}>
                      Si su objetivo tiene definido % entrada minimo:
                    </span>
                      <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' ? classes.calculo_enable: classes.span} style= {{marginLeft: '40px' }}>
                        Si la tarea tiene compartida a 'Si':
                      </span>
                        <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si tiene registro de <Tooltip title={evaluacionCalculoData['registro_entrada'] == true ? evaluacionCalculoData['valor_entrada']: 'No tiene'}><span className={classes.calculo_valor}>entrada</span></Tooltip> para ese Mes y año:
                        </span>
                          <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['porcentaje_entrada']}><span className={classes.calculo_valor}>% entrada</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['entrada_minimo']}><span className={classes.calculo_valor}>% entrada minimo</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_minimo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_minimo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                              <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de % entrada = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                              </span>
                            </span>
                          <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_minimo'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['entrada_minimo']}><span className={classes.calculo_valor}>% entrada minimo</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['porcentaje_entrada']}><span className={classes.calculo_valor}>% entrada</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['entrada_medio']}><span className={classes.calculo_valor}>% entrada medio</span></Tooltip>:
                          </span>
                            
                            <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_minimo'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_medio'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_minimo'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_medio'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_minimo'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de % entrada = <span className={classes.evaluacion_satisfactorio}>SATISFACTORIO</span>
                              </span>
                            </span>

                          <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_medio'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['entrada_medio']}><span className={classes.calculo_valor}>% entrada medio</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['porcentaje_entrada']}><span className={classes.calculo_valor}>% entrada</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['entrada_maximo']}><span className={classes.calculo_valor}>% entrada máximo</span></Tooltip>:
                          </span>
                            
                            <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_medio'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_medio'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_medio'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de % entrada = <span className={classes.evaluacion_alto}>ALTO</span>
                              </span>
                            </span> 
                          
                          <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['porcentaje_entrada']}><span className={classes.calculo_valor}>% entrada</span></Tooltip> &#8805; <Tooltip title={evaluacionCalculoData['entrada_maximo']}><span className={classes.calculo_valor}>% entrada máximo</span></Tooltip>:
                          </span>

                            <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['registro_entrada'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de % entrada = <span className={classes.evaluacion_excelente}>EXCELENTE</span>
                              </span>
                            </span>  
                        <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['tiene_entrada_minimo'] == true  && evaluacionCalculoData['registro_entrada'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px'}}>
                          Si no tiene entrada compartida:
                        </span>
                          <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['registro_entrada'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                          <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['registro_entrada'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                          <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['compartida'] == 'SI' && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['registro_entrada'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Desempeño de % entrada = SIN DATOS
                          </span>
                        </span>
                      <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' ? classes.calculo_enable: classes.span} style= {{marginLeft: '40px' }}>
                        Si la tarea tiene compartida a 'No':
                      </span>
                        <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Si tiene registro de <Tooltip title={evaluacionCalculoData['registro_entrada_no_compartida'] == true ? evaluacionCalculoData['valor_entrada']: 'No tiene'}><span className={classes.calculo_valor}>entrada no compartida</span></Tooltip> para ese mes y año:
                        </span>
                          <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['porcentaje_entrada']}><span className={classes.calculo_valor}>% entrada</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['entrada_minimo']}><span className={classes.calculo_valor}>% entrada minimo</span></Tooltip>:
                          </span>
                            <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_minimo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_minimo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                              <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de % entrada = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                              </span>
                            </span>
                          <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_minimo'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['entrada_minimo']}><span className={classes.calculo_valor}>% entrada minimo</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['porcentaje_entrada']}><span className={classes.calculo_valor}>% entrada</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['entrada_medio']}><span className={classes.calculo_valor}>% entrada medio</span></Tooltip>:
                          </span>
                            
                            <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_minimo'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_medio'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_minimo'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_medio'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_minimo'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de % entrada = <span className={classes.evaluacion_satisfactorio}>SATISFACTORIO</span>
                              </span>
                            </span>

                          <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_medio'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['entrada_medio']}><span className={classes.calculo_valor}>% entrada medio</span></Tooltip> &#8804; <Tooltip title={evaluacionCalculoData['porcentaje_entrada']}><span className={classes.calculo_valor}>% entrada</span></Tooltip> &#60; <Tooltip title={evaluacionCalculoData['entrada_maximo']}><span className={classes.calculo_valor}>% entrada máximo</span></Tooltip>:
                          </span>
                            
                            <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_medio'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_medio'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_medio'] && evaluacionCalculoData['porcentaje_entrada'] < evaluacionCalculoData['entrada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de % entrada = <span className={classes.evaluacion_alto}>ALTO</span>
                              </span>
                            </span> 
                          
                          <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Si <Tooltip title={evaluacionCalculoData['porcentaje_entrada']}><span className={classes.calculo_valor}>% entrada</span></Tooltip> &#8805; <Tooltip title={evaluacionCalculoData['entrada_maximo']}><span className={classes.calculo_valor}>% entrada máximo</span></Tooltip>:
                          </span>

                            <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                              <span className={evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                              <span className= {evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['registro_entrada_no_compartida'] == true && evaluacionCalculoData['porcentaje_entrada'] >= evaluacionCalculoData['entrada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '100px' }}>
                                Desempeño de % entrada = <span className={classes.evaluacion_excelente}>EXCELENTE</span>
                              </span>
                            </span>

                      <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['tiene_entrada_minimo'] == true  && evaluacionCalculoData['registro_entrada_no_compartida'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px'}}>
                        Si no tiene entrada no compartida:
                      </span>
                        <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['registro_entrada_no_compartida'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                          <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['registro_entrada_no_compartida'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                          <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['compartida'] == 'NO' && evaluacionCalculoData['tiene_entrada_minimo'] == true && evaluacionCalculoData['registro_entrada_no_compartida'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '80px' }}>
                            Desempeño de % entrada = SIN DATOS
                          </span>
                        </span>


                    <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px'}}>
                      Si no:
                    </span>
                      <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                        <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                        <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == true && evaluacionCalculoData['tiene_entrada_minimo'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                          Desempeño de % entrada = N/A
                        </span>
                      </span>

                  <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '20px'}}>
                    Si no tiene entrada a 'SI':
                  </span>
                    <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                      <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                      <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['entrada'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px' }}>
                        Desempeño de % entrada = N/A
                      </span>
                    </span>  
                <span className= {evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_enable : classes.calculo_disable } >
                  Si no tiene indicador:
                </span>
                  <span className={evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                    <span className={evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                    <span className= {evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '20px' }}>
                      Desempeño de % entrada = N/A
                    </span>
                  </span>
              </div>
            </div>
          )}
          {showExplicacionJornada && (
            <div style = {{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style = {{display: 'flex',  flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center'}}>
                <span className= {evaluacionCalculoData['tiene_indicador'] == true ? classes.calculo_enable: classes.span}>
                  Si la tarea tiene indicador a 'Si':
                </span>
                  
                    <span className= {evaluacionCalculoData['tiene_jornada_minimo'] == true ? classes.calculo_enable: classes.span} style= {{marginLeft: '20px' }}>
                      Si su objetivo tiene definido % jornada minimo:
                    </span>
                        <span className= {evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px' }}>
                          Si (<Tooltip title={evaluacionCalculoData['horas_tarea']}><span className={classes.calculo_valor}>horas de la tarea</span></Tooltip> <Tooltip title={evaluacionCalculoData['horas_tarea'] * 100}><span className={classes.calculo_valor}>&#42;</span></Tooltip> 100) <Tooltip title={(evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta']}><span className={classes.calculo_valor}>/</span></Tooltip> <Tooltip title={evaluacionCalculoData['jornada_mensual_neta']}><span className={classes.calculo_valor}>jornada mensual neta</span></Tooltip>  &#8804; <Tooltip title={evaluacionCalculoData['jornada_minimo']}><span className={classes.calculo_valor}>% jornada minimo</span></Tooltip>:
                        </span>
                          <span className={evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_minimo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_minimo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                            <span className= {evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_minimo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                              Desempeño de % jornada = <span className={classes.evaluacion_excelente}>EXCELENTE</span>
                            </span>
                          </span>

                        <span className= {evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_minimo'] && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px' }}>
                          Si <Tooltip title={evaluacionCalculoData['jornada_minimo']}><span className={classes.calculo_valor}>% jornada minimo</span></Tooltip> &#60; (<Tooltip title={evaluacionCalculoData['horas_tarea']}><span className={classes.calculo_valor}>horas de la tarea</span></Tooltip> <Tooltip title={evaluacionCalculoData['horas_tarea'] * 100}><span className={classes.calculo_valor}>&#42;</span></Tooltip> 100) <Tooltip title={(evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta']}><span className={classes.calculo_valor}>/</span></Tooltip> <Tooltip title={evaluacionCalculoData['jornada_mensual_neta']}><span className={classes.calculo_valor}>jornada mensual neta</span></Tooltip>  &#8804; <Tooltip title={evaluacionCalculoData['jornada_medio']}><span className={classes.calculo_valor}>% jornada medio</span></Tooltip>:
                        </span>
                          <span className={evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_minimo'] && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_medio'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_minimo'] && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_medio'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                            <span className= {evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_minimo'] && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_medio'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                              Desempeño de % jornada = <span className={classes.evaluacion_alto}>ALTO</span>
                            </span>
                          </span> 
                      
                        <span className= {evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_medio'] && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px' }}>
                          Si <Tooltip title={evaluacionCalculoData['jornada_medio']}><span className={classes.calculo_valor}>% jornada medio</span></Tooltip> &#60; (<Tooltip title={evaluacionCalculoData['horas_tarea']}><span className={classes.calculo_valor}>horas de la tarea</span></Tooltip> <Tooltip title={evaluacionCalculoData['horas_tarea'] * 100}><span className={classes.calculo_valor}>&#42;</span></Tooltip> 100) <Tooltip title={(evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta']}><span className={classes.calculo_valor}>/</span></Tooltip> <Tooltip title={evaluacionCalculoData['jornada_mensual_neta']}><span className={classes.calculo_valor}>jornada mensual neta</span></Tooltip>  &#8804; <Tooltip title={evaluacionCalculoData['jornada_maximo']}><span className={classes.calculo_valor}>% jornada máximo</span></Tooltip>:
                        </span>
                          <span className={evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_medio'] && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_medio'] && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                            <span className= {evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_medio'] && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] <= evaluacionCalculoData['jornada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                              Desempeño de % jornada = <span className={classes.evaluacion_satisfactorio}>SATISFACTORIO</span>
                            </span>
                          </span>

                        <span className= {evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px' }}>
                          Si (<Tooltip title={evaluacionCalculoData['horas_tarea']}><span className={classes.calculo_valor}>horas de la tarea</span></Tooltip> <Tooltip title={evaluacionCalculoData['horas_tarea'] * 100}><span className={classes.calculo_valor}>&#42;</span></Tooltip> 100) <Tooltip title={(evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta']}><span className={classes.calculo_valor}>/</span></Tooltip> <Tooltip title={evaluacionCalculoData['jornada_mensual_neta']}><span className={classes.calculo_valor}>jornada mensual neta</span></Tooltip>  &#62; <Tooltip title={evaluacionCalculoData['jornada_maximo']}><span className={classes.calculo_valor}>% jornada máximo</span></Tooltip>:
                        </span>
                          <span className={evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_maximo'] ? classes.calculo_condicion_seleccionada: classes.span}>
                            <span className={evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_maximo'] ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>                          
                            <span className= {evaluacionCalculoData['tiene_jornada_minimo'] == true && (evaluacionCalculoData['horas_tarea'] * 100.0)/evaluacionCalculoData['jornada_mensual_neta'] > evaluacionCalculoData['jornada_maximo'] ? classes.calculo_enable: classes.span} style= {{ marginLeft: '60px' }}>
                              Desempeño de % jornada = <span className={classes.evaluacion_insatisfactorio}>INSATISFACTORIO</span>
                            </span>
                          </span>

                    <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['tiene_jornada_minimo'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '20px'}}>
                      Si no:
                    </span>
                      <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['tiene_jornada_minimo'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                        <span className={evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['tiene_jornada_minimo'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                        <span className= {evaluacionCalculoData['tiene_indicador'] == true && evaluacionCalculoData['tiene_jornada_minimo'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '40px' }}>
                          Desempeño de % jornada = N/A
                        </span>
                      </span>

                <span className= {evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_enable : classes.calculo_disable } >
                  Si no:
                </span>
                  <span className={evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_condicion_seleccionada: classes.span}>
                    <span className={evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_condicion_seleccionada_arrow: classes.span}></span>
                    <span className= {evaluacionCalculoData['tiene_indicador'] == false ? classes.calculo_enable: classes.span} style= {{ marginLeft: '20px' }}>
                      Desempeño de % jornada = N/A
                    </span>
                  </span>
              </div>
            </div>
          )}
        </GridContainer>
      }
    />
  )
}

export default ViewCalculoModal
