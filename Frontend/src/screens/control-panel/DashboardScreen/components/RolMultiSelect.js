import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectRoles from 'components/MultiSelectRoles/MultiSelectRoles'
import { ROLE_LIST_RESET } from 'redux/constants/roleConstants'
import { getRoles, getRolesRelated } from 'redux/actions/roleActions'
import styles from '../styles/multiSelectStyles'

const useStyles = makeStyles(styles)

const RolMultiSelect = ({ rolesData, setRolesData, relatedPositions = false }) => {
   const classes = useStyles()
   const dispatch = useDispatch()
   const [data, setData] = useState([])

   const { successRoleList, roles } = useSelector(
      (state) => state.roleList
   )

   const { successRoleRelatedList, rolesRelated } = useSelector(
      (state) => state.roleRelatedList
   )

   useEffect(() => {
      return () => dispatch({ type: ROLE_LIST_RESET })
   }, [dispatch])

   useEffect(() => {
      if ( relatedPositions ) return

      if (!successRoleList) {
         dispatch(getRoles())
      } else {
         const filteredProfiles = roles.filter((p) => p.codigo_rol !== '')
         setData(filteredProfiles)
      }
   }, [successRoleList])

   useEffect(() => {
      if ( !relatedPositions ) return

      if (!successRoleRelatedList) {
         dispatch(getRolesRelated())
      } else {
         const filteredProfiles = rolesRelated.filter((p) => p.codigo_rol !== '')
         setData(filteredProfiles)
      }
   }, [successRoleRelatedList])

   const handleChangeMultiData = (event) => {
      const {
         target: { value },
      } = event
      if (rolesData.map((rol) => rol.id_rol).indexOf(value[value.length - 1].id_rol) === -1) {
         setRolesData(value)
      } else {
         setRolesData(rolesData.filter((rol) => rol.id_rol !== value[value.length - 1]?.id_rol))
      }
   }

   return (
      <GridItem xs={12}>
         <MultiSelectRoles
         label={'Roles'}
         data={data}
         multiData={rolesData}
         handleChangeMultiData={handleChangeMultiData}
         />
      </GridItem>
   )
}

export default RolMultiSelect
