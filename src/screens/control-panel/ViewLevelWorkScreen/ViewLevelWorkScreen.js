import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import styles from './styles/viewLevelWorkScreenStyles'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import ReactTable from 'components/ReactTable/ReactTable'
import { Tooltip } from '@material-ui/core'

import { getCurrentEvaluacion } from 'redux/actions/evaluacionActions'



const useStyles = makeStyles(styles)

const ViewObjectivesScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    successEvaluacionCurrent,
    evaluacionCurrentData,
  } = useSelector((state) => state.evaluacionCurrent)
  
  useEffect(() => {
    if (!successEvaluacionCurrent) {
      dispatch(getCurrentEvaluacion(false))
    }
  }, [dispatch, successEvaluacionCurrent])

  return (
    <>
      {successEvaluacionCurrent && (
        <>
          <GridContainer>
            <GridItem xs={12} className={classes.rootItem} >
              <Card>
                <CardBody>
                    <GridContainer>
                      <GridItem xs={12} md={12}>
                        <span className={classes.informacion_evaluacion}>MES: </span>
                        <span className={classes.informacion_evaluacion_valor}>{evaluacionCurrentData.mes}</span>
                      </GridItem>

                      <GridItem xs={12} md={12}>
                        <span className={classes.informacion_evaluacion}>Jornada laboral (mensual): </span>
                        <span className={classes.informacion_evaluacion_valor}>{evaluacionCurrentData.jornada_laboral_mensual}</span>
                      </GridItem>

                      <GridItem xs={12} md={12}>
                        <span className={classes.informacion_evaluacion}>Horas Trabajadas: </span>
                        <span className={classes.informacion_evaluacion_valor }>{evaluacionCurrentData.horas_registradas}</span>
                      </GridItem>

                      <GridItem xs={12} md={12}>
                        <span className={classes.informacion_evaluacion}>% Carga de Trabajo:  </span>
                        <span className={evaluacionCurrentData.nivel_carga == 'EXCELENTE'? classes.evaluacion_excelente : evaluacionCurrentData.nivel_carga == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : evaluacionCurrentData.nivel_carga == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{evaluacionCurrentData.porcentaje_carga ? `${evaluacionCurrentData.porcentaje_carga} %`: ''} {evaluacionCurrentData.nivel_carga ? evaluacionCurrentData.nivel_carga : ''}</span>
                      </GridItem>
                    </GridContainer>
                </CardBody>
              </Card>
            </GridItem>


            <GridItem xs={12} className={classes.rootItem}>
              <Card>
                <CardBody>
                  <ReactTable
                      columns={[
                        {
                          Header: 'TIPO TAREA',
                          accessor: 'tipo_tarea',
                        },
                        {
                          Header: 'TAREA',
                          accessor: 'descripcion_tarea',
                          Cell: ({ value }) => <Tooltip title={value} placement="bottom"><span>{value}</span></Tooltip>
                        },
                        {
                          Header: 'DIFICULTAD',
                          accessor: 'nivel_dificultad',
                          Cell: ({ value, row }) => <span>{row.original.dificultad == 'SI'? value : ''}</span>
                        },
                        {
                          Header: 'HORAS DEDICADAS',
                          accessor: 'horas',
                        },
                        {
                          Header: 'UNIDADES',
                          accessor: 'unidades',
                        },
                        {
                          Header: 'DESEMPEÑO UNIDADES',
                          accessor: 'nivel_unidades',
                          Cell: ({ value }) => <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{value}</span>
                        },
                        {
                          Header: 'DESEMPEÑO TIEMPO',
                          accessor: 'nivel_tiempo',
                          Cell: ({ value }) => <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{value}</span>
                        },
                        {
                          Header: 'DESEMPEÑO % ENTRADA',
                          accessor: 'nivel_porcentaje_entrada',
                          Cell: ({ value }) => <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{value}</span>
                        },
                        {
                          Header: 'DESEMPEÑO % JORNADA',
                          accessor: 'nivel_porcentaje_jornada',
                          Cell: ({ value }) => <span className={value == 'EXCELENTE'? classes.evaluacion_excelente : value == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : value == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{value}</span>
                        },
                      ]}
                      data={evaluacionCurrentData.detalles}
                  />  
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </>
      )}
      <GridContainer xs={12} style={{ marginTop: '20px', justifyContent: 'center' }}>
        <GridItem>
          <NavLink to={'/admin/user-page'} >
            <Button color='primary'>
              Volver
            </Button>
          </NavLink>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default ViewObjectivesScreen
