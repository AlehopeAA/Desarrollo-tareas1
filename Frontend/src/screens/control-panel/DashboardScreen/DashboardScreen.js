import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, makeStyles, Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardIcon from 'components/Card/CardIcon'
import CardBody from 'components/Card/CardBody'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import ProfileMultiSelect from './components/ProfileMultiSelect'
import SubdireccionMultiSelect from './components/SubdireccionMultiSelect'
import ServicioMultiSelect from './components/ServicioMultiSelect'
import DepartamentoMultiSelect from './components/DepartamentoMultiSelect'
import UnidadMultiSelect from './components/UnidadMultiSelect'
import RolMultiSelect from './components/RolMultiSelect'
import { getDashboard } from 'redux/actions/dashboardActions'
import { DASHBOARD_INFO_RESET } from 'redux/constants/dashboardConstants'
import styles from './styles/dashboardStyle'
import GraficoSector from './components/GraficoSector'

const useStyles = makeStyles(styles)

const DashboardScreen = ({ history }) => {
   const classes = useStyles()
   const dispatch = useDispatch()

   const maxDate = new Date( (new Date()).setMonth((new Date()).getMonth() - 1) )

   const initialState = {
      fecha_seleccionada: maxDate,  
      perfiles_seleccionados: [],
      subdirecciones_seleccionados: [],
      servicios_seleccionados: [],
      departamentos_seleccionados: [],
      unidades_seleccionados: [],
      roles_seleccionados: [],
   }

   const [data, setData] = useState([])
   const [consultaInfo, setConsultaInfo] = useState(initialState)
   const [successInformeConsulta, setSuccessInformeConsulta] = useState(false)
   const colores_sector = {'insatisfactorio': '#FF0000', 'satisfactorio': '#92D050', 'alto': '#00B050', 'excelente': '#00B0F0', 'registradas': '#00B050', 'no_registradas': '#FF0000' }
   const { loadingDashboard, dashboardData, successDashboard, errorDashboard } = useSelector((state) => state.dashboardList)  

   useEffect(() => {
      if (!successDashboard) {
         dispatch({ type: DASHBOARD_INFO_RESET })
      }
      else {
         const sectores = dashboardData.map((item) => {
         if(item.datosPuestoNivelSubdireccion) {
            item.datosPuestoNivelSubdireccion.map((dato) => {
               if(dato.title == 'Insatisfactorios') {
                  dato.color = colores_sector.insatisfactorio
               }
               if(dato.title == 'Satisfactorios') {
                  dato.color = colores_sector.satisfactorio
               }
               if(dato.title == 'Altos') {
                  dato.color = colores_sector.alto
               }
               if(dato.title == 'Excelentes') {
                  dato.color = colores_sector.excelente
               }
            })
         }

         if(item.datosPuestoNivelTareaSubdireccion) {
            item.datosPuestoNivelTareaSubdireccion.map((dato) => {
               if(dato.title == 'Insatisfactorios') {
                  dato.color = colores_sector.insatisfactorio
               }
               if(dato.title == 'Satisfactorios') {
                  dato.color = colores_sector.satisfactorio
               }
               if(dato.title == 'Altos') {
                  dato.color = colores_sector.alto
               }
               if(dato.title == 'Excelentes') {
                  dato.color = colores_sector.excelente
               }
            })
         }

         if(item.datosTareaNivelSubdireccion) {
            item.datosTareaNivelSubdireccion.map((dato) => {
               if(dato.title == 'Insatisfactorios') {
                  dato.color = colores_sector.insatisfactorio
               }
               if(dato.title == 'Satisfactorios') {
                  dato.color = colores_sector.satisfactorio
               }
               if(dato.title == 'Altos') {
                  dato.color = colores_sector.alto
               }
               if(dato.title == 'Excelentes') {
                  dato.color = colores_sector.excelente
               }
            })
         }

         if(item.datosCargaSubdireccion) {
            item.datosCargaSubdireccion.map((dato) => {
               if(dato.title == '% Registradas') {
                  dato.color = colores_sector.registradas
               }
               if(dato.title == '% No Registradas') {
                  dato.color = colores_sector.no_registradas
               }
            })
         }

         return {
            ...item,
         }
         })
         setData(sectores)
      }
   }, [successDashboard])

   const handleRealizarConsulta = (e) => {
      e.preventDefault()
      
      const filter = {
         mes: consultaInfo.fecha_seleccionada.getMonth() + 1,
         anio: consultaInfo.fecha_seleccionada.getFullYear(),
         
         perfiles_seleccionados: [],
         subdirecciones_seleccionados: [],
         servicios_seleccionados: [],
         departamentos_seleccionados: [],
         unidades_seleccionados: [],
         roles_seleccionados: [],
      }

      consultaInfo.perfiles_seleccionados.map((perfil) => filter.perfiles_seleccionados.push(perfil.id_perfil))
      consultaInfo.subdirecciones_seleccionados.map((subdireccion) => filter.subdirecciones_seleccionados.push(subdireccion.id_subdireccion))
      consultaInfo.servicios_seleccionados.map((servicio) => filter.servicios_seleccionados.push(servicio.id_servicio))
      consultaInfo.departamentos_seleccionados.map((departamento) => filter.departamentos_seleccionados.push(departamento.id_departamento))
      consultaInfo.unidades_seleccionados.map((unidad) => filter.unidades_seleccionados.push(unidad.id_unidad))
      consultaInfo.roles_seleccionados.map((rol) => filter.roles_seleccionados.push(rol.id_rol))

      dispatch(getDashboard(filter))
   } 

   const handleLimpiarConsulta = (e) => {
      e.preventDefault()
      setSuccessInformeConsulta(false)
      setConsultaInfo(initialState)
      dispatch({ type: DASHBOARD_INFO_RESET })
   }

   return (
      <div>
         <GridContainer>
         <GridItem xs={12} className={classes.rootItem}>
            <Card>
               <CardBody>
               <form onSubmit={handleRealizarConsulta}>
                  {/* SELECTORES */}
                  <GridContainer>
                     {/* MES - AÑO */}
                     <GridItem xs={12} md={6}>
                        <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                           <KeyboardDatePicker
                              disableToolbar
                              format="MM/yyyy"
                              views={["year", "month"]}
                              margin="normal"
                              maxDate={maxDate}
                              id="date-picker-inline"
                              label="Mes y Año *"
                              value={consultaInfo.fecha_seleccionada}
                              onChange={(e) => setConsultaInfo({ ...consultaInfo, fecha_seleccionada: e })}
                              KeyboardButtonProps={{
                                 "aria-label": "change date"
                              }}
                              style={{width:"100%"}}
                           />
                        </MuiPickersUtilsProvider>
                     </GridItem>
                     {/* PERFILES */}
                     <GridItem xs={12} md={6}>
                        <ProfileMultiSelect 
                           profilesData={consultaInfo.perfiles_seleccionados} 
                           setProfilesData={(e) => setConsultaInfo({ ...consultaInfo, perfiles_seleccionados: e })}
                           byPosition
                        />        
                     </GridItem>
                     {/* SUBDIRECCIONES */}
                     <GridItem xs={12} md={6}>
                        <SubdireccionMultiSelect 
                           subdireccionesData={consultaInfo.subdirecciones_seleccionados} 
                           setSubdireccionesData={(e) => setConsultaInfo({ ...consultaInfo, subdirecciones_seleccionados: e })}
                           relatedPositions
                        />
                     </GridItem>
                     {/* SERVICIOS */}
                     <GridItem xs={12} md={6}>
                        <ServicioMultiSelect 
                           serviciosData={consultaInfo.servicios_seleccionados} 
                           setServiciosData={(e) => setConsultaInfo({ ...consultaInfo, servicios_seleccionados: e })}
                           relatedPositions
                        />
                     </GridItem>
                     {/* DEPARTAMENTOS */}
                     <GridItem xs={12} md={6}>
                        <DepartamentoMultiSelect 
                           departamentosData={consultaInfo.departamentos_seleccionados} 
                           setDepartamentosData={(e) => setConsultaInfo({ ...consultaInfo, departamentos_seleccionados: e })} 
                           relatedPositions
                        />
                     </GridItem>
                     {/* UNIDADES */}
                     <GridItem xs={12} md={6}>
                        <UnidadMultiSelect 
                           unidadesData={consultaInfo.unidades_seleccionados} 
                           setUnidadesData={(e) => setConsultaInfo({ ...consultaInfo, unidades_seleccionados: e })}
                           relatedPositions
                        />
                     </GridItem>
                     {/* ROLES */}
                     <GridItem xs={12} md={6}>
                        <RolMultiSelect 
                           rolesData={consultaInfo.roles_seleccionados} 
                           setRolesData={(e) => setConsultaInfo({ ...consultaInfo, roles_seleccionados: e })}
                           relatedPositions
                        />
                     </GridItem>
                  </GridContainer>

                  {/* ERRORES */}
                  {errorDashboard && (
                     <GridContainer>
                     <GridItem xs={12}>
                        <SnackbarContent message={errorDashboard} color='danger' />
                     </GridItem>
                     </GridContainer>
                  )}
                  {/* LIMPIAR */}
                  <Button type='submit' color='primary' className={classes.informeButton} onClick={handleLimpiarConsulta}>
                     Limpiar
                  </Button>
                  {/* FILTRAR */}
                  <Button type='submit' color='primary' className={classes.informeButton}>
                     {loadingDashboard ? 'Realizando consulta...' : 'Filtrar'}
                  </Button>
               </form>
               </CardBody>
            </Card>
         </GridItem>
         </GridContainer>
      
         {successDashboard &&
            data.map((subdirection, index) => (
               <GridContainer>
               <GridItem xs={12}>
                  <h6 className={classes.cardCategory}>{subdirection.descripcion_subdireccion}</h6>
               </GridItem>
               <GridItem xs={12} lg={6}>
                  <Card pricing>
                     <CardBody pricing>
                     <p className={classes.categoriaGrafico}>Nº DE PUESTOS DE TRABAJO: </p>
                     <p className={classes.descripcionCategoriaGrafico}>Distribución de puestos de trabajo por nivel de desempeño por subdirección/Agencia.</p>
                     <GraficoSector datosSector={subdirection.datosPuestoNivelSubdireccion} />
                     </CardBody>
                  </Card>
               </GridItem>
               <GridItem xs={12} lg={6}>
                  <Card pricing>
                     <CardBody pricing>
                     <p className={classes.categoriaGrafico}>Nº DE PUESTOS DE TRABAJO: </p>
                     <p className={classes.descripcionCategoriaGrafico}>Distribución de puestos de trabajo por nivel de desempeño específicos de tareas por subdirección/Agencia.</p>
                     <GraficoSector datosSector={subdirection.datosPuestoNivelTareaSubdireccion} />
                     </CardBody>
                  </Card>
               </GridItem>
               <GridItem xs={12} lg={6}>
                  <Card pricing>
                     <CardBody pricing>
                     <p className={classes.categoriaGrafico}>Nº DE TAREAS: </p>
                     <p className={classes.descripcionCategoriaGrafico}>Distribución de tareas por nivel de desempeño por subdirección/Agencia.</p>
                     <GraficoSector datosSector={subdirection.datosTareaNivelSubdireccion} />
                     </CardBody>
                  </Card>
               </GridItem>
               <GridItem xs={12} lg={6}>
                  <Card pricing>
                     <CardBody pricing>
                     <p className={classes.categoriaGrafico}>% DE HORAS REGISTRADAS/HORAS REGISTRABLES: </p>
                     <p className={classes.descripcionCategoriaGrafico}>(CARGA DE TRABAJO) por subdirección/Agencia.</p>
                     <GraficoSector datosSector={subdirection.datosCargaSubdireccion} />
                     </CardBody>
                  </Card>
               </GridItem>
               </GridContainer>
            ))
         }
         
      </div>
   )
}

export default DashboardScreen
