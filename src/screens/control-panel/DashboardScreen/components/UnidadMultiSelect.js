import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectUnits from 'components/MultiSelectUnits/MultiSelectUnits'
import { UNIT_LIST_RESET } from 'redux/constants/unitConstants'
import { getUnits, getUnitsRelated } from 'redux/actions/unitActions'
import styles from '../styles/multiSelectStyles'

const useStyles = makeStyles(styles)

const UnidadMultiSelect = ({ unidadesData, setUnidadesData, relatedPositions = false }) => {
   const classes = useStyles()
   const dispatch = useDispatch()
   const [data, setData] = useState([])

   const { successUnitList, units } = useSelector(
      (state) => state.unitList
   )

   const { successUnitRelatedList, unitsRelated } = useSelector(
      (state) => state.unitRelatedList
   )

   useEffect(() => {
      return () => dispatch({ type: UNIT_LIST_RESET })
   }, [dispatch])

   useEffect(() => {
      if ( relatedPositions ) return

      if (!successUnitList) {
         dispatch(getUnits())
      } else {
         const filteredProfiles = units.filter((p) => p.codigo_unidad !== '')
         setData(filteredProfiles)
      }
   }, [successUnitList])

   useEffect(() => {
      if ( !relatedPositions ) return

      if (!successUnitRelatedList) {
         dispatch(getUnitsRelated())
      } else {
         const filteredProfiles = unitsRelated.filter((p) => p.codigo_unidad !== '')
         setData(filteredProfiles)
      }
   }, [successUnitRelatedList])

   const handleChangeMultiData = (event) => {
      const {
         target: { value },
      } = event
      if (unidadesData.map((unidad) => unidad.id_unidad).indexOf(value[value.length - 1].id_unidad) === -1) {
         setUnidadesData(value)
      } else {
         setUnidadesData(unidadesData.filter((unidad) => unidad.id_unidad !== value[value.length - 1]?.id_unidad))
      }
   }

   return (
      <GridItem xs={12}>
         <MultiSelectUnits
         label={'Unidades'}
         data={data}
         multiData={unidadesData}
         handleChangeMultiData={handleChangeMultiData}
         />
      </GridItem>
   )
}

export default UnidadMultiSelect
