import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectSubdirections from 'components/MultiSelectSubdirections/MultiSelectSubdirections'
import { SUBDIRECTION_LIST_RESET } from 'redux/constants/subdirectionConstants'
import { getSubdirections, getSubdirectionsRelated } from 'redux/actions/subdirectionActions'
import styles from '../styles/multiSelectStyles'

const useStyles = makeStyles(styles)

const SubdireccionMultiSelect = ({ subdireccionesData, setSubdireccionesData, relatedPositions = false }) => {
   const classes = useStyles()
   const dispatch = useDispatch()
   const [data, setData] = useState([])

   const { successSubdirectionList, loadingSubdirectionList, subdirections, errorSubdirectionList = false } = useSelector(
      (state) => state.subdirectionList
   )

   const { successSubdirectionRelatedList, loadingSubdirectionRelatedList, subdirectionsRelated, errorSubdirectionRelatedList } = useSelector(
      (state) => state.subdirectionRelatedList
   )

   useEffect(() => {
      return () => dispatch({ type: SUBDIRECTION_LIST_RESET })
   }, [dispatch])

   useEffect(() => {
      if ( relatedPositions ) return

      if ( !successSubdirectionList ) {
         dispatch(getSubdirections())
      } else {
         const filteredProfiles = subdirections.filter((p) => p.codigo_subdireccion !== '')
         setData(filteredProfiles)
      }
   }, [successSubdirectionList])

   useEffect(() => {
      if ( !relatedPositions ) return

      if ( !successSubdirectionRelatedList ) {
         dispatch(getSubdirectionsRelated({ relatedPositions }))
      } else {
         const filteredProfiles = subdirectionsRelated.filter((p) => p.codigo_subdireccion !== '')
         setData(filteredProfiles)
      }
   }, [successSubdirectionRelatedList])

   const handleChangeMultiData = (event) => {
      const {
         target: { value },
      } = event
      if (subdireccionesData.map((subdireccion) => subdireccion.id_subdireccion).indexOf(value[value.length - 1].id_subdireccion) === -1) {
         setSubdireccionesData(value)
      } else {
         setSubdireccionesData(subdireccionesData.filter((subdireccion) => subdireccion.id_subdireccion !== value[value.length - 1]?.id_subdireccion))
      }
   }

   return (
      <GridItem xs={12}>
         <MultiSelectSubdirections
         label={'Subdirecciones'}
         data={data}
         multiData={subdireccionesData}
         handleChangeMultiData={handleChangeMultiData}
         />
      </GridItem>
   )
}

export default SubdireccionMultiSelect
