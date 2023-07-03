import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectDepartments from 'components/MultiSelectDepartments/MultiSelectDepartments'
import { DEPARTAMENT_LIST_RESET } from 'redux/constants/departamentConstants'
import { getDepartaments, getDepartamentsRelated } from 'redux/actions/departamentActions'
import styles from '../styles/multiSelectStyles'

const useStyles = makeStyles(styles)

const DepartamentoMultiSelect = ({ departamentosData, setDepartamentosData, relatedPositions = false }) => {
   const classes = useStyles()
   const dispatch = useDispatch()
   const [data, setData] = useState([])

   const { successDepartamentList, departaments } = useSelector(
      (state) => state.departamentList
   )

   const { successDepartamentRelatedList, departamentsRelated } = useSelector(
      (state) => state.departamentRelatedList
   )

   useEffect(() => {
      return () => dispatch({ type: DEPARTAMENT_LIST_RESET })
   }, [dispatch])

   useEffect(() => {
      if ( relatedPositions ) return

      if (!successDepartamentList) {
         dispatch(getDepartaments())
      } else {
         const filteredServices = departaments.filter((p) => p.codigo_departamento !== '')
         setData(filteredServices)
      }
   }, [successDepartamentList])

   useEffect(() => {
      if ( !relatedPositions ) return

      if (!successDepartamentRelatedList) {
         dispatch(getDepartamentsRelated())
      } else {
         const filteredServices = departamentsRelated.filter((p) => p.codigo_departamento !== '')
         setData(filteredServices)
      }
   }, [successDepartamentRelatedList])

   const handleChangeMultiData = (event) => {
      const {
         target: { value },
      } = event
      if (departamentosData.map((departamento) => departamento.id_departamento).indexOf(value[value.length - 1].id_departamento) === -1) {
         setDepartamentosData(value)
      } else {
         setDepartamentosData(departamentosData.filter((departamento) => departamento.id_departamento !== value[value.length - 1]?.id_departamento))
      }
   }

   return (
      <GridItem xs={12}>
         <MultiSelectDepartments
         label={'Departamentos'}
         data={data}
         multiData={departamentosData}
         handleChangeMultiData={handleChangeMultiData}
         />
      </GridItem>
   )
}

export default DepartamentoMultiSelect
