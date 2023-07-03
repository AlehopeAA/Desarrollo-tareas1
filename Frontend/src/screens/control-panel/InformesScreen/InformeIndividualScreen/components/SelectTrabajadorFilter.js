import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, makeStyles, MenuItem, Select as Selectable } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { USER_LIST_RESET } from 'redux/constants/userConstants'
import { getUsersInforme } from 'redux/actions/userActions'
import styles from '../styles/selectTrabajadorFilterStyles'

const useStyles = makeStyles(styles)

const SelectTrabajadorFilter = ({ setSelectTrabajadorId, selectTrabajadorId }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  
  const {
    successUserList,
    loadingUserList,
    users,
    errorUserList,
  } = useSelector((state) => state.userList)

  useEffect(() => {
    if (!successUserList && !errorUserList) {
      dispatch(getUsersInforme())
    }
  }, [successUserList, errorUserList])

  useEffect(() => {
    return dispatch({ type: USER_LIST_RESET })
  }, [dispatch])

  return (
      <>
        {loadingUserList ? (
          <>Cargando</>
        ) : (
          users && (
            <GridItem xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='select-trabajador'>Trabajador *</InputLabel>
                <Selectable
                  MenuProps={{
                    className: classes.selectMenu,
                  }}
                  className={classes.select}
                  value={selectTrabajadorId}
                  onChange={(e) => {                    
                    setSelectTrabajadorId(e.target.value)
                  }}
                  inputProps={{
                    name: 'select-trabajador',
                    id: 'select-trabajador',
                    required: true,
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem,
                    }}
                  >
                    Selecciona uno
                  </MenuItem>
                  {users.map((trabajador, index) => (
                    <MenuItem
                      value={trabajador.id_puesto}
                      key={index}
                      classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                    >
                      {`${trabajador.nombre} ${trabajador?.apellido1} ${trabajador?.apellido2}`}
                    </MenuItem>
                  ))}
                </Selectable>
              </FormControl>
            </GridItem>
          )
        )}
      </>

  )
}

export default SelectTrabajadorFilter
