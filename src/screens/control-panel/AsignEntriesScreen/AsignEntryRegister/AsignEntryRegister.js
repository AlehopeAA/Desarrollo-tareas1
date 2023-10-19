import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, format, subMonths, isValid } from 'date-fns'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Card, CardActions, CardContent, makeStyles } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import CustomInput from 'components/CustomInput/CustomInput'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import TaskEntriesSelect from './components/TaskEntriesSelect'
import { ENTRIES_LIST_BY_MANAGER_ID_RESET } from 'redux/constants/entriesConstants'
import {
  ENTRIES_REGISTER_RESET,
  ENTRIES_LIST_BY_TASK_ID_RESET,
} from 'redux/constants/entriesConstants'
import { getEntriesByTaskId, registerEntries } from 'redux/actions/entriesActions'
import { getConfiguracions } from 'redux/actions/configuracionActions'
import styles from './styles/asignEntryRegisterStyles'

const useStyles = makeStyles(styles)

const AsignEntryRegister = () => {
   const classes = useStyles()
   const dispatch = useDispatch()
   const [taskEntryId, setTaskEntryId] = useState('')
   const [newEntryNow, setNewEntryNow] = useState('')
   const [newEntryBack, setNewEntryBack] = useState('')
   const [alert, setAlert] = useState(null)
   const [entradaNow, setEntradaNow] = useState('')
   const [fechaNow, setFechaNow] = useState('')
   const [entradaBack, setEntradaBack] = useState('')
   const [fechaBack, setFechaBack] = useState('')
   const [componenteCompartidasNow, setComponenteCompartidasNow] = useState(<></>)
   const [componenteCompartidasBack, setComponenteCompartidasBack] = useState(<></>)
   const { configuracions, successConfiguracionList } = useSelector((state) => state.configuracionList)
   const [limitarEntradaMesAnterior, setLimitarEntradaMesAnterior] = useState('NO')

   const { loadingEntriesListByTaskId, entriesListByTaskId, successEntriesListByTaskId } = useSelector(
      (state) => state.entriesListByTaskId
   )
   const { loadingEntriesRegister, successEntriesRegister, errorEntriesRegister } = useSelector(
      (state) => state.entriesRegister
   )
   const { loadingEntriesUpdate, successEntriesUpdate, errorEntriesUpdate } = useSelector((state) => state.entriesUpdate)

   const initialState = {
      entradasCompNow: [],
      entradasCompBack: [],
      puestos: [],
   }

   const [entriesCompInfo, setEntriesCompInfo] = useState(initialState)

   useEffect(() => {

      return () => {
         resetData()
      }
   }, [])

   useEffect(() => {
      return () => dispatch({ type: ENTRIES_LIST_BY_TASK_ID_RESET })
   }, [dispatch])

   useEffect(() => {
      if (successEntriesListByTaskId) {
         setEntradaNow('')
         setEntradaBack('')
         setFechaNow('')
         setFechaBack('')
         entriesCompInfo.entradasCompNow = []
         entriesCompInfo.entradasCompBack = []
         entriesCompInfo.puestos = []
         entriesListByTaskId?.entriesCompNow?.map((item) => {       
            entriesCompInfo.puestos.push(item.id_puesto)
         })
         entriesListByTaskId?.entriesNow?.map((entryNow) => {       
            setEntradaNow(entryNow?.entrada)
            setFechaNow(entryNow?.fecha_ultima_modificacion)
         })
         entriesListByTaskId?.entriesBack?.map((entryBack) => {
            setEntradaBack(entryBack?.entrada)
            setFechaBack(entryBack?.fecha_ultima_modificacion)
         })
         if (entriesListByTaskId?.compartida[0].compartida == "NO") {
            construirCompartidasNow ()
            construirCompartidasBack ()
         }
      }
   }, [successEntriesListByTaskId])

   useEffect(() => {
      if (successConfiguracionList) {
         const currentDate = new Date()
         var limitarEntrada = 'NO'

         /* Se quita el control de mes anterior para que siempre salga <== comment
         const parametro_seleccionado = configuracions.filter((configuracion) => configuracion.parametro == 'registro_actividad' )[0];
         if(currentDate.getDate() > parametro_seleccionado.valor) {
            //No se permite entrada en mes anterior
            limitarEntrada = 'SI';
         }
         else {
            //Se permite entrada de mes anterior
            limitarEntrada = 'NO';
         }
         */
         setLimitarEntradaMesAnterior(limitarEntrada)
      }
      else {
         dispatch(getConfiguracions())
      }
      
   }, [successConfiguracionList])

   const construirCompartidasNow = () => {
      var listado = []
         for(let i = 0; i < entriesListByTaskId?.entriesCompNow.length; i++) {
         listado.push(     
            <GridContainer>                 
               <GridItem xs={3}>
               <GridContainer>
                  <GridItem xs={12} className={classes.boxConfig}>
                     {`${entriesListByTaskId?.entriesCompNow[i].nombre} ${entriesListByTaskId?.entriesCompNow[i].apellido1} ${entriesListByTaskId?.entriesCompNow[i].apellido2 || ''}` }
                  </GridItem>
               </GridContainer>
               </GridItem>
               <GridItem xs={3}>
               <GridContainer>
                  <GridItem xs={12} className={classes.boxConfig}>
                     {entriesListByTaskId?.entriesCompNow[i].entrada || '0'}
                  </GridItem>
               </GridContainer>
               </GridItem>
               <GridItem xs={3}>
               <GridContainer>
                  <GridItem xs={12} className={classes.boxConfig}>
                  {isValid(entriesListByTaskId?.entriesCompNow[i].fecha_ultima_modificacion && new Date(entriesListByTaskId?.entriesCompNow[i].fecha_ultima_modificacion))
                     ? format(new Date(entriesListByTaskId?.entriesCompNow[i].fecha_ultima_modificacion), 'dd/MM/yyyy')
                     : ' '}
                  </GridItem>            
               </GridContainer>
               </GridItem>
               <GridItem xs={3}>
               <GridContainer>
                  <GridItem xs={12}>
                     <CustomInput
                     id='current'
                     formControlProps={{
                        fullWidth: true,
                     }}
                     inputProps={{
                        value: entriesCompInfo.entradasCompNow[i],
                        onChange: (e) => { entriesCompInfo.entradasCompNow[i] = e.target.value},
                        maxLength: 3,
                        type: 'text',
                     }}
                     />
                  </GridItem>
               </GridContainer>
               </GridItem>
            </GridContainer>
         )
         }
         setComponenteCompartidasNow(listado) // <==
   }

   const construirCompartidasBack = () => {
      var listado = []
         for(let i = 0; i < entriesListByTaskId?.entriesCompBack.length; i++) {
         listado.push(     
            <GridContainer>                 
               <GridItem xs={3}>
               <GridContainer>
                  <GridItem xs={12} className={classes.boxConfig}>
                     {`${entriesListByTaskId?.entriesCompBack[i].nombre} ${entriesListByTaskId?.entriesCompBack[i].apellido1} ${entriesListByTaskId?.entriesCompBack[i].apellido2 || ''}` }
                  </GridItem>
               </GridContainer>
               </GridItem>
               <GridItem xs={3}>
               <GridContainer>
                  <GridItem xs={12} className={classes.boxConfig}>
                     {entriesListByTaskId?.entriesCompBack[i].entrada || '0'}
                  </GridItem>
               </GridContainer>
               </GridItem>
               <GridItem xs={3}>
               <GridContainer>
                  <GridItem xs={12} className={classes.boxConfig}>
                  {isValid(entriesListByTaskId?.entriesCompBack[i].fecha_ultima_modificacion && new Date(entriesListByTaskId?.entriesCompBack[i].fecha_ultima_modificacion))
                     ? format(new Date(entriesListByTaskId?.entriesCompBack[i].fecha_ultima_modificacion), 'dd/MM/yyyy')
                     : ' '}
                  </GridItem>            
               </GridContainer>
               </GridItem>
               <GridItem xs={3}>
               <GridContainer>
                  <GridItem xs={12}>
                     <CustomInput
                     id='current'
                     formControlProps={{
                        fullWidth: true,
                     }}
                     inputProps={{
                        value: entriesCompInfo.entradasCompBack[i],
                        onChange: (e) => { entriesCompInfo.entradasCompBack[i] = e.target.value},
                        maxLength: 3,
                        type: 'text',
                     }}
                     />
                  </GridItem>
               </GridContainer>
               </GridItem>
            </GridContainer>
         )
         }
         setComponenteCompartidasBack(listado) // <==
   }

   useEffect(() => {
      if (successEntriesRegister) {
         setTaskEntryId('')
         setAlert(
         <SweetAlert
            success
            style={{ display: 'block', marginTop: '-100px' }}
            title='Hecho!'
            onConfirm={() => confirmSuccess()}
            onCancel={() => confirmSuccess()}
            confirmBtnCssClass={classes.confirmBtnCssClass}
         >
            'Entrada registrada correctamente'
         </SweetAlert>
         )
      }
   }, [successEntriesRegister])

   const confirmSuccess = () => {
      dispatch({ type: ENTRIES_REGISTER_RESET })
      dispatch({ type: ENTRIES_LIST_BY_TASK_ID_RESET })
      dispatch({ type: ENTRIES_LIST_BY_MANAGER_ID_RESET })
      setEntradaNow('')
      setEntradaBack('')
      setFechaNow('')
      setFechaBack('')
      setNewEntryNow('')
      setNewEntryBack('')
      setTaskEntryId('')
      entriesCompInfo.entradasCompNow = []
      entriesCompInfo.entradasCompBack = []
      entriesCompInfo.puestos = []
      setAlert(false)
   }

   const handleEntries = (e) => {
      e.preventDefault()
      
      const entradaCompNow = entriesCompInfo.entradasCompNow.length && entriesCompInfo.entradasCompNow.some(value => value !== "")
         ? entriesCompInfo.entradasCompNow
         : []

      const entradaCompBack = entriesCompInfo.entradasCompBack.length && entriesCompInfo.entradasCompBack.some(value => value !== "")
         ? entriesCompInfo.entradasCompBack
         : []

      

      dispatch(
         registerEntries({
            id_tarea: taskEntryId,
            entradaNow: newEntryNow,
            entradaBack: newEntryBack,
            entradaCompNow,
            entradaCompBack,
            puestos: entriesCompInfo.puestos,
         })
      )
   }

   const resetData = () => {
      dispatch({ type: ENTRIES_REGISTER_RESET })
      dispatch({ type: ENTRIES_LIST_BY_TASK_ID_RESET })
      dispatch({ type: ENTRIES_LIST_BY_MANAGER_ID_RESET })
   }

   return (
      <GridContainer>
         <GridItem xs={12} md={8} className={classes.rootItem}>
         <GridContainer>
            <TaskEntriesSelect setTaskEntryId={setTaskEntryId} taskEntryId={taskEntryId} />
            <GridItem xs={4}>
               <Button
               disabled={!taskEntryId}
               color='primary'
               onClick={() => {
                  resetData()
                  dispatch(getEntriesByTaskId(taskEntryId))
               }}
               >
               Buscar Entradas
               </Button>
            </GridItem>
         </GridContainer>
         {loadingEntriesListByTaskId ? (
            <>Cargando entradas</>
         ) : ( entriesListByTaskId && (
               <form onSubmit={handleEntries}>
                  <Card className={classes.card}>
                     <CardContent>
                     {entriesListByTaskId.compartida[0].compartida == 'SI' && (
                        <GridContainer>
                           <GridItem xs={3}>Fecha</GridItem>
                           <GridItem xs={3}>Entrada Actual</GridItem>
                           <GridItem xs={3}>Fecha Ult.Mod</GridItem>
                           <GridItem xs={3}>Entrada a Añadir</GridItem>

                           <GridItem xs={3}>
                              <GridContainer>
                                 <GridItem xs={12} className={classes.boxConfig}>
                                 {format(new Date(), 'MM/yyyy')}
                                 </GridItem>
                                 {
                                    limitarEntradaMesAnterior == 'NO'
                                    && (
                                       <GridItem xs={12} className={classes.boxConfig}>
                                          {format(subMonths(new Date(), 1), 'MM/yyyy')}
                                       </GridItem>
                                    )
                                 }
                              </GridContainer>
                           </GridItem>

                           <GridItem xs={3}>
                              <GridContainer>
                                 <GridItem xs={12} className={classes.boxConfig}>
                                 {entradaNow || '0'}
                                 </GridItem>
                                 {
                                    limitarEntradaMesAnterior == 'NO'
                                    && (
                                       <GridItem xs={12} className={classes.boxConfig}>
                                          {entradaBack || 0}
                                       </GridItem>
                                    )
                                 }
                              </GridContainer>
                           </GridItem>
                           <GridItem xs={3}>
                              <GridContainer>
                                 <GridItem xs={12} className={classes.boxConfig}>
                                 {isValid(fechaNow && new Date(fechaNow))
                                    ? format(new Date(fechaNow), 'dd/MM/yyyy')
                                    : ' '}
                                 </GridItem>
                                 {
                                    limitarEntradaMesAnterior == 'NO'
                                    && (
                                       <GridItem xs={12} className={classes.boxConfig}>
                                       {isValid(fechaBack && new Date(fechaBack))
                                             ? format(new Date(fechaBack), 'dd/MM/yyyy')
                                             : ' '}
                                       </GridItem>
                                    )
                                 }
                              </GridContainer>
                           </GridItem>
                           <GridItem xs={3}>
                              <GridContainer>
                                 <GridItem xs={12}>
                                    <CustomInput
                                       id='current'
                                       formControlProps={{
                                          fullWidth: true,
                                       }}
                                       inputProps={{
                                          value: newEntryNow,
                                          onChange: (e) => setNewEntryNow(e.target.value),
                                          maxLength: 3,
                                          type: 'text',
                                       }}
                                    />
                                 </GridItem>
                                 {
                                    limitarEntradaMesAnterior == 'NO'
                                    && (
                                       <GridItem xs={12}>
                                          <CustomInput
                                             id='back'
                                             formControlProps={{
                                             fullWidth: true,
                                             }}
                                             inputProps={{
                                             value: newEntryBack,
                                             onChange: (e) => setNewEntryBack(e.target.value),
                                             maxLength: 3,
                                             type: 'text',
                                             }}
                                          />
                                       </GridItem>
                                    )
                                 }
                              </GridContainer>
                           </GridItem>
                        </GridContainer>
                     )}
                     {entriesListByTaskId.compartida[0].compartida == 'NO' && ( // <==
                        <GridContainer>
                           <GridItem xs={12} md={12}>
                              <Typography variant='body1' gutterBottom>
                                 FECHA: <b>{format(new Date(), 'MM/yyyy')}</b>
                              </Typography>
                           </GridItem>
                           <GridItem xs={3}>Puesto</GridItem>
                           <GridItem xs={3}>Entrada Actual</GridItem>
                           <GridItem xs={3}>Fecha Ult.Mod</GridItem>
                           <GridItem xs={3}>Entrada a Añadir</GridItem>
                        </GridContainer>
                     )}
                     {entriesListByTaskId.compartida[0].compartida == 'NO' && ( // <==
                        componenteCompartidasNow
                     )}
                     {entriesListByTaskId.compartida[0].compartida == 'NO' && limitarEntradaMesAnterior == 'NO' && ( // <==                  
                        <GridContainer>                    
                           <GridItem xs={12} md={12}>
                              <Typography variant='body1' gutterBottom>
                                 <hr
                                    style={{
                                       color: '#000000',
                                       backgroundColor: '#000000',
                                       height: .5,
                                       borderColor : '#000000'
                                    }}
                                 />
                                 FECHA: <b>{format(subMonths(new Date(), 1), 'MM/yyyy')}</b>
                              </Typography>
                           </GridItem>
                           <GridItem xs={3}>Puesto</GridItem>
                           <GridItem xs={3}>Entrada Actual</GridItem>
                           <GridItem xs={3}>Fecha Ult.Mod</GridItem>
                           <GridItem xs={3}>Entrada a Añadir</GridItem>
                        </GridContainer>
                     )}
                     {entriesListByTaskId.compartida[0].compartida == 'NO' && limitarEntradaMesAnterior == 'NO' && ( // <==
                        componenteCompartidasBack
                     )}
                        
                     </CardContent>
                     
                     <CardActions>
                        <GridContainer>
                           {errorEntriesRegister && (
                              <GridItem xs={12}>
                                 <SnackbarContent message={errorEntriesRegister} color='danger' />
                              </GridItem>
                           )}

                           <GridItem xs={6}>      
                              <Button block color='primary' onClick={confirmSuccess}>
                                 Cancelar
                              </Button>
                           </GridItem>

                           <GridItem xs={6}>
                              <Button block color='primary' type='submit' disabled={entriesListByTaskId.compartida[0].compartida == 'SI' && !newEntryNow && !newEntryBack}>
                              {loadingEntriesRegister
                                 ? 'Guardando Entrada'
                                 : successEntriesRegister
                                    ? 'Entrada Guardada'                      
                                    : 'Guardar'}
                              </Button>
                           </GridItem>
                        </GridContainer>               
                     </CardActions>
                  </Card>
               </form>    
            ) 
         )}
         </GridItem>
         {alert}      
      </GridContainer>
   )
}

export default AsignEntryRegister
