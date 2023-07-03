import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectServices from 'components/MultiSelectServices/MultiSelectServices'
import { SERVICE_LIST_RESET } from 'redux/constants/serviceConstants'
import { getServices, getServicesRelated } from 'redux/actions/serviceActions'
import styles from '../styles/multiSelectStyles'

const useStyles = makeStyles(styles)

const ServicioMultiSelect = ({ serviciosData, setServiciosData, relatedPositions = false }) => {
   const classes = useStyles()
   const dispatch = useDispatch()
   const [data, setData] = useState([])

   const { successServiceList, services } = useSelector(
      (state) => state.serviceList
   )

   const { successServiceRelatedList, servicesRelated } = useSelector(
      (state) => state.serviceRelatedList
   )

   useEffect(() => {
      return () => dispatch({ type: SERVICE_LIST_RESET })
   }, [dispatch])

   useEffect(() => {
      if ( relatedPositions ) return

      if (!successServiceList) {
         dispatch(getServices())
      } else {
         const filteredServices = services.filter((p) => p.codigo_servicio !== '')
         setData(filteredServices)
      }
   }, [successServiceList])

   useEffect(() => {
      if ( !relatedPositions ) return

      if (!successServiceRelatedList) {
         dispatch(getServicesRelated())
      } else {
         const filteredServices = servicesRelated.filter((p) => p.codigo_servicio !== '')
         setData(filteredServices)
      }
   }, [successServiceRelatedList])

   const handleChangeMultiData = (event) => {
      const {
         target: { value },
      } = event
      if (serviciosData.map((servicio) => servicio.id_servicio).indexOf(value[value.length - 1].id_servicio) === -1) {
         setServiciosData(value)
      } else {
         setServiciosData(serviciosData.filter((servicio) => servicio.id_servicio !== value[value.length - 1]?.id_servicio))
      }
   }

   return (
      <GridItem xs={12}>
         <MultiSelectServices
         label={'Servicios'}
         data={data}
         multiData={serviciosData}
         handleChangeMultiData={handleChangeMultiData}
         />
      </GridItem>
   )
}

export default ServicioMultiSelect
