import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import DuplicateTaskExtOrdOtherList from './DuplicateTaskExtOrdOtherList'
import { PROFILE_LIST_RESET } from 'redux/constants/profileConstants'
import { getProfiles } from 'redux/actions/profileActions'

const DuplicateTaskExtOrdOther = ({ taskType, setTaskType }) => {
  const dispatch = useDispatch()

  const [profileIdToClone, setProfileIdToClone] = useState('')
  const [search, setSearch] = useState(false)

  const { successProfileList, loadingProfileList, profiles } = useSelector((state) => state.profileList)

  useEffect(() => {
    return () => dispatch({ type: PROFILE_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successProfileList) {
      dispatch(getProfiles())
    }
  }, [successProfileList])

  return (
    <>
      {loadingProfileList ? (
        'Cargando Perfiles'
      ) : profiles ? (
        <>
          <GridItem xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl fullWidth>
              <InputLabel id='task-duplicate-type'>Perfil a Duplicar</InputLabel>
              <Select
                labelId='task-duplicate-type'
                id='task-duplicate-type'
                value={profileIdToClone}
                label='task-duplicate-type'
                disabled={search}
                onChange={(e) => setProfileIdToClone(e.target.value)}
              >
                {profiles.map((profile) => (
                  <MenuItem key={profile.id_perfil} value={profile.id_perfil}>
                    {profile.codigo_perfil}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={6} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='submit' color='primary' disabled={profileIdToClone==''} block onClick={() => setSearch(true)} >
              {'Buscar asignaciones'}
            </Button>
          </GridItem>
          {search && (
            <DuplicateTaskExtOrdOtherList id={profileIdToClone} taskType={taskType} setTaskType={setTaskType} />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default DuplicateTaskExtOrdOther
