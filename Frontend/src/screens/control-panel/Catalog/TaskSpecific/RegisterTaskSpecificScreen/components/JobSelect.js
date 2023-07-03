import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, makeStyles, MenuItem, Select as Selectable } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import { TEAM_WORK_LIST_RESET } from 'redux/constants/teamWorkConstants'
import { getTeamWorks } from 'redux/actions/teamWorkActions'
// import styles from '../styles/asignResponsiblFilerStyles'

// const useStyles = makeStyles(styles)

const JobSelect = ({ setCurrentJobPositionId, currentJobPositionId }) => {
  const dispatch = useDispatch()
  const classes = {}

  const { loadingTeamWorkList, successTeamWorkList, teamWorkListData, errorTeamWorkList } = useSelector(
    (state) => state.teamWorkList
  )
  useEffect(() => {
    if (!successTeamWorkList && !errorTeamWorkList) {
      dispatch(getTeamWorks())
    }
  }, [successTeamWorkList, errorTeamWorkList])

  useEffect(() => {
    return dispatch({ type: TEAM_WORK_LIST_RESET })
  }, [dispatch])

  const isEmpty = (arr) => arr.length <= 0

  return (
    <>
      {loadingTeamWorkList ? (
        <>Cargando</>
      ) : (
        teamWorkListData && (
          <GridItem xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='job-position'>
                {isEmpty(teamWorkListData) ? 'No hay Puestos de trabajo para seleccionar' : 'Puesto de Trabajo *'}
              </InputLabel>
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
                  name: 'job-position',
                  id: 'job-position',
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
                {teamWorkListData.map((positionJob, index) => (
                  <MenuItem
                    value={positionJob.id_puesto}
                    key={index}
                    classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                  >{`${positionJob.nombre} ${positionJob?.apellido1} ${positionJob?.apellido2}`}</MenuItem>
                ))}
              </Selectable>
            </FormControl>
          </GridItem>
        )
      )}
    </>
  )
}

export default JobSelect
