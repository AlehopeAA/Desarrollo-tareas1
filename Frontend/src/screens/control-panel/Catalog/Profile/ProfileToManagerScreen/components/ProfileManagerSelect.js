import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, makeStyles, MenuItem, Select as Selectable } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import roles from 'config/roles/roles'
import { USER_LIST_BY_ROLE_NAME_RESET } from 'redux/constants/userConstants'
import { getUsersByRoleName } from 'redux/actions/userActions'
import styles from '../styles/profileToManagerScreen'

const useStyles = makeStyles(styles)

const ProfileManagerSelect = ({ setCurrentJobPositionId, currentJobPositionId }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const {
    successUserListByRoleName,
    loadingUserListByRoleName,
    userListByRoleNameData,
    errorUserListByRoleName,
  } = useSelector((state) => state.userListByRoleName)

  useEffect(() => {
    if (!successUserListByRoleName && !errorUserListByRoleName) {
      dispatch(getUsersByRoleName(roles.GESTOR_DE_PERFILES_ROLE))
    }
  }, [successUserListByRoleName, errorUserListByRoleName])

  useEffect(() => {
    return () => dispatch({ type: USER_LIST_BY_ROLE_NAME_RESET })
  }, [dispatch])
  
  return (
    <>
      {loadingUserListByRoleName ? (
        <>Cargando</>
      ) : (
        <GridItem xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor='asign-role'>Gestor *</InputLabel>
            <Selectable
              MenuProps={{
                className: classes.selectMenu,
              }}
              className={classes.select}
              value={currentJobPositionId}
              onChange={(e) => {
                setCurrentJobPositionId(e.target.value)
              }}
              inputProps={{
                name: 'asign-role',
                id: 'asign-role',
              }}
            >
              {userListByRoleNameData?.length > 0 ? (
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem,
                  }}
                >
                  Selecciona uno
                </MenuItem>
              ) : (
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem,
                  }}
                >
                  No existen usuarios gestores
                </MenuItem>
              )}
              {userListByRoleNameData?.length > 0 &&
                userListByRoleNameData.map((positionJob, index) => (
                  <MenuItem
                    value={positionJob.id_puesto}
                    key={index}
                    classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                  >
                    {`${positionJob.nombre} ${positionJob?.apellido1} ${positionJob?.apellido2}`}
                  </MenuItem>
                ))}
            </Selectable>
          </FormControl>
        </GridItem>
      )}
    </>
  )
}

export default ProfileManagerSelect
