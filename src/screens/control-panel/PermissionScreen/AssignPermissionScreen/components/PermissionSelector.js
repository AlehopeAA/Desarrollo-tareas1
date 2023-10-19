import { FormControl, InputLabel, MenuItem, Select as Selectable } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPermissions } from 'redux/actions/permissionActions'

const PermissionSelector = ({ disabled, permissionId, setPermission }) => {
  const dispatch = useDispatch()
  const { loadingPermissionList, permissions } = useSelector((state) => state.permissionList)
  useEffect(() => {
    dispatch(getPermissions())
  }, [])

  const capitalizeFirstLetter = (str) => str[0].toUpperCase() + str.slice(1)

  return (
    !loadingPermissionList && (
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor='permission-list'>Permisos *</InputLabel>
          <Selectable
            inputProps={{
              name: 'permission-list',
              id: 'permission-list',
            }}
            onChange={(e) => setPermission(e.target.value)}
            value={permissionId}
            disabled={disabled}
          >
            <MenuItem disabled>Selecciona uno</MenuItem>
            {permissions.map((permission, index) => (
              <MenuItem value={permission.id_permiso} key={index}>
                {capitalizeFirstLetter(permission.permiso)}
              </MenuItem>
            ))}
          </Selectable>
        </FormControl>
      </GridItem>
    )
  )
}

export default PermissionSelector
